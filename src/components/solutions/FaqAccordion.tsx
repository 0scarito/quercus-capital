import { ScrollReveal } from "@/components/landing/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export function FaqAccordion() {
  const { t } = useTranslation("products");
  const faqs = (t("solutionsFaq.items", { returnObjects: true }) as Array<{ q: string; a: string }>) || [];
  return (
    <section className="py-24 px-4 md:px-8">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-serif text-center">
            <em>{t("solutionsFaq.title")}</em>
          </h2>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white/40 backdrop-blur-sm border border-white/20 px-6"
              >
                <AccordionTrigger className="text-left font-serif text-lg hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollReveal>
    </section>
  );
}
