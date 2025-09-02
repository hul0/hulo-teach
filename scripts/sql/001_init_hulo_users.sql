-- Enable required extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  student_id text unique not null,
  email text unique not null,
  username text unique not null,
  full_name text not null,
  password_hash text not null,
  points int4 not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- user_profiles table for optional fields
create table if not exists public.user_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  college text,
  stream text,
  branch text,
  department text,
  year text,
  phone text,
  date_of_birth date,
  about text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated timestamps
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_users_updated on public.users;
create trigger set_users_updated
before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists set_profiles_updated on public.user_profiles;
create trigger set_profiles_updated
before update on public.user_profiles
for each row execute function public.set_updated_at();

-- RLS
alter table public.users enable row level security;
alter table public.user_profiles enable row level security;

-- Policies (effective when requests use a JWT for the user; service role bypasses them)
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='users' and policyname='Users can view and update self'
  ) then
    create policy "Users can view and update self" on public.users
      using (auth.uid() = id)
      with check (auth.uid() = id);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='user_profiles' and policyname='Profiles are visible to owner'
  ) then
    create policy "Profiles are visible to owner" on public.user_profiles
      for select using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='user_profiles' and policyname='Owner can upsert profile'
  ) then
    create policy "Owner can upsert profile" on public.user_profiles
      for insert with check (auth.uid() = user_id);
    create policy "Owner can update profile" on public.user_profiles
      for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end$$;
