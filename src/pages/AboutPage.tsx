import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, Users, ExternalLink } from "lucide-react";
import audreyPhoto from "@/assets/team-audrey.jpg";
import davidPhoto from "@/assets/team-david.png";
import thomasPhoto from "@/assets/team-thomas.jpg";

const team = [
  {
    photo: audreyPhoto,
    name: "Audrey Gary Nicolaou",
    role: "Présidente — Fondatrice",
    reg: "CIF ORIAS 24004789",
    bio: "Fondatrice de Quercus Capital, Audrey conjugue plus de 20 ans d'expérience dans la finance institutionnelle pour offrir une gestion patrimoniale d'exception, alliant rigueur, indépendance et vision long terme.",
  },
  {
    photo: davidPhoto,
    name: "David Niddam",
    role: "Directeur Général",
    reg: "Diplômé HEC Paris",
    bio: "David pilote la stratégie et le développement de Quercus. Fort d'une carrière dans la gestion d'actifs et le conseil aux dirigeants, il garantit la qualité de service et la performance des solutions proposées.",
  },
  {
    photo: thomasPhoto,
    name: "Thomas Bazin",
    role: "Directeur des Opérations",
    reg: "Membre CNCEF",
    bio: "Thomas supervise l'ensemble des opérations, de la conformité à l'expérience client. Son expertise opérationnelle assure une exécution sans faille de chaque mandat confié à Quercus.",
  },
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 [perspective:1500px]">
              {team.map((m, i) => (
                <ScrollReveal key={m.name} delay={i * 80}>
                  <button
                    type="button"
                    onClick={(e) => e.currentTarget.classList.toggle("is-flipped")}
                    className="group relative w-full h-[420px] [transform-style:preserve-3d] transition-transform duration-700 ease-out hover:[transform:rotateY(180deg)] [&.is-flipped]:[transform:rotateY(180deg)] focus:outline-none"
                    aria-label={`Voir plus d'informations sur ${m.name}`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      <GlassCard className="p-6 h-full text-center flex flex-col">
                        <div className="h-40 w-40 rounded-full overflow-hidden mx-auto mb-5 ring-2 ring-white/40 shadow-md">
                          <img
                            src={m.photo}
                            alt={m.name}
                            className="h-full w-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-lg font-serif font-semibold"><em>{m.name}</em></h3>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{m.role}</p>
                        <p className="text-[11px] font-mono text-muted-foreground mt-3 border-t border-white/30 pt-3">
                          {m.reg}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-primary/70 mt-auto pt-4">
                          Cliquez pour en savoir plus
                        </p>
                      </GlassCard>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <GlassCard className="p-8 h-full text-left flex flex-col bg-primary/95 text-primary-foreground">
                        <h3 className="text-xl font-serif font-semibold"><em>{m.name}</em></h3>
                        <p className="text-xs uppercase tracking-wider opacity-80 mt-1 mb-5">{m.role}</p>
                        <p className="text-sm leading-relaxed opacity-95">{m.bio}</p>
                        <p className="text-[11px] font-mono opacity-70 mt-auto pt-4 border-t border-primary-foreground/20">
                          {m.reg}
                        </p>
                      </GlassCard>
                    </div>
                  </button>
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
