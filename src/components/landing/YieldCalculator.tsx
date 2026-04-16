import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { GlassCard } from "@/components/landing/GlassCard";

const currencies = [
  { code: "EUR", rate: 0.022 },
  { code: "USD", rate: 0.04 },
  { code: "GBP", rate: 0.04 },
  { code: "CHF", rate: 0.001 },
];

export function YieldCalculator() {
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [amount, setAmount] = useState(1000000);
  const [duration, setDuration] = useState(6);

  const currency = currencies[currencyIndex];
  const interest = amount * (currency.rate / 12) * duration;

  const formatAmount = (v: number) =>
    new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(v);

  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-serif">
            <em>Simulateur de rendement</em>
          </h2>
          <p className="text-primary-foreground/70">
            Estimez les intérêts générés sur votre trésorerie.
          </p>
        </div>

        <div className="space-y-8">
          {/* Currency */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-widest text-primary-foreground/60">Devise</label>
            <div className="flex gap-3">
              {currencies.map((c, i) => (
                <button
                  key={c.code}
                  onClick={() => setCurrencyIndex(i)}
                  className={`px-5 py-2 border text-sm transition-all duration-200 ${
                    i === currencyIndex
                      ? "bg-primary-foreground text-primary"
                      : "border-primary-foreground/30 text-primary-foreground/70 hover:opacity-80"
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs uppercase tracking-widest text-primary-foreground/60">Montant</label>
              <span className="text-xl font-serif">{formatAmount(amount)} {currency.code}</span>
            </div>
            <Slider
              value={[amount]}
              onValueChange={(v) => setAmount(v[0])}
              min={10000}
              max={10000000}
              step={10000}
              className="[&_[role=slider]]:bg-primary-foreground [&_[role=slider]]:border-primary-foreground [&_.relative]:bg-primary-foreground/20 [&_[data-orientation=horizontal]>.absolute]:bg-primary-foreground"
            />
            <div className="flex justify-between text-xs text-primary-foreground/50">
              <span>10 000</span>
              <span>10 000 000</span>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs uppercase tracking-widest text-primary-foreground/60">Durée</label>
              <span className="text-xl font-serif">{duration} mois</span>
            </div>
            <Slider
              value={[duration]}
              onValueChange={(v) => setDuration(v[0])}
              min={1}
              max={12}
              step={1}
              className="[&_[role=slider]]:bg-primary-foreground [&_[role=slider]]:border-primary-foreground [&_.relative]:bg-primary-foreground/20 [&_[data-orientation=horizontal]>.absolute]:bg-primary-foreground"
            />
            <div className="flex justify-between text-xs text-primary-foreground/50">
              <span>1 mois</span>
              <span>12 mois</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <GlassCard className="!bg-primary-foreground/10 !border-primary-foreground/20 text-primary-foreground py-8 text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Intérêts générés</p>
          <p className="text-5xl font-serif font-semibold">
            {formatAmount(Math.round(interest))} {currency.code}
          </p>
          <p className="text-sm text-primary-foreground/60">
            à {(currency.rate * 100).toFixed(2)}% annualisé sur {duration} mois
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
