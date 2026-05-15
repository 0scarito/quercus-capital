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
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";

const STEP_ICONS = [Calendar, Compass, ShieldCheck];

export default function PortefeuilleConseillePage() {
  const { t } = useTranslation("products");
  const metrics = [
    { label: t("portefeuille.metrics.currencies"), value: t("portefeuille.metrics.currenciesValue") },
    { label: t("portefeuille.metrics.liquidity"), value: t("portefeuille.metrics.liquidityValue") },
    { label: t("portefeuille.metrics.fees"), value: t("portefeuille.metrics.feesValue") },
    { label: t("portefeuille.metrics.risk"), value: t("portefeuille.metrics.riskValue") },
  ];
  const steps = [1, 2, 3].map((n, i) => ({
    icon: STEP_ICONS[i],
    title: t(`portefeuille.steps.s${n}Title`),
    desc: t(`portefeuille.steps.s${n}Desc`),
  }));
  const faqItems = (t("portefeuille.faq", { returnObjects: true }) as Array<{ q: string; a: string }>) || [];
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Seo title="Portefeuille conseillé | Quercus Capital" description="Portefeuille conseillé Quercus : allocation sur-mesure pilotée par nos conseillers patrimoniaux." path="/products/portefeuille-conseille" />

      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        <section className="py-20 md:py-28 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1 font-mono tracking-wider">
                {t("portefeuille.badge")}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
                <em>{t("portefeuille.title")}</em>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("portefeuille.subtitle")}
              </p>
              <div className="flex items-center justify-center gap-4 pt-4 flex-wrap">
                <Button size="lg" className="px-10 btn-glow" asChild>
                  <Link to="/contact">{t("portefeuille.ctaBook")}</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10" asChild>
                  <Link to="/products">{t("portefeuille.ctaProducts")}</Link>
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
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-4"><em>{t("portefeuille.approachTitle")}</em></h2>
            </ScrollReveal>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto text-center">
              {t("portefeuille.approachBody")}
            </p>
          </div>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12"><em>{t("portefeuille.stepsTitle")}</em></h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <ScrollReveal key={s.title} delay={i * 100}>
                  <GlassCard className="p-8 h-full">
                    <s.icon className="h-6 w-6 text-primary mb-4" />
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{t("common.stepLabel", { n: i + 1 })}</p>
                    <h3 className="text-xl font-serif font-semibold mb-3"><em>{s.title}</em></h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button size="lg" className="px-12 btn-glow" asChild>
                <Link to="/contact">{t("common.bookMeeting")}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-10"><em>{t("portefeuille.faqTitle")}</em></h2>
              <GlassCard className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, i) => (
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
            <h2 className="text-3xl md:text-4xl font-serif"><em>{t("portefeuille.ctaTitle")}</em></h2>
            <p className="text-muted-foreground">
              {t("portefeuille.ctaDisclaimer")}
            </p>
            <Button size="lg" className="px-12 btn-glow" asChild>
              <Link to="/contact">{t("common.bookMeeting")}</Link>
            </Button>
          </div>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
