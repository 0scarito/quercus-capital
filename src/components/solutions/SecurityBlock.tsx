import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { QuercusShield } from "@/components/QuercusShield";
import { Trans, useTranslation } from "react-i18next";

export function SecurityBlock() {
  const { t } = useTranslation("landing");
  return (
    <section className="py-28 px-4 md:px-8">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="flex justify-center">
            <QuercusShield size={220} />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif">
            <em>{t("securityBlock.title")}</em>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t("securityBlock.bodyPrefix")}{" "}
            <strong className="text-foreground">{t("securityBlock.depositaryName")}</strong>
            {t("securityBlock.bodyMid")}{" "}
            <strong className="text-foreground">{t("securityBlock.groupName")}</strong>
            {t("securityBlock.bodySuffix")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold text-primary">{t("securityBlock.depositaryName")}</p>
              <p className="text-sm text-muted-foreground">{t("securityBlock.depositary")}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold text-primary">{t("securityBlock.groupName")}</p>
              <p className="text-sm text-muted-foreground">{t("securityBlock.group")}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-serif font-semibold text-primary">{t("securityBlock.segregation")}</p>
              <p className="text-sm text-muted-foreground">{t("securityBlock.segregationNote")}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
