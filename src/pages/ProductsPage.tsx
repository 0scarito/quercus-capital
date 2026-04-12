import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { CountUp } from "@/components/landing/CountUp";
import { useTilt } from "@/hooks/useTilt";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import quercusLogo from "@/assets/quercus-logo.jpg";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const products = [
  {
    name: "Quercus Euro", currency: "EUR", yield: 2.2, flag: "🇪🇺",
    backing: "TRS-backed — Amundi", isin: "FR001401XXXX", fees: "0,10%",
    liquidity: "T+0", minDeposit: "1 €", domicile: "France",
    description: "Fonds monétaire adossé à un Total Return Swap sur obligations souveraines de la zone euro. Rendement quotidien, liquidité intra-journalière.",
  },
  {
    name: "Quercus Dollar", currency: "USD", yield: 4.0, flag: "🇺🇸",
    backing: "US Treasury Bills", isin: "FR0014015LE1", fees: "0,23%",
    liquidity: "T+1", minDeposit: "$1", domicile: "France",
    description: "Investissement direct dans des bons du Trésor américain à court terme. Rendement aligné sur le marché monétaire US.",
  },
  {
    name: "Quercus Pound", currency: "GBP", yield: 4.0, flag: "🇬🇧",
    backing: "Short-term Gilts", isin: "FR001401YYYY", fees: "0,15%",
    liquidity: "T+1", minDeposit: "£1", domicile: "France",
    description: "Portefeuille de Gilts britanniques à court terme offrant un rendement compétitif en livre sterling.",
  },
  {
    name: "Quercus Swiss Franc", currency: "CHF", yield: 0.1, flag: "🇨🇭",
    backing: "Swiss Gov. Bonds", isin: "FR001401ZZZZ", fees: "0,10%",
    liquidity: "T+1", minDeposit: "1 CHF", domicile: "France",
    description: "Exposition aux obligations d'État suisses. Rendement modéré, stabilité maximale en franc suisse.",
  },
];

function ProductDetailCard({ p, i }: { p: typeof products[0]; i: number }) {
  const tilt = useTilt(4);
  return (
    <ScrollReveal delay={i * 100}>
      <GlassCard
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        className="p-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={quercusLogo} alt="" className="h-5 w-auto opacity-40" />
            <span className="text-2xl">{p.flag}</span>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.currency}</p>
              <h2 className="text-2xl font-serif"><em>{p.name}</em></h2>
            </div>
          </div>
          <p className="text-4xl font-serif font-semibold text-success">
            <CountUp end={p.yield} decimals={2} suffix="%" />
          </p>
        </div>
        <Separator className="my-4" />
        <p className="text-muted-foreground leading-relaxed mb-6">{p.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          {[
            { label: "Sous-jacent", value: p.backing },
            { label: "ISIN", value: p.isin, mono: true },
            { label: "Frais", value: p.fees, mono: true },
            { label: "Liquidité", value: p.liquidity, mono: true },
            { label: "Dépôt min.", value: p.minDeposit, mono: true },
          ].map((spec) => (
            <div key={spec.label}>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{spec.label}</p>
              <p className={spec.mono ? "font-mono text-xs" : "font-medium"}>{spec.value}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
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

        <section className="pb-20 px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            {products.map((p, i) => (
              <ProductDetailCard key={p.name} p={p} i={i} />
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-serif text-center mb-12">
                <em>Comparatif</em>
              </h2>
              <GlassCard className="overflow-hidden">
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
                        <TableCell className="text-success font-medium">{p.yield.toFixed(2)}%</TableCell>
                        <TableCell className="font-mono text-xs">{p.fees}</TableCell>
                        <TableCell className="font-mono text-xs">{p.liquidity}</TableCell>
                        <TableCell className="font-mono text-xs">{p.isin}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </GlassCard>
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
                <Button size="lg" className="px-10 btn-glow" asChild>
                  <Link to="/open-account">Ouvrir un compte</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10 btn-glow" asChild>
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
