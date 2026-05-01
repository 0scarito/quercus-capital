import { useTranslation } from "react-i18next";
import { LIVE_YIELDS, PRIMARY_EUR_YIELD } from "@/data/liveYields";

export function LiveYieldCard() {
  const { t } = useTranslation("landing");
  const usd = LIVE_YIELDS.find((y) => y.productKey === "cash-and-carry")!;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-3 bg-gradient-to-br from-primary/8 to-transparent blur-2xl pointer-events-none" />
      <div className="relative bg-background border border-border p-7 md:p-8 shadow-sm">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
          {t("yieldCard.eyebrow")}
        </p>
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
