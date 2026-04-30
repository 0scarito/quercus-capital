import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Scale, Building2, BookOpen, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function RegulationPage() {
  const { t } = useTranslation("pages");

  const registrations = [
    { icon: BadgeCheck, key: "orias" },
    { icon: Building2, key: "cncef" },
    { icon: Scale, key: "amf" },
    { icon: BookOpen, key: "rc" },
  ] as const;

  const frameworks = [
    { key: "cif" },
    { key: "mif" },
    { key: "aml" },
    { key: "gdpr" },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        <section className="py-24 md:py-32 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("regulation.eyebrow")}</p>
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight whitespace-pre-line">
                <em>{t("regulation.heroTitle")}</em>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("regulation.heroSubtitle")}
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
                <em>{t("regulation.registrationsTitle")}</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registrations.map((r) => (
                  <GlassCard key={r.key} className="p-6 flex items-start gap-4">
                    <div className="h-10 w-10 flex items-center justify-center bg-primary/10 border border-primary/20 shrink-0">
                      <r.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{t(`regulation.registrations.${r.key}Label`)}</p>
                      <p className="text-lg font-serif font-semibold text-primary">{t(`regulation.registrations.${r.key}Value`)}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t(`regulation.registrations.${r.key}Desc`)}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
                <em>{t("regulation.frameworksTitle")}</em>
              </h2>
              <div className="space-y-4">
                {frameworks.map((f) => (
                  <GlassCard key={f.key} className="p-6 md:p-8 space-y-2">
                    <h3 className="text-xl font-serif font-semibold">{t(`regulation.frameworks.${f.key}Title`)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(`regulation.frameworks.${f.key}Body`)}</p>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <GlassCard className="p-10 md:p-14 space-y-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("regulation.docsEyebrow")}</p>
                <h2 className="text-3xl md:text-4xl font-serif"><em>{t("regulation.docsTitle")}</em></h2>
                <p className="text-muted-foreground max-w-2xl">{t("regulation.docsBody")}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild><Link to="/mentions-legales">{t("regulation.docsLegal")}</Link></Button>
                  <Button asChild variant="outline"><Link to="/confidentialite">{t("regulation.docsPrivacy")}</Link></Button>
                  <Button asChild variant="outline"><Link to="/contact">{t("regulation.docsRequest")}</Link></Button>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>
      </div>
      <LandingFooter />
    </div>
  );
}
