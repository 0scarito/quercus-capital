import {
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Line, LineChart, ReferenceLine,
  ReferenceDot,
} from "recharts";
import { GlassCard } from "@/components/landing/GlassCard";

// Backtest TOBAM — données mensuelles réelles (CSV fourni, Janv 2020 → Déc 2024)
// Orange = Strategy, Bleu = Short Term IG Credit, Vert = Cash
type CumPoint = { date: string; strategy: number; credit: number; cash: number };

const RAW_ORANGE: [string, number][] = [
  ["2020-01", 0.9998], ["2020-02", 1.0279], ["2020-03", 1.0155], ["2020-04", 1.0204],
  ["2020-06", 1.0354], ["2020-07", 1.0331], ["2020-08", 1.0522], ["2020-09", 1.0569],
  ["2020-10", 1.0724], ["2020-11", 1.0703], ["2021-01", 1.0902], ["2021-02", 1.1317],
  ["2021-03", 1.1488], ["2021-04", 1.1421], ["2021-06", 1.1543], ["2021-07", 1.1535],
  ["2021-08", 1.1535], ["2021-09", 1.1604], ["2021-10", 1.1889], ["2021-12", 1.1855],
  ["2022-01", 1.1893], ["2022-02", 1.2048], ["2022-03", 1.2070], ["2022-04", 1.2080],
  ["2022-06", 1.2065], ["2022-07", 1.2080], ["2022-08", 1.2096], ["2022-09", 1.2127],
  ["2022-10", 1.2166], ["2022-12", 1.2205], ["2023-01", 1.2296], ["2023-02", 1.2344],
  ["2023-03", 1.2428], ["2023-04", 1.2493], ["2023-06", 1.2562], ["2023-07", 1.2715],
  ["2023-08", 1.2829], ["2023-09", 1.2775], ["2023-10", 1.2889], ["2023-12", 1.3104],
  ["2024-01", 1.3373], ["2024-02", 1.3542], ["2024-03", 1.3664], ["2024-04", 1.3638],
  ["2024-06", 1.3762], ["2024-07", 1.3848], ["2024-08", 1.4050], ["2024-09", 1.4049],
  ["2024-10", 1.4058], ["2024-12", 1.4206],
];
const RAW_BLUE: [string, number][] = [
  ["2020-02", 1.0040], ["2020-03", 1.0038], ["2020-04", 1.0032], ["2020-06", 1.0026],
  ["2020-07", 1.0025], ["2020-08", 0.9988], ["2020-09", 0.9962], ["2020-10", 1.0009],
  ["2020-11", 0.9973], ["2021-01", 0.9947], ["2021-02", 0.9944], ["2021-03", 0.9937],
  ["2021-04", 0.9932], ["2021-06", 0.9931], ["2021-07", 0.9927], ["2021-08", 0.9921],
  ["2021-09", 0.9916], ["2021-10", 0.9917], ["2021-12", 0.9958], ["2022-01", 0.9956],
  ["2022-02", 0.9920], ["2022-03", 0.9900], ["2022-04", 0.9906], ["2022-06", 0.9962],
  ["2022-07", 0.9921], ["2022-08", 0.9939], ["2022-09", 0.9976], ["2022-10", 1.0054],
  ["2022-12", 1.0081], ["2023-01", 1.0078], ["2023-02", 1.0168], ["2023-03", 1.0144],
  ["2023-04", 1.0194], ["2023-06", 1.0305], ["2023-07", 1.0352], ["2023-08", 1.0408],
  ["2023-09", 1.0398], ["2023-10", 1.0495], ["2023-12", 1.0553], ["2024-01", 1.0577],
  ["2024-02", 1.0643], ["2024-03", 1.0708], ["2024-04", 1.0736], ["2024-06", 1.0757],
  ["2024-07", 1.0865], ["2024-08", 1.0882], ["2024-09", 1.0957], ["2024-10", 1.0960],
];
const RAW_GREEN: [string, number][] = [
  ["2020-02", 0.9828], ["2020-03", 0.9777], ["2020-04", 0.9830], ["2020-06", 0.9916],
  ["2020-07", 0.9951], ["2020-08", 1.0002], ["2020-09", 1.0032], ["2020-10", 1.0056],
  ["2020-11", 1.0056], ["2021-01", 1.0056], ["2021-02", 1.0056], ["2021-03", 1.0071],
  ["2021-04", 1.0071], ["2021-06", 1.0082], ["2021-07", 1.0094], ["2021-08", 1.0087],
  ["2021-09", 1.0071], ["2021-10", 1.0055], ["2021-12", 1.0056], ["2022-01", 0.9993],
  ["2022-02", 0.9882], ["2022-03", 0.9816], ["2022-04", 0.9775], ["2022-06", 0.9674],
  ["2022-07", 0.9759], ["2022-08", 0.9595], ["2022-09", 0.9426], ["2022-10", 0.9542],
  ["2022-12", 0.9526], ["2023-01", 0.9615], ["2023-02", 0.9580], ["2023-03", 0.9604],
  ["2023-04", 0.9626], ["2023-06", 0.9620], ["2023-07", 0.9713], ["2023-08", 0.9729],
  ["2023-09", 0.9744], ["2023-10", 0.9846], ["2023-12", 0.9975], ["2024-01", 0.9985],
  ["2024-02", 1.0009], ["2024-03", 1.0040], ["2024-04", 1.0072], ["2024-06", 1.0143],
  ["2024-07", 1.0243], ["2024-08", 1.0319], ["2024-09", 1.0386], ["2024-10", 1.0431],
  ["2024-12", 1.0453],
];

const cumulativeData: CumPoint[] = (() => {
  const map = new Map<string, CumPoint>();
  const ensure = (k: string) => {
    if (!map.has(k)) map.set(k, { date: k, strategy: NaN, credit: NaN, cash: NaN });
    return map.get(k)!;
  };
  // Anchor at Dec-19 = 1
  ensure("2019-12").strategy = 1;
  ensure("2019-12").credit = 1;
  ensure("2019-12").cash = 1;
  RAW_ORANGE.forEach(([d, v]) => (ensure(d).strategy = v));
  RAW_BLUE.forEach(([d, v]) => (ensure(d).credit = v));
  RAW_GREEN.forEach(([d, v]) => (ensure(d).cash = v));
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
})();

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

// Palette dédiée graphes — chaude/froide qui ressort sur fond parchemin
const C_STRATEGY = "#C2410C"; // burnt sienna (Strategy)
const C_CREDIT = "#1E3A8A";   // deep indigo (Short Term IG Credit)
const C_CASH = "#15803D";     // forest green (Cash)

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
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: MUTED, fontSize: 11 }}
                  ticks={["2019-12", "2020-12", "2021-12", "2022-12", "2023-12", "2024-12"]}
                  tickFormatter={(v: string) => `Déc-${v.slice(2, 4)}`}
                />
                <YAxis
                  domain={[0.8, 1.5]}
                  ticks={[0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5]}
                  tickFormatter={(v: number) => v.toFixed(1)}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: MUTED, fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => v.toFixed(3)}
                  labelFormatter={(v: string) => `Mois · ${v}`}
                />
                <Legend verticalAlign="bottom" height={28} iconType="plainline" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
                <Line type="monotone" dataKey="strategy" name="Strategy" stroke={C_STRATEGY} strokeWidth={2.4} dot={false} connectNulls />
                <Line type="monotone" dataKey="credit" name="Short Term IG Credit" stroke={C_CREDIT} strokeWidth={1.8} dot={false} connectNulls />
                <Line type="monotone" dataKey="cash" name="Cash" stroke={C_CASH} strokeWidth={1.8} dot={false} connectNulls />
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
