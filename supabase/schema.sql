-- Run this whole file once in Supabase: Project -> SQL Editor -> New query -> Run
-- Safe to re-run any time: every statement drops-and-recreates rather than failing
-- if it already exists.

-- ========== TABLES ==========

create table if not exists profile (
  id int primary key default 1,
  full_name text not null default 'Dr. Jane Researcher',
  title text not null default 'Agricultural & Plant Biology Researcher',
  tagline text not null default 'Studying how crops adapt so farms can too.',
  bio text not null default 'Write a short bio here from the admin panel.',
  email text default 'you@example.com',
  location text default 'Field Station, Somewhere',
  photo_url text,
  cv_url text,
  linkedin_url text,
  google_scholar_url text,
  github_url text,
  twitter_url text,
  constraint single_row check (id = 1)
);
insert into profile (id) values (1) on conflict (id) do nothing;

create table if not exists research_interests (
  id bigint generated always as identity primary key,
  label text not null,
  sort_order int not null default 0
);

create table if not exists publications (
  id bigint generated always as identity primary key,
  title text not null,
  authors text not null,
  journal text,
  year int,
  link text,
  featured boolean default false,
  sort_order int not null default 0
);

create table if not exists projects (
  id bigint generated always as identity primary key,
  title text not null,
  summary text,
  description text,
  image_url text,
  category text,
  year int,
  link text,
  sort_order int not null default 0
);

create table if not exists timeline_entries (
  id bigint generated always as identity primary key,
  entry_type text not null default 'work' check (entry_type in ('work', 'education')),
  role text not null,
  organization text not null,
  start_year text,
  end_year text,
  description text,
  sort_order int not null default 0
);

create table if not exists skills (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null default 'General',
  sort_order int not null default 0
);

create table if not exists messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read boolean not null default false
);

-- ========== ROW LEVEL SECURITY ==========

alter table profile enable row level security;
alter table research_interests enable row level security;
alter table publications enable row level security;
alter table projects enable row level security;
alter table timeline_entries enable row level security;
alter table skills enable row level security;
alter table messages enable row level security;

-- Public (anonymous) visitors can READ everything except messages
drop policy if exists "public read profile" on profile;
create policy "public read profile" on profile for select using (true);

drop policy if exists "public read research_interests" on research_interests;
create policy "public read research_interests" on research_interests for select using (true);

drop policy if exists "public read publications" on publications;
create policy "public read publications" on publications for select using (true);

drop policy if exists "public read projects" on projects;
create policy "public read projects" on projects for select using (true);

drop policy if exists "public read timeline_entries" on timeline_entries;
create policy "public read timeline_entries" on timeline_entries for select using (true);

drop policy if exists "public read skills" on skills;
create policy "public read skills" on skills for select using (true);

-- Anyone can SUBMIT a contact message, but only a logged-in admin can read/manage them
drop policy if exists "public insert messages" on messages;
create policy "public insert messages" on messages for insert with check (true);

drop policy if exists "admin read messages" on messages;
create policy "admin read messages" on messages for select using (auth.role() = 'authenticated');

drop policy if exists "admin update messages" on messages;
create policy "admin update messages" on messages for update using (auth.role() = 'authenticated');

drop policy if exists "admin delete messages" on messages;
create policy "admin delete messages" on messages for delete using (auth.role() = 'authenticated');

-- Only a logged-in admin can write to content tables
drop policy if exists "admin write profile" on profile;
create policy "admin write profile" on profile for update using (auth.role() = 'authenticated');

drop policy if exists "admin insert research_interests" on research_interests;
create policy "admin insert research_interests" on research_interests for insert with check (auth.role() = 'authenticated');
drop policy if exists "admin update research_interests" on research_interests;
create policy "admin update research_interests" on research_interests for update using (auth.role() = 'authenticated');
drop policy if exists "admin delete research_interests" on research_interests;
create policy "admin delete research_interests" on research_interests for delete using (auth.role() = 'authenticated');

drop policy if exists "admin insert publications" on publications;
create policy "admin insert publications" on publications for insert with check (auth.role() = 'authenticated');
drop policy if exists "admin update publications" on publications;
create policy "admin update publications" on publications for update using (auth.role() = 'authenticated');
drop policy if exists "admin delete publications" on publications;
create policy "admin delete publications" on publications for delete using (auth.role() = 'authenticated');

drop policy if exists "admin insert projects" on projects;
create policy "admin insert projects" on projects for insert with check (auth.role() = 'authenticated');
drop policy if exists "admin update projects" on projects;
create policy "admin update projects" on projects for update using (auth.role() = 'authenticated');
drop policy if exists "admin delete projects" on projects;
create policy "admin delete projects" on projects for delete using (auth.role() = 'authenticated');

drop policy if exists "admin insert timeline_entries" on timeline_entries;
create policy "admin insert timeline_entries" on timeline_entries for insert with check (auth.role() = 'authenticated');
drop policy if exists "admin update timeline_entries" on timeline_entries;
create policy "admin update timeline_entries" on timeline_entries for update using (auth.role() = 'authenticated');
drop policy if exists "admin delete timeline_entries" on timeline_entries;
create policy "admin delete timeline_entries" on timeline_entries for delete using (auth.role() = 'authenticated');

drop policy if exists "admin insert skills" on skills;
create policy "admin insert skills" on skills for insert with check (auth.role() = 'authenticated');
drop policy if exists "admin update skills" on skills;
create policy "admin update skills" on skills for update using (auth.role() = 'authenticated');
drop policy if exists "admin delete skills" on skills;
create policy "admin delete skills" on skills for delete using (auth.role() = 'authenticated');

-- ========== STORAGE (for photo / project images / CV upload) ==========
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

drop policy if exists "public read portfolio-media" on storage.objects;
create policy "public read portfolio-media"
on storage.objects for select
using (bucket_id = 'portfolio-media');

drop policy if exists "admin upload portfolio-media" on storage.objects;
create policy "admin upload portfolio-media"
on storage.objects for insert
with check (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

drop policy if exists "admin update portfolio-media" on storage.objects;
create policy "admin update portfolio-media"
on storage.objects for update
using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

drop policy if exists "admin delete portfolio-media" on storage.objects;
create policy "admin delete portfolio-media"
on storage.objects for delete
using (bucket_id = 'portfolio-media' and auth.role() = 'authenticated');

-- ========== SEED CONTENT (safe to edit later from the admin panel) ==========
insert into research_interests (label, sort_order) values
  ('Soil microbiome resilience', 1),
  ('Drought-tolerant crop genetics', 2),
  ('Sustainable pest management', 3)
on conflict do nothing;
