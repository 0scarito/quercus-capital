import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { CountUp } from "@/components/landing/CountUp";
import { AdvisorThresholdSection } from "@/components/landing/AdvisorThresholdSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Anchor, ExternalLink } from "lucide-react";
import { RiskScale } from "@/components/landing/RiskScale";
import { VelvetSecurityArchitecture } from "@/components/landing/VelvetSecurityArchitecture";
import { VelvetPerformanceChart } from "@/components/landing/VelvetPerformanceChart";
import { VelvetCollateralDonut } from "@/components/landing/VelvetCollateralDonut";
import velvetAnchorImg from "@/assets/velvet-anchor.jpg";
import velvetPedestalImg from "@/assets/velvet-pedestal.jpg";
import velvetMirrorImg from "@/assets/velvet-mirror.jpg";
import { useTranslation } from "react-i18next";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Seo } from "@/components/Seo";

export default function VelvetPage() {
  const { t } = useTranslation("products");
  const characteristics = (t("velvet.characteristics.rows", { returnObjects: true }) as Record<string, [string, string, string]>) || {};
  const swapSteps = t("velvet.swapSteps", { returnObjects: true }) as Record<string, string>;
  const pillars = t("velvet.pillars", { returnObjects: true }) as Record<string, string>;
  const regCard = t("velvet.regCard", { returnObjects: true }) as Record<string, string>;
  const faqItems = (t("velvet.faq", { returnObjects: true }) as Array<{ q: string; a: string }>) || [];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Seo title="Quercus Velvet — Fonds monétaire institutionnel | Quercus Capital" description="Quercus Velvet : fonds monétaire à rendement quotidien, collatéralisé et liquide pour la trésorerie d'entreprise." path="/products/velvet" />

      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        {/* HERO */}
        <section className="py-20 md:py-28 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1 font-mono tracking-wider">
                {t("velvet.badge")}
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-[1.1] flex items-center justify-center gap-4">
                <Anchor className="hidden md:block h-10 w-10 text-primary/40" strokeWidth={1.2} aria-hidden />
                <em>{t("velvet.heroTitle")}</em>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                {t("velvet.heroSubtitle")}
              </p>
              <div className="flex justify-center pt-2">
                <Button asChild size="lg" className="px-10 py-6 text-base btn-glow">
                  <Link to="/open-account">{t("velvet.ctaInvest")}</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* KEY METRICS */}
        <section className="pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("velvet.metrics.yield")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  {t("velvet.metrics.yieldValue")}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                  {t("velvet.metrics.yieldDetail")}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">{t("velvet.metrics.yieldNote")}</p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("velvet.metrics.risk")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  {t("velvet.metrics.riskValue")}<span className="text-muted-foreground/60 text-2xl">/7</span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">
                  {t("velvet.metrics.riskNote")}
                  <a href="#risk-detail" className="text-success hover:underline ml-0.5">*</a>
                </p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("velvet.metrics.liquidity")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  {t("velvet.metrics.liquidityValue")}
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">{t("velvet.metrics.liquidityNote")}</p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("velvet.metrics.security")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  {t("velvet.metrics.securityValue")}
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">{t("velvet.metrics.securityNote")}</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* MIRROR SWAP */}
        <section className="py-14 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <div className="space-y-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
                    {t("velvet.swapEyebrow")}
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                    <em>{t("velvet.swapTitle")}</em>
                  </h2>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t("velvet.swapP2")}
                  </p>

                  <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {[
                      { n: "01", title: swapSteps.s1Title, desc: swapSteps.s1Desc },
                      { n: "02", title: swapSteps.s2Title, desc: swapSteps.s2Desc },
                      { n: "03", title: swapSteps.s3Title, desc: swapSteps.s3Desc },
                    ].map((s) => (
                      <li key={s.n} className="border-l border-primary/30 pl-4 py-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
                          {t("velvet.stepLabel", { n: s.n })}
                        </span>
                        <h3 className="font-serif italic text-base mt-1 mb-1">{s.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                      </li>
                    ))}
                  </ol>

                  <p className="text-foreground/90 leading-relaxed pt-2 text-base md:text-lg">
                    {t("velvet.swapResult")}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* STRATEGY */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  {t("velvet.methodEyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>{t("velvet.methodTitle")}</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-8 md:space-y-12">
              {[
                { step: "01", title: pillars.p1Title, desc: pillars.p1Desc, img: velvetAnchorImg, alt: pillars.p1Alt, reverse: false },
                { step: "02", title: pillars.p2Title, desc: pillars.p2Desc, img: velvetPedestalImg, alt: pillars.p2Alt, reverse: true },
                { step: "03", title: pillars.p3Title, desc: pillars.p3Desc, img: velvetMirrorImg, alt: pillars.p3Alt, reverse: false },
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
                        {t("velvet.stepLabel", { n: item.step })}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-serif leading-tight">
                        <em>{item.title}</em>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* KEY STATS */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  {t("velvet.stats.eyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>{t("velvet.stats.title")}</em>
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">{t("velvet.stats.subtitle")}</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
              <GlassCard className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("velvet.stats.aum")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  €<CountUp end={424.35} decimals={2} suffix=" M" />
                </p>
              </GlassCard>
              <GlassCard className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("velvet.stats.interest")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  €<CountUp end={47.2} decimals={1} suffix=" M" />
                </p>
              </GlassCard>
              <GlassCard className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("velvet.stats.outperf")}</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  +<CountUp end={54} decimals={0} suffix=" bps" />
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">{t("velvet.stats.outperfNote")}</p>
              </GlassCard>
            </div>

            <ScrollReveal delay={120}>
              <GlassCard className="p-6 md:p-10">
                <VelvetPerformanceChart />
              </GlassCard>
            </ScrollReveal>

            <p className="text-[11px] text-muted-foreground text-center mt-6 max-w-3xl mx-auto leading-relaxed">
              {t("velvet.stats.disclaimer")}
            </p>
          </div>
        </section>

        {/* COLLATERAL */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  {t("velvet.collateralEyebrow")}
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>{t("velvet.collateralTitle")}</em>
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">{t("velvet.collateralSubtitle")}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <GlassCard className="p-8 md:p-10">
                <VelvetCollateralDonut />
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* CHARACTERISTICS */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>{t("velvet.characteristicsTitle")}</em>
              </h2>
              <GlassCard className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider min-w-[220px]">{t("velvet.characteristics.header")}</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">{t("velvet.characteristics.i2")}</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">{t("velvet.characteristics.i3")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(characteristics).map(([key, row]) => (
                      <TableRow key={key}>
                        <TableCell className="font-medium text-muted-foreground">{row[0]}</TableCell>
                        <TableCell className="font-mono text-sm">{row[1]}</TableCell>
                        <TableCell className="font-mono text-sm">{row[2]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* SECURITY */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
                <em>{t("velvet.secTitle")}</em>
              </h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
                {t("velvet.secSubtitle")}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <VelvetSecurityArchitecture />
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollReveal>
                <GlassCard className="p-8 h-full" id="risk-detail">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {t("velvet.riskCardEyebrow")}
                  </p>
                  <RiskScale level={1} label={t("velvet.riskCardLabel")} />
                  <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                    {t("velvet.riskCardNote")}
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal>
                <GlassCard className="p-8 h-full flex flex-col">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    {t("velvet.ratingTitle")}
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                      <p className="text-2xl font-serif font-semibold text-primary">AA-</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Fitch</p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-semibold text-primary">A1</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Moody's</p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-semibold text-primary">A+</p>
                      <p className="text-[11px] text-muted-foreground mt-1">S&amp;P</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm flex-1">
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">{regCard.structure}</span>
                      <span className="font-mono">{regCard.structureValue}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">{regCard.manager}</span>
                      <span className="font-mono">{regCard.managerValue}</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <span className="text-muted-foreground">{regCard.auditor}</span>
                      <span className="font-mono">{regCard.auditorValue}</span>
                    </li>
                  </ul>
                  <a
                    href="https://geco.amf-france.org/Bio/rech_opcvm.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    {t("velvet.verifyAmf")}
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
                <em>{t("velvet.faqTitle")}</em>
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
        <section className="py-20 md:py-16 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif">
                <em>{t("velvet.ctaTitle")}</em>
              </h2>
              <p className="text-lg text-muted-foreground">{t("velvet.ctaSubtitle")}</p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="px-12 py-6 text-base btn-glow" asChild>
                  <Link to="/contact">{t("velvet.ctaBookMeeting")}</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-12 py-6 text-base btn-glow" asChild>
                  <Link to="/contact">{t("velvet.ctaContactUs")}</Link>
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
