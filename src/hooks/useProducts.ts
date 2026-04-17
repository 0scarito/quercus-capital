import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  currency: string;
  yield_rate: number;
  product_type: string;
  sort_order: number;
}

export interface UserSubscription {
  id: string;
  product_id: string;
  account_id: string;
  amount: number;
  status: string;
  subscribed_at: string;
  product: Product;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Product[];
    },
  });
}

export function useUserSubscriptions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_subscriptions", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<UserSubscription[]> => {
      const { data, error } = await supabase
        .from("user_subscriptions")
        .select("id, product_id, account_id, amount, status, subscribed_at, product:products(*)")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []) as unknown as UserSubscription[];
    },
  });
}
