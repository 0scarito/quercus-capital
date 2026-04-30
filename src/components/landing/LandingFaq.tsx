import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LandingFaq() {
  const { t } = useTranslation("landing");
  const itemsByCategory = (t("faq.items", { returnObjects: true }) as Record<
    string,
    Array<{ q: string; a: string }>
  >) || {};
  const categoryOrder: Array<"security" | "interest" | "advisor"> = [
    "security",
    "interest",
    "advisor",
  ];

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold">
              <em>{t("faq.title")}</em>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">{t("faq.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {categoryOrder.map((key, ci) => {
            const items = Array.isArray(itemsByCategory[key]) ? itemsByCategory[key] : [];
            return (
            <div key={key}>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  0{ci + 1}
                </span>
                <h3 className="text-xl md:text-2xl font-serif italic text-foreground">
                  {t(`faq.categories.${key}`)}
                </h3>
              </div>
              <Accordion type="single" collapsible className="space-y-2">
                {items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${key}-${i}`}
                    className="bg-white/40 backdrop-blur-sm border border-white/20 px-6"
                  >
                    <AccordionTrigger className="text-left font-serif text-base md:text-lg hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
