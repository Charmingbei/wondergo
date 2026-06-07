alter table public.profiles
add column if not exists contact_email text,
add column if not exists password_changed_at timestamptz;

create unique index if not exists profiles_contact_email_unique_idx
on public.profiles (lower(contact_email))
where contact_email is not null;

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
    id, role, account, school, class_name, seat, real_name, display_name,
    contact_email, password_changed_at, is_approved
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
    nullif(lower(new.raw_user_meta_data ->> 'contact_email'), ''),
    now(),
    new_role <> 'teacher'
  );

  insert into public.ability_progress (user_id)
  values (new.id);

  return new;
end;
$$;

create or replace function public.mark_password_changed()
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  changed_at timestamptz := now();
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;
  update public.profiles
  set password_changed_at = changed_at, updated_at = changed_at
  where id = auth.uid();
  return changed_at;
end;
$$;

revoke all on function public.mark_password_changed() from public, anon;
grant execute on function public.mark_password_changed() to authenticated;
