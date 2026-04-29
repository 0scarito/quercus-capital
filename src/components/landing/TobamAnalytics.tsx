import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, Line,
} from "recharts";
import { GlassCard } from "@/components/landing/GlassCard";

// Données dérivées du backtest TOBAM (Déc 2019 — Mars 2025)
const performanceData = [
  { date: "Déc 19", strategy: 1.0,  cash: 1.000, yield: 8.0 },
  { date: "Juin 20", strategy: 1.05, cash: 1.001, yield: 12.5 },
  { date: "Déc 20", strategy: 1.12, cash: 1.002, yield: 18.2 },
  { date: "Juin 21", strategy: 1.15, cash: 1.003, yield: 6.4 },
  { date: "Déc 21", strategy: 1.19, cash: 1.005, yield: 4.8 },
  { date: "Juin 22", strategy: 1.21, cash: 1.010, yield: -2.1 },
  { date: "Déc 22", strategy: 1.24, cash: 1.020, yield: 7.2 },
  { date: "Juin 23", strategy: 1.32, cash: 1.040, yield: 14.5 },
  { date: "Déc 23", strategy: 1.38, cash: 1.060, yield: 9.8 },
  { date: "Juin 24", strategy: 1.42, cash: 1.080, yield: 7.6 },
  { date: "Mars 25", strategy: 1.46, cash: 1.110, yield: 5.0 },
];

const TEAL = "hsl(var(--primary))";
const SUCCESS = "hsl(var(--success))";
const MUTED = "hsl(var(--muted-foreground))";
const NEG = "hsl(var(--destructive))";

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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Performance cumulée */}
      <GlassCard className="p-6 md:p-8 h-[460px] flex flex-col">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Performance cumulée
          </p>
          <h3 className="text-xl font-serif mt-1">
            <em>Indexée à 1 — TOBAM vs Cash</em>
          </h3>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="tobam-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TEAL} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
              <YAxis domain={[0.9, 1.6]} axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend verticalAlign="top" align="right" height={28} iconType="plainline" wrapperStyle={{ fontSize: 11, fontFamily: "var(--font-mono)" }} />
              <Area type="monotone" dataKey="strategy" name="TOBAM" stroke={TEAL} strokeWidth={2} fill="url(#tobam-area)" />
              <Line type="monotone" dataKey="cash" name="Cash (€STER)" stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Rendement annualisé */}
      <GlassCard className="p-6 md:p-8 h-[460px] flex flex-col">
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Rendement implicite du basis
          </p>
          <h3 className="text-xl font-serif mt-1">
            <em>Annualisé (%) — par période</em>
          </h3>
        </div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: MUTED, fontSize: 11 }} />
              <Tooltip cursor={{ fill: "hsl(var(--muted) / 0.4)" }} contentStyle={tooltipStyle} />
              <Bar dataKey="yield" name="Basis Yield">
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.yield > 0 ? SUCCESS : NEG} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
