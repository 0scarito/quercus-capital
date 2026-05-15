import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { LiveYieldCard } from "@/components/landing/LiveYieldCard";

export function HeroSection() {
  const { t } = useTranslation(["landing", "common"]);

  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-20 px-4 md:px-8 relative z-10">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-7 order-1">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {t("landing:hero.eyebrow")}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-[1.05]">
            <em>{t("landing:hero.title")}</em>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            <Trans
              i18nKey="landing:hero.subtitle"
              components={[<strong className="text-foreground font-medium" />]}
            />
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" className="px-8 text-base btn-glow" asChild>
              <Link to="/contact">{t("landing:hero.primaryCta")}</Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-base btn-glow" asChild>
              <Link to="/products">{t("landing:hero.secondaryCta")}</Link>
            </Button>
          </div>
        </div>
        <div className="order-2 md:pl-6">
          <LiveYieldCard />
        </div>
      </div>
    </section>
  );
}
