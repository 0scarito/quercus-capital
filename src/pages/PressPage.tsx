import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useTranslation } from "react-i18next";

export default function PressPage() {
  const { t } = useTranslation("pages");
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">{t("press.title")}</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <p>{t("press.intro")}</p>

          <div className="border border-border p-6 space-y-3">
            <h2 className="text-lg font-serif text-foreground">{t("press.contactTitle")}</h2>
            <p>{t("press.emailLabel")} <a href="mailto:presse@quercus-capital.com" className="text-foreground underline">presse@quercus-capital.com</a></p>
            <p>{t("press.phoneLabel")} +33 1 84 20 07 65</p>
          </div>

          <h2 className="text-2xl font-serif text-foreground pt-4">{t("press.kitTitle")}</h2>
          <p>{t("press.kitBody")}</p>

          <h2 className="text-2xl font-serif text-foreground pt-4">{t("press.newsTitle")}</h2>
          <div className="space-y-4">
            <div className="border border-border p-5 space-y-2">
              <p className="text-xs text-muted-foreground">{t("press.news.launchYear")}</p>
              <h3 className="font-serif text-foreground">{t("press.news.launchTitle")}</h3>
              <p className="text-sm">{t("press.news.launchBody")}</p>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
