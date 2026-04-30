import { useTranslation } from "react-i18next";
import { LIVE_YIELDS, PRIMARY_EUR_YIELD } from "@/data/liveYields";

export function LiveYieldCard() {
  const { t } = useTranslation("landing");
  const usd = LIVE_YIELDS.find((y) => y.productKey === "cash-and-carry")!;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none" />
      <div className="relative bg-background border border-border p-7 md:p-8 shadow-[0_24px_60px_-30px_hsl(var(--primary)/0.4),0_8px_20px_-12px_hsl(var(--foreground)/0.12)]">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {t("yieldCard.eyebrow")}
          </p>
          <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-success">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Live
          </span>
        </div>
        <div className="flex items-end gap-3 mb-6">
          <span className="text-5xl md:text-6xl font-serif font-semibold leading-none tabular-nums">
            {PRIMARY_EUR_YIELD.rateLabel}
          </span>
          <span className="text-[11px] uppercase tracking-wider px-2.5 py-1 bg-success/10 text-success border border-success/20 mb-2">
            {t("yieldCard.badge")}
          </span>
        </div>
        <div className="border-t border-border pt-5 space-y-3.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("yieldCard.rowEur")}</span>
            <span className="font-mono font-semibold text-foreground tabular-nums">
              {PRIMARY_EUR_YIELD.rateLabel}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("yieldCard.rowUsd")}</span>
            <span className="font-mono font-semibold text-foreground tabular-nums">
              {usd.rateLabel}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{t("yieldCard.rowLiquidity")}</span>
            <span className="font-medium text-foreground">{t("yieldCard.liquidityValue")}</span>
          </div>
        </div>
        <p className="text-[11px] text-muted-foreground/80 mt-6 pt-4 border-t border-border leading-relaxed">
          {t("yieldCard.footer")}
        </p>
      </div>
    </div>
  );
}
