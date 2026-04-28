import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { GlassCard } from "@/components/landing/GlassCard";
import { useTranslation } from "react-i18next";

const products = [
  { label: "Smart Cash · EUR", code: "EUR", rate: 0.0342 },
  { label: "Smart Cash · USD", code: "USD", rate: 0.0510 },
  { label: "Cash & Carry · EUR", code: "EUR", rate: 0.0481 },
  { label: "Cash & Carry · USD", code: "USD", rate: 0.0525 },
];

export function YieldCalculator() {
  const { t, i18n } = useTranslation("landing");
  const [productIndex, setProductIndex] = useState(0);
  const [amount, setAmount] = useState(500000);
  const [duration, setDuration] = useState(6);

  const product = products[productIndex];
  const interest = amount * (product.rate / 12) * duration;

  const locale = (i18n.resolvedLanguage || "fr") === "en" ? "en-GB" : "fr-FR";
  const formatAmount = (v: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(v);

  const monthsLabel = duration === 1 ? t("calculator.monthSingular") : t("calculator.months");

  return (
    <section className="py-16 px-4 md:px-8 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-serif">
            <em>{t("calculator.title")}</em>
          </h2>
          <p className="text-sm text-primary-foreground/70">{t("calculator.subtitle")}</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-primary-foreground/60">
              Produit
            </label>
            <div className="grid grid-cols-2 gap-2">
              {products.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setProductIndex(i)}
                  className={`px-4 py-2 border text-xs transition-all duration-200 ${
                    i === productIndex
                      ? "bg-primary-foreground text-primary"
                      : "border-primary-foreground/30 text-primary-foreground/70 hover:opacity-80"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs uppercase tracking-widest text-primary-foreground/60">
                {t("calculator.amount")}
              </label>
              <span className="text-lg font-serif">{formatAmount(amount)} {product.code}</span>
            </div>
            <Slider
              value={[amount]}
              onValueChange={(v) => setAmount(v[0])}
              min={10000}
              max={5000000}
              step={10000}
              className="[&_[role=slider]]:bg-primary-foreground [&_[role=slider]]:border-primary-foreground [&_.relative]:bg-primary-foreground/20 [&_[data-orientation=horizontal]>.absolute]:bg-primary-foreground"
            />
            <div className="flex justify-between text-xs text-primary-foreground/50">
              <span>{formatAmount(10000)}</span>
              <span>{formatAmount(5000000)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="text-xs uppercase tracking-widest text-primary-foreground/60">
                {t("calculator.duration")}
              </label>
              <span className="text-lg font-serif">{duration} {monthsLabel}</span>
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
              <span>1 {t("calculator.monthSingular")}</span>
              <span>12 {t("calculator.months")}</span>
            </div>
          </div>
        </div>

        <GlassCard className="!bg-primary-foreground/10 !border-primary-foreground/20 text-primary-foreground py-6 text-center space-y-1">
          <p className="text-xs uppercase tracking-widest text-primary-foreground/60">
            {t("calculator.interestGenerated")}
          </p>
          <p className="text-4xl font-serif font-semibold">
            {formatAmount(Math.round(interest))} {product.code}
          </p>
          <p className="text-xs text-primary-foreground/60">
            {t("calculator.annualised", { rate: (product.rate * 100).toFixed(2), duration })}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
