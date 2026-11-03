-- User identity remains managed by Clerk. This table stores the app-facing profile,
-- keyed by Clerk's stable user ID.
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.artisans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  location text not null,
  bio text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  price_inr integer not null check (price_inr >= 0),
  image_url text not null,
  image_alt text not null,
  artisan_id uuid not null references public.artisans(id) on delete restrict,
  artisan_name text not null,
  location text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_active_created_idx on public.products(active, created_at);
create index if not exists products_artisan_id_idx on public.products(artisan_id);

alter table public.profiles enable row level security;
alter table public.artisans enable row level security;
alter table public.products enable row level security;

grant select on public.artisans, public.products to anon, authenticated;

-- Public storefront access is read-only. Profile writes are performed only by the
-- verified Clerk webhook using the server-only Supabase service role key.
create policy "Anyone can read artisans" on public.artisans
  for select using (true);
create policy "Anyone can read active products" on public.products
  for select using (active = true);

insert into public.artisans (slug, name, location) values
  ('savitri-handlooms', 'Savitri Handlooms', 'Yeola, Maharashtra'),
  ('ramesh-mati-kala', 'Ramesh Mati Kala', 'Nashik, Maharashtra'),
  ('anita-jewel-works', 'Anita Jewel Works', 'Kolhapur, Maharashtra'),
  ('naik-chitrashala', 'Naik Chitrashala', 'Sawantwadi, Maharashtra'),
  ('kumbhar-studio', 'Kumbhar Studio', 'Pune, Maharashtra'),
  ('tribal-craft-co', 'Tribal Craft Co.', 'Gadchiroli, Maharashtra'),
  ('morya-weaves', 'Morya Weaves', 'Aurangabad, Maharashtra'),
  ('shinde-woodcraft', 'Shinde Woodcraft', 'Sawantwadi, Maharashtra'),
  ('tambat-ali-collective', 'Tambat Ali Collective', 'Pune, Maharashtra'),
  ('yeola-loom-house', 'Yeola Loom House', 'Yeola, Maharashtra'),
  ('pragati-pottery', 'Pragati Pottery', 'Pen, Maharashtra'),
  ('suvarna-karigari', 'Suvarna Karigari', 'Kolhapur, Maharashtra')
on conflict (slug) do nothing;

insert into public.products
  (slug, title, description, price_inr, image_url, image_alt, artisan_id, artisan_name, location)
select seed.slug, seed.title, seed.description, seed.price_inr, seed.image_url, seed.image_alt,
       artisan.id, seed.artisan_name, seed.location
from (values
  ('kaas-floral-paithani', 'Kaas Floral Paithani', 'A luminous handwoven Paithani inspired by the wildflower plateaus of Kaas. Each motif carries the rhythm and patience of Yeola''s master weavers.', 8499, 'https://images.unsplash.com/photo-1717586756136-d9a3eeb1fa6f?auto=format&fit=crop&w=1400&q=85', 'Close detail of a richly woven floral Indian textile', 'Savitri Handlooms', 'Yeola, Maharashtra'),
  ('warli-terracotta-urli', 'Warli Terracotta Urli', 'A hand-shaped terracotta urli made with locally gathered clay, bringing the warmth and character of traditional pottery into your home.', 1850, 'https://images.unsplash.com/photo-1699371830139-cb02e94878f1?auto=format&fit=crop&w=900&q=85', 'Handmade terracotta vessels displayed in an artisan workshop', 'Ramesh Mati Kala', 'Nashik, Maharashtra'),
  ('kolhapuri-saaj-necklace', 'Kolhapuri Saaj Necklace', 'A statement necklace inspired by the traditional Kolhapuri saaj, assembled by hand with careful detailing by Anita Jewel Works.', 3299, 'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=900&q=85', 'Colourful handcrafted beaded necklaces on a wooden display', 'Anita Jewel Works', 'Kolhapur, Maharashtra'),
  ('sawantwadi-ganjifa-set', 'Sawantwadi Ganjifa Set', 'A keepsake set celebrating Sawantwadi''s hand-painted Ganjifa tradition, with each piece finished by an artisan at Naik Chitrashala.', 2190, 'https://images.unsplash.com/photo-1678082309214-3b2941e387f8?auto=format&fit=crop&w=900&q=85', 'Woman artisan hand painting a traditional craft', 'Naik Chitrashala', 'Sawantwadi, Maharashtra'),
  ('hand-thrown-clay-surahi', 'Hand-thrown Clay Surahi', 'A hand-thrown clay surahi shaped on the potter''s wheel at Kumbhar Studio, with the subtle variations that make every piece unique.', 1240, 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=85', 'Potter shaping a clay vessel by hand', 'Kumbhar Studio', 'Pune, Maharashtra'),
  ('bamboo-weave-lantern', 'Bamboo Weave Lantern', 'A lightweight lantern woven from bamboo by Tribal Craft Co. in Gadchiroli, showcasing the region''s skilled basketry tradition.', 1299, 'https://images.unsplash.com/photo-1764218057040-5427eb0f1f5a?auto=format&fit=crop&w=900&q=85', 'Colourful handmade lanterns and woven baskets', 'Tribal Craft Co.', 'Gadchiroli, Maharashtra'),
  ('paithani-table-runner', 'Paithani Table Runner', 'A richly coloured Paithani-inspired table runner, woven by Morya Weaves to bring traditional textile motifs to the table.', 2750, 'https://images.unsplash.com/photo-1588140686379-1b76a52103dc?auto=format&fit=crop&w=900&q=85', 'Detailed red, white and blue handwoven textile', 'Morya Weaves', 'Aurangabad, Maharashtra'),
  ('carved-devrai-figurine', 'Carved Devrai Figurine', 'A carefully carved wooden figurine from Shinde Woodcraft, inspired by the living traditions and natural forms of the Devrai.', 1680, 'https://images.unsplash.com/photo-1712210332599-0cb76e647e43?auto=format&fit=crop&w=900&q=85', 'Artisan seated among handcrafted wooden sculptures', 'Shinde Woodcraft', 'Sawantwadi, Maharashtra'),
  ('tamba-serving-bowl', 'Tamba Serving Bowl', 'A hand-finished copper serving bowl made by the Tambat Ali Collective, carrying forward Pune''s celebrated metalworking craft.', 2450, 'https://images.unsplash.com/photo-1678082310070-26bdadc06a34?auto=format&fit=crop&w=900&q=85', 'Artisan surrounded by rows of handcrafted bowls', 'Tambat Ali Collective', 'Pune, Maharashtra'),
  ('mor-bagh-silk-stole', 'Mor Bagh Silk Stole', 'A soft silk stole with colours and motifs inspired by Mor Bagh, woven by the artisans of Yeola Loom House.', 3890, 'https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=900&q=85', 'A layered collection of colourful handwoven cloth', 'Yeola Loom House', 'Yeola, Maharashtra'),
  ('rustic-matka-trio', 'Rustic Matka Trio', 'Three rustic clay matkas shaped and finished by hand at Pragati Pottery in Pen, each with its own natural character.', 1490, 'https://images.unsplash.com/photo-1699371829505-e9fdde74e869?auto=format&fit=crop&w=900&q=85', 'A collection of brown and white handmade vases', 'Pragati Pottery', 'Pen, Maharashtra'),
  ('mohan-mala-bracelet', 'Mohan Mala Bracelet', 'A handcrafted bracelet by Suvarna Karigari, blending traditional Kolhapuri jewellery details with an easy-to-wear form.', 1899, 'https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?auto=format&fit=crop&w=900&q=85', 'Gold and silver handcrafted beaded bracelet', 'Suvarna Karigari', 'Kolhapur, Maharashtra')
) as seed(slug, title, description, price_inr, image_url, image_alt, artisan_name, location)
join public.artisans artisan on artisan.name = seed.artisan_name
on conflict (slug) do nothing;
