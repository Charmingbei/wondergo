create table if not exists public.learning_materials (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 100),
  description text not null default '',
  ability text not null check (ability in ('word', 'echo', 'story', 'spell', 'voice')),
  cefr_level text not null default 'Pre-A1'
    check (cefr_level in ('Pre-A1', 'A1', 'A2', 'B1', 'B2')),
  questions jsonb not null default '[]'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(questions) = 'array')
);

create table if not exists public.learning_assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  material_id uuid not null references public.learning_materials(id) on delete restrict,
  student_id uuid references public.profiles(id) on delete cascade,
  school text not null,
  class_name text not null,
  title text not null check (char_length(title) between 1 and 120),
  instructions text not null default '',
  due_at timestamptz,
  xp_reward integer not null default 50 check (xp_reward between 10 and 200),
  created_at timestamptz not null default now()
);

create table if not exists public.assignment_completions (
  assignment_id uuid not null references public.learning_assignments(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  score numeric(5,2) not null check (score between 0 and 100),
  xp_earned integer not null check (xp_earned between 0 and 200),
  completed_at timestamptz not null default now(),
  primary key (assignment_id, student_id)
);

create index if not exists learning_materials_teacher_idx
on public.learning_materials (teacher_id, updated_at desc);

create index if not exists learning_assignments_teacher_idx
on public.learning_assignments (teacher_id, created_at desc);

create index if not exists learning_assignments_class_idx
on public.learning_assignments (school, class_name, created_at desc);

create index if not exists learning_assignments_student_idx
on public.learning_assignments (student_id, created_at desc);

create index if not exists assignment_completions_student_idx
on public.assignment_completions (student_id, completed_at desc);

alter table public.learning_materials enable row level security;
alter table public.learning_assignments enable row level security;
alter table public.assignment_completions enable row level security;

create policy "Approved teachers manage own materials"
on public.learning_materials for all
to authenticated
using (
  teacher_id = (select auth.uid())
  and private.is_approved_teacher((select auth.uid()))
)
with check (
  teacher_id = (select auth.uid())
  and private.is_approved_teacher((select auth.uid()))
);

create policy "Students read assigned published materials"
on public.learning_materials for select
to authenticated
using (
  status = 'published'
  and exists (
    select 1
    from public.learning_assignments assignment
    join public.profiles student on student.id = auth.uid()
    where assignment.material_id = learning_materials.id
      and student.role = 'player'
      and assignment.school = student.school
      and assignment.class_name = student.class_name
      and (assignment.student_id is null or assignment.student_id = student.id)
  )
);

create policy "Approved teachers manage own learning assignments"
on public.learning_assignments for all
to authenticated
using (
  teacher_id = (select auth.uid())
  and private.is_approved_teacher((select auth.uid()))
)
with check (
  teacher_id = (select auth.uid())
  and private.is_approved_teacher((select auth.uid()))
  and school = (select school from public.profiles where id = auth.uid())
  and class_name = (select class_name from public.profiles where id = auth.uid())
  and (
    student_id is null
    or private.can_access_student(student_id)
  )
);

create policy "Students read their learning assignments"
on public.learning_assignments for select
to authenticated
using (
  exists (
    select 1
    from public.profiles student
    where student.id = auth.uid()
      and student.role = 'player'
      and learning_assignments.school = student.school
      and learning_assignments.class_name = student.class_name
      and (
        learning_assignments.student_id is null
        or learning_assignments.student_id = student.id
      )
  )
);

create policy "Students and teachers read assignment completions"
on public.assignment_completions for select
to authenticated
using (
  student_id = (select auth.uid())
  or private.can_access_student(student_id)
);

revoke insert, update, delete on public.assignment_completions from authenticated;

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

  awarded_xp := assignment_row.xp_reward;

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

  update public.ability_progress
  set word_power = least(100, word_power + case when material_row.ability = 'word' then 1 else 0 end),
      echo_sense = least(100, echo_sense + case when material_row.ability = 'echo' then 1 else 0 end),
      story_vision = least(100, story_vision + case when material_row.ability = 'story' then 1 else 0 end),
      spell_craft = least(100, spell_craft + case when material_row.ability = 'spell' then 1 else 0 end),
      voice_power = least(100, voice_power + case when material_row.ability = 'voice' then 1 else 0 end),
      updated_at = now()
  where user_id = auth.uid();

  update public.profiles
  set xp = xp + awarded_xp, updated_at = now()
  where id = auth.uid()
  returning * into updated_profile;

  return jsonb_build_object(
    'profile', to_jsonb(updated_profile),
    'awarded_xp', awarded_xp,
    'assignment_id', p_assignment_id
  );
end;
$$;

revoke all on function public.complete_learning_assignment(uuid, numeric)
from public, anon;
grant execute on function public.complete_learning_assignment(uuid, numeric)
to authenticated;
