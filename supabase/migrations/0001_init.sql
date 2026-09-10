-- Sidenote schema — mirrors src/lib/types.ts's Tutor shape closely enough
-- that src/lib/supabase/data.ts can select("*") directly into it. Not
-- applied to any live project yet; this is the go-live target for when
-- DATA_SOURCE=supabase is turned on.

create table if not exists public.tutors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text not null,
  bio text not null,
  subjects text[] not null default '{}',
  levels text[] not null default '{}',
  formats text[] not null default '{}',
  hourly_rate_cents integer not null,
  currency text not null default 'USD',
  currently_teaching_at text not null,
  years_experience integer not null default 0,
  city text not null,
  state text not null,
  rating numeric(3, 2) not null default 0,
  review_count integer not null default 0,
  featured boolean not null default false,
  verification text not null default 'unverified' check (verification in ('unverified', 'id-verified', 'background-checked')),
  photo text,
  logo_initials text,
  contact jsonb not null default '{}',
  availability jsonb not null default '[]',
  gigs jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutors (id) on delete cascade,
  author text not null,
  role text not null,
  rating integer not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutors (id) on delete cascade,
  student_email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.tutors enable row level security;
alter table public.reviews enable row level security;
alter table public.inquiries enable row level security;

-- Public read access to tutor listings and reviews; writes are deferred to
-- a later phase (this project is interface-first — see the plan's ยง8).
create policy "tutors are publicly readable" on public.tutors for select using (true);
create policy "reviews are publicly readable" on public.reviews for select using (true);
