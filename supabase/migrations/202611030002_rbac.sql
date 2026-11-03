-- Role assignments are managed by the server using the Supabase service role.
alter table public.profiles
  add column if not exists role text not null default 'customer'
    check (role in ('admin', 'customer', 'artisan')),
  add column if not exists artisan_id uuid references public.artisans(id) on delete set null;

create index if not exists profiles_role_idx on public.profiles(role);

-- Profile rows and role assignments are private. The service role bypasses RLS;
-- Clerk sessions are not Supabase JWTs, so access is mediated by the server.
revoke all on public.profiles from anon, authenticated;
