import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { GlassCard } from "@/components/landing/GlassCard";
import { useTranslation } from "react-i18next";

const currencies = [
  { code: "EUR", rate: 0.022 },
  { code: "USD", rate: 0.04 },
  { code: "GBP", rate: 0.04 },
  { code: "CHF", rate: 0.001 },
];

export function YieldCalculator() {
  const { t, i18n } = useTranslation("landing");
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [amount, setAmount] = useState(1000000);
  const [duration, setDuration] = useState(6);

  const currency = currencies[currencyIndex];
  const interest = amount * (currency.rate / 12) * duration;

  const locale = (i18n.resolvedLanguage || "fr") === "en" ? "en-GB" : "fr-FR";
  const formatAmount = (v: number) =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(v);

  const monthsLabel = duration === 1 ? t("calculator.monthSingular") : t("calculator.months");

  return (
    <section className="py-24 px-4 md:px-8 bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-serif">
            <em>{t("calculator.title")}</em>
          </h2>
          <p className="text-primary-foreground/70">{t("calculator.subtitle")}</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-widest text-primary-foreground/60">
              {t("calculator.currency")}
            </label>
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

          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs uppercase tracking-widest text-primary-foreground/60">
                {t("calculator.amount")}
              </label>
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
              <span>{formatAmount(10000)}</span>
              <span>{formatAmount(10000000)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <label className="text-xs uppercase tracking-widest text-primary-foreground/60">
                {t("calculator.duration")}
              </label>
              <span className="text-xl font-serif">{duration} {monthsLabel}</span>
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

        <GlassCard className="!bg-primary-foreground/10 !border-primary-foreground/20 text-primary-foreground py-8 text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-primary-foreground/60">
            {t("calculator.interestGenerated")}
          </p>
          <p className="text-5xl font-serif font-semibold">
            {formatAmount(Math.round(interest))} {currency.code}
          </p>
          <p className="text-sm text-primary-foreground/60">
            {t("calculator.annualised", { rate: (currency.rate * 100).toFixed(2), duration })}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
