import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { SegmentInfo } from "./segmentData";

interface ComparisonTableProps {
  segment: SegmentInfo;
}

const rows = [
  {
    label: "Période d'immobilisation",
    courant: { text: "Pas de blocage", good: true },
    terme: { text: "> 1 mois", good: false },
    quercus: { text: "Pas de blocage", good: true },
  },
  {
    label: "Frais de retrait",
    courant: { text: "Aucun", good: true },
    terme: { text: "Retrait anticipé pénalisé", good: false },
    quercus: { text: "Aucun", good: true },
  },
  {
    label: "Frais de tenue de compte",
    courant: { text: "Oui", good: false },
    terme: { text: "Oui", good: false },
    quercus: { text: "Aucun", good: true },
  },
  {
    label: "Rendement net actuel",
    courant: { text: "0%", good: false },
    terme: { text: "1,60% – 2,20%", good: false },
    quercus: { text: "EU 2,20% / US 4,00%", good: true, highlight: true },
  },
];

export function ComparisonTable({ segment }: ComparisonTableProps) {
  return (
    <section className="py-20 px-6">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif text-center">
            <em>Pourquoi choisir Quercus ?</em>
          </h2>

          {/* Desktop table */}
          <GlassCard className="overflow-x-auto hidden md:block">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-5 font-medium text-muted-foreground w-1/4"></th>
                  <th className="text-center p-5 font-medium text-muted-foreground w-1/4">Compte Courant</th>
                  <th className="text-center p-5 font-medium text-muted-foreground w-1/4">Compte à Terme</th>
                  <th className="text-center p-5 w-1/4 border-x-2 border-primary/30">
                    <div className="flex flex-col items-center gap-1">
                      <Badge className="bg-primary text-primary-foreground text-xs">Recommandé</Badge>
                      <span className="font-serif text-base text-primary">Quercus</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/30 last:border-0">
                    <td className="p-5 font-medium">{row.label}</td>
                    <td className="p-5 text-center">
                      <CellContent {...row.courant} />
                    </td>
                    <td className="p-5 text-center">
                      <CellContent {...row.terme} />
                    </td>
                    <td className="p-5 text-center border-x-2 border-primary/30">
                      <CellContent {...row.quercus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {rows.map((row, i) => (
              <GlassCard key={i} className="p-5 space-y-3">
                <p className="font-medium text-sm">{row.label}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">Courant</p>
                    <CellContent {...row.courant} />
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">À Terme</p>
                    <CellContent {...row.terme} />
                  </div>
                  <div className="text-center border border-primary/30 p-2 -m-1">
                    <p className="text-primary font-medium mb-1">Quercus</p>
                    <CellContent {...row.quercus} />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

function CellContent({ text, good, highlight }: { text: string; good: boolean; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {good ? (
        <Check className="h-4 w-4 text-success" />
      ) : (
        <X className="h-4 w-4 text-destructive" />
      )}
      <span className={highlight ? "text-lg font-serif font-semibold text-success" : ""}>
        {text}
      </span>
    </div>
  );
}
