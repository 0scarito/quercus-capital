import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

export function PressStrip() {
  const { t } = useTranslation("landing");
  const pressItems = [
    { outlet: "Financial Times", quote: t("press.items.ft.quote"), context: t("press.items.ft.context") },
    { outlet: "Fonds Online", quote: t("press.items.fonds.quote"), context: t("press.items.fonds.context") },
    { outlet: "L'Agefi", quote: t("press.items.agefi.quote"), context: t("press.items.agefi.context") },
  ];

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              {t("press.label")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">
              <em>{t("press.title")}</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pressItems.map((p, i) => (
            <ScrollReveal key={p.outlet} delay={i * 100}>
              <GlassCard className="p-7 h-full flex flex-col gap-4">
                <Quote className="h-5 w-5 text-primary/60" />
                <p className="text-base font-serif leading-snug">
                  <em>« {p.quote} »</em>
                </p>
                <div className="mt-auto pt-3 border-t border-white/30">
                  <p className="text-sm font-semibold text-foreground">{p.outlet}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.context}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
