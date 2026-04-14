ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tax_country text DEFAULT 'France',
ADD COLUMN IF NOT EXISTS tax_id text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS postal_code text,
ADD COLUMN IF NOT EXISTS country text DEFAULT 'France';