import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export interface Integration {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  is_available: boolean;
  sort_order: number;
}

export interface UserIntegration {
  id: string;
  integration_id: string;
  status: string;
  connected_at: string;
}

export function useIntegrations() {
  return useQuery({
    queryKey: ["integrations"],
    queryFn: async (): Promise<Integration[]> => {
      const { data, error } = await supabase
        .from("integrations")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Integration[];
    },
  });
}

export function useUserIntegrations() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_integrations", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<UserIntegration[]> => {
      const { data, error } = await supabase
        .from("user_integrations")
        .select("id, integration_id, status, connected_at")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []) as UserIntegration[];
    },
  });
}
