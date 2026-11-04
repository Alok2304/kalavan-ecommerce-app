create table if not exists public.website_feedback (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  rating smallint not null check (rating between 1 and 5),
  topic text not null check (topic in ('Overall experience', 'Shopping and checkout', 'Product information', 'Website design and usability', 'Other')),
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.website_feedback enable row level security;
grant insert on public.website_feedback to anon, authenticated;

-- Feedback is intentionally public to submit, while reads and updates remain
-- unavailable to browser clients. The server validates the submitted fields.
drop policy if exists "Anyone can submit website feedback" on public.website_feedback;
create policy "Anyone can submit website feedback" on public.website_feedback
  for insert to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 100
    and char_length(trim(email)) between 3 and 254
    and rating between 1 and 5
    and topic in ('Overall experience', 'Shopping and checkout', 'Product information', 'Website design and usability', 'Other')
    and char_length(trim(message)) between 10 and 2000
  );
