import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";

export default function CookiePage() {
  const { t } = useTranslation("pages");
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Charte cookie | Quercus Capital" description="Politique cookies de Quercus Capital : cookies utilisés, finalités et préférences." path="/charte-cookie" />

      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">{t("cookie.title")}</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-base">
          <p>{t("cookie.lastUpdate")}</p>

          <h2 className="text-xl font-serif text-foreground">{t("cookie.whatTitle")}</h2>
          <p>{t("cookie.whatBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("cookie.usedTitle")}</h2>

          <h3 className="text-base font-medium text-foreground">{t("cookie.necessaryTitle")}</h3>
          <p>{t("cookie.necessaryBody")}</p>

          <h3 className="text-base font-medium text-foreground pt-2">{t("cookie.analyticsTitle")}</h3>
          <p>{t("cookie.analyticsBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("cookie.manageTitle")}</h2>
          <p>{t("cookie.manageBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("cookie.retentionTitle")}</h2>
          <p>{t("cookie.retentionBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("cookie.contactTitle")}</h2>
          <p>{t("cookie.contactBody")} <a href="mailto:dpo@quercus-capital.com" className="text-foreground underline">dpo@quercus-capital.com</a>.</p>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
