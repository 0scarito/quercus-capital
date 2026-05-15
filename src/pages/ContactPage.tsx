import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation(["pages"]);
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">{t("pages:contact.title")}</h1>

        <section className="space-y-8 text-muted-foreground leading-relaxed">
          <p>{t("pages:contact.intro")}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border p-6 space-y-3">
              <h2 className="text-lg font-serif text-foreground">{t("pages:contact.headquarters")}</h2>
              <p>231 Rue Saint-Honoré</p>
              <p>75001 Paris, France</p>
            </div>
            <div className="border border-border p-6 space-y-3">
              <h2 className="text-lg font-serif text-foreground">{t("pages:contact.details")}</h2>
              <p>{t("pages:contact.phoneLabel")} <a href="tel:+33184200765" className="text-foreground underline">+33 1 84 20 07 65</a></p>
              <p>{t("pages:contact.emailLabel")} <a href="mailto:contact@quercus-capital.com" className="text-foreground underline">contact@quercus-capital.com</a></p>
            </div>
          </div>

          <div className="border border-border p-6 space-y-3">
            <h2 className="text-lg font-serif text-foreground">{t("pages:contact.hours")}</h2>
            <p>{t("pages:contact.weekdays")}</p>
            <p>{t("pages:contact.weekend")}</p>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
