import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Quote } from "lucide-react";

const pressItems = [
  {
    outlet: "Financial Times",
    quote: "Europe's first Bitcoin mutual fund.",
    context: "Sur la stratégie pionnière TOBAM (gérant de notre fonds Crypto Liquidity).",
  },
  {
    outlet: "Fonds Online",
    quote: "Une approche institutionnelle de l'arbitrage crypto, sans exposition directionnelle.",
    context: "Couverture du basis trade BTC/ETH.",
  },
  {
    outlet: "L'Agefi",
    quote: "Démocratiser l'accès aux stratégies de trésorerie réservées aux institutionnels.",
    context: "Sur la mission de Quercus Capital.",
  },
];

export function PressStrip() {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Couverture média
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">
              <em>Reconnu par la presse spécialisée</em>
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
