import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Technologie", value: 34 },
  { name: "Services Financiers", value: 18 },
  { name: "Santé", value: 12 },
  { name: "Consommation", value: 10 },
  { name: "Communications", value: 8 },
  { name: "Industrie", value: 7 },
  { name: "Énergie", value: 5 },
  { name: "Autres", value: 6 },
];

// Quercus-tinted palette: deep teal → warm sienna gradient
const COLORS = [
  "hsl(var(--primary))",
  "#2A6770",
  "#3F8893",
  "#6FA9B0",
  "#A89072",
  "#C2956B",
  "#9B6F4A",
  "#6B5340",
];

export function VelvetCollateralDonut() {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="relative h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={1}
              stroke="hsl(var(--background))"
              strokeWidth={1.5}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 0,
                fontSize: 12,
              }}
              formatter={(v: number) => `${v} %`}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Collatéral</p>
          <p className="font-serif text-2xl mt-1">
            <em>{total} %</em>
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Tier-1 actions</p>
        </div>
      </div>

      <ul className="space-y-2.5">
        {data.map((d, i) => (
          <li key={d.name} className="flex items-center gap-3 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0"
              style={{ background: COLORS[i] }}
            />
            <span className="flex-1 text-foreground/85">{d.name}</span>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {d.value.toString().padStart(2, " ")} %
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}