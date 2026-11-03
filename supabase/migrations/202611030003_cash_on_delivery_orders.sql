create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer jsonb not null,
  items jsonb not null,
  subtotal_inr integer not null check (subtotal_inr >= 0),
  shipping_inr integer not null check (shipping_inr >= 0),
  total_inr integer not null check (total_inr = subtotal_inr + shipping_inr),
  payment_method text not null check (payment_method = 'cash_on_delivery'),
  status text not null default 'placed' check (status in ('placed', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
revoke all on public.orders from anon, authenticated;
