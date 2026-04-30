import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { QuercusShield } from "@/components/QuercusShield";
import { SecurityArchitecture } from "@/components/landing/SecurityArchitecture";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Server, FileCheck2, Eye, KeyRound } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SecurityPage() {
  const { t } = useTranslation("pages");

  const pillars = [
    { icon: ShieldCheck, key: "p1" },
    { icon: Lock, key: "p2" },
    { icon: Server, key: "p3" },
    { icon: FileCheck2, key: "p4" },
    { icon: Eye, key: "p5" },
    { icon: KeyRound, key: "p6" },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        <section className="py-24 md:py-32 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("security.eyebrow")}</p>
              <div className="flex justify-center">
                <QuercusShield size={200} />
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight whitespace-pre-line">
                <em>{t("security.heroTitle")}</em>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("security.heroSubtitle")}
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 space-y-3">
                <h2 className="text-3xl md:text-4xl font-serif"><em>{t("security.archTitle")}</em></h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{t("security.archSubtitle")}</p>
              </div>
              <SecurityArchitecture />
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
                <em>{t("security.pillarsTitle")}</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillars.map((p) => (
                  <GlassCard key={p.key} className="p-6 space-y-3">
                    <div className="h-10 w-10 flex items-center justify-center bg-primary/10 border border-primary/20">
                      <p.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold">{t(`security.pillars.${p.key}Title`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`security.pillars.${p.key}Desc`)}</p>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="audits" className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <GlassCard className="p-10 md:p-14 space-y-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("security.auditsEyebrow")}</p>
                <h2 className="text-3xl md:text-4xl font-serif"><em>{t("security.auditsTitle")}</em></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">PwC</p>
                    <p className="text-sm text-muted-foreground mt-1">{t("security.audits.pwcDesc")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">CACEIS</p>
                    <p className="text-sm text-muted-foreground mt-1">{t("security.audits.caceisDesc")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">{t("security.audits.pentestLabel")}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t("security.audits.pentestDesc")}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif"><em>{t("security.ctaTitle")}</em></h2>
              <p className="text-muted-foreground">{t("security.ctaSubtitle")}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg"><Link to="/contact">{t("security.ctaPrimary")}</Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/regulation">{t("security.ctaSecondary")}</Link></Button>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
      <LandingFooter />
    </div>
  );
}
