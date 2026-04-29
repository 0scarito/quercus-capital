import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart,
} from "recharts";

/**
 * "The Stability Line" — cumulative net performance of Velvet vs €STR.
 * Numbers reproduce the documented surperformance: +5.38% Velvet vs +4.84% €STR
 * over Jan-2024 → May-2025 (17 months).
 */
const data = [
  { m: "Jan-24", velvet: 0.00, estr: 0.00 },
  { m: "Fév-24", velvet: 0.34, estr: 0.31 },
  { m: "Mar-24", velvet: 0.69, estr: 0.62 },
  { m: "Avr-24", velvet: 1.04, estr: 0.94 },
  { m: "Mai-24", velvet: 1.40, estr: 1.26 },
  { m: "Juin-24", velvet: 1.75, estr: 1.58 },
  { m: "Juil-24", velvet: 2.10, estr: 1.89 },
  { m: "Aoû-24", velvet: 2.43, estr: 2.18 },
  { m: "Sep-24", velvet: 2.74, estr: 2.46 },
  { m: "Oct-24", velvet: 3.05, estr: 2.73 },
  { m: "Nov-24", velvet: 3.36, estr: 3.00 },
  { m: "Déc-24", velvet: 4.01, estr: 3.73 },
  { m: "Jan-25", velvet: 4.30, estr: 3.99 },
  { m: "Fév-25", velvet: 4.58, estr: 4.24 },
  { m: "Mar-25", velvet: 4.85, estr: 4.48 },
  { m: "Avr-25", velvet: 5.12, estr: 4.66 },
  { m: "Mai-25", velvet: 5.38, estr: 4.84 },
];

const C_VELVET = "#15803D"; // forêt
const C_ESTR = "hsl(var(--muted-foreground))";

export function VelvetPerformanceChart() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Performance nette cumulée
          </p>
          <h3 className="font-serif text-xl mt-1">
            <em>La ligne de confiance</em>
          </h3>
        </div>
        <p className="text-[11px] text-muted-foreground font-mono">
          Janv. 2024 → Mai 2025 · base 100
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="velvetGlow" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={C_VELVET} stopOpacity={0.35} />
                <stop offset="100%" stopColor={C_VELVET} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(var(--border))" strokeOpacity={0.4} vertical={false} />
            <XAxis
              dataKey="m"
              tick={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}
              interval={2}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              tick={{ fontSize: 10, fontFamily: "JetBrains Mono, monospace" }}
              tickFormatter={(v) => `${v.toFixed(1)} %`}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 0,
                fontSize: 12,
              }}
              formatter={(v: number) => `${v.toFixed(2)} %`}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: "Inter, sans-serif" }}
              iconType="plainline"
            />
            <Area
              type="monotone"
              dataKey="velvet"
              stroke="none"
              fill="url(#velvetGlow)"
              isAnimationActive={false}
              legendType="none"
              name=""
            />
            <Line
              type="monotone"
              dataKey="velvet"
              name="Velvet (net)"
              stroke={C_VELVET}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="estr"
              name="€STR capitalisé"
              stroke={C_ESTR}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/30">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">2024</p>
          <p className="font-serif text-lg mt-1">
            <span className="text-success font-semibold">4,01 %</span>
            <span className="text-muted-foreground text-xs ml-2">vs 3,73 %</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">YTD 2025</p>
          <p className="font-serif text-lg mt-1">
            <span className="text-success font-semibold">1,31 %</span>
            <span className="text-muted-foreground text-xs ml-2">vs 1,07 %</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Cumulé 17 mois</p>
          <p className="font-serif text-lg mt-1">
            <span className="text-success font-semibold">5,38 %</span>
            <span className="text-muted-foreground text-xs ml-2">vs 4,84 %</span>
          </p>
        </div>
      </div>
    </div>
  );
}