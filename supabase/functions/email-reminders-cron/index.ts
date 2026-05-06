// Daily reminder cron — scans profiles and enqueues two reminder emails:
//   1. Deposit reminder: onboarding completed >= 2 days ago AND no
//      active subscription with amount > 0.
//   2. Address verification reminder: onboarding completed >= 7 days ago
//      AND proof_of_address_uploaded = false.
// Idempotency keys are derived from user_id, so each user only ever
// receives one of each reminder regardless of how many times this runs.

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Auth check: only allow callers with the service-role key (used by pg_cron / admins).
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const authHeader = req.headers.get('Authorization') ?? ''
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!serviceKey || bearer !== serviceKey) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const now = new Date()
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

  let depositSent = 0
  let addressSent = 0
  let skipped = 0

  // ---- 1. Deposit reminder candidates ----
  // Profiles whose onboarding finished >= 2 days ago.
  const { data: depositCandidates, error: depositErr } = await supabase
    .from('profiles')
    .select('user_id, first_name, updated_at')
    .eq('onboarding_completed', true)
    .lte('updated_at', twoDaysAgo)

  if (depositErr) {
    console.error('Failed to query deposit candidates', depositErr)
  } else {
    for (const p of depositCandidates ?? []) {
      // Skip if user already has a funded subscription
      const { data: subs } = await supabase
        .from('user_subscriptions')
        .select('id')
        .eq('user_id', p.user_id)
        .gt('amount', 0)
        .limit(1)
      if (subs && subs.length > 0) { skipped++; continue }

      const email = await getUserEmail(supabase, p.user_id)
      if (!email) { skipped++; continue }

      const { error: invokeErr } = await supabase.functions.invoke(
        'send-transactional-email',
        {
          body: {
            templateName: 'deposit-reminder',
            recipientEmail: email,
            idempotencyKey: `deposit-reminder-${p.user_id}`,
            templateData: { firstName: p.first_name ?? undefined },
          },
        },
      )
      if (invokeErr) {
        console.warn('deposit-reminder invoke failed', { user: p.user_id, err: invokeErr })
      } else {
        depositSent++
      }
    }
  }

  // ---- 2. Address verification reminder candidates ----
  const { data: addressCandidates, error: addressErr } = await supabase
    .from('profiles')
    .select('user_id, first_name, updated_at')
    .eq('onboarding_completed', true)
    .eq('proof_of_address_uploaded', false)
    .lte('updated_at', sevenDaysAgo)

  if (addressErr) {
    console.error('Failed to query address candidates', addressErr)
  } else {
    for (const p of addressCandidates ?? []) {
      const email = await getUserEmail(supabase, p.user_id)
      if (!email) { skipped++; continue }

      const { error: invokeErr } = await supabase.functions.invoke(
        'send-transactional-email',
        {
          body: {
            templateName: 'address-verification-reminder',
            recipientEmail: email,
            idempotencyKey: `address-verif-reminder-${p.user_id}`,
            templateData: { firstName: p.first_name ?? undefined },
          },
        },
      )
      if (invokeErr) {
        console.warn('address-verif-reminder invoke failed', { user: p.user_id, err: invokeErr })
      } else {
        addressSent++
      }
    }
  }

  return new Response(
    JSON.stringify({ depositSent, addressSent, skipped }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  )
})

async function getUserEmail(
  supabase: ReturnType<typeof createClient>,
  userId: string,
): Promise<string | null> {
  const { data, error } = await supabase.auth.admin.getUserById(userId)
  if (error || !data?.user?.email) return null
  return data.user.email
}