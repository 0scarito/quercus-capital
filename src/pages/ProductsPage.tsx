import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LIVE_YIELDS } from "@/data/liveYields";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        <section className="py-24 md:py-32 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
                <em>Nos produits</em>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Trois solutions complémentaires pour faire travailler votre épargne, du placement de
                trésorerie au portefeuille patrimonial sur-mesure.
              </p>
              <p className="text-sm text-muted-foreground">
                Net de frais de gestion · Performances passées non garanties · Risque de perte en capital.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Comparison table */}
        <section className="pb-12 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[760px]">
                    <thead className="border-b border-white/30">
                      <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        <th className="text-left font-medium px-6 py-4">Produit</th>
                        <th className="text-left font-medium px-6 py-4">Rendement net</th>
                        <th className="text-left font-medium px-6 py-4">Devise</th>
                        <th className="text-left font-medium px-6 py-4">Liquidité</th>
                        <th className="text-left font-medium px-6 py-4">Risque</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {LIVE_YIELDS.map((p) => (
                        <tr key={p.productKey} className="border-b border-white/20 last:border-0 hover:bg-muted/20 transition-colors">
                          <td className="px-6 py-5">
                            <div className="font-serif text-base"><em>{p.productName}</em></div>
                            <div className="text-xs text-muted-foreground mt-1">{p.subtitle}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`font-mono font-semibold ${p.rateNumeric ? "text-success" : "text-primary"}`}>
                              {p.rateLabel}
                            </span>
                          </td>
                          <td className="px-6 py-5 font-mono text-xs text-muted-foreground">{p.currency}</td>
                          <td className="px-6 py-5">
                            <Badge
                              variant="outline"
                              className={`text-[10px] font-mono ${
                                p.liquidityTone === "success"
                                  ? "border-success/40 text-success"
                                  : "border-primary/40 text-primary"
                              }`}
                            >
                              {p.liquidity}
                            </Badge>
                          </td>
                          <td className="px-6 py-5 text-xs text-muted-foreground">{p.risk}</td>
                          <td className="px-6 py-5 text-right">
                            <Link
                              to={p.href}
                              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                            >
                              Détails <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
              <p className="text-[11px] text-muted-foreground mt-4 text-center max-w-3xl mx-auto">
                Rendements actualisés quotidiennement, nets de frais de gestion. Les performances passées ne préjugent
                pas des performances futures. Tout investissement comporte un risque de perte en capital.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif">
                <em>Discutons de votre projet avec un conseiller.</em>
              </h2>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" className="px-10 btn-glow" asChild>
                  <Link to="/contact">Prendre rendez-vous</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10" asChild>
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
