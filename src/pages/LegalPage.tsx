import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-8">Mentions légales</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-sm">
          <h2 className="text-xl font-serif text-foreground">Éditeur du site</h2>
          <p>
            QUERCUS CAPITAL SAS<br />
            231 Rue Saint-Honoré, 75001 Paris<br />
            RCS Paris : 928 443 001<br />
            Téléphone : +33 1 84 20 07 65<br />
            Email : contact@quercus-capital.com
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">Directeur de la publication</h2>
          <p>Le Président de Quercus Capital SAS.</p>

          <h2 className="text-xl font-serif text-foreground pt-4">Hébergement</h2>
          <p>
            Ce site est hébergé par Lovable (Lovable Technologies).<br />
            Adresse : voir lovable.dev
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">Statut réglementaire</h2>
          <p>
            Quercus Capital est enregistrée auprès de l'ORIAS sous le n°24004789 en qualité de :<br />
            — Conseiller en Investissements Financiers (CIF)<br />
            — Courtier en Assurance (COA)<br /><br />
            Adhérente de la CNCIF (Chambre Nationale des Conseils en Investissements Financiers), association professionnelle agréée par l'AMF (Autorité des Marchés Financiers).
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus du site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de Quercus Capital, sauf mention contraire. Toute reproduction, représentation, modification ou distribution, même partielle, est interdite sans autorisation préalable écrite.
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">Responsabilité</h2>
          <p>
            Les informations contenues sur ce site sont fournies à titre indicatif et ne constituent en aucun cas un conseil en investissement ni une offre de produits financiers. Les performances passées ne préjugent pas des performances futures. Quercus Capital ne saurait être tenue responsable des décisions prises sur la base des informations présentées sur ce site.
          </p>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
