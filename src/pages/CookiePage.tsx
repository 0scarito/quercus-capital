import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-8">Charte cookie</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-sm">
          <p>Dernière mise à jour : avril 2025</p>

          <h2 className="text-xl font-serif text-foreground">Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur notre site. Il permet de stocker des informations relatives à votre navigation.
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">Cookies utilisés</h2>

          <h3 className="text-base font-medium text-foreground">Cookies strictement nécessaires</h3>
          <p>
            Ces cookies sont indispensables au fonctionnement du site et ne peuvent être désactivés. Ils permettent notamment la gestion de votre session et l'authentification.
          </p>

          <h3 className="text-base font-medium text-foreground pt-2">Cookies analytiques</h3>
          <p>
            Nous utilisons des cookies analytiques pour comprendre comment les visiteurs interagissent avec notre site, afin d'améliorer l'expérience utilisateur. Ces cookies sont déposés uniquement avec votre consentement.
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">Gestion de vos préférences</h2>
          <p>
            Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur. La désactivation de certains cookies peut affecter votre expérience de navigation.
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">Durée de conservation</h2>
          <p>
            Les cookies sont conservés pour une durée maximale de 13 mois conformément aux recommandations de la CNIL.
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">Contact</h2>
          <p>
            Pour toute question relative à notre politique en matière de cookies, contactez-nous à : <a href="mailto:dpo@quercus-capital.com" className="text-foreground underline">dpo@quercus-capital.com</a>.
          </p>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
