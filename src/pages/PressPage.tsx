import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">Presse</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Pour toute demande presse, interview ou partenariat média, notre équipe de communication est à votre disposition.
          </p>

          <div className="border border-border p-6 space-y-3">
            <h2 className="text-lg font-serif text-foreground">Contact presse</h2>
            <p>Email : <a href="mailto:presse@quercus-capital.com" className="text-foreground underline">presse@quercus-capital.com</a></p>
            <p>Téléphone : +33 1 84 20 07 65</p>
          </div>

          <h2 className="text-2xl font-serif text-foreground pt-4">Kit média</h2>
          <p>
            Notre kit média comprend nos logos, nos visuels de marque et nos communiqués de presse récents. N'hésitez pas à nous contacter pour obtenir des éléments complémentaires.
          </p>

          <h2 className="text-2xl font-serif text-foreground pt-4">Dernières actualités</h2>
          <div className="space-y-4">
            <div className="border border-border p-5 space-y-2">
              <p className="text-xs text-muted-foreground">2025</p>
              <h3 className="font-serif text-foreground">Lancement de la plateforme Quercus</h3>
              <p className="text-sm">Quercus Capital lance sa plateforme digitale de gestion de trésorerie, permettant aux entreprises et particuliers d'accéder aux meilleurs fonds monétaires européens.</p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
