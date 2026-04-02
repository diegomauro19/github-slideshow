-- ============================================================================
-- Lumen Command Center - Initial Database Schema
-- ============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

create type essay_status as enum (
  'idea', 'research', 'drafting', 'editing', 'ready', 'published'
);

create type insight_status as enum (
  'captured', 'developing', 'mature', 'archived'
);

create type insight_source as enum (
  'conversation', 'research', 'reflection', 'external'
);

create type research_session_status as enum (
  'active', 'paused', 'completed', 'abandoned'
);

create type wargame_session_status as enum (
  'setup', 'active', 'paused', 'completed', 'archived'
);

create type wargame_move_type as enum (
  'action', 'reaction', 'analysis', 'escalation', 'de-escalation'
);

create type calendar_item_status as enum (
  'planned', 'in-progress', 'ready', 'published', 'skipped'
);

create type content_type as enum (
  'essay', 'newsletter', 'thread', 'short-form', 'video-script'
);

create type growth_action_status as enum (
  'planned', 'in-progress', 'completed', 'cancelled'
);

create type growth_action_category as enum (
  'content', 'outreach', 'collaboration', 'paid', 'seo', 'community'
);

create type ai_operation_status as enum (
  'pending', 'running', 'completed', 'failed'
);

create type ai_operation_type as enum (
  'essay-draft', 'research-synthesis', 'insight-extraction',
  'wargame-analysis', 'editorial-planning', 'growth-recommendation'
);

-- ============================================================================
-- TABLES
-- ============================================================================

-- Essays
create table essays (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subtitle text,
  slug text unique,
  status essay_status not null default 'idea',
  content text,
  summary text,
  thesis text,
  tags text[] not null default '{}',
  word_count integer not null default 0,
  target_word_count integer,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Insights
create table insights (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text not null,
  source insight_source not null default 'reflection',
  status insight_status not null default 'captured',
  tags text[] not null default '{}',
  connections text[] not null default '{}',
  essay_id uuid references essays(id) on delete set null,
  strength integer not null default 50 check (strength >= 0 and strength <= 100),
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Research Sessions
create table research_sessions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  topic text not null,
  status research_session_status not null default 'active',
  notes text,
  sources jsonb not null default '[]',
  findings text[] not null default '{}',
  essay_id uuid references essays(id) on delete set null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Wargame Sessions
create table wargame_sessions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  scenario text not null,
  status wargame_session_status not null default 'setup',
  participants jsonb not null default '[]',
  objectives text[] not null default '{}',
  summary text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Wargame Moves
create table wargame_moves (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references wargame_sessions(id) on delete cascade,
  participant text not null,
  move_type wargame_move_type not null,
  content text not null,
  rationale text,
  impact_assessment text,
  move_number integer not null,
  created_at timestamptz not null default now()
);

-- Editorial Calendar
create table editorial_calendar (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content_type content_type not null default 'essay',
  status calendar_item_status not null default 'planned',
  scheduled_date date,
  published_date date,
  essay_id uuid references essays(id) on delete set null,
  description text,
  tags text[] not null default '{}',
  platform text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Subscriber Snapshots
create table subscriber_snapshots (
  id uuid primary key default uuid_generate_v4(),
  date date not null unique,
  total_subscribers integer not null default 0,
  new_subscribers integer not null default 0,
  churned_subscribers integer not null default 0,
  open_rate numeric(5,2),
  click_rate numeric(5,2),
  source_breakdown jsonb,
  created_at timestamptz not null default now()
);

-- Growth Actions
create table growth_actions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  category growth_action_category not null,
  status growth_action_status not null default 'planned',
  priority integer not null default 5 check (priority >= 1 and priority <= 10),
  impact_estimate text,
  effort_estimate text,
  due_date date,
  completed_at timestamptz,
  results text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- C-Suite Targets
create table csuite_targets (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  title text not null,
  company text not null,
  industry text,
  linkedin_url text,
  email text,
  notes text,
  engagement_status text not null default 'identified',
  last_contacted_at timestamptz,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- AI Operations
create table ai_operations (
  id uuid primary key default uuid_generate_v4(),
  operation_type ai_operation_type not null,
  status ai_operation_status not null default 'pending',
  input jsonb not null default '{}',
  output jsonb,
  error text,
  model text not null,
  tokens_used integer,
  cost_cents integer,
  duration_ms integer,
  triggered_by text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Essays
create index idx_essays_status on essays(status);
create index idx_essays_published_at on essays(published_at desc nulls last);
create index idx_essays_tags on essays using gin(tags);

-- Insights
create index idx_insights_status on insights(status);
create index idx_insights_source on insights(source);
create index idx_insights_essay_id on insights(essay_id);
create index idx_insights_tags on insights using gin(tags);
create index idx_insights_strength on insights(strength desc);
create index idx_insights_embedding on insights using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Research Sessions
create index idx_research_sessions_status on research_sessions(status);
create index idx_research_sessions_essay_id on research_sessions(essay_id);

-- Wargame Sessions
create index idx_wargame_sessions_status on wargame_sessions(status);

-- Wargame Moves
create index idx_wargame_moves_session_id on wargame_moves(session_id);
create index idx_wargame_moves_session_number on wargame_moves(session_id, move_number);

-- Editorial Calendar
create index idx_editorial_calendar_status on editorial_calendar(status);
create index idx_editorial_calendar_scheduled on editorial_calendar(scheduled_date);
create index idx_editorial_calendar_essay_id on editorial_calendar(essay_id);

-- Subscriber Snapshots
create index idx_subscriber_snapshots_date on subscriber_snapshots(date desc);

-- Growth Actions
create index idx_growth_actions_status on growth_actions(status);
create index idx_growth_actions_category on growth_actions(category);
create index idx_growth_actions_priority on growth_actions(priority);

-- C-Suite Targets
create index idx_csuite_targets_company on csuite_targets(company);
create index idx_csuite_targets_engagement on csuite_targets(engagement_status);
create index idx_csuite_targets_tags on csuite_targets using gin(tags);

-- AI Operations
create index idx_ai_operations_type on ai_operations(operation_type);
create index idx_ai_operations_status on ai_operations(status);
create index idx_ai_operations_created on ai_operations(created_at desc);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
alter table essays enable row level security;
alter table insights enable row level security;
alter table research_sessions enable row level security;
alter table wargame_sessions enable row level security;
alter table wargame_moves enable row level security;
alter table editorial_calendar enable row level security;
alter table subscriber_snapshots enable row level security;
alter table growth_actions enable row level security;
alter table csuite_targets enable row level security;
alter table ai_operations enable row level security;

-- Single-user setup: allow all operations for authenticated users
create policy "Allow all for authenticated users" on essays
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on insights
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on research_sessions
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on wargame_sessions
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on wargame_moves
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on editorial_calendar
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on subscriber_snapshots
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on growth_actions
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on csuite_targets
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow all for authenticated users" on ai_operations
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Also allow service_role to bypass RLS (used by server-side client)
-- Note: service_role bypasses RLS by default in Supabase, no policy needed.

-- ============================================================================
-- UPDATED_AT TRIGGER
-- ============================================================================

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on essays
  for each row execute function update_updated_at_column();

create trigger set_updated_at before update on insights
  for each row execute function update_updated_at_column();

create trigger set_updated_at before update on research_sessions
  for each row execute function update_updated_at_column();

create trigger set_updated_at before update on wargame_sessions
  for each row execute function update_updated_at_column();

create trigger set_updated_at before update on editorial_calendar
  for each row execute function update_updated_at_column();

create trigger set_updated_at before update on growth_actions
  for each row execute function update_updated_at_column();

create trigger set_updated_at before update on csuite_targets
  for each row execute function update_updated_at_column();
