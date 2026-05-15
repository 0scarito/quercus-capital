import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { AdvisorThresholdSection } from "@/components/landing/AdvisorThresholdSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Leaf, ExternalLink } from "lucide-react";
import { RiskScale } from "@/components/landing/RiskScale";
import { SecurityArchitecture } from "@/components/landing/SecurityArchitecture";
import { CashAndCarryDiagram } from "@/components/landing/CashAndCarryDiagram";
import { TobamAnalytics } from "@/components/landing/TobamAnalytics";
import strategyPositionImg from "@/assets/strategy-position.jpg";
import strategyThresholdImg from "@/assets/strategy-threshold.jpg";
import strategyCarbonImg from "@/assets/strategy-carbon.jpg";
import { useTranslation } from "react-i18next";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
import { Seo } from "@/components/Seo";
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default function TobamPage() {
  const { t } = useTranslation("products");
  const characteristics = (t("tobam.characteristics.rows", { returnObjects: true }) as Record<string, [string, string]>) || {};
  const pillars = t("tobam.pillars", { returnObjects: true }) as Record<string, string>;
  const carrySteps = t("tobam.carrySteps", { returnObjects: true }) as Record<string, string>;
  const regCard = t("tobam.regCard", { returnObjects: true }) as Record<string, string>;
  const faqItems = (t("tobam.faq", { returnObjects: true }) as Array<{ q: string; a: string }>) || [];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Seo title="Quercus Tobam — Stratégie cash-and-carry | Quercus Capital" description="Quercus Tobam : stratégie cash-and-carry à faible empreinte carbone, conçue avec Tobam." path="/products/tobam" />

      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        {/* Hero */}
        <section className="py-20 md:py-28 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1 font-mono tracking-wider">
                {t("tobam.badge")}
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-[1.1]">
                <em>{t("tobam.heroTitle")}</em>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
                <span>{t("tobam.heroLine")}</span>
                <span
                  className="font-mono font-semibold tracking-[0.18em] px-3 py-1 rounded-full text-sm md:text-base"
                  style={{
                    background: "hsl(var(--success))",
                    color: "hsl(var(--background))",
                    boxShadow: "0 0 24px hsl(var(--success) / 0.4)",
                  }}
                >
                  {t("tobam.heroBadge")}
                </span>
                <span>{t("tobam.heroSuffix")}</span>
              </p>
              <div className="flex justify-center pt-2">
                <Button asChild size="lg" className="px-10 py-6 text-base btn-glow">
                  <Link to="/open-account">{t("tobam.ctaInvest")}</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Key Metrics */}
        <section className="pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("tobam.metrics.yield")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  {t("tobam.metrics.yieldValue")}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                  {t("tobam.metrics.yieldDetail")}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">{t("tobam.metrics.yieldNote")}</p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("tobam.metrics.liquidity")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  {t("tobam.metrics.liquidityValue")}
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">{t("tobam.metrics.liquidityNote")}</p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("tobam.metrics.exposure")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  {t("tobam.metrics.exposureValue")}
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">{t("tobam.metrics.exposureNote")}</p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("tobam.metrics.risk")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  {t("tobam.metrics.riskValue")}<span className="text-muted-foreground/60 text-2xl">/7</span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">
                  {t("tobam.metrics.riskNote")}
                  <a
                    href="#risk-detail"
                    className="text-success hover:underline ml-0.5"
                    aria-label={t("tobam.metrics.riskAria")}
                  >
                    *
                  </a>
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* What is Cash & Carry */}
        <section className="py-14 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="space-y-5 mb-12 lg:mb-16">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
                  {t("tobam.carryEyebrow")}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight max-w-5xl">
                  <em>{t("tobam.carryTitle")}</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <ScrollReveal className="lg:col-span-7">
                <div className="space-y-6">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t("tobam.carryP1")}
                  </p>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t("tobam.carryP2")}
                  </p>

                  <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {[
                      { n: "01", t: carrySteps.s1Title, d: carrySteps.s1Desc },
                      { n: "02", t: carrySteps.s2Title, d: carrySteps.s2Desc },
                      { n: "03", t: carrySteps.s3Title, d: carrySteps.s3Desc },
                    ].map((s) => (
                      <li key={s.n} className="border-l border-primary/30 pl-4 py-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
                          {t("tobam.stepLabel", { n: s.n })}
                        </span>
                        <h3 className="font-serif italic text-base mt-1 mb-1">{s.t}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                      </li>
                    ))}
                  </ol>

                  <p className="text-foreground/90 leading-relaxed pt-2 text-base md:text-lg">
                    {t("tobam.carryResult")}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120} className="lg:col-span-5">
                <GlassCard className="p-6 md:p-8 h-full">
                  <CashAndCarryDiagram />
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Strategy details */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  {t("tobam.methodEyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>{t("tobam.methodTitle")}</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-8 md:space-y-12">
              {[
                { step: "01", title: pillars.p1Title, desc: pillars.p1Desc, img: strategyPositionImg, alt: pillars.p1Alt, reverse: false },
                { step: "02", title: pillars.p2Title, desc: pillars.p2Desc, img: strategyThresholdImg, alt: pillars.p2Alt, reverse: true },
                { step: "03", title: pillars.p3Title, desc: pillars.p3Desc, img: strategyCarbonImg, alt: pillars.p3Alt, reverse: false, icon: <Leaf className="h-5 w-5 text-success shrink-0" /> },
              ].map((item) => (
                <ScrollReveal key={item.title}>
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${item.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="lg:col-span-3 max-w-[240px] mx-auto lg:mx-0 w-full">
                      <div className="relative aspect-square overflow-hidden border border-primary/10">
                        <img src={item.img} alt={item.alt} loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="lg:col-span-9 space-y-4">
                      <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                        {t("tobam.stepLabel", { n: item.step })}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-serif leading-tight flex items-center gap-3">
                        {item.icon}
                        <em>{item.title}</em>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={80}>
              <GlassCard className="mt-16 md:mt-20 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="md:w-1/3">
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    {t("tobam.rolling.eyebrow")}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-serif"><em>{t("tobam.rolling.title")}</em></h3>
                </div>
                <p className="md:w-2/3 text-muted-foreground leading-relaxed">{t("tobam.rolling.body")}</p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* Strategy Analytics */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  {t("tobam.stats.eyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>{t("tobam.stats.title")}</em>
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">{t("tobam.stats.subtitle")}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <TobamAnalytics />
            </ScrollReveal>
            <p className="text-[11px] text-muted-foreground text-center mt-6 max-w-3xl mx-auto leading-relaxed">
              {t("tobam.stats.disclaimer")}
            </p>
          </div>
        </section>

        {/* Product characteristics */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>{t("tobam.characteristicsTitle")}</em>
              </h2>
              <GlassCard className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider min-w-[220px]">{t("tobam.characteristics.header")}</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">{t("tobam.characteristics.detail")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(characteristics).map(([key, [field, value]]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium text-muted-foreground">{field}</TableCell>
                        <TableCell className="font-mono text-sm">{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* Security architecture + Risk + AMF */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
                <em>{t("tobam.secTitle")}</em>
              </h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
                {t("tobam.secSubtitle")}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <SecurityArchitecture />
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollReveal>
                <GlassCard className="p-8 h-full" id="risk-detail">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {t("tobam.riskCardEyebrow")}
                  </p>
                  <RiskScale level={2} label={t("tobam.riskCardLabel")} />
                  <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                    {t("tobam.riskCardNote")}
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal>
                <GlassCard className="p-8 h-full flex flex-col">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">{t("tobam.regCardEyebrow")}</p>
                  <ul className="space-y-3 text-sm flex-1">
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">{regCard.structure}</span>
                      <span className="font-mono">{regCard.structureValue}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">{regCard.manager}</span>
                      <span className="font-mono">{regCard.managerValue}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">{regCard.depositary}</span>
                      <span className="font-mono">{regCard.depositaryValue}</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <span className="text-muted-foreground">{regCard.auditor}</span>
                      <span className="font-mono">{regCard.auditorValue}</span>
                    </li>
                  </ul>
                  <a
                    href="https://www.amf-france.org/fr/recherche-acteur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    {t("tobam.verifyAmf")}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>{t("tobam.faqTitle")}</em>
              </h2>
              <GlassCard className="p-8 md:p-12">
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

        {/* CTA */}
        <section className="py-20 md:py-14 md:py-16 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif">
                <em>{t("tobam.ctaTitle")}</em>
              </h2>
              <p className="text-lg text-muted-foreground">{t("tobam.ctaSubtitle")}</p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="px-12 py-6 text-base btn-glow" asChild>
                  <Link to="/contact">{t("tobam.ctaBookMeeting")}</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-12 py-6 text-base btn-glow" asChild>
                  <Link to="/contact">{t("tobam.ctaContactUs")}</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <AdvisorThresholdSection />
        <LandingFooter />
      </div>
    </div>
  );
}
