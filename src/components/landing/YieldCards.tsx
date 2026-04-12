import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  { name: "Quercus Euro", currency: "EUR", yield: "2,20%", flag: "🇪🇺" },
  { name: "Quercus Dollar", currency: "USD", yield: "4,00%", flag: "🇺🇸" },
  { name: "Quercus Pound", currency: "GBP", yield: "4,00%", flag: "🇬🇧" },
  { name: "Quercus Swiss Franc", currency: "CHF", yield: "0,10%", flag: "🇨🇭" },
];

export function YieldCards() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          <em>Transparence totale,</em> rendements nets
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto text-sm">
          Taux nets de frais payés quotidiennement par la contrepartie bancaire (BNP Paribas).
        </p>

        {/* Featured EUR card */}
        <div className="flex justify-center mb-6">
          <Link to="/products" className="w-full max-w-md">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{products[0].flag}</span>
                  <div>
                    <p className="text-4xl font-serif font-semibold text-success">{products[0].yield}</p>
                    <p className="text-sm text-muted-foreground">rendement net en {products[0].currency}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Other 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {products.slice(1).map((p) => (
            <Link to="/products" key={p.currency}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{p.flag}</span>
                    <div>
                      <p className="text-2xl font-serif font-semibold text-success">{p.yield}</p>
                      <p className="text-xs text-muted-foreground">rendement net en {p.currency}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
