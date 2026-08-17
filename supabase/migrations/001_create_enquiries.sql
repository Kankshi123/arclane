create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  work_email text not null check (char_length(trim(work_email)) > 0),
  company text not null check (char_length(trim(company)) > 0),
  phone text,
  focus_area text not null check (char_length(trim(focus_area)) > 0),
  message text not null check (char_length(trim(message)) > 0),
  status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_status_idx on public.enquiries (status);
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_enquiries_updated_at on public.enquiries;
create trigger set_enquiries_updated_at
before update on public.enquiries
for each row
execute function public.set_updated_at();

alter table public.enquiries enable row level security;

drop policy if exists "Public can insert enquiries" on public.enquiries;
create policy "Public can insert enquiries"
on public.enquiries
for insert
to anon
with check (true);
