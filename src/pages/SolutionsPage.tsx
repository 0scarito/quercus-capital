import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Landmark, Bitcoin, User, Factory, Cpu, Home, Users } from "lucide-react";

const segments = [
  {
    name: "Start-ups",
    icon: Cpu,
    tagline: "Optimisez votre runway.",
    description:
      "Entreprises financées par du capital-risque : déployez votre trésorerie dormante dans des instruments à rendement quotidien tout en conservant une liquidité immédiate pour la paie et les opérations.",
    yields: "EUR 2,20% · USD 4,00%",
  },
  {
    name: "Holdings",
    icon: Landmark,
    tagline: "Gestion institutionnelle, transparence totale.",
    description:
      "Family offices et structures holding : accédez à une gestion de trésorerie de qualité institutionnelle avec une transparence complète et une conservation séparée de vos actifs.",
    yields: "EUR 2,20% · GBP 4,00%",
  },
  {
    name: "Entreprises Crypto",
    icon: Bitcoin,
    tagline: "Sécurisez vos réserves fiat.",
    description:
      "Sociétés de l'écosystème blockchain : placez vos réserves en devises traditionnelles dans des instruments souverains sécurisés, avec une liquidité T+0 pour saisir les opportunités de marché.",
    yields: "USD 4,00% · CHF 0,10%",
  },
  {
    name: "Freelances",
    icon: User,
    tagline: "Faites fructifier chaque euro.",
    description:
      "Indépendants et consultants : transformez votre épargne de précaution en source de rendement quotidien sans immobiliser votre capital. Aucun minimum de dépôt.",
    yields: "EUR 2,20%",
  },
  {
    name: "PME",
    icon: Factory,
    tagline: "Rendement sur vos flux saisonniers.",
    description:
      "PME industrielles et commerciales avec des flux de trésorerie saisonniers : obtenez un rendement compétitif sur vos réserves sans les bloquer dans des dépôts à terme.",
    yields: "EUR 2,20% · USD 4,00%",
  },
  {
    name: "Fintechs",
    icon: Cpu,
    tagline: "Intégration API-first.",
    description:
      "Intégration de trésorerie API-first pour les sociétés de paiement et néobanques. Produits de rendement en marque blanche pour vos clients finaux.",
    yields: "Multi-devises",
  },
  {
    name: "SCI",
    icon: Home,
    tagline: "Valorisez votre trésorerie immobilière.",
    description:
      "Sociétés civiles immobilières : placez les liquidités entre deux acquisitions ou les provisions de charges dans des instruments souverains à rendement quotidien.",
    yields: "EUR 2,20%",
  },
  {
    name: "Particuliers",
    icon: Users,
    tagline: "L'épargne institutionnelle accessible.",
    description:
      "Investisseurs particuliers : accédez aux mêmes instruments souverains que les institutions. Rendement quotidien, liquidité immédiate, fonds jamais au bilan de Quercus.",
    yields: "EUR 2,20% · USD 4,00%",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-24 md:py-32 px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight">
                <em>À qui s'adresse Quercus ?</em>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Quercus est conçu pour les organisations et les individus qui exigent
                davantage de leur trésorerie. Découvrez la solution adaptée à votre profil.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Segments Grid */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {segments.map((s, i) => (
              <ScrollReveal key={s.name} delay={i * 80}>
                <div className="bg-background p-10 space-y-5 h-full">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {s.name}
                    </p>
                  </div>
                  <h3 className="text-2xl font-serif">
                    <em>{s.tagline}</em>
                  </h3>
                  <Separator />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                  <p className="text-xs font-mono text-success">{s.yields}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif">
                <em>Prêt à optimiser votre trésorerie ?</em>
              </h2>
              <p className="text-muted-foreground">
                Ouvrez un compte en quelques minutes ou échangez avec notre équipe.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="px-10" asChild>
                  <Link to="/signin">Ouvrir un compte</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10">
                  Nous contacter
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
