create extension if not exists pgcrypto;
create schema if not exists private;

create type public.user_role as enum ('player', 'teacher', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'player',
  account text not null unique,
  school text not null,
  class_name text not null,
  seat text,
  real_name text not null,
  display_name text,
  xp integer not null default 0 check (xp >= 0),
  adventure_level integer not null default 1 check (adventure_level >= 1),
  cefr_level text not null default 'Pre-A1',
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint player_fields check (
    role <> 'player' or (seat is not null and display_name is not null)
  )
);

create table public.ability_progress (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  word_power integer not null default 0 check (word_power between 0 and 100),
  echo_sense integer not null default 0 check (echo_sense between 0 and 100),
  story_vision integer not null default 0 check (story_vision between 0 and 100),
  spell_craft integer not null default 0 check (spell_craft between 0 and 100),
  voice_power integer not null default 0 check (voice_power between 0 and 100),
  updated_at timestamptz not null default now()
);

create table public.learning_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  ability text not null check (ability in ('word', 'echo', 'story', 'spell', 'voice')),
  event_type text not null,
  score numeric(5,2),
  xp_earned integer not null default 0,
  duration_seconds integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.teacher_assignments (
  id bigint generated always as identity primary key,
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  school text not null,
  class_name text not null,
  title text not null,
  description text,
  ability text check (ability in ('word', 'echo', 'story', 'spell', 'voice')),
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  new_role public.user_role;
begin
  new_role := coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'player');

  insert into public.profiles (
    id, role, account, school, class_name, seat, real_name, display_name, is_approved
  )
  values (
    new.id,
    new_role,
    lower(new.raw_user_meta_data ->> 'account'),
    new.raw_user_meta_data ->> 'school',
    new.raw_user_meta_data ->> 'class_name',
    nullif(new.raw_user_meta_data ->> 'seat', ''),
    new.raw_user_meta_data ->> 'real_name',
    case
      when new_role = 'player' then lower(new.raw_user_meta_data ->> 'account')
      else nullif(new.raw_user_meta_data ->> 'display_name', '')
    end,
    new_role <> 'teacher'
  );

  insert into public.ability_progress (user_id)
  values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function private.can_access_student(student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles teacher
    join public.profiles student on student.id = student_id
    where teacher.id = auth.uid()
      and teacher.role in ('teacher', 'admin')
      and teacher.is_approved
      and (
        teacher.role = 'admin'
        or (
          teacher.school = student.school
          and teacher.class_name = student.class_name
        )
      )
  );
$$;

create or replace function private.is_approved_teacher(user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = user_id
      and role in ('teacher', 'admin')
      and is_approved
  );
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function private.can_access_student(uuid) from public, anon;
revoke all on function private.is_approved_teacher(uuid) from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.can_access_student(uuid) to authenticated;
grant execute on function private.is_approved_teacher(uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.ability_progress enable row level security;
alter table public.learning_events enable row level security;
alter table public.teacher_assignments enable row level security;

create policy "Authenticated users read permitted profiles"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id or private.can_access_student(id));

create policy "Users update own display profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Authenticated users read permitted abilities"
on public.ability_progress for select
to authenticated
using ((select auth.uid()) = user_id or private.can_access_student(user_id));

create policy "Authenticated users read permitted learning events"
on public.learning_events for select
to authenticated
using ((select auth.uid()) = user_id or private.can_access_student(user_id));

create policy "Approved teachers manage own assignments"
on public.teacher_assignments for all
to authenticated
using ((select auth.uid()) = teacher_id and private.is_approved_teacher((select auth.uid())))
with check ((select auth.uid()) = teacher_id and private.is_approved_teacher((select auth.uid())));

revoke update on public.profiles from authenticated;
grant update (display_name) on public.profiles to authenticated;
revoke update on public.ability_progress from authenticated;
revoke insert on public.learning_events from authenticated;

create or replace function public.record_learning_event(
  p_ability text,
  p_event_type text,
  p_score numeric,
  p_xp_earned integer,
  p_duration_seconds integer default 0
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_ability not in ('word', 'echo', 'story', 'spell', 'voice') then
    raise exception 'Invalid ability';
  end if;

  if p_xp_earned < 0 or p_xp_earned > 200 then
    raise exception 'Invalid XP amount';
  end if;

  insert into public.learning_events (
    user_id, ability, event_type, score, xp_earned, duration_seconds
  ) values (
    auth.uid(), p_ability, p_event_type, p_score, p_xp_earned,
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
  set xp = xp + p_xp_earned,
      updated_at = now()
  where id = auth.uid()
  returning * into updated_profile;

  return updated_profile;
end;
$$;

revoke all on function public.record_learning_event(text, text, numeric, integer, integer)
from public, anon;
grant execute on function public.record_learning_event(text, text, numeric, integer, integer)
to authenticated;

create index profiles_class_idx on public.profiles (school, class_name);
create index learning_events_user_date_idx on public.learning_events (user_id, created_at desc);
create index assignments_class_idx on public.teacher_assignments (school, class_name);
create index assignments_teacher_idx on public.teacher_assignments (teacher_id);
create index assignments_student_idx on public.teacher_assignments (student_id);
