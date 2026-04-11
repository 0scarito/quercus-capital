import { Separator } from "@/components/ui/separator";

const cases = [
  {
    segment: "Start-ups",
    description: "VC-backed companies optimizing runway. Deploy idle capital into daily-yield instruments while maintaining instant liquidity for payroll and operations.",
  },
  {
    segment: "PMEs",
    description: "Industrial SMEs with seasonal cash flows. Earn a competitive return on reserves without locking capital into term deposits.",
  },
  {
    segment: "Holdings",
    description: "Family offices and holding structures seeking institutional-grade treasury management with full transparency and segregated custody.",
  },
  {
    segment: "Fintechs",
    description: "API-first treasury integration for payment companies and neobanks. White-label yield products for your end customers.",
  },
];

export function UseCases() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          <em>Who We Serve</em>
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-xl mx-auto">
          Quercus is built for organizations that demand more from their treasury.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cases.map((c) => (
            <div key={c.segment} className="space-y-4">
              <h3 className="text-2xl font-serif"><em>{c.segment}</em></h3>
              <Separator />
              <p className="text-muted-foreground leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
