import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { LiveYieldCard } from "@/components/landing/LiveYieldCard";

export function HeroSection() {
  const { t } = useTranslation(["landing", "common"]);
  const titleWords = (t("landing:hero.title") as string).split(" ");

  return (
    <section className="pt-16 md:pt-24 pb-12 md:pb-20 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-12 md:gap-14 items-center">
        <div className="space-y-7 order-1">
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {t("landing:hero.eyebrow")}
            </p>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-[1.05]">
            <em>
              {titleWords.map((word, i) => (
                <span
                  key={i}
                  className="inline-block opacity-0 animate-[fade-in_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                >
                  {word}
                  {i < titleWords.length - 1 && "\u00A0"}
                </span>
              ))}
            </em>
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
        <div className="order-2 md:pl-4 md:-mr-4 lg:-mr-6 [perspective:1400px]">
          <div className="md:[transform:rotateY(-6deg)_rotateX(2deg)] transition-transform duration-700 hover:[transform:rotateY(-2deg)_rotateX(0deg)]">
            <LiveYieldCard />
          </div>
        </div>
      </div>
    </section>
  );
}
