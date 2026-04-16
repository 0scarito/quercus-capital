import { ScrollReveal } from "@/components/landing/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quels sont les frais réels ?",
    a: "Quercus applique des frais de gestion de 0,25% par an, déjà déduits du rendement net affiché. Il n'y a aucun frais d'entrée, de sortie, de tenue de compte ou de retrait. Le rendement que vous voyez est le rendement que vous percevez.",
  },
  {
    q: "Comment mon argent est-il protégé ?",
    a: "Vos fonds ne sont jamais détenus par Quercus. Ils sont conservés par CACEIS, filiale du groupe Crédit Agricole et premier dépositaire européen. Cette ségrégation totale signifie que votre capital reste protégé même en cas de défaillance de Quercus.",
  },
  {
    q: "Puis-je retirer mon argent un dimanche ?",
    a: "Vous pouvez soumettre une demande de retrait à tout moment, y compris le week-end. Les demandes sont traitées les jours ouvrés. Pour toute demande effectuée avant 12h25 un jour ouvré, vos fonds sont disponibles le jour même (liquidité T+0).",
  },
  {
    q: "Quercus est-il régulé ?",
    a: "Oui. Quercus est enregistré en tant que Conseiller en Investissements Financiers (CIF) et Courtier en Assurance (COA) auprès de l'ORIAS (n°24004789). Nous sommes soumis à la supervision de l'AMF et respectons les obligations réglementaires en matière de lutte anti-blanchiment (LCB-FT).",
  },
];

export function FaqAccordion() {
  return (
    <section className="py-24 px-4 md:px-8">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-serif text-center">
            <em>Questions fréquentes</em>
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
