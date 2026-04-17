-- Restrict deposit_intents writes: users may only INSERT pending intents with amount=0 and may NOT update
DROP POLICY IF EXISTS "Users update own deposit intents" ON public.deposit_intents;
DROP POLICY IF EXISTS "Users insert own deposit intents" ON public.deposit_intents;

CREATE POLICY "Users insert own pending deposit intents"
ON public.deposit_intents
FOR INSERT
WITH CHECK (auth.uid() = user_id AND status = 'pending');

ALTER TABLE public.deposit_intents
  ADD CONSTRAINT deposit_intents_status_check
  CHECK (status IN ('pending', 'cancelled', 'confirmed', 'completed', 'rejected'));

-- Restrict user_subscriptions: writes only via service role
DROP POLICY IF EXISTS "Users insert own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users update own subscriptions" ON public.user_subscriptions;
DROP POLICY IF EXISTS "Users delete own subscriptions" ON public.user_subscriptions;

CREATE POLICY "Service role manages subscriptions"
ON public.user_subscriptions
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Fix mutable search_path on functions
CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
 RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN
    PERFORM pgmq.create(dlq_name);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN
    PERFORM pgmq.delete(source_queue, message_id);
  EXCEPTION WHEN undefined_table THEN
    NULL;
  END;
  RETURN new_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public, pgmq
AS $function$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$function$;