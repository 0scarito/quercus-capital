-- Create accounts table for user sub-accounts (Compte principal, etc.)
CREATE TABLE public.accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own accounts" ON public.accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own accounts" ON public.accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own accounts" ON public.accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own accounts" ON public.accounts FOR DELETE USING (auth.uid() = user_id AND is_primary = false);

CREATE TRIGGER update_accounts_updated_at
BEFORE UPDATE ON public.accounts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create primary account on profile creation
CREATE OR REPLACE FUNCTION public.create_primary_account()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.accounts (user_id, name, is_primary, sort_order)
  VALUES (NEW.user_id, 'Compte principal', true, 0)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_profile_created_create_account
AFTER INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.create_primary_account();

-- Backfill primary account for existing profiles
INSERT INTO public.accounts (user_id, name, is_primary, sort_order)
SELECT user_id, 'Compte principal', true, 0 FROM public.profiles
ON CONFLICT DO NOTHING;

-- Add account_id to user_subscriptions
ALTER TABLE public.user_subscriptions ADD COLUMN account_id UUID;

-- Backfill account_id with primary account
UPDATE public.user_subscriptions us
SET account_id = (SELECT id FROM public.accounts WHERE user_id = us.user_id AND is_primary = true LIMIT 1)
WHERE account_id IS NULL;

ALTER TABLE public.user_subscriptions ALTER COLUMN account_id SET NOT NULL;

-- Deposit intents table for the multi-step deposit flow
CREATE TABLE public.deposit_intents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  account_id UUID NOT NULL,
  product_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  reference TEXT NOT NULL DEFAULT upper(substr(replace(gen_random_uuid()::text,'-',''),1,10)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.deposit_intents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own deposit intents" ON public.deposit_intents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own deposit intents" ON public.deposit_intents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own deposit intents" ON public.deposit_intents FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_deposit_intents_updated_at
BEFORE UPDATE ON public.deposit_intents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();