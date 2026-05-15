import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

export function Testimonials() {
  const { t } = useTranslation("landing");
  const items = ["sophie", "laurent", "couple"] as const;

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-[1500px] mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-14 max-w-3xl mx-auto">
            <em>{t("testimonials.title")}</em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((k) => (
            <figure
              key={k}
              className="bg-background border border-border p-7 md:p-8 flex flex-col"
            >
              <blockquote className="text-base text-foreground/90 leading-relaxed font-serif italic flex-1">
                « {t(`testimonials.items.${k}.quote`)} »
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border">
                <p className="text-sm font-medium text-foreground">
                  {t(`testimonials.items.${k}.name`)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(`testimonials.items.${k}.role`)}
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-2">
                  {t(`testimonials.items.${k}.context`)}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
