import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { Users, ShieldCheck, Wallet, TrendingUp } from "lucide-react";

const ICONS = [Users, ShieldCheck, Wallet, TrendingUp];

export function HowItWorks() {
  const { t } = useTranslation("landing");
  const steps = [1, 2, 3, 4].map((n) => ({
    n,
    Icon: ICONS[n - 1],
    title: t(`howItWorks.steps.s${n}Title`),
    desc: t(`howItWorks.steps.s${n}Desc`),
  }));

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold">
              <em>{t("howItWorks.title")}</em>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">{t("howItWorks.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map(({ n, Icon, title, desc }) => (
            <div
              key={n}
              className="bg-background border border-border p-7 md:p-8 hover:border-foreground/40 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-muted/50 border border-border flex items-center justify-center">
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Étape {n.toString().padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif italic mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
