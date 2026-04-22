CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, phone, account_type)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'first_name', ''),
      NULLIF(NEW.raw_user_meta_data->>'given_name', ''),
      split_part(COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''), ' ', 1)
    ),
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'last_name', ''),
      NULLIF(NEW.raw_user_meta_data->>'family_name', ''),
      NULLIF(
        btrim(
          regexp_replace(
            COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
            '^\S+\s*',
            ''
          )
        ),
        ''
      )
    ),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'phone', ''), ''),
    COALESCE(NULLIF(NEW.raw_user_meta_data->>'account_type', ''), 'particulier')
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.create_primary_account()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.accounts (user_id, name, is_primary, sort_order)
  VALUES (NEW.user_id, 'Compte principal', true, 0)
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS create_primary_account_for_profile ON public.profiles;
CREATE TRIGGER create_primary_account_for_profile
AFTER INSERT ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.create_primary_account();

CREATE UNIQUE INDEX IF NOT EXISTS accounts_one_primary_per_user_idx
ON public.accounts (user_id)
WHERE is_primary = true;

INSERT INTO public.profiles (user_id, first_name, last_name, phone, account_type)
SELECT
  u.id,
  COALESCE(
    NULLIF(u.raw_user_meta_data->>'first_name', ''),
    NULLIF(u.raw_user_meta_data->>'given_name', ''),
    split_part(COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''), ' ', 1)
  ),
  COALESCE(
    NULLIF(u.raw_user_meta_data->>'last_name', ''),
    NULLIF(u.raw_user_meta_data->>'family_name', ''),
    NULLIF(
      btrim(
        regexp_replace(
          COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''),
          '^\S+\s*',
          ''
        )
      ),
      ''
    )
  ),
  COALESCE(NULLIF(u.raw_user_meta_data->>'phone', ''), ''),
  COALESCE(NULLIF(u.raw_user_meta_data->>'account_type', ''), 'particulier')
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id = u.id
WHERE p.user_id IS NULL;

INSERT INTO public.accounts (user_id, name, is_primary, sort_order)
SELECT p.user_id, 'Compte principal', true, 0
FROM public.profiles p
LEFT JOIN public.accounts a
  ON a.user_id = p.user_id
 AND a.is_primary = true
WHERE a.id IS NULL;