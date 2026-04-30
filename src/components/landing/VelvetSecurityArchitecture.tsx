import { GlassCard } from "@/components/landing/GlassCard";
import { Building2, ShieldCheck, FileCheck2, Users, Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";

export function VelvetSecurityArchitecture() {
  const { t } = useTranslation("landing");
  const nodes = (t("securityArch.velvet", { returnObjects: true }) as Array<{ role: string; name: string; desc: string }>) || [];
  const icons = [Users, ShieldCheck, Building2, FileCheck2, Landmark];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {nodes.map((n, i) => (
        <GlassCard key={n.role} className="p-5 text-center space-y-2 relative">
          <div className="flex justify-center">
            <div className="h-10 w-10 flex items-center justify-center bg-primary/10 border border-primary/20">
              {(() => { const Icon = icons[i] || Users; return <Icon className="h-5 w-5 text-primary" />; })()}
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{n.role}</p>
          <p className="text-base font-serif font-semibold">
            <em>{n.name}</em>
          </p>
          <p className="text-xs text-muted-foreground leading-snug">{n.desc}</p>
          {i < nodes.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-border" />
          )}
        </GlassCard>
      ))}
    </div>
  );
}