create table if not exists public.course_packs (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  textbook_version text not null default '',
  unit_name text not null default '',
  course_name text not null default '',
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_pack_resources (
  id uuid primary key default gen_random_uuid(),
  pack_id uuid not null references public.course_packs(id) on delete cascade,
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  resource_key text not null,
  title text not null check (char_length(title) between 1 and 140),
  resource_type text not null
    check (resource_type in ('teaching_material', 'worksheet', 'assessment')),
  audience text not null check (audience in ('teacher', 'student')),
  content jsonb not null default '{}'::jsonb,
  material_id uuid references public.learning_materials(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (jsonb_typeof(content) = 'object')
);

create index if not exists course_packs_teacher_idx
on public.course_packs (teacher_id, updated_at desc);

create index if not exists course_pack_resources_pack_idx
on public.course_pack_resources (pack_id, updated_at desc);

alter table public.course_packs enable row level security;
alter table public.course_pack_resources enable row level security;

create policy "Approved teachers manage own course packs"
on public.course_packs for all
to authenticated
using (
  teacher_id = (select auth.uid())
  and private.is_approved_teacher((select auth.uid()))
)
with check (
  teacher_id = (select auth.uid())
  and private.is_approved_teacher((select auth.uid()))
);

create policy "Approved teachers manage own course pack resources"
on public.course_pack_resources for all
to authenticated
using (
  teacher_id = (select auth.uid())
  and private.is_approved_teacher((select auth.uid()))
  and exists (
    select 1 from public.course_packs pack
    where pack.id = course_pack_resources.pack_id
      and pack.teacher_id = (select auth.uid())
  )
)
with check (
  teacher_id = (select auth.uid())
  and private.is_approved_teacher((select auth.uid()))
  and exists (
    select 1 from public.course_packs pack
    where pack.id = course_pack_resources.pack_id
      and pack.teacher_id = (select auth.uid())
  )
);

grant select, insert, update, delete on public.course_packs to authenticated;
grant select, insert, update, delete on public.course_pack_resources to authenticated;
