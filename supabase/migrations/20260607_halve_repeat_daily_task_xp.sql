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
  day_start timestamptz;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_task_key !~ '^(ability|mission):[a-z]+$' then raise exception 'Invalid task key'; end if;
  if p_ability not in ('word', 'echo', 'story', 'spell', 'voice') then raise exception 'Invalid ability'; end if;
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

  insert into public.learning_events (
    user_id, ability, event_type, score, xp_earned, duration_seconds
  ) values (
    auth.uid(), p_ability, 'task:' || p_task_key, p_score, awarded_xp,
    greatest(coalesce(p_duration_seconds, 0), 0)
  );

  update public.ability_progress
  set word_power = least(100, word_power + case when p_ability = 'word' then 1 else 0 end),
      echo_sense = least(100, echo_sense + case when p_ability = 'echo' then 1 else 0 end),
      story_vision = least(100, story_vision + case when p_ability = 'story' then 1 else 0 end),
      spell_craft = least(100, spell_craft + case when p_ability = 'spell' then 1 else 0 end),
      voice_power = least(100, voice_power + case when p_ability = 'voice' then 1 else 0 end),
      updated_at = now()
  where user_id = auth.uid();

  update public.profiles
  set xp = xp + awarded_xp, updated_at = now()
  where id = auth.uid()
  returning * into updated_profile;

  return jsonb_build_object(
    'profile', to_jsonb(updated_profile),
    'awarded_xp', awarded_xp,
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
