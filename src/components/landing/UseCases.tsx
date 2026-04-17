import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { Rocket, Building2, Users, Briefcase, Cpu, User, Landmark, Bitcoin, ArrowRight } from "lucide-react";

const cases = [
  { slug: "startups", label: "Start-ups", icon: Rocket, desc: "Capital VC déployé, liquidité immédiate." },
  { slug: "pme", label: "PME", icon: Building2, desc: "Réserves saisonnières, rendement compétitif." },
  { slug: "holdings", label: "Holdings", icon: Landmark, desc: "Family offices, gestion institutionnelle." },
  { slug: "fintechs", label: "Fintechs", icon: Cpu, desc: "Intégration API-first, marque blanche." },
  { slug: "freelances", label: "Freelances", icon: Briefcase, desc: "Trésorerie individuelle optimisée." },
  { slug: "particuliers", label: "Particuliers", icon: User, desc: "Épargne courante rémunérée quotidiennement." },
  { slug: "sci", label: "SCI", icon: Users, desc: "Gestion patrimoniale et locative." },
  { slug: "crypto", label: "Crypto natives", icon: Bitcoin, desc: "Trésorerie stablecoin et fiat hybride." },
];

export function UseCases() {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
              Une <em>solution universelle</em>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">
              PME, start-ups, holdings, freelances, particuliers : Quercus s'adresse à toute organisation
              qui exige davantage de sa trésorerie.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 border border-border/60">
          {cases.map((c, i) => (
            <ScrollReveal key={c.slug} delay={i * 50}>
              <Link
                to={`/solutions/${c.slug}`}
                className="group bg-background hover:bg-card transition-all duration-300 p-6 md:p-8 flex flex-col h-full min-h-[180px] relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <c.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-semibold mb-2">
                  <em>{c.label}</em>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                  {c.desc}
                </p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
