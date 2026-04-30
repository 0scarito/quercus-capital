import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useTranslation } from "react-i18next";
import { StickyToc } from "@/components/StickyToc";

export default function PrivacyPage() {
  const { t } = useTranslation("pages");
  const s2Items = t("privacy.s2Items", { returnObjects: true }) as string[];
  const s3Items = t("privacy.s3Items", { returnObjects: true }) as string[];
  const tocItems = [
    { id: "p-s1", label: t("privacy.s1Title") },
    { id: "p-s2", label: t("privacy.s2Title") },
    { id: "p-s3", label: t("privacy.s3Title") },
    { id: "p-s4", label: t("privacy.s4Title") },
    { id: "p-s5", label: t("privacy.s5Title") },
    { id: "p-s6", label: t("privacy.s6Title") },
    { id: "p-s7", label: t("privacy.s7Title") },
  ];
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">{t("privacy.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          <section className="space-y-6 text-muted-foreground leading-relaxed text-base [&_h2]:scroll-mt-28">
            <p>{t("privacy.lastUpdate")}</p>

            <h2 id="p-s1" className="text-xl font-serif text-foreground">{t("privacy.s1Title")}</h2>
            <p>{t("privacy.s1Body")}</p>

            <h2 id="p-s2" className="text-xl font-serif text-foreground pt-4">{t("privacy.s2Title")}</h2>
            <p>{t("privacy.s2Intro")}</p>
            <ul className="list-disc pl-6 space-y-1">
              {s2Items.map((it) => <li key={it}>{it}</li>)}
            </ul>

            <h2 id="p-s3" className="text-xl font-serif text-foreground pt-4">{t("privacy.s3Title")}</h2>
            <ul className="list-disc pl-6 space-y-1">
              {s3Items.map((it) => <li key={it}>{it}</li>)}
            </ul>

            <h2 id="p-s4" className="text-xl font-serif text-foreground pt-4">{t("privacy.s4Title")}</h2>
            <p>{t("privacy.s4Body")}</p>

            <h2 id="p-s5" className="text-xl font-serif text-foreground pt-4">{t("privacy.s5Title")}</h2>
            <p>{t("privacy.s5Body")}</p>

            <h2 id="p-s6" className="text-xl font-serif text-foreground pt-4">{t("privacy.s6Title")}</h2>
            <p>{t("privacy.s6Body")} <a href="mailto:dpo@quercus-capital.com" className="text-foreground underline">dpo@quercus-capital.com</a>.</p>

            <h2 id="p-s7" className="text-xl font-serif text-foreground pt-4">{t("privacy.s7Title")}</h2>
            <p>{t("privacy.s7Body")}</p>
          </section>
          <StickyToc items={tocItems} />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
