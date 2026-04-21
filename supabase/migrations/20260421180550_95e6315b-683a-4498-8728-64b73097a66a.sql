create table public.onboarding_details (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  account_type text not null,
  sector text,
  income_band text,
  wealth_band text,
  planned_deposit text,
  funds_origin text,
  referral_source text,
  legal_name text,
  legal_form text,
  siren text,
  entity_type text,
  activity_sector text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.onboarding_details enable row level security;

create policy "Users view own onboarding" on public.onboarding_details
  for select using (auth.uid() = user_id);

create policy "Users insert own onboarding" on public.onboarding_details
  for insert with check (auth.uid() = user_id);

create policy "Users update own onboarding" on public.onboarding_details
  for update using (auth.uid() = user_id);

create trigger onboarding_details_updated_at
  before update on public.onboarding_details
  for each row execute function public.update_updated_at_column();