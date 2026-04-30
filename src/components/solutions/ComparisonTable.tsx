import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { SegmentInfo } from "./segmentData";
import { useTranslation } from "react-i18next";

interface ComparisonTableProps {
  segment: SegmentInfo;
}

export function ComparisonTable({ segment }: ComparisonTableProps) {
  const { t } = useTranslation("products");
  const rawRows = (t("comparison.rows", { returnObjects: true }) as Array<{
    label: string;
    courant: { text: string; good: boolean };
    terme: { text: string; good: boolean };
    quercus: { text: string; good: boolean; highlight?: boolean };
  }>) || [];
  const headers = (t("comparison.headers", { returnObjects: true }) as { courant: string; terme: string; quercus: string; recommended: string }) || { courant: "Compte Courant", terme: "Compte à Terme", quercus: "Quercus", recommended: "Recommandé" };
  return (
    <section className="py-24 px-4 md:px-8">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-serif text-center">
            <em>{t("comparison.title")}</em>
          </h2>

          {/* Desktop table */}
          <GlassCard className="overflow-x-auto hidden md:block">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-5 font-medium text-muted-foreground w-1/4"></th>
                  <th className="text-center p-5 font-medium text-muted-foreground w-1/4">{headers.courant}</th>
                  <th className="text-center p-5 font-medium text-muted-foreground w-1/4">{headers.terme}</th>
                  <th className="text-center p-5 w-1/4 border-x-2 border-primary/30">
                    <div className="flex flex-col items-center gap-1">
                      <Badge className="bg-primary text-primary-foreground text-xs">{headers.recommended}</Badge>
                      <span className="font-serif text-base text-primary">{headers.quercus}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rawRows.map((row, i) => (
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
            {rawRows.map((row, i) => (
              <GlassCard key={i} className="p-5 space-y-3">
                <p className="font-medium text-sm">{row.label}</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">{headers.courant}</p>
                    <CellContent {...row.courant} />
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">{headers.terme}</p>
                    <CellContent {...row.terme} />
                  </div>
                  <div className="text-center border border-primary/30 p-2 -m-1">
                    <p className="text-primary font-medium mb-1">{headers.quercus}</p>
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
