create table if not exists public.question_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  ability text not null check (ability in ('word', 'echo', 'story', 'spell', 'voice')),
  question_key text not null,
  prompt text not null,
  question_type text not null,
  vocabulary text,
  selected_answer text,
  correct_answer text not null,
  is_correct boolean not null,
  created_at timestamptz not null default now()
);

alter table public.question_attempts enable row level security;

create policy "Authenticated users read permitted question attempts"
on public.question_attempts for select
to authenticated
using ((select auth.uid()) = user_id or private.can_access_student(user_id));

revoke insert, update, delete on public.question_attempts from authenticated;

create or replace function public.record_question_attempts(p_attempts jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_count integer;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  insert into public.question_attempts (
    user_id, ability, question_key, prompt, question_type, vocabulary,
    selected_answer, correct_answer, is_correct
  )
  select
    auth.uid(),
    item ->> 'ability',
    item ->> 'question_key',
    item ->> 'prompt',
    coalesce(nullif(item ->> 'question_type', ''), '綜合練習'),
    nullif(item ->> 'vocabulary', ''),
    nullif(item ->> 'selected_answer', ''),
    item ->> 'correct_answer',
    coalesce((item ->> 'is_correct')::boolean, false)
  from jsonb_array_elements(coalesce(p_attempts, '[]'::jsonb)) item
  where item ->> 'ability' in ('word', 'echo', 'story', 'spell', 'voice')
    and nullif(item ->> 'question_key', '') is not null
    and nullif(item ->> 'prompt', '') is not null
    and nullif(item ->> 'correct_answer', '') is not null;

  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;

revoke all on function public.record_question_attempts(jsonb) from public, anon;
grant execute on function public.record_question_attempts(jsonb) to authenticated;

create or replace function public.set_teacher_approval(
  p_teacher_id uuid,
  p_approved boolean
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  caller_role public.user_role;
  updated_profile public.profiles;
begin
  select role into caller_role from public.profiles where id = auth.uid();
  if caller_role <> 'admin' then
    raise exception 'Administrator access required';
  end if;

  update public.profiles
  set is_approved = p_approved, updated_at = now()
  where id = p_teacher_id and role = 'teacher'
  returning * into updated_profile;

  if updated_profile.id is null then
    raise exception 'Teacher account not found';
  end if;
  return updated_profile;
end;
$$;

revoke all on function public.set_teacher_approval(uuid, boolean) from public, anon;
grant execute on function public.set_teacher_approval(uuid, boolean) to authenticated;

create index if not exists question_attempts_user_date_idx
on public.question_attempts (user_id, created_at desc);

create index if not exists question_attempts_class_analysis_idx
on public.question_attempts (ability, is_correct, created_at desc);
