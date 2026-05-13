import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { TablesUpdate } from "@/integrations/supabase/types";
import { bridge } from "@/lib/chamfeuil-bridge";

const PRIMARY_ACCOUNT_NAME = "Compte principal";

function deriveUserDetails(user: User) {
  const metadata = user.user_metadata ?? {};
  const fullName = typeof metadata.full_name === "string"
    ? metadata.full_name.trim()
    : typeof metadata.name === "string"
      ? metadata.name.trim()
      : "";
  const nameParts = fullName ? fullName.split(/\s+/) : [];

  const firstName = typeof metadata.first_name === "string"
    ? metadata.first_name.trim()
    : typeof metadata.given_name === "string"
      ? metadata.given_name.trim()
      : nameParts[0] ?? "";

  const lastName = typeof metadata.last_name === "string"
    ? metadata.last_name.trim()
    : typeof metadata.family_name === "string"
      ? metadata.family_name.trim()
      : nameParts.slice(1).join(" ");

  const phone = typeof metadata.phone === "string" ? metadata.phone.trim() : "";
  const accountType = typeof metadata.account_type === "string" ? metadata.account_type : "particulier";

  return {
    firstName: firstName || null,
    lastName: lastName || null,
    phone: phone || null,
    accountType,
  };
}

export async function ensureUserWorkspace(user: User) {
  const details = deriveUserDetails(user);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, phone, account_type")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError) throw profileError;

  if (!profile) {
    const { error } = await supabase.from("profiles").insert({
      user_id: user.id,
      first_name: details.firstName,
      last_name: details.lastName,
      phone: details.phone,
      account_type: details.accountType,
    });

    if (error) throw error;
  } else {
    const profilePatch: TablesUpdate<"profiles"> = {};

    if (!profile.first_name && details.firstName) profilePatch.first_name = details.firstName;
    if (!profile.last_name && details.lastName) profilePatch.last_name = details.lastName;
    if (!profile.phone && details.phone) profilePatch.phone = details.phone;
    if (!profile.account_type && details.accountType) profilePatch.account_type = details.accountType;

    if (Object.keys(profilePatch).length > 0) {
      const { error } = await supabase.from("profiles").update(profilePatch).eq("user_id", user.id);
      if (error) throw error;
    }
  }

  const { data: accounts, error: accountsError } = await supabase
    .from("accounts")
    .select("id, is_primary")
    .eq("user_id", user.id);

  if (accountsError) throw accountsError;

  const hasPrimaryAccount = (accounts ?? []).some((account) => account.is_primary);

  if (!hasPrimaryAccount) {
    const { error } = await supabase.from("accounts").insert({
      user_id: user.id,
      name: PRIMARY_ACCOUNT_NAME,
      is_primary: true,
      sort_order: 0,
    });

    if (error) throw error;
  }

  // Safety-net signup sync — covers legacy users created before the bridge
  // was wired. Idempotent on the Chamfeuil side (upsert by user_id+env).
  // Fire-and-forget — never blocks the user session bootstrap.
  bridge.signup({
    first_name: details.firstName ?? undefined,
    last_name: details.lastName ?? undefined,
    phone: details.phone ?? undefined,
  });
}