import { Link } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/landing/GlassCard";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

/**
 * Section affichée en bas des pages produits pour expliquer
 * qu'au-delà d'un certain encours, le client bénéficie d'un
 * conseiller dédié et d'un Portefeuille Conseillé sur-mesure.
 */
export function AdvisorThresholdSection() {
  return (
    <section className="py-14 md:py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <GlassCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-[auto,1fr,auto] gap-8 items-center">
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: 72,
                  height: 72,
                  background: "hsl(var(--accent) / 0.15)",
                }}
              >
                <Compass className="h-8 w-8 text-primary" />
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  Au-delà d'un certain encours
                </div>
                <h3 className="text-2xl md:text-3xl font-serif">
                  <em>Un conseiller dédié pour vous accompagner.</em>
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  À partir d'un certain niveau d'encours sur la plateforme, un
                  Conseiller en Gestion de Patrimoine vous est attribué. Il
                  construit avec vous un <em>Portefeuille Conseillé</em> sur-mesure :
                  une allocation patrimoniale qui combine Smart Cash, Cash & Carry,
                  obligations, actions et solutions alternatives, calibrée selon
                  vos objectifs et votre horizon.
                </p>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <Button asChild size="lg" className="btn-glow">
                  <Link to="/products/portefeuille-conseille">
                    Découvrir le Portefeuille Conseillé
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="btn-glow">
                  <Link to="/contact">Prendre rendez-vous</Link>
                </Button>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}