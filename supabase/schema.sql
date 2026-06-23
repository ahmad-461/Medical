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

-- Storage: create a bucket for prescription images
-- Run this in Supabase dashboard > Storage > New Bucket
-- Bucket name: prescription-images
-- Public: false
-- File size limit: 10MB
-- Allowed MIME types: image/jpeg, image/png, image/heic, application/pdf

-- NOTE: You must manually create the 'prescription-images' bucket in the Supabase dashboard
-- before the following RLS policies can be applied correctly if you are using the dashboard UI.
-- However, you can run these SQL statements to set up policies:

-- Storage RLS: allow anonymous uploads to prescription-images bucket
create policy "Allow anonymous uploads"
on storage.objects for insert
with check (bucket_id = 'prescription-images');

create policy "Allow anonymous reads"
on storage.objects for select
using (bucket_id = 'prescription-images');
