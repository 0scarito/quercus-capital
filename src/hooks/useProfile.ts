import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export interface Profile {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  account_type: string | null;
  tax_country: string | null;
  tax_id: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
  onboarding_completed: boolean;
}

export function useProfile() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<Profile | null> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
  });
}

export interface OnboardingDetails {
  id: string;
  user_id: string;
  account_type: string;
  sector: string | null;
  income_band: string | null;
  wealth_band: string | null;
  planned_deposit: string | null;
  funds_origin: string | null;
  referral_source: string | null;
  legal_name: string | null;
  legal_form: string | null;
  siren: string | null;
  entity_type: string | null;
  activity_sector: string | null;
}

export function useOnboardingDetails() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["onboarding_details", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<OnboardingDetails | null> => {
      const { data, error } = await supabase
        .from("onboarding_details")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data as OnboardingDetails | null;
    },
  });
}
