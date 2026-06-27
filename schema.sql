-- 3M Cars — Supabase Schema
-- Run this in the Supabase SQL editor

create type car_status as enum ('available', 'sold');
create type currency as enum ('BHD', 'SAR', 'AED', 'KWD', 'OMR', 'QAR');

create table cars (
  id            uuid primary key default gen_random_uuid(),
  title_ar      text not null,
  title_en      text,
  brand         text not null,
  model         text not null,
  year          integer not null check (year >= 1990 and year <= 2030),
  mileage       integer not null default 0,
  price         numeric(10, 3) not null,
  currency      currency not null default 'BHD',
  description_ar text,
  description_en text,
  status        car_status not null default 'available',
  featured      boolean not null default false,
  images        text[] not null default '{}',
  whatsapp_number text not null default '97336414730',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger cars_updated_at
  before update on cars
  for each row execute function update_updated_at();

-- RLS
alter table cars enable row level security;

-- Public: read available + sold cars
create policy "public_read_cars"
  on cars for select
  using (true);

-- Authenticated (admin): full access
create policy "admin_all"
  on cars for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage bucket for car images
insert into storage.buckets (id, name, public)
  values ('car-images', 'car-images', true)
  on conflict do nothing;

create policy "public_read_car_images"
  on storage.objects for select
  using (bucket_id = 'car-images');

create policy "admin_upload_car_images"
  on storage.objects for insert
  with check (bucket_id = 'car-images' and auth.role() = 'authenticated');

create policy "admin_delete_car_images"
  on storage.objects for delete
  using (bucket_id = 'car-images' and auth.role() = 'authenticated');
