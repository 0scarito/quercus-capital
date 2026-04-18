import { GlassCard } from "@/components/landing/GlassCard";
import { Building2, ShieldCheck, FileCheck2, Users, Server } from "lucide-react";

const nodes = [
  {
    role: "Gérant",
    name: "TOBAM",
    desc: "Stratégie & exécution",
    icon: Users,
  },
  {
    role: "Dépositaire",
    name: "CACEIS Bank",
    desc: "Conservation des actifs · PSAN AMF",
    icon: ShieldCheck,
  },
  {
    role: "Administrateur",
    name: "CACEIS",
    desc: "Valorisation & comptabilité",
    icon: Building2,
  },
  {
    role: "Auditeur",
    name: "PwC",
    desc: "Contrôle indépendant annuel",
    icon: FileCheck2,
  },
  {
    role: "Brokers régulés",
    name: "Taurus · BitGo · Binance",
    desc: "Exécution multi-venues",
    icon: Server,
  },
];

export function SecurityArchitecture() {
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
