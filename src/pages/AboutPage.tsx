import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">À propos</h1>

        <section className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            <span className="text-foreground font-medium">Quercus Capital</span> est une société française spécialisée dans la gestion de trésorerie d'entreprise et de patrimoine privé. Fondée à Paris, notre mission est de rendre accessible une gestion financière de qualité institutionnelle à toutes les structures — des start-ups aux holdings familiales.
          </p>

          <h2 className="text-3xl font-serif text-foreground pt-4">Notre mission</h2>
          <p>
            Offrir à nos clients un accès simplifié aux meilleurs fonds monétaires européens, avec une transparence totale sur les rendements et les frais. Nous croyons que chaque euro de trésorerie mérite d'être optimisé, en toute sécurité.
          </p>

          <h2 className="text-3xl font-serif text-foreground pt-4">Notre approche</h2>
          <p>
            Nous combinons une expertise financière rigoureuse avec une technologie de pointe. Notre plateforme permet à nos clients de souscrire, suivre et gérer leurs investissements en quelques clics, tout en bénéficiant d'un accompagnement personnalisé.
          </p>

          <h2 className="text-3xl font-serif text-foreground pt-4">Nos valeurs</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="text-foreground font-medium">Excellence</span> — Une quête permanente de la qualité dans nos services et nos produits.</li>
            <li><span className="text-foreground font-medium">Transparence</span> — Des frais clairs, des rendements nets, aucune surprise.</li>
            <li><span className="text-foreground font-medium">Sécurité</span> — Vos fonds sont investis exclusivement dans des véhicules réglementés.</li>
            <li><span className="text-foreground font-medium">Innovation</span> — Une plateforme digitale pensée pour simplifier la gestion financière.</li>
          </ul>

          <h2 className="text-2xl font-serif text-foreground pt-4">Informations réglementaires</h2>
          <p>
            Quercus Capital est enregistrée auprès de l'ORIAS sous le n°24004789 en qualité de Conseiller en Investissements Financiers (CIF) et Courtier en Assurance (COA). Société immatriculée au RCS de Paris sous le numéro 928 443 001.
          </p>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
