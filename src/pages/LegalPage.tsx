import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useTranslation } from "react-i18next";
import { StickyToc } from "@/components/StickyToc";

export default function LegalPage() {
  const { t } = useTranslation("pages");
  const tocItems = [
    { id: "publisher", label: t("legal.publisherTitle") },
    { id: "director", label: t("legal.directorTitle") },
    { id: "hosting", label: t("legal.hostingTitle") },
    { id: "status", label: t("legal.statusTitle") },
    { id: "ip", label: t("legal.ipTitle") },
    { id: "liability", label: t("legal.liabilityTitle") },
  ];
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-10">{t("legal.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          <section className="space-y-6 text-muted-foreground leading-relaxed text-base scroll-mt-28 [&_h2]:scroll-mt-28">
            <h2 id="publisher" className="text-xl font-serif text-foreground">{t("legal.publisherTitle")}</h2>
            <p className="whitespace-pre-line">{t("legal.publisherBody")}</p>

            <h2 id="director" className="text-xl font-serif text-foreground pt-4">{t("legal.directorTitle")}</h2>
            <p>{t("legal.directorBody")}</p>

            <h2 id="hosting" className="text-xl font-serif text-foreground pt-4">{t("legal.hostingTitle")}</h2>
            <p className="whitespace-pre-line">{t("legal.hostingBody")}</p>

            <h2 id="status" className="text-xl font-serif text-foreground pt-4">{t("legal.statusTitle")}</h2>
            <p className="whitespace-pre-line">{t("legal.statusBody")}</p>

            <h2 id="ip" className="text-xl font-serif text-foreground pt-4">{t("legal.ipTitle")}</h2>
            <p>{t("legal.ipBody")}</p>

            <h2 id="liability" className="text-xl font-serif text-foreground pt-4">{t("legal.liabilityTitle")}</h2>
            <p>{t("legal.liabilityBody")}</p>
          </section>
          <StickyToc items={tocItems} />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
