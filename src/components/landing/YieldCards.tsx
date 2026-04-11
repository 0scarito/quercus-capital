import { Card, CardContent } from "@/components/ui/card";

const products = [
  { name: "Quercus Euro", currency: "EUR", yield: "2,20%", backing: "TRS-backed" },
  { name: "Quercus Dollar", currency: "USD", yield: "4,00%", backing: "T-Bills" },
  { name: "Quercus Pound", currency: "GBP", yield: "4,00%", backing: "Short-term Gilts" },
  { name: "Quercus Swiss Franc", currency: "CHF", yield: "0,10%", backing: "Swiss Gov. Bonds" },
];

export function YieldCards() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          <em>Live Yield Tracker</em>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Net annualized yields, updated daily. Capital invested in sovereign and quasi-sovereign instruments.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Card key={p.name} className="text-center">
              <CardContent className="pt-8 pb-8 space-y-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.currency}</p>
                <p className="text-4xl font-serif font-semibold text-success">{p.yield}</p>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.backing}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
