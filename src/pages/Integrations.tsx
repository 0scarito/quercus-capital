import { Loader2, Check, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useIntegrations, useUserIntegrations } from "@/hooks/useIntegrations";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Integrations() {
  const { t } = useTranslation("dashboard");
  const { user } = useAuth();
  const { data: integrations, isLoading } = useIntegrations();
  const { data: userIntegrations } = useUserIntegrations();
  const qc = useQueryClient();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const connectedMap = new Map(userIntegrations?.map((ui) => [ui.integration_id, ui]));

  const toggle = async (integrationId: string) => {
    if (!user) return;
    setPendingId(integrationId);
    const existing = connectedMap.get(integrationId);
    const { error } = existing
      ? await supabase.from("user_integrations").delete().eq("id", existing.id)
      : await supabase.from("user_integrations").insert({
          user_id: user.id,
          integration_id: integrationId,
          status: "connected",
        });
    setPendingId(null);
    if (error) {
      console.error("Integration toggle error:", error);
      toast.error(t("integrations.error"));
      return;
    }
    toast.success(existing ? t("integrations.disconnectedToast") : t("integrations.connectedToast"));
    qc.invalidateQueries({ queryKey: ["user_integrations"] });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Group by category
  const grouped = integrations?.reduce((acc, i) => {
    (acc[i.category] = acc[i.category] ?? []).push(i);
    return acc;
  }, {} as Record<string, typeof integrations>) ?? {};

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold"><em>{t("integrations.title")}</em></h1>
        <p className="text-sm text-muted-foreground mt-2">{t("integrations.subtitle")}</p>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((integration) => {
              const isConnected = connectedMap.has(integration.id);
              const isPending = pendingId === integration.id;
              return (
                <div
                  key={integration.id}
                  className="border rounded-sm p-5 flex items-start justify-between gap-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                      <Plug className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{integration.name}</p>
                        {isConnected && (
                          <Badge variant="outline" className="h-5 px-1.5 text-[10px] border-success/40 text-success">
                            <Check className="h-2.5 w-2.5 mr-0.5" /> {t("integrations.connected")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{integration.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={isConnected ? "outline" : "default"}
                    onClick={() => toggle(integration.id)}
                    disabled={isPending}
                  >
                    {isPending && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
                    {isConnected ? t("integrations.disconnect") : t("integrations.connect")}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground">{t("integrations.footer")}</p>
    </div>
  );
}
