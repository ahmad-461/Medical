-- Run this in your Supabase SQL editor to set up the database

create table sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '24 hours')
);

create table results (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,
  raw_text text,
  structured_data jsonb,
  created_at timestamptz default now()
);
