ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;

-- Backfill: anyone who already filled in their address is treated as onboarded
UPDATE public.profiles
SET onboarding_completed = true
WHERE address IS NOT NULL AND address <> '';