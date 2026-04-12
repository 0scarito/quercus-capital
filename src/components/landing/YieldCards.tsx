import { GlassCard } from "@/components/landing/GlassCard";
import { CountUp } from "@/components/landing/CountUp";
import { useTilt } from "@/hooks/useTilt";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import quercusLogo from "@/assets/quercus-logo.jpg";

const products = [
  { name: "Quercus Euro", currency: "EUR", yield: 2.2, flag: "🇪🇺", isin: "FR001401XXXX", fees: "0,10%", liquidity: "T+0" },
  { name: "Quercus Dollar", currency: "USD", yield: 4.0, flag: "🇺🇸", isin: "FR0014015LE1", fees: "0,23%", liquidity: "T+1" },
  { name: "Quercus Pound", currency: "GBP", yield: 4.0, flag: "🇬🇧", isin: "FR001401YYYY", fees: "0,15%", liquidity: "T+1" },
  { name: "Quercus Swiss Franc", currency: "CHF", yield: 0.1, flag: "🇨🇭", isin: "FR001401ZZZZ", fees: "0,10%", liquidity: "T+1" },
];

function ProductCard({ p }: { p: typeof products[0] }) {
  const tilt = useTilt(5);

  return (
    <Link to="/products">
      <GlassCard
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        className="p-6 cursor-pointer group"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <img src={quercusLogo} alt="" className="h-5 w-auto opacity-40" />
            <span className="text-xl">{p.flag}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <p className="text-4xl font-serif font-semibold text-success mb-1">
          <CountUp end={p.yield} decimals={2} suffix="%" />
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          rendement net en {p.currency}
        </p>
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/30">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ISIN</p>
            <p className="font-mono text-xs mt-0.5">{p.isin}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Frais</p>
            <p className="font-mono text-xs mt-0.5">{p.fees}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Liquidité</p>
            <p className="font-mono text-xs mt-0.5">{p.liquidity}</p>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export function YieldCards() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          <em>Transparence totale,</em> rendements nets
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto text-sm">
          Taux nets de frais payés quotidiennement par la contrepartie bancaire.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.currency} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
