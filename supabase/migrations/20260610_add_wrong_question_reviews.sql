create table if not exists public.wrong_question_reviews (
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_key text not null,
  review_date date not null default (now() at time zone 'Asia/Taipei')::date,
  reviewed_at timestamptz not null default now(),
  primary key (user_id, question_key, review_date)
);

alter table public.wrong_question_reviews enable row level security;

grant select, insert, update, delete
on table public.wrong_question_reviews
to authenticated;

create policy "Players manage own wrong question reviews"
on public.wrong_question_reviews for all
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Teachers read permitted wrong question reviews"
on public.wrong_question_reviews for select
to authenticated
using (private.can_access_student(user_id));

create index if not exists wrong_question_reviews_user_date_idx
on public.wrong_question_reviews (user_id, review_date desc);
