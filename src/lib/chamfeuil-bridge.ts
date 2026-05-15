// ============================================================================
// chamfeuil-bridge — frontend helper that syncs Quercus events to the
// Chamfeuil KYC admin's view of the user.
// ============================================================================
//
// Single-DB architecture (since 2026-05-13): the Quercus website and the
// Chamfeuil KYC admin share ONE Supabase project (`ppjniitilienzugeeyfe`).
// The bridge calls SECURITY DEFINER RPCs directly via `sb.rpc()` —
// no Edge Function, no service-role key, no HTTP plumbing. RPCs enforce
// `caller=user_id` server-side so a user can only log their own activity.
//
// Every call is fire-and-forget — the bridge must NEVER block or break a
// user-facing flow. If a sync RPC errors (e.g. kyc_clients row not yet
// created), the worst that happens is a CGP admin sees stale data. The
// retail user notices nothing.
//
// Usage:
//   import { bridge } from "@/lib/chamfeuil-bridge";
//   bridge.signup({ first_name, last_name });   // after supabase.auth.signUp
//   bridge.login();                              // after signInWithPassword
//   bridge.kycComplete({ first_name, address, ... }); // StageKYC confirm
//   bridge.depositIntent({ product_id, ... });   // DepositModal confirm
//   bridge.investmentPurchased({ fund_code, amount_invested, ... });
//   bridge.profileUpdated({ phone });
//   bridge.fundView({ fund_slug });              // generic activity log
//
// All methods return Promise<void> and swallow errors (logged to console).
// ============================================================================

import { supabase } from "@/integrations/supabase/client";
// RPCs below are defined in the shared Chamfeuil DB but absent from the
// generated Supabase types. Cast to any to bypass the typed RPC name union.
const sb = supabase as unknown as {
  rpc: (fn: string, args?: Record<string, unknown>) => Promise<{ data: unknown; error: { message: string } | null }>;
  auth: typeof supabase.auth;
};

type BridgeMethod =
  | "signup"
  | "login"
  | "logout"
  | "kyc_complete"
  | "profile_updated"
  | "document_uploaded"
  | "investment_purchased"
  | "investment_sold"
  | "deposit_intent"
  | "fund_view"
  | "activity";

async function currentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}

function warnFail(method: BridgeMethod, error: unknown) {
  const msg = error instanceof Error ? error.message : String(error);
  console.warn(`[bridge] ${method} failed: ${msg}`);
}

async function rpcOrSkip<T = unknown>(
  method: BridgeMethod,
  fn: () => Promise<{ data: T | null; error: { message: string } | null }>
): Promise<T | null> {
  try {
    const { data, error } = await fn();
    if (error) {
      warnFail(method, error);
      return null;
    }
    return data ?? null;
  } catch (e) {
    warnFail(method, e);
    return null;
  }
}

export const bridge = {
  /** Call right after a successful supabase.auth.signUp({...}). */
  async signup(data: { first_name?: string; last_name?: string; phone?: string }) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("signup", () =>
      sb.rpc("quercus_sync_signup", {
        p_user_id:    u.id,
        p_email:      u.email ?? "",
        p_first_name: data.first_name ?? (u.user_metadata?.first_name as string) ?? "",
        p_last_name:  data.last_name  ?? (u.user_metadata?.last_name  as string) ?? "",
        p_phone:      data.phone      ?? (u.user_metadata?.phone      as string) ?? "",
      })
    );
  },

  /** Call after signInWithPassword / OAuth completes. */
  async login(data?: Record<string, unknown>) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("login", () =>
      sb.rpc("quercus_log_activity", {
        p_user_id:     u.id,
        p_action_type: "login",
        p_description: null,
        p_metadata:    (data as Record<string, unknown>) ?? {},
      })
    );
  },

  /** Call right before supabase.auth.signOut. */
  async logout(data?: Record<string, unknown>) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("logout", () =>
      sb.rpc("quercus_log_activity", {
        p_user_id:     u.id,
        p_action_type: "logout",
        p_description: null,
        p_metadata:    (data as Record<string, unknown>) ?? {},
      })
    );
  },

  /** Call after StageKYC.handleConfirm() finishes writing to profiles. */
  async kycComplete(data: {
    first_name?: string;
    last_name?: string;
    date_of_birth?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    tax_country?: string;
    tax_id?: string;
    metadata?: Record<string, unknown>;
  }) {
    const u = await currentUser();
    if (!u) return;
    // Two RPCs in parallel: sync the structured profile fields + log the milestone.
    void rpcOrSkip("profile_updated", () =>
      sb.rpc("quercus_sync_profile", {
        p_user_id:       u.id,
        p_first_name:    data.first_name    ?? null,
        p_last_name:     data.last_name     ?? null,
        p_phone:         null,
        p_date_of_birth: data.date_of_birth ?? null,
        p_address:       data.address       ?? null,
        p_city:          data.city          ?? null,
        p_postal_code:   data.postal_code   ?? null,
        p_country:       data.country       ?? null,
        p_tax_country:   data.tax_country   ?? null,
        p_tax_id:        data.tax_id        ?? null,
      })
    );
    void rpcOrSkip("kyc_complete", () =>
      sb.rpc("quercus_sync_kyc_complete", {
        p_user_id:  u.id,
        p_metadata: data.metadata ?? {},
      })
    );
  },

  /** Call after any profile UPDATE (AccountSettings, onboarding stages, etc). */
  async profileUpdated(data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    date_of_birth?: string;
    address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
    tax_country?: string;
    tax_id?: string;
  }) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("profile_updated", () =>
      sb.rpc("quercus_sync_profile", {
        p_user_id:       u.id,
        p_first_name:    data.first_name    ?? null,
        p_last_name:     data.last_name     ?? null,
        p_phone:         data.phone         ?? null,
        p_date_of_birth: data.date_of_birth ?? null,
        p_address:       data.address       ?? null,
        p_city:          data.city          ?? null,
        p_postal_code:   data.postal_code   ?? null,
        p_country:       data.country       ?? null,
        p_tax_country:   data.tax_country   ?? null,
        p_tax_id:        data.tax_id        ?? null,
      })
    );
    void rpcOrSkip("activity", () =>
      sb.rpc("quercus_log_activity", {
        p_user_id:     u.id,
        p_action_type: "profile_updated",
        p_description: "Profil mis à jour",
        p_metadata:    { fields: Object.keys(data) },
      })
    );
  },

  /** Call when the user clicks "I have made the transfer" — deposit_intent row created. */
  async depositIntent(data: {
    product_id: string;
    product_name?: string;
    reference?: string;
    amount?: number;
  }) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("deposit_intent", () =>
      sb.rpc("quercus_log_deposit_intent", {
        p_user_id:      u.id,
        p_product_id:   data.product_id,
        p_product_name: data.product_name ?? null,
        p_reference:    data.reference    ?? null,
        p_amount:       data.amount       ?? null,
      })
    );
  },

  /** Call when an admin / cron confirms the wire arrived and writes user_subscriptions. */
  async investmentPurchased(data: {
    fund_code: string;
    fund_name?: string;
    partner?: string;
    amount_invested: number;
    units_held?: number;
    nav_at_purchase?: number;
    current_nav?: number;
    status?: string;
    purchased_at?: string;
    subscription_id?: string;
    metadata?: Record<string, unknown>;
  }) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("investment_purchased", () =>
      sb.rpc("quercus_sync_subscription", {
        p_user_id:         u.id,
        p_fund_code:       data.fund_code,
        p_fund_name:       data.fund_name       ?? null,
        p_partner:         data.partner         ?? null,
        p_amount_invested: data.amount_invested ?? 0,
        p_units_held:      data.units_held      ?? null,
        p_nav_at_purchase: data.nav_at_purchase ?? null,
        p_current_nav:     data.current_nav     ?? null,
        p_status:          data.status          ?? "active",
        p_purchased_at:    data.purchased_at    ?? new Date().toISOString(),
        p_subscription_id: data.subscription_id ?? null,
        p_metadata:        data.metadata        ?? {},
      })
    );
  },

  /** Call on partial / total redemption. */
  async investmentSold(data: { fund_code: string; amount?: number }) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("investment_sold", () =>
      sb.rpc("quercus_log_activity", {
        p_user_id:     u.id,
        p_action_type: "investment_sold",
        p_description: `Vente ${data.fund_code}`,
        p_metadata:    data,
      })
    );
  },

  /** Call when a user uploads a doc (proof of address, etc.). */
  async documentUploaded(data: { document_type: string; filename?: string }) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("document_uploaded", () =>
      sb.rpc("quercus_log_activity", {
        p_user_id:     u.id,
        p_action_type: "document_uploaded",
        p_description: `Document uploadé : ${data.document_type}`,
        p_metadata:    data,
      })
    );
  },

  /** Call when an authenticated user opens a fund detail page. */
  async fundView(data: { fund_slug: string; fund_name?: string }) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("fund_view", () =>
      sb.rpc("quercus_log_activity", {
        p_user_id:     u.id,
        p_action_type: "fund_view",
        p_description: `Consultation ${data.fund_name ?? data.fund_slug}`,
        p_metadata:    data,
      })
    );
  },

  /** Catch-all for any custom activity not covered above. */
  async activity(action_type: string, description?: string, metadata?: Record<string, unknown>) {
    const u = await currentUser();
    if (!u) return;
    void rpcOrSkip("activity", () =>
      sb.rpc("quercus_log_activity", {
        p_user_id:     u.id,
        p_action_type: action_type,
        p_description: description ?? null,
        p_metadata:    metadata    ?? {},
      })
    );
  },
};
