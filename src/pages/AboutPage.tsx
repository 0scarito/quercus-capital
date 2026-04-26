import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, Users, ExternalLink } from "lucide-react";

const team = [
  { initials: "AB", name: "Alexandre Bernard", role: "Conseiller en Gestion de Patrimoine", reg: "CIF ORIAS 24004789" },
  { initials: "CL", name: "Claire Laurent", role: "Conseillère en Gestion de Patrimoine", reg: "CIF ORIAS 24004789" },
  { initials: "JM", name: "Julien Marchand", role: "Responsable Conformité", reg: "Membre CNCEF" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Indépendance",
    desc: "Aucun conflit d'intérêts. Nos recommandations sont guidées uniquement par votre situation et vos objectifs.",
  },
  {
    icon: Sparkles,
    title: "Transparence",
    desc: "Frais clairs, rendements nets, documentation complète. Vous savez toujours ce que vous payez et ce que vous gagnez.",
  },
  {
    icon: Users,
    title: "Accompagnement humain",
    desc: "Un conseiller dédié, joignable, qui prend le temps de comprendre votre situation et de répondre à vos questions.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        {/* Hero */}
        <section className="py-24 md:py-32 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Notre mission</p>
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
                <em>Une gestion de patrimoine<br />à hauteur d'institution.</em>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Quercus Capital est un cabinet français de Conseil en Gestion de Patrimoine, dédié aux dirigeants,
                familles et entreprises qui veulent faire travailler leur épargne avec rigueur, simplicité et transparence.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Notre approche */}
        <section className="py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12"><em>Notre approche</em></h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} delay={i * 80}>
                  <GlassCard className="p-8 h-full">
                    <v.icon className="h-6 w-6 text-primary mb-4" />
                    <h3 className="text-xl font-serif font-semibold mb-3"><em>{v.title}</em></h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{v.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Notre équipe */}
        <section className="py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12"><em>Notre équipe</em></h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((m, i) => (
                <ScrollReveal key={m.name} delay={i * 80}>
                  <GlassCard className="p-8 h-full text-center">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-2xl font-serif mx-auto mb-4">
                      {m.initials}
                    </div>
                    <h3 className="text-lg font-serif font-semibold"><em>{m.name}</em></h3>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{m.role}</p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-3 border-t border-white/30 pt-3">
                      {m.reg}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Nos agréments */}
        <section className="py-14 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-10"><em>Nos agréments</em></h2>
              <GlassCard className="p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">AMF</p>
                    <p className="text-xs text-muted-foreground mt-1">Autorité des Marchés Financiers</p>
                    <p className="text-[11px] text-muted-foreground mt-2">CGP — supervisé par l'AMF</p>
                  </div>
                  <div className="border-x border-white/20">
                    <p className="text-2xl font-serif font-semibold text-primary">ORIAS</p>
                    <p className="text-xs text-muted-foreground mt-1">CIF &amp; COA</p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-2">n° 24004789</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">CNCEF</p>
                    <p className="text-xs text-muted-foreground mt-1">Chambre Nationale</p>
                    <p className="text-[11px] text-muted-foreground mt-2">Membre actif</p>
                  </div>
                </div>
                <a
                  href="https://www.orias.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-primary hover:underline pt-4 border-t border-white/30"
                >
                  Vérifier notre enregistrement sur le registre public ORIAS
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="text-[11px] text-muted-foreground text-center">
                  Quercus Capital — RCS Paris 928 443 001 · Siège : 231 rue Saint-Honoré, 75001 Paris.
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif"><em>Rencontrons-nous.</em></h2>
              <p className="text-muted-foreground">
                Un premier échange, sans engagement, pour comprendre vos objectifs et voir comment nous pouvons vous accompagner.
              </p>
              <Button size="lg" className="px-12 btn-glow" asChild>
                <Link to="/contact">Prendre rendez-vous</Link>
              </Button>
            </div>
          </ScrollReveal>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
