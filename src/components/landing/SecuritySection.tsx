import { useParallax } from "@/hooks/useParallax";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import shieldImg from "@/assets/quercus-shield.png";

export function SecuritySection() {
  const parallax = useParallax(14);

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div
        className="max-w-7xl mx-auto"
        onMouseMove={parallax.onMouseMove}
        onMouseLeave={parallax.onMouseLeave}
      >
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Shield with parallax */}
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <div ref={parallax.ref} style={parallax.style} className="relative">
                <div className="absolute inset-0 bg-primary/10 blur-3xl scale-75" />
                <img
                  src={shieldImg}
                  alt="Bouclier Quercus — sécurité des fonds"
                  className="relative w-64 md:w-80 h-auto drop-shadow-2xl"
                  loading="lazy"
                  width={1024}
                  height={1024}
                />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight">
                <em>Vos fonds sont conservés par la banque dépositaire BNP Paribas</em>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Quercus n'est jamais détenteur de votre capital. Vos avoirs sont ségrégés chez{" "}
                <strong className="text-foreground">BNP Paribas</strong> — premier groupe bancaire
                de la zone euro — et restent intégralement protégés, quoi qu'il advienne de notre plateforme.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                <div>
                  <p className="text-2xl font-serif font-semibold text-primary">BNP Paribas</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Banque dépositaire</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl font-serif font-semibold text-primary">AMF</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Régulateur</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl font-serif font-semibold text-primary">Ségrégation</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Hors bilan</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
