import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";

export default function LegalPage() {
  const { t } = useTranslation("pages");
  return (
    <div className="min-h-screen bg-background">
      <Seo title="Mentions légales | Quercus Capital" description="Mentions légales du site Quercus Capital : éditeur, hébergeur, statut et propriété intellectuelle." path="/mentions-legales" />

      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">{t("legal.title")}</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-base">
          <h2 className="text-xl font-serif text-foreground">{t("legal.publisherTitle")}</h2>
          <p className="whitespace-pre-line">{t("legal.publisherBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("legal.directorTitle")}</h2>
          <p>{t("legal.directorBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("legal.hostingTitle")}</h2>
          <p className="whitespace-pre-line">{t("legal.hostingBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("legal.statusTitle")}</h2>
          <p className="whitespace-pre-line">{t("legal.statusBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("legal.ipTitle")}</h2>
          <p>{t("legal.ipBody")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("legal.liabilityTitle")}</h2>
          <p>{t("legal.liabilityBody")}</p>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
