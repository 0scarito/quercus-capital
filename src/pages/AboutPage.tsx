import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, Users, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import audreyPhoto from "@/assets/team-audrey.jpg";
import davidPhoto from "@/assets/team-david.png";
import thomasPhoto from "@/assets/team-thomas.jpg";

export default function AboutPage() {
  const { t } = useTranslation("pages");

  const team = [
    { key: "audrey", photo: audreyPhoto, name: "Audrey Gary Nicolaou" },
    { key: "david", photo: davidPhoto, name: "David Niddam" },
    { key: "thomas", photo: thomasPhoto, name: "Thomas Bazin" },
  ] as const;

  const values = [
    { icon: ShieldCheck, key: "v1" },
    { icon: Sparkles, key: "v2" },
    { icon: Users, key: "v3" },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        <section className="py-24 md:py-32 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("about.eyebrow")}</p>
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight whitespace-pre-line">
                <em>{t("about.heroTitle")}</em>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {t("about.heroSubtitle")}
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12"><em>{t("about.approachTitle")}</em></h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <ScrollReveal key={v.key} delay={i * 80}>
                  <GlassCard className="p-8 h-full">
                    <v.icon className="h-6 w-6 text-primary mb-4" />
                    <h3 className="text-xl font-serif font-semibold mb-3"><em>{t(`about.values.${v.key}Title`)}</em></h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{t(`about.values.${v.key}Desc`)}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12"><em>{t("about.teamTitle")}</em></h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1500px]">
              {team.map((m, i) => (
                <ScrollReveal key={m.name} delay={i * 80}>
                  <button
                    type="button"
                    onClick={(e) => e.currentTarget.classList.toggle("is-flipped")}
                    className="group relative w-full h-[420px] [transform-style:preserve-3d] transition-transform duration-700 ease-out hover:[transform:rotateY(180deg)] [&.is-flipped]:[transform:rotateY(180deg)] focus:outline-none"
                    aria-label={t("about.cardAria", { name: m.name })}
                  >
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      <GlassCard className="p-6 h-full text-center flex flex-col">
                        <div className="h-40 w-40 rounded-full overflow-hidden mx-auto mb-5 ring-2 ring-white/40 shadow-md">
                          <img src={m.photo} alt={m.name} className="h-full w-full object-cover object-top" loading="lazy" />
                        </div>
                        <h3 className="text-lg font-serif font-semibold"><em>{m.name}</em></h3>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{t(`about.team.${m.key}.role`)}</p>
                        <p className="text-[11px] font-mono text-muted-foreground mt-3 border-t border-white/30 pt-3">
                          {t(`about.team.${m.key}.reg`)}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-primary/70 mt-auto pt-4">
                          {t("about.cardCta")}
                        </p>
                      </GlassCard>
                    </div>
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <GlassCard className="p-8 h-full text-left flex flex-col bg-primary/95 text-primary-foreground">
                        <h3 className="text-xl font-serif font-semibold"><em>{m.name}</em></h3>
                        <p className="text-xs uppercase tracking-wider opacity-80 mt-1 mb-5">{t(`about.team.${m.key}.role`)}</p>
                        <p className="text-sm leading-relaxed opacity-95">{t(`about.team.${m.key}.bio`)}</p>
                        <p className="text-[11px] font-mono opacity-70 mt-auto pt-4 border-t border-primary-foreground/20">
                          {t(`about.team.${m.key}.reg`)}
                        </p>
                      </GlassCard>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-10"><em>{t("about.approvalsTitle")}</em></h2>
              <GlassCard className="p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">AMF</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("about.approvals.amfLabel")}</p>
                    <p className="text-[11px] text-muted-foreground mt-2">{t("about.approvals.amfDesc")}</p>
                  </div>
                  <div className="border-x border-white/20">
                    <p className="text-2xl font-serif font-semibold text-primary">ORIAS</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("about.approvals.oriasLabel")}</p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-2">{t("about.approvals.oriasDesc")}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">CNCEF</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("about.approvals.cncefLabel")}</p>
                    <p className="text-[11px] text-muted-foreground mt-2">{t("about.approvals.cncefDesc")}</p>
                  </div>
                </div>
                <a
                  href="https://www.orias.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-primary hover:underline pt-4 border-t border-white/30"
                >
                  {t("about.approvals.verify")}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="text-[11px] text-muted-foreground text-center">
                  {t("about.approvals.footer")}
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-24 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif"><em>{t("about.ctaTitle")}</em></h2>
              <p className="text-muted-foreground">{t("about.ctaSubtitle")}</p>
              <Button size="lg" className="px-12 btn-glow" asChild>
                <Link to="/contact">{t("about.ctaButton")}</Link>
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
