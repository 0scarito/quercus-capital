import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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
  const rowsObj = (t("comparison.rows", { returnObjects: true }) as Record<
    string,
    { label: string; current: string; term: string; quercus: string }
  >) || {};
  const headers = (t("comparison.headers", { returnObjects: true }) as {
    current: string;
    term: string;
    quercus?: string;
    recommended: string;
  }) || { current: "Compte Courant", term: "Compte à Terme", quercus: "Quercus", recommended: "Recommandé" };

  // Per-row good/bad + highlight semantics live in code, not translations.
  const rowMeta: Record<string, { current: boolean; term: boolean; quercus: boolean; highlight?: boolean }> = {
    lockup: { current: true, term: false, quercus: true },
    withdrawalFees: { current: true, term: false, quercus: true },
    accountFees: { current: false, term: false, quercus: true },
    yield: { current: false, term: true, quercus: true, highlight: true },
  };

  const rawRows = Object.entries(rowsObj).map(([key, row]) => {
    const meta = rowMeta[key] || { current: true, term: true, quercus: true };
    return {
      label: row.label,
      courant: { text: row.current, good: meta.current },
      terme: { text: row.term, good: meta.term },
      quercus: { text: row.quercus, good: meta.quercus, highlight: meta.highlight },
    };
  });

  const quercusHeader = headers.quercus || "Quercus";
  const { ref: tableRef, isVisible: tableVisible } = useScrollReveal<HTMLDivElement>(0.3);
  return (
    <section className="py-24 px-4 md:px-8">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-serif text-center">
            <em>{t("comparison.title")}</em>
          </h2>

          {/* Desktop table */}
          <GlassCard className="overflow-x-auto hidden md:block relative" >
            <div ref={tableRef} aria-hidden className="absolute inset-0 pointer-events-none" />
            {/* Animated highlight column behind Quercus */}
            <div
              aria-hidden
              className="absolute top-0 bottom-0 right-0 w-1/4 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--primary) / 0.06), hsl(var(--primary) / 0.02))",
                opacity: tableVisible ? 1 : 0,
                transform: tableVisible ? "scaleY(1)" : "scaleY(0.85)",
                transformOrigin: "center",
                transition: "all 900ms cubic-bezier(0.22,1,0.36,1) 200ms",
              }}
            />
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-5 font-medium text-muted-foreground w-1/4"></th>
                  <th className="text-center p-5 font-medium text-muted-foreground w-1/4">{headers.current}</th>
                  <th className="text-center p-5 font-medium text-muted-foreground w-1/4">{headers.term}</th>
                  <th className="text-center p-5 w-1/4 border-x-2 border-primary/30">
                    <div className="flex flex-col items-center gap-1">
                      <Badge className="bg-primary text-primary-foreground text-xs">{headers.recommended}</Badge>
                      <span className="font-serif text-base text-primary">{quercusHeader}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rawRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/30 last:border-0"
                    style={{
                      opacity: tableVisible ? 1 : 0,
                      transform: tableVisible ? "translateX(0)" : "translateX(-10px)",
                      transition: `all 600ms cubic-bezier(0.22,1,0.36,1) ${400 + i * 120}ms`,
                    }}
                  >
                    <td className="p-5 font-medium">{row.label}</td>
                    <td className="p-5 text-center">
                      <CellContent {...row.courant} />
                    </td>
                    <td className="p-5 text-center">
                      <CellContent {...row.terme} />
                    </td>
                    <td className="p-5 text-center border-x-2 border-primary/30 relative">
                      <CellContent {...row.quercus} animateIn={tableVisible} delay={500 + i * 120 + 200} />
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
                    <p className="text-muted-foreground mb-1">{headers.current}</p>
                    <CellContent {...row.courant} />
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">{headers.term}</p>
                    <CellContent {...row.terme} />
                  </div>
                  <div className="text-center border border-primary/30 p-2 -m-1">
                    <p className="text-primary font-medium mb-1">{quercusHeader}</p>
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

function CellContent({
  text,
  good,
  highlight,
  animateIn,
  delay = 0,
}: {
  text: string;
  good: boolean;
  highlight?: boolean;
  animateIn?: boolean;
  delay?: number;
}) {
  // animateIn===undefined means no entry animation (mobile / non-quercus column).
  const shouldAnimate = animateIn !== undefined;
  const visible = !shouldAnimate || animateIn;
  return (
    <div className="flex flex-col items-center gap-1">
      {good ? (
        <Check
          className="h-4 w-4 text-success"
          style={
            shouldAnimate
              ? {
                  opacity: visible ? 1 : 0,
                  transform: visible ? "scale(1)" : "scale(0.4)",
                  transition: `all 450ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                }
              : undefined
          }
        />
      ) : (
        <X className="h-4 w-4 text-destructive" />
      )}
      <span
        className={highlight ? "text-lg font-serif font-semibold text-success" : ""}
        style={
          shouldAnimate
            ? {
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(4px)",
                transition: `all 500ms ease-out ${delay + 80}ms`,
              }
            : undefined
        }
      >
        {text}
      </span>
    </div>
  );
}
