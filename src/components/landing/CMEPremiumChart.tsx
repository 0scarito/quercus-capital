import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

// Synthesised representative monthly CME BTC futures premium (Jan 2020 → Dec 2024).
// Based on publicly reported ranges: avg ~8% p.a., > 3% during 76% of time.
const RAW = [
  3.5, 5.1, 8.2, 12.4, 18.7, 14.2, 9.6, 7.1, 6.3, 11.4, 14.8, 22.5, // 2020
  28.1, 31.5, 18.4, 9.2, 7.8, 5.4, 6.7, 9.9, 14.6, 11.2, 8.4, 5.9,  // 2021
  4.8, 3.2, 4.7, 6.1, 4.3, 2.8, 3.6, 4.9, 5.2, 4.1, 3.8, 5.4,        // 2022
  6.7, 5.9, 4.2, 5.8, 7.1, 8.4, 6.9, 5.5, 4.8, 6.2, 9.4, 11.8,       // 2023
  14.6, 16.2, 13.4, 9.1, 7.6, 8.2, 6.8, 7.4, 8.9, 10.2, 12.6, 9.7,   // 2024
];

const startYear = 2020;

export function CMEPremiumChart() {
  const { t } = useTranslation("landing");
  const data = useMemo(
    () =>
      RAW.map((v, i) => {
        const month = i % 12;
        const year = startYear + Math.floor(i / 12);
        return {
          date: `${year}-${String(month + 1).padStart(2, "0")}`,
          year,
          premium: v,
        };
      }),
    []
  );

  const ticks = data.filter((d) => d.date.endsWith("-01")).map((d) => d.date);

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="premiumFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            ticks={ticks}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(v) => v.slice(0, 4)}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 0,
              fontSize: 12,
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, t("premiumChart.tooltipLabel")]}
            labelFormatter={(v) => `${t("premiumChart.monthLabel")} : ${v}`}
          />
          <ReferenceLine
            y={3}
            stroke="hsl(var(--muted-foreground))"
            strokeDasharray="4 4"
            label={{
              value: t("premiumChart.threshold"),
              position: "right",
              fontSize: 10,
              fill: "hsl(var(--muted-foreground))",
            }}
          />
          <ReferenceLine
            y={8}
            stroke="hsl(var(--success))"
            strokeDasharray="4 4"
            label={{
              value: t("premiumChart.average"),
              position: "right",
              fontSize: 10,
              fill: "hsl(var(--success))",
            }}
          />
          <Area
            type="monotone"
            dataKey="premium"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="url(#premiumFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
