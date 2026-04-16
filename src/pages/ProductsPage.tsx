import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { useTilt } from "@/hooks/useTilt";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "Velvet",
    subtitle: "Smart Cash · FCP UCITS",
    yield: "€STR + 0,30%",
    description: "Rendement quotidien garanti par BNP Paribas via Total Return Swap. Fonds UCITS agréé AMF, risque 1/7, liquidité T+1.",
    features: [
      { label: "Fréquence", value: "Quotidien" },
      { label: "Frais d'entrée", value: "0%" },
      { label: "Frais de sortie", value: "0%" },
      { label: "Liquidité", value: "T+1" },
      { label: "Risque", value: "1/7" },
      { label: "Dépositaire", value: "BNP Paribas" },
    ],
    link: "/products/velvet",
    badge: "UCITS · AMF n° FCP20230197",
  },
  {
    name: "TOBAM Crypto Liquidity Fund",
    subtitle: "Cash & Carry · FIA FPS",
    yield: "~7–8% p.a.",
    description: "Arbitrage non-directionnel sur futures Bitcoin et Ethereum. Rendement élevé sans exposition au prix des crypto-actifs. Compensé carbone.",
    features: [
      { label: "Fréquence", value: "Quotidien" },
      { label: "Exposition crypto", value: "0%" },
      { label: "Liquidité", value: "Quotidienne" },
      { label: "Max drawdown", value: "< -4%" },
      { label: "Dépositaire", value: "CACEIS Bank" },
      { label: "ESG", value: "Carbone compensé" },
    ],
    link: "/products/tobam",
    badge: "FIA · Fonds Professionnel Spécialisé",
  },
];

function ProductHeroCard({ p, i }: { p: typeof products[0]; i: number }) {
  const tilt = useTilt(4);
  return (
    <ScrollReveal delay={i * 150}>
      <GlassCard
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        className="p-8 md:p-10 h-full"
      >
        <div className="flex items-start justify-between mb-6">
          <Badge variant="outline" className="text-xs font-mono tracking-wider">{p.badge}</Badge>
          <Link to={p.link}>
            <ArrowRight className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          </Link>
        </div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{p.subtitle}</p>
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3"><em>{p.name}</em></h2>
        <p className="text-4xl md:text-5xl font-serif font-semibold text-success mb-6">{p.yield}</p>
        <p className="text-muted-foreground leading-relaxed mb-8">{p.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {p.features.map((f) => (
            <div key={f.label}>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{f.label}</p>
              <p className="font-mono text-sm font-medium">{f.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button className="w-full btn-glow" asChild>
            <Link to={p.link}>Découvrir {p.name.split(" ")[0]} →</Link>
          </Button>
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        <section className="py-28 md:py-36 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
                <em>Nos Produits</em>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Deux stratégies complémentaires pour optimiser votre trésorerie.
                Rendement net de frais, liquidité quotidienne, fonds jamais au bilan de Quercus.
              </p>
              <p className="text-sm text-muted-foreground">
                Vos fonds sont détenus par la banque dépositaire BNP Paribas / CACEIS Bank.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section className="pb-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((p, i) => (
              <ProductHeroCard key={p.name} p={p} i={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif">
                <em>Commencez à générer du rendement dès aujourd'hui.</em>
              </h2>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="px-10 btn-glow" asChild>
                  <Link to="/open-account">Ouvrir un compte</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10 btn-glow" asChild>
                  <Link to="/#calculator">Simuler un placement</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
