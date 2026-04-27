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

const pillars = [
  {
    icon: ShieldCheck,
    title: "Ségrégation totale des fonds",
    desc: "Vos actifs ne transitent jamais par le bilan de Quercus. Ils sont déposés chez CACEIS (groupe Crédit Agricole), premier dépositaire européen, sur des comptes ségrégués à votre nom.",
  },
  {
    icon: Lock,
    title: "Custody institutionnelle",
    desc: "Les actifs numériques sont conservés en cold storage multi-signature chez Taurus et BitGo Trust, tous deux régulés et assurés contre les risques de perte ou compromission.",
  },
  {
    icon: Server,
    title: "Infrastructure auditée",
    desc: "Plateforme hébergée en Europe, chiffrement AES-256 au repos, TLS 1.3 en transit, monitoring 24/7, plan de continuité d'activité testé chaque trimestre.",
  },
  {
    icon: FileCheck2,
    title: "Audits indépendants",
    desc: "Comptes annuels audités par PwC. Audits techniques et de sécurité conduits par des cabinets externes spécialisés. Reporting de valorisation indépendant produit par CACEIS.",
  },
  {
    icon: Eye,
    title: "Transparence totale",
    desc: "Vous accédez en temps réel à vos positions, vos performances et vos frais. Documentation réglementaire complète disponible : DICI, prospectus, rapports annuels.",
  },
  {
    icon: KeyRound,
    title: "Authentification forte",
    desc: "2FA obligatoire, sessions chiffrées, gestion granulaire des accès pour les comptes corporates, journal d'audit complet de toutes les opérations sensibles.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        {/* Hero */}
        <section className="py-24 md:py-32 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Sécurité</p>
              <div className="flex justify-center">
                <QuercusShield size={200} />
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
                <em>Votre capital, protégé<br />comme une institution.</em>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Quercus n'est jamais détenteur de vos fonds. Chaque maillon de notre chaîne de
                confiance est régulé, audité et indépendant — pour que votre épargne reste
                protégée, quelles que soient les circonstances.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Architecture */}
        <section className="py-14 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 space-y-3">
                <h2 className="text-3xl md:text-4xl font-serif"><em>Notre chaîne de confiance</em></h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Cinq acteurs régulés, indépendants les uns des autres, garantissent la
                  conservation, la valorisation et le contrôle de vos actifs.
                </p>
              </div>
              <SecurityArchitecture />
            </ScrollReveal>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
                <em>Six piliers de sécurité</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillars.map((p) => (
                  <GlassCard key={p.title} className="p-6 space-y-3">
                    <div className="h-10 w-10 flex items-center justify-center bg-primary/10 border border-primary/20">
                      <p.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Audits */}
        <section id="audits" className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <GlassCard className="p-10 md:p-14 space-y-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Audits & contrôles</p>
                <h2 className="text-3xl md:text-4xl font-serif"><em>Contrôlés en continu</em></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">PwC</p>
                    <p className="text-sm text-muted-foreground mt-1">Audit annuel des comptes et des procédures internes.</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">CACEIS</p>
                    <p className="text-sm text-muted-foreground mt-1">Valorisation indépendante quotidienne et reporting réglementaire.</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-semibold text-primary">Pen-tests</p>
                    <p className="text-sm text-muted-foreground mt-1">Tests d'intrusion semestriels conduits par des cabinets externes.</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif"><em>Une question sur notre sécurité ?</em></h2>
              <p className="text-muted-foreground">
                Notre équipe conformité est à votre disposition pour répondre à toutes vos questions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg"><Link to="/contact">Prendre rendez-vous</Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/regulation">Voir notre cadre réglementaire</Link></Button>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>
      <LandingFooter />
    </div>
  );
}