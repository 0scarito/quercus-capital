import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">Contact</h1>

        <section className="space-y-8 text-muted-foreground leading-relaxed">
          <p>
            Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans vos projets de gestion de trésorerie.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border p-6 space-y-3">
              <h2 className="text-lg font-serif text-foreground">Siège social</h2>
              <p>231 Rue Saint-Honoré</p>
              <p>75001 Paris, France</p>
            </div>
            <div className="border border-border p-6 space-y-3">
              <h2 className="text-lg font-serif text-foreground">Coordonnées</h2>
              <p>Téléphone : <a href="tel:+33184200765" className="text-foreground underline">+33 1 84 20 07 65</a></p>
              <p>Email : <a href="mailto:contact@quercus-capital.com" className="text-foreground underline">contact@quercus-capital.com</a></p>
            </div>
          </div>

          <div className="border border-border p-6 space-y-3">
            <h2 className="text-lg font-serif text-foreground">Horaires d'ouverture</h2>
            <p>Lundi – Vendredi : 9h00 – 18h00</p>
            <p>Samedi – Dimanche : Fermé</p>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
