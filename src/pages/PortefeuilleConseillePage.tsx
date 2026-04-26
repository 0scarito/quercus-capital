import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, Compass, ShieldCheck, Users } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const metrics = [
  { label: "Devises", value: "Multi-devises" },
  { label: "Liquidité", value: "Variable" },
  { label: "Frais", value: "Sur devis" },
  { label: "Risque", value: "Adapté à votre profil" },
];

const steps = [
  { icon: Calendar, title: "Prenez rendez-vous", desc: "Échange initial avec votre conseiller pour cerner vos objectifs et votre horizon." },
  { icon: Compass, title: "Co-construction de l'allocation", desc: "Votre CGP propose une allocation sur-mesure : monétaire, obligataire, actions, alternatifs." },
  { icon: ShieldCheck, title: "Mise en place et suivi", desc: "Souscriptions exécutées via nos partenaires régulés. Reporting régulier et points trimestriels." },
];

const faq = [
  {
    q: "À qui s'adresse le Portefeuille Conseillé ?",
    a: "Aux clients souhaitant une allocation patrimoniale sur-mesure, au-delà du simple placement de trésorerie. Ticket d'entrée et frais sont définis avec votre conseiller.",
  },
  {
    q: "Quel est mon rôle dans la gestion ?",
    a: "Vous restez décisionnaire. Votre CGP vous propose des arbitrages que vous validez. Aucune opération n'est effectuée sans votre accord.",
  },
  {
    q: "Quelle est la régulation applicable ?",
    a: "Quercus Capital intervient en qualité de Conseiller en Investissements Financiers (CIF) enregistré ORIAS n° 24004789, et de CGP membre de la CNCEF, sous supervision de l'AMF.",
  },
];

export default function PortefeuilleConseillePage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        <section className="py-20 md:py-28 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1 font-mono tracking-wider">
                CGP · Allocation sur-mesure · CIF ORIAS 24004789
              </Badge>
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
                <em>Portefeuille Conseillé</em>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Une allocation patrimoniale construite avec votre Conseiller en Gestion de Patrimoine,
                adaptée à votre profil de risque, votre horizon et vos objectifs.
              </p>
              <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
                <Button size="lg" className="px-10 btn-glow" asChild>
                  <Link to="/contact">Prendre rendez-vous</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10" asChild>
                  <Link to="/products">Voir tous les produits</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="pb-12 px-4 md:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
            {metrics.map((m) => (
              <GlassCard key={m.label} className="p-6 text-center space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</p>
                <p className="text-xl font-serif font-semibold">{m.value}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-4"><em>Une approche patrimoniale globale</em></h2>
            </ScrollReveal>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto text-center">
              Au-delà des fonds monétaires Smart Cash et Cash &amp; Carry, votre conseiller peut vous proposer
              une allocation sur-mesure intégrant obligations, actions, fonds alternatifs et diversification
              géographique. Chaque proposition est documentée, justifiée et adaptée à votre profil MIF.
            </p>
          </div>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12"><em>Comment investir</em></h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <ScrollReveal key={s.title} delay={i * 100}>
                  <GlassCard className="p-8 h-full">
                    <s.icon className="h-6 w-6 text-primary mb-4" />
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Étape {i + 1}</p>
                    <h3 className="text-xl font-serif font-semibold mb-3"><em>{s.title}</em></h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button size="lg" className="px-12 btn-glow" asChild>
                <Link to="/contact">Prendre rendez-vous</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-10"><em>Questions fréquentes</em></h2>
              <GlassCard className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faq.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-lg font-serif">
                        <em>{item.q}</em>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Users className="h-10 w-10 text-primary mx-auto" />
            <h2 className="text-3xl md:text-4xl font-serif"><em>Construisons votre allocation ensemble.</em></h2>
            <p className="text-muted-foreground">
              Performances passées non garanties · Risque de perte en capital · Net de frais de gestion.
            </p>
            <Button size="lg" className="px-12 btn-glow" asChild>
              <Link to="/contact">Prendre rendez-vous</Link>
            </Button>
          </div>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
