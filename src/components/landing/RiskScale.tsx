import { cn } from "@/lib/utils";

interface RiskScaleProps {
  level: number; // 1..7
  label?: string;
  className?: string;
}

export function RiskScale({ level, label, className }: RiskScaleProps) {
  const safe = Math.min(7, Math.max(1, Math.round(level)));
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
        <span>Risque le plus bas</span>
        <span>Risque le plus élevé</span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => {
          const n = i + 1;
          const active = n === safe;
          return (
            <div
              key={n}
              className={cn(
                "flex-1 h-10 flex items-center justify-center text-sm font-mono transition-colors",
                active
                  ? "bg-primary text-primary-foreground border border-primary"
                  : "bg-white/40 backdrop-blur-sm text-muted-foreground border border-white/30"
              )}
            >
              {n}
            </div>
          );
        })}
      </div>
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
    </div>
  );
}
