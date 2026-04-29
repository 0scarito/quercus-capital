import { GlassCard } from "@/components/landing/GlassCard";
import { Building2, ShieldCheck, FileCheck2, Users, Landmark } from "lucide-react";

const nodes = [
  {
    role: "Gérant",
    name: "LFIS Capital",
    desc: "AMF GP13000004 · > 5 Mds$ d'actifs",
    icon: Users,
  },
  {
    role: "Dépositaire",
    name: "BNP Paribas SA",
    desc: "Ségrégation totale des actifs",
    icon: ShieldCheck,
  },
  {
    role: "Administrateur",
    name: "BNP Paribas",
    desc: "Valorisation & comptabilité",
    icon: Building2,
  },
  {
    role: "Auditeur",
    name: "PwC",
    desc: "Audits trimestriels indépendants",
    icon: FileCheck2,
  },
  {
    role: "Contreparties Swap",
    name: "BNPP · SG · GS · JPM",
    desc: "Réseau de banques systémiques",
    icon: Landmark,
  },
];

export function VelvetSecurityArchitecture() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {nodes.map((n, i) => (
        <GlassCard key={n.role} className="p-5 text-center space-y-2 relative">
          <div className="flex justify-center">
            <div className="h-10 w-10 flex items-center justify-center bg-primary/10 border border-primary/20">
              <n.icon className="h-5 w-5 text-primary" />
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