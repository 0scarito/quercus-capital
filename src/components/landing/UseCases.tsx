import { GlassCard } from "@/components/landing/GlassCard";
import { useTilt } from "@/hooks/useTilt";
import { Separator } from "@/components/ui/separator";

const cases = [
  { segment: "Start-ups", description: "Entreprises financées par du VC : déployez votre capital dormant tout en gardant une liquidité immédiate pour la paie et les opérations." },
  { segment: "PME", description: "PME industrielles avec des flux saisonniers : obtenez un rendement compétitif sur vos réserves sans bloquer votre capital." },
  { segment: "Holdings", description: "Family offices et structures holding : gestion de trésorerie institutionnelle avec transparence et conservation séparée." },
  { segment: "Fintechs", description: "Intégration API-first pour les sociétés de paiement et néobanques. Rendement en marque blanche pour vos clients." },
];

function CaseCard({ c }: { c: typeof cases[0] }) {
  const tilt = useTilt(4);
  return (
    <GlassCard
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className="p-8 space-y-4"
    >
      <h3 className="text-2xl font-serif"><em>{c.segment}</em></h3>
      <Separator />
      <p className="text-muted-foreground leading-relaxed">{c.description}</p>
    </GlassCard>
  );
}

export function UseCases() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          <em>À qui s'adresse Quercus</em>
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-14 max-w-2xl mx-auto">
          Quercus est conçu pour les organisations qui exigent davantage de leur trésorerie.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c) => (
            <CaseCard key={c.segment} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
