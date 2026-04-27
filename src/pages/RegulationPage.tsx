import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Scale, Building2, BookOpen, BadgeCheck } from "lucide-react";

const registrations = [
  {
    icon: BadgeCheck,
    label: "ORIAS",
    value: "n° 24004789",
    desc: "Conseiller en Investissements Financiers (CIF), enregistré au registre unique des intermédiaires en assurance, banque et finance.",
  },
  {
    icon: Building2,
    label: "CNCEF",
    value: "Membre",
    desc: "Membre de la Chambre Nationale des Conseils Experts Financiers, association professionnelle agréée par l'AMF.",
  },
  {
    icon: Scale,
    label: "AMF",
    value: "Supervisé",
    desc: "Activités placées sous la supervision de l'Autorité des Marchés Financiers via notre association professionnelle agréée.",
  },
  {
    icon: BookOpen,
    label: "RC Pro",
    value: "Couverture en vigueur",
    desc: "Assurance responsabilité civile professionnelle conforme aux exigences réglementaires de l'article L. 541-3 du CMF.",
  },
];

const frameworks = [
  {
    title: "Conseil en Investissements Financiers (CIF)",
    body: "Notre statut CIF, encadré par les articles L. 541-1 et suivants du Code monétaire et financier, nous permet de délivrer des recommandations personnalisées sur des instruments financiers, dans le strict respect d'un devoir de conseil documenté.",
  },
  {
    title: "MIF II / MiFID II",
    body: "Toutes nos recommandations s'inscrivent dans le cadre de la directive européenne MIF II : adéquation, transparence des coûts, gouvernance produit et meilleure exécution sont systématiquement appliquées.",
  },
  {
    title: "LCB-FT",
    body: "Procédures complètes de lutte contre le blanchiment et le financement du terrorisme : KYC renforcé, vérification d'identité, contrôle des bénéficiaires effectifs, surveillance continue des opérations.",
  },
  {
    title: "RGPD",
    body: "Conformité totale au Règlement Général sur la Protection des Données : traitement minimal, hébergement européen, droits d'accès, rectification et effacement garantis.",
  },
];

export default function RegulationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        {/* Hero */}
        <section className="py-24 md:py-32 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Régulation</p>
              <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
                <em>Un cadre réglementaire<br />sans compromis.</em>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Quercus Capital est un cabinet français enregistré et supervisé. Chaque recommandation,
                chaque opération, chaque communication s'inscrit dans un cadre légal strict.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Registrations */}
        <section className="py-14 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
                <em>Nos enregistrements</em>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {registrations.map((r) => (
                  <GlassCard key={r.label} className="p-6 flex items-start gap-4">
                    <div className="h-10 w-10 flex items-center justify-center bg-primary/10 border border-primary/20 shrink-0">
                      <r.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{r.label}</p>
                      <p className="text-lg font-serif font-semibold text-primary">{r.value}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Frameworks */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
                <em>Cadres applicables</em>
              </h2>
              <div className="space-y-4">
                {frameworks.map((f) => (
                  <GlassCard key={f.title} className="p-6 md:p-8 space-y-2">
                    <h3 className="text-xl font-serif font-semibold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Documents */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <GlassCard className="p-10 md:p-14 space-y-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Documentation</p>
                <h2 className="text-3xl md:text-4xl font-serif"><em>Tout est documenté</em></h2>
                <p className="text-muted-foreground max-w-2xl">
                  Lettre de mission, déclaration d'adéquation, document d'entrée en relation, politique de
                  gestion des conflits d'intérêts, procédure de réclamation : l'ensemble de notre documentation
                  réglementaire vous est remise dès l'ouverture de votre dossier.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild><Link to="/mentions-legales">Mentions légales</Link></Button>
                  <Button asChild variant="outline"><Link to="/confidentialite">Confidentialité</Link></Button>
                  <Button asChild variant="outline"><Link to="/contact">Demander un document</Link></Button>
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