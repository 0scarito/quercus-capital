import { useParallax } from "@/hooks/useParallax";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { Shield } from "lucide-react";

export function SecurityBlock() {
  const parallax = useParallax(12);

  return (
    <section className="py-28 px-4 md:px-8">
      <ScrollReveal>
        <div
          className="max-w-5xl mx-auto text-center space-y-10"
          onMouseMove={parallax.onMouseMove}
          onMouseLeave={parallax.onMouseLeave}
        >
          {/* Shield */}
          <div className="flex justify-center">
            <div ref={parallax.ref} style={parallax.style}>
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                {/* Shield SVG */}
                <svg viewBox="0 0 100 120" className="w-24 h-24 relative z-10" fill="none">
                  <path
                    d="M50 5 L90 25 L90 60 C90 85 70 105 50 115 C30 105 10 85 10 60 L10 25 Z"
                    fill="hsl(173 50% 19% / 0.15)"
                    stroke="hsl(173 50% 19%)"
                    strokeWidth="2"
                  />
                  <path
                    d="M50 20 L75 33 L75 58 C75 75 63 90 50 97 C37 90 25 75 25 58 L25 33 Z"
                    fill="hsl(173 50% 19% / 0.08)"
                    stroke="hsl(173 50% 19% / 0.4)"
                    strokeWidth="1"
                  />
                  <Shield
                    x="35"
                    y="40"
                    width="30"
                    height="30"
                    className="text-primary"
                    stroke="hsl(173 50% 19%)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif">
            <em>Votre sécurité est notre priorité absolue.</em>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Quercus n'est jamais détenteur de vos fonds. Ils sont conservés par{" "}
            <strong className="text-foreground">CACEIS</strong>, filiale du groupe{" "}
            <strong className="text-foreground">Crédit Agricole</strong>, premier
            dépositaire européen. Cette ségrégation totale garantit que votre capital
            reste protégé, quoi qu'il advienne.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold text-primary">CACEIS</p>
              <p className="text-sm text-muted-foreground">Banque dépositaire</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold text-primary">Crédit Agricole</p>
              <p className="text-sm text-muted-foreground">Groupe bancaire</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold text-primary">Ségrégation</p>
              <p className="text-sm text-muted-foreground">Fonds jamais au bilan</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
