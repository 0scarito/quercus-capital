import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    name: "Quercus Euro",
    currency: "EUR",
    yield: "2,20%",
    backing: "TRS-backed — Amundi",
    isin: "FR001401XXXX",
    fees: "0,10%",
    liquidity: "T+0",
    minDeposit: "1 €",
    domicile: "France",
    description:
      "Fonds monétaire adossé à un Total Return Swap sur obligations souveraines de la zone euro. Rendement quotidien, liquidité intra-journalière.",
  },
  {
    name: "Quercus Dollar",
    currency: "USD",
    yield: "4,00%",
    backing: "US Treasury Bills",
    isin: "FR0014015LE1",
    fees: "0,23%",
    liquidity: "T+1",
    minDeposit: "$1",
    domicile: "France",
    description:
      "Investissement direct dans des bons du Trésor américain à court terme. Rendement aligné sur le marché monétaire US.",
  },
  {
    name: "Quercus Pound",
    currency: "GBP",
    yield: "4,00%",
    backing: "Short-term Gilts",
    isin: "FR001401YYYY",
    fees: "0,15%",
    liquidity: "T+1",
    minDeposit: "£1",
    domicile: "France",
    description:
      "Portefeuille de Gilts britanniques à court terme offrant un rendement compétitif en livre sterling.",
  },
  {
    name: "Quercus Swiss Franc",
    currency: "CHF",
    yield: "0,10%",
    backing: "Swiss Gov. Bonds",
    isin: "FR001401ZZZZ",
    fees: "0,10%",
    liquidity: "T+1",
    minDeposit: "1 CHF",
    domicile: "France",
    description:
      "Exposition aux obligations d'État suisses. Rendement modéré, stabilité maximale en franc suisse.",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <div className="pt-16">
        {/* Hero */}
        <section className="py-24 md:py-32 px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight">
                <em>Nos Produits</em>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Quatre fonds souverains, quatre devises. Rendement quotidien net de frais,
                liquidité immédiate, fonds jamais au bilan de Quercus.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Product Details */}
        <section className="pb-20 px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            {products.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 100}>
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        {p.currency}
                      </p>
                      <h2 className="text-3xl font-serif">
                        <em>{p.name}</em>
                      </h2>
                    </div>
                    <p className="text-4xl font-serif font-semibold text-success">
                      {p.yield}
                    </p>
                  </div>
                  <Separator />
                  <p className="text-muted-foreground leading-relaxed max-w-3xl">
                    {p.description}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Sous-jacent</p>
                      <p className="font-medium">{p.backing}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">ISIN</p>
                      <p className="font-mono text-xs">{p.isin}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Frais</p>
                      <p className="font-medium">{p.fees}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Liquidité</p>
                      <p className="font-medium">{p.liquidity}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Dépôt min.</p>
                      <p className="font-medium">{p.minDeposit}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-6 bg-card">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-serif text-center mb-12">
                <em>Comparatif</em>
              </h2>
              <div className="border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider">Fonds</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Devise</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Rendement</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Frais</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Liquidité</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">ISIN</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p.name}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="font-mono">{p.currency}</TableCell>
                        <TableCell className="text-success font-medium">{p.yield}</TableCell>
                        <TableCell>{p.fees}</TableCell>
                        <TableCell>{p.liquidity}</TableCell>
                        <TableCell className="font-mono text-xs">{p.isin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif">
                <em>Commencez à générer du rendement dès aujourd'hui.</em>
              </h2>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="px-10" asChild>
                  <Link to="/signin">Ouvrir un compte</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10" asChild>
                  <Link to="/#calculator">Simuler un placement</Link>
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
