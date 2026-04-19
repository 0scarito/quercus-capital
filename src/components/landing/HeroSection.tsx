import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

export function HeroSection() {
  const { t, i18n } = useTranslation(["landing", "common"]);
  const locale = (i18n.resolvedLanguage || "fr") === "en" ? "en-GB" : "fr-FR";
  const date = new Date().toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });

  return (
    <section className="pt-20 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
          <em>{t("landing:hero.title")}</em>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          <Trans
            i18nKey="landing:hero.subtitle"
            components={[<strong className="text-foreground font-medium" />]}
          />
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6 text-lg font-mono">
            <span className="text-success font-semibold">Velvet : €STR + 0,30%</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-success font-semibold">TOBAM : ~7–8% p.a.</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("landing:hero.yieldsNote", { date })}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" className="px-10 text-base btn-glow" asChild>
            <Link to="/open-account">{t("common:actions.openAccount")}</Link>
          </Button>
          <Button size="lg" variant="outline" className="px-10 text-base btn-glow" asChild>
            <Link to="/contact">{t("common:actions.bookMeeting")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
