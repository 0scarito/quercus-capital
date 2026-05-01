import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const { t } = useTranslation("pages");
  const s2Items = t("privacy.s2Items", { returnObjects: true }) as string[];
  const s3Items = t("privacy.s3Items", { returnObjects: true }) as string[];
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">{t("privacy.title")}</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed text-base">
          <p>{t("privacy.lastUpdate")}</p>

          <h2 className="text-xl font-serif text-foreground">{t("privacy.s1Title")}</h2>
          <p>{t("privacy.s1Body")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("privacy.s2Title")}</h2>
          <p>{t("privacy.s2Intro")}</p>
          <ul className="list-disc pl-6 space-y-1">
            {s2Items.map((it) => <li key={it}>{it}</li>)}
          </ul>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("privacy.s3Title")}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {s3Items.map((it) => <li key={it}>{it}</li>)}
          </ul>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("privacy.s4Title")}</h2>
          <p>{t("privacy.s4Body")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("privacy.s5Title")}</h2>
          <p>{t("privacy.s5Body")}</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("privacy.s6Title")}</h2>
          <p>{t("privacy.s6Body")} <a href="mailto:dpo@quercus-capital.com" className="text-foreground underline">dpo@quercus-capital.com</a>.</p>

          <h2 className="text-xl font-serif text-foreground pt-4">{t("privacy.s7Title")}</h2>
          <p>{t("privacy.s7Body")}</p>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
