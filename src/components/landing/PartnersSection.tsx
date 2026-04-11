import { Separator } from "@/components/ui/separator";

const partners = [
  {
    role: "Asset Management",
    name: "Amundi",
    description: "Europe's largest asset manager. Responsible for portfolio allocation and fund structuring.",
  },
  {
    role: "Yield Provider",
    name: "BNP Paribas",
    description: "Global Tier-1 counterparty for Total Return Swaps. Ensures yield generation on sovereign assets.",
  },
  {
    role: "Custodian",
    name: "CACEIS",
    description: "Crédit Agricole's custody arm. Your assets are held in segregated accounts, never on Quercus's balance sheet.",
  },
  {
    role: "Auditor",
    name: "PwC",
    description: "Independent audit of fund valuation, compliance, and operational integrity.",
  },
];

export function PartnersSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif">
            <em>Institutional Infrastructure</em>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Double protection: the solvency of a Tier-1 bank combined with
            ownership of a liquid sovereign asset portfolio. Funds are never on Quercus's balance sheet.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {partners.map((p) => (
            <div key={p.name} className="bg-background p-8 space-y-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.role}</p>
              <p className="text-2xl font-serif font-semibold">{p.name}</p>
              <Separator />
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
