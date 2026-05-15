import { useParallax } from "@/hooks/useParallax";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { QuercusShield } from "@/components/QuercusShield";
import { Trans, useTranslation } from "react-i18next";

export function SecuritySection() {
  const { t } = useTranslation("landing");
  const parallax = useParallax(14);

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div
        className="max-w-[1600px] mx-auto"
        onMouseMove={parallax.onMouseMove}
        onMouseLeave={parallax.onMouseLeave}
      >
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <QuercusShield size={240} />
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight">
                <em>{t("security.title")}</em>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                <Trans
                  i18nKey="landing:security.body"
                  components={[<strong className="text-foreground" />]}
                />
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
                <div>
                  <p className="text-2xl font-serif font-semibold text-primary">BNP Paribas</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                    {t("security.depositary")}
                  </p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl font-serif font-semibold text-primary">AMF</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                    {t("security.regulator")}
                  </p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <p className="text-2xl font-serif font-semibold text-primary">{t("security.segregation")}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                    {t("security.offBalance")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
