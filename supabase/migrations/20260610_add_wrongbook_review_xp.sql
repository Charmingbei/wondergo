create or replace function public.complete_wrongbook_review()
returns jsonb
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

  perform pg_advisory_xact_lock(
    hashtextextended(auth.uid()::text || ':wrongbook-review', 0)
  );

  insert into public.learning_events (
    user_id, ability, event_type, score, xp_earned, duration_seconds
  ) values (
    auth.uid(), 'word', 'review:wrongbook', 100, 5, 0
  );

  update public.profiles
  set xp = xp + 5, updated_at = now()
  where id = auth.uid()
  returning * into updated_profile;

  return jsonb_build_object(
    'profile', to_jsonb(updated_profile),
    'awarded_xp', 5
  );
end;
$$;

revoke all on function public.complete_wrongbook_review() from public, anon;
grant execute on function public.complete_wrongbook_review() to authenticated;
