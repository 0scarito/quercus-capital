ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS proof_of_address_uploaded boolean NOT NULL DEFAULT false;