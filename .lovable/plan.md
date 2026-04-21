

## Persist onboarding data into the user's profile

**Problem today**
- The signup form only asks for email + password — no name fields, so `profiles.first_name` / `last_name` stay empty.
- `StageIndividual` and `StageCorporate` collect rich data (address, tax, profession, wealth, funds, company info…) but never write it to the database — `onNext` just hands the data up and `OpenAccount.tsx` discards it.
- As a result, **Paramètres de compte** shows "—" everywhere and the dashboard greets a nameless user.
- The `accounts` table + `create_primary_account` trigger already auto-create "Compte principal" on profile insert, and `AccountSwitcherPopover` already supports rename / add — that part is wired and stays as-is.

---

### 1. Capture name at signup (`StageEmailVerification.tsx`)

Add **First name** and **Last name** inputs above the email field. Pass them through Supabase signup metadata so the existing `handle_new_user` trigger writes them to `profiles`:

```ts
supabase.auth.signUp({
  email, password,
  options: {
    emailRedirectTo: ...,
    data: { first_name, last_name },   // picked up by handle_new_user trigger
  },
});
```

Update the Zod schema to require both names (1–100 chars, trimmed).

### 2. New hook `useUpdateProfile` (`src/hooks/useProfile.ts`)

A small mutation that updates the current user's profile row and invalidates the `["profile"]` query — reused by onboarding stages and `AccountSettings`.

### 3. Persist Individual onboarding (`StageIndividual.tsx`)

On the final "Valider" click, before calling `onNext`, write to the database:

- **`profiles`** (UPDATE): `address`, `city`, `postal_code`, `country`, `tax_country` (= `country` if `taxFrance`, else `taxCountry`), `tax_id`, `account_type = 'particulier'`.
- **`onboarding_details`** (INSERT, new table — see §5): `sector`, `income_band`, `wealth_band`, `planned_deposit`, `funds_origin`, `referral_source`.

Show a toast on error and block navigation; on success continue to KYC.

### 4. Persist Corporate onboarding (`StageCorporate.tsx`)

Same idea on final step:

- **`profiles`** (UPDATE): address fields from `orgAddress/orgCity/orgPostalCode/orgCountry`, `account_type = 'moral'`.
- **`onboarding_details`** (INSERT): `legal_name`, `legal_form`, `siren`, `entity_type`, `activity_sector`, `planned_deposit`, `funds_origin`, `referral_source`.
- File uploads stay client-side for now (no storage bucket exists yet) — flagged as a follow-up.

### 5. Database migration — new `onboarding_details` table

```sql
create table public.onboarding_details (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  account_type text not null,            -- 'particulier' | 'moral'
  -- individual
  sector text, income_band text,
  wealth_band text, planned_deposit text,
  funds_origin text, referral_source text,
  -- corporate
  legal_name text, legal_form text, siren text,
  entity_type text, activity_sector text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.onboarding_details enable row level security;

create policy "Users view own onboarding"   on public.onboarding_details
  for select using (auth.uid() = user_id);
create policy "Users insert own onboarding" on public.onboarding_details
  for insert with check (auth.uid() = user_id);
create policy "Users update own onboarding" on public.onboarding_details
  for update using (auth.uid() = user_id);

create trigger onboarding_details_updated_at
  before update on public.onboarding_details
  for each row execute function public.update_updated_at_column();
```

### 6. Surface in `Paramètres de compte` (`AccountSettings.tsx`)

- The existing **Titulaire** and **Résidence fiscale** cards already render `profile.*` — they will auto-populate once §1–§3 land. No change needed beyond adding a small "Nom complet" display row at the top.
- Add a new **Profil financier** card (read-only, "Modifier" reuses same edit toggle) backed by a sibling hook `useOnboardingDetails()`:
  - Particulier: Secteur, Revenu, Patrimoine, Dépôt prévu, Origine des fonds.
  - Moral: Raison sociale, SIREN, Forme juridique, Type d'entité, Secteur, Source des fonds.
- Card is rendered conditionally based on `account_type`.

### 7. Personalize the dashboard greeting

In `Dashboard.tsx`, replace the static welcome with `Bonjour, {profile.first_name}` using `useProfile()`. (Quick one-line change — confirms the data round-trip visually.)

### Account switcher / "Compte principal"

Already in place: trigger creates it on profile insert, `AccountSwitcherPopover` lets users rename non-primary accounts and add new ones. **No changes needed.** This plan only ensures profiles get created with real names so the popover header reads correctly.

---

### Files touched

- `src/components/onboarding/StageEmailVerification.tsx` — add name fields + metadata
- `src/components/onboarding/StageIndividual.tsx` — persist on submit
- `src/components/onboarding/StageCorporate.tsx` — persist on submit
- `src/hooks/useProfile.ts` — add `useUpdateProfile` + `useOnboardingDetails` hooks
- `src/pages/AccountSettings.tsx` — new "Profil financier" card
- `src/pages/Dashboard.tsx` — personalized greeting
- New migration: `onboarding_details` table + RLS

### Out of scope (flagged for later)

- Uploading corporate documents to a storage bucket (currently kept in memory).
- Bank account CRUD in Settings (the "Ajouter un compte bancaire" button stays a stub).

