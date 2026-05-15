import { GlassCard } from "@/components/landing/GlassCard";
import { useTranslation } from "react-i18next";
import { PRIMARY_EUR_YIELD } from "@/data/liveYields";

export function LiveNumbers() {
  const { t } = useTranslation("landing");

  const tiles: { value: string; label: string; note: string }[] = [
    { value: PRIMARY_EUR_YIELD.rateLabel, label: t("live.rate"), note: t("live.rateNote") },
    { value: t("yieldCard.liquidityValue"), label: t("live.liquidity"), note: t("live.liquidityNote") },
    { value: "0 %", label: t("live.fees"), note: t("live.feesNote") },
    { value: "AMF", label: t("live.regulator"), note: t("live.regulatorNote") },
  ];

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif">
            <em>{t("live.title")}</em>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">{t("live.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {tiles.map((tile) => (
            <GlassCard key={tile.label} className="p-8 md:p-10 text-center space-y-2">
              <p className="text-3xl md:text-4xl font-serif font-semibold tabular-nums">
                {tile.value}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {tile.label}
              </p>
              <p className="text-[11px] text-muted-foreground/80">{tile.note}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
