-- Omoowo 2027 campaign site — Supabase schema
-- Run this once in the Supabase SQL Editor (or via `supabase db push`) to create everything the admin panel needs.

create extension if not exists "pgcrypto";

create type news_category as enum ('PRESS_RELEASE', 'CAMPAIGN_UPDATE', 'COMMUNITY', 'STATEMENT', 'SPEECH');
create type event_type as enum ('RALLY', 'TOWN_HALL', 'FORUM', 'SUMMIT', 'CONSULTATION');

create table news_articles (
  id uuid primary key default gen_random_uuid(),
  date timestamptz not null,
  title text not null,
  excerpt text not null,
  category news_category not null,
  read_min integer not null default 3,
  live boolean not null default false,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index news_articles_date_idx on news_articles (date desc);

create table events (
  id uuid primary key default gen_random_uuid(),
  date timestamptz not null,
  time text not null,
  title text not null,
  location text not null,
  lga text not null,
  type event_type not null,
  featured boolean not null default false,
  note text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index events_date_idx on events (date asc);

create table policies (
  id uuid primary key default gen_random_uuid(),
  "order" integer not null default 0,
  title text not null,
  tagline text not null,
  summary text not null,
  commitments text[] not null default '{}',
  impact text not null,
  accent_color text not null default '#008B4D',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index policies_order_idx on policies ("order" asc);

create table endorsements (
  id uuid primary key default gen_random_uuid(),
  "order" integer not null default 0,
  quote text not null,
  name text not null,
  role text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index endorsements_order_idx on endorsements ("order" asc);

create table media (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  label text,
  created_at timestamptz not null default now()
);

create table site_settings (
  id integer primary key default 1,
  candidate_full_name text not null default 'Alhaji Abdulhameed Oluwafemi Omotayo',
  known_as text not null default 'Omoowo',
  hero_headline_line1 text not null default 'Alhaji Omoowo',
  hero_headline_line2 text not null default 'Omotayo.',
  hero_subtitle text not null default 'PDP · Ogun East Senatorial District · 2027',
  hero_body text not null default 'Bringing experienced, community-driven leadership to the National Assembly for the people of Ogun East.',
  hero_image_url text not null default '',
  candidate_bio text[] not null default '{}',
  candidate_image_url text not null default '',
  profile_bio text[] not null default '{}',
  profile_image_url text not null default '',
  contact_office_address text not null default 'Ijebu-Ode, Ogun State',
  contact_email text not null default 'contact@omoowo2027.ng',
  contact_whatsapp text not null default '+234 800 000 0000',
  whatsapp_share_message text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_settings_single_row check (id = 1)
);

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index contact_messages_created_idx on contact_messages (created_at desc);

create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
create index newsletter_subscribers_created_idx on newsletter_subscribers (created_at desc);

-- Row Level Security: locked down by default. The app talks to Supabase using the
-- service role key from server-only code (API routes / server components), which
-- bypasses RLS entirely, so no policies are required for the admin panel or public
-- pages to function. This just prevents any accidental anon/public access.
alter table news_articles enable row level security;
alter table events enable row level security;
alter table policies enable row level security;
alter table endorsements enable row level security;
alter table media enable row level security;
alter table site_settings enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;
