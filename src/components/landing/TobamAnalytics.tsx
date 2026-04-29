import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Line, LineChart, ReferenceLine,
  ReferenceDot,
} from "recharts";
import { GlassCard } from "@/components/landing/GlassCard";

// Backtest TOBAM — courbes mensuelles (Déc 2019 → Mars 2025) reconstituées d'après Slide
const cumulativeData = [
  { date: "Déc-19", strategy: 1.00, credit: 1.00, cash: 1.00 },
  { date: "Juin-20", strategy: 1.06, credit: 0.99, cash: 1.005 },
  { date: "Déc-20", strategy: 1.13, credit: 1.00, cash: 1.008 },
  { date: "Juin-21", strategy: 1.18, credit: 0.99, cash: 1.010 },
  { date: "Déc-21", strategy: 1.20, credit: 0.98, cash: 1.012 },
  { date: "Juin-22", strategy: 1.21, credit: 0.96, cash: 1.020 },
  { date: "Déc-22", strategy: 1.22, credit: 0.97, cash: 1.030 },
  { date: "Juin-23", strategy: 1.27, credit: 0.99, cash: 1.050 },
  { date: "Déc-23", strategy: 1.34, credit: 1.01, cash: 1.075 },
  { date: "Juin-24", strategy: 1.40, credit: 1.03, cash: 1.090 },
  { date: "Déc-24", strategy: 1.46, credit: 1.05, cash: 1.110 },
];

// Yield implicite annualisé — ~64 points pour reproduire la densité de la slide
const yieldSeries: { date: string; yield: number }[] = (() => {
  const seedPoints: [string, number][] = [
    ["Déc-19", 12], ["Janv-20", 18], ["Févr-20", 22], ["Mars-20", 8],
    ["Avr-20", 28], ["Mai-20", 15], ["Juin-20", 21], ["Juil-20", 10],
    ["Août-20", 17], ["Sept-20", 14], ["Oct-20", 20], ["Nov-20", 32],
    ["Déc-20", 44], ["Janv-21", 26], ["Févr-21", 18], ["Mars-21", 22],
    ["Avr-21", 12], ["Mai-21", 6], ["Juin-21", 14], ["Juil-21", 4],
    ["Août-21", 10], ["Sept-21", 8], ["Oct-21", 18], ["Nov-21", 9],
    ["Déc-21", 5], ["Janv-22", 0], ["Févr-22", -3], ["Mars-22", 6],
    ["Avr-22", 2], ["Mai-22", -4], ["Juin-22", 4], ["Juil-22", 8],
    ["Août-22", 12], ["Sept-22", -2], ["Oct-22", 6], ["Nov-22", -34],
    ["Déc-22", -6], ["Janv-23", 4], ["Févr-23", 8], ["Mars-23", 18],
    ["Avr-23", 14], ["Mai-23", 6], ["Juin-23", 12], ["Juil-23", 16],
    ["Août-23", 10], ["Sept-23", 8], ["Oct-23", 18], ["Nov-23", 22],
    ["Déc-23", 24], ["Janv-24", 14], ["Févr-24", 18], ["Mars-24", 12],
    ["Avr-24", 8], ["Mai-24", 14], ["Juin-24", 10], ["Juil-24", 6],
    ["Août-24", 12], ["Sept-24", 9], ["Oct-24", 14], ["Nov-24", 11],
    ["Déc-24", 7], ["Janv-25", 6], ["Févr-25", 4], ["Mars-25", 5],
  ];
  return seedPoints.map(([date, y]) => ({ date, yield: y }));
})();

const AVG_YIELD = 8;

const keyStats = [
  { label: "Prime moyenne 5 ans", value: "8 %" },
  { label: "Temps avec prime > 3 %", value: "76 %" },
  { label: "Prime au 31 mars 2025", value: "5 %" },
  { label: "Durée max prime < 0 %", value: "43 jours" },
  { label: "Temps avec prime > 10 %", value: "37 %" },
];

const TEAL = "hsl(var(--primary))";
const SUCCESS = "hsl(var(--success))";
const MUTED = "hsl(var(--muted-foreground))";
const ACCENT = "hsl(var(--accent))";

const tooltipStyle: React.CSSProperties = {
  background: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 0,
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: 12,
  boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.25)",
};

export function TobamAnalytics() {
  return (
    <div className="space-y-8">
      {/* Key Stats — cartes chiffres */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {keyStats.map((s) => (
          <GlassCard key={s.label} className="p-5 text-center space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground leading-tight min-h-[28px] flex items-center justify-center">
              {s.label}
            </p>
            <p className="text-2xl md:text-3xl font-serif font-semibold text-primary tabular-nums">
              {s.value}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* CME Bitcoin Carry — cumulative */}
        <GlassCard className="p-6 md:p-8 h-[460px] flex flex-col">
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              CME Bitcoin Carry · Leveraged strategy
            </p>
            <h3 className="text-xl font-serif mt-1">
              <em>Stratégie simulée CME Future / NASDAQ BTC ETF</em>
            </h3>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeData} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
                <YAxis domain={[0.8, 1.5]} ticks={[0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5]} axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={28} iconType="plainline" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <Line type="monotone" dataKey="strategy" name="Strategy" stroke={TEAL} strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="credit" name="Short Term IG Credit" stroke={SUCCESS} strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="cash" name="Cash" stroke={ACCENT} strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Annualized implicit funding yield */}
        <GlassCard className="p-6 md:p-8 h-[460px] flex flex-col">
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              Annualized implicit funding yield
            </p>
            <h3 className="text-xl font-serif mt-1">
              <em>Stratégie — futures roulés à 1 mois</em>
            </h3>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yieldSeries} margin={{ top: 10, right: 70, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: MUTED, fontSize: 11 }}
                  ticks={["Déc-19", "Déc-20", "Déc-21", "Déc-22", "Déc-23", "Déc-24"]}
                />
                <YAxis
                  domain={[-40, 50]}
                  ticks={[-40, -30, -20, -10, 0, 10, 20, 30, 40, 50]}
                  tickFormatter={(v) => `${v}%`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: MUTED, fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`${v.toFixed(1)} %`, "Yield"]}
                />
                <ReferenceLine
                  y={AVG_YIELD}
                  stroke={ACCENT}
                  strokeDasharray="5 5"
                  strokeWidth={1.5}
                  label={{ value: "Moyenne · 8 %", position: "insideTopLeft", fill: ACCENT, fontSize: 10, fontFamily: "var(--font-mono)" }}
                />
                <Line type="monotone" dataKey="yield" stroke={TEAL} strokeWidth={1.2} dot={false} />
                <ReferenceDot x="Mars-25" y={5} r={5} fill={SUCCESS} stroke={TEAL} strokeWidth={1.5}
                  label={{ value: "Mars 25 · 5 %", position: "right", fill: TEAL, fontSize: 11, fontFamily: "var(--font-mono)", offset: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] italic text-muted-foreground mt-2">
            * Rendement courant fluctuant entre 6 % et 13 %. La stratégie ne prend position que si le basis &gt; cash + 2 %.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
