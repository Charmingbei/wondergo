create or replace function public.record_task_completion(
  p_task_key text,
  p_ability text,
  p_score numeric,
  p_base_xp integer,
  p_duration_seconds integer default 0
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_profile public.profiles;
  prior_completions integer;
  awarded_xp integer;
  ability_gain integer;
  day_start timestamptz;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_task_key !~ '^(ability|mission):[a-z]+$' then raise exception 'Invalid task key'; end if;
  if p_ability not in ('word', 'echo', 'story', 'spell', 'voice') then raise exception 'Invalid ability'; end if;
  if p_score < 0 or p_score > 100 then raise exception 'Invalid score'; end if;
  if p_base_xp < 0 or p_base_xp > 200 then raise exception 'Invalid XP amount'; end if;

  day_start := date_trunc('day', now() at time zone 'Asia/Taipei') at time zone 'Asia/Taipei';
  perform pg_advisory_xact_lock(
    hashtextextended(auth.uid()::text || ':' || p_task_key || ':' || day_start::text, 0)
  );

  select count(*) into prior_completions
  from public.learning_events
  where user_id = auth.uid()
    and event_type = 'task:' || p_task_key
    and created_at >= day_start;

  awarded_xp := case
    when prior_completions >= 1 then floor(p_base_xp / 2.0)::integer
    else p_base_xp
  end;
  ability_gain := least(5, greatest(0, round(p_score / 20.0)::integer));

  insert into public.learning_events (
    user_id, ability, event_type, score, xp_earned, duration_seconds
  ) values (
    auth.uid(), p_ability, 'task:' || p_task_key, p_score, awarded_xp,
    greatest(coalesce(p_duration_seconds, 0), 0)
  );

  insert into public.ability_progress (user_id)
  values (auth.uid())
  on conflict (user_id) do nothing;

  update public.ability_progress
  set word_power = least(100, word_power + case when p_ability = 'word' then ability_gain else 0 end),
      echo_sense = least(100, echo_sense + case when p_ability = 'echo' then ability_gain else 0 end),
      story_vision = least(100, story_vision + case when p_ability = 'story' then ability_gain else 0 end),
      spell_craft = least(100, spell_craft + case when p_ability = 'spell' then ability_gain else 0 end),
      voice_power = least(100, voice_power + case when p_ability = 'voice' then ability_gain else 0 end),
      updated_at = now()
  where user_id = auth.uid();

  update public.profiles
  set xp = xp + awarded_xp, updated_at = now()
  where id = auth.uid()
  returning * into updated_profile;

  return jsonb_build_object(
    'profile', to_jsonb(updated_profile),
    'awarded_xp', awarded_xp,
    'ability_gain', ability_gain,
    'base_xp', p_base_xp,
    'repeat_count', prior_completions + 1,
    'is_repeat', prior_completions >= 1
  );
end;
$$;

revoke all on function public.record_task_completion(text, text, numeric, integer, integer)
from public, anon;
grant execute on function public.record_task_completion(text, text, numeric, integer, integer)
to authenticated;

create or replace function public.complete_learning_assignment(
  p_assignment_id uuid,
  p_score numeric
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  assignment_row public.learning_assignments;
  material_row public.learning_materials;
  student_row public.profiles;
  updated_profile public.profiles;
  awarded_xp integer;
  ability_gain integer;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_score < 0 or p_score > 100 then raise exception 'Invalid score'; end if;

  select * into student_row
  from public.profiles
  where id = auth.uid() and role = 'player';
  if student_row.id is null then raise exception 'Player access required'; end if;

  select * into assignment_row
  from public.learning_assignments
  where id = p_assignment_id;
  if assignment_row.id is null then raise exception 'Assignment not found'; end if;
  if assignment_row.school <> student_row.school
    or assignment_row.class_name <> student_row.class_name
    or (assignment_row.student_id is not null and assignment_row.student_id <> student_row.id)
  then
    raise exception 'Assignment access denied';
  end if;

  select * into material_row
  from public.learning_materials
  where id = assignment_row.material_id and status = 'published';
  if material_row.id is null then raise exception 'Material is not published'; end if;

  perform pg_advisory_xact_lock(
    hashtextextended(auth.uid()::text || ':' || p_assignment_id::text, 0)
  );
  if exists (
    select 1 from public.assignment_completions
    where assignment_id = p_assignment_id and student_id = auth.uid()
  ) then
    raise exception 'Assignment already completed';
  end if;

  awarded_xp := floor(assignment_row.xp_reward * p_score / 100.0)::integer;
  ability_gain := least(5, greatest(0, round(p_score / 20.0)::integer));

  insert into public.assignment_completions (
    assignment_id, student_id, score, xp_earned
  ) values (
    p_assignment_id, auth.uid(), p_score, awarded_xp
  );

  insert into public.learning_events (
    user_id, ability, event_type, score, xp_earned, duration_seconds
  ) values (
    auth.uid(), material_row.ability, 'assignment:' || p_assignment_id::text,
    p_score, awarded_xp, 0
  );

  insert into public.ability_progress (user_id)
  values (auth.uid())
  on conflict (user_id) do nothing;

  update public.ability_progress
  set word_power = least(100, word_power + case when material_row.ability = 'word' then ability_gain else 0 end),
      echo_sense = least(100, echo_sense + case when material_row.ability = 'echo' then ability_gain else 0 end),
      story_vision = least(100, story_vision + case when material_row.ability = 'story' then ability_gain else 0 end),
      spell_craft = least(100, spell_craft + case when material_row.ability = 'spell' then ability_gain else 0 end),
      voice_power = least(100, voice_power + case when material_row.ability = 'voice' then ability_gain else 0 end),
      updated_at = now()
  where user_id = auth.uid();

  update public.profiles
  set xp = xp + awarded_xp, updated_at = now()
  where id = auth.uid()
  returning * into updated_profile;

  return jsonb_build_object(
    'profile', to_jsonb(updated_profile),
    'awarded_xp', awarded_xp,
    'ability_gain', ability_gain,
    'assignment_id', p_assignment_id
  );
end;
$$;

revoke all on function public.complete_learning_assignment(uuid, numeric)
from public, anon;
grant execute on function public.complete_learning_assignment(uuid, numeric)
to authenticated;
