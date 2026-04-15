import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-24 pb-20 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif italic mb-8">Politique de confidentialité</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-sm">
          <p>Dernière mise à jour : avril 2025</p>

          <h2 className="text-xl font-serif text-foreground">1. Responsable du traitement</h2>
          <p>
            Quercus Capital SAS, 231 Rue Saint-Honoré, 75001 Paris, est responsable du traitement de vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Données d'identification : nom, prénom, date de naissance, nationalité</li>
            <li>Coordonnées : adresse postale, email, téléphone</li>
            <li>Données financières : informations fiscales, documents d'identité (KYC)</li>
            <li>Données de connexion : adresse IP, logs de connexion</li>
          </ul>

          <h2 className="text-xl font-serif text-foreground pt-4">3. Finalités du traitement</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Création et gestion de votre compte</li>
            <li>Respect des obligations réglementaires (KYC, LCB-FT)</li>
            <li>Fourniture de nos services de gestion financière</li>
            <li>Communication relative à votre compte et nos services</li>
            <li>Amélioration de notre plateforme</li>
          </ul>

          <h2 className="text-xl font-serif text-foreground pt-4">4. Base légale</h2>
          <p>
            Le traitement de vos données repose sur l'exécution du contrat, le respect de nos obligations légales (notamment en matière de lutte contre le blanchiment), votre consentement et notre intérêt légitime.
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">5. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant la durée de la relation contractuelle, puis archivées conformément aux obligations légales applicables (5 ans après la clôture du compte pour les données KYC).
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">6. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition. Pour exercer ces droits, contactez-nous à : <a href="mailto:dpo@quercus-capital.com" className="text-foreground underline">dpo@quercus-capital.com</a>.
          </p>

          <h2 className="text-xl font-serif text-foreground pt-4">7. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
          </p>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
