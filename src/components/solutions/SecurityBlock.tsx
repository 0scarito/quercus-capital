import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { QuercusShield } from "@/components/QuercusShield";

export function SecurityBlock() {
  return (
    <section className="py-28 px-4 md:px-8">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Shield — same as home, face-on, rotates toward cursor */}
          <div className="flex justify-center">
            <QuercusShield size={220} />
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
