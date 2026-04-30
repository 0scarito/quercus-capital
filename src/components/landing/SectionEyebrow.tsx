import { cn } from "@/lib/utils";

interface SectionEyebrowProps {
  number: number | string;
  label: string;
  className?: string;
}

/**
 * Editorial eyebrow used above section titles:
 *
 *   ────  01 — RENDEMENT
 *
 * Gives the page magazine-like rhythm and clear navigation.
 */
export function SectionEyebrow({ number, label, className }: SectionEyebrowProps) {
  const num = typeof number === "number" ? String(number).padStart(2, "0") : number;
  return (
    <div className={cn("flex items-center justify-center gap-3 mb-4", className)}>
      <span className="block h-px w-10 bg-primary/40" />
      <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-primary/80">
        <span className="text-primary">{num}</span>
        <span className="opacity-50 mx-2">—</span>
        <span>{label}</span>
      </p>
      <span className="block h-px w-10 bg-primary/40" />
    </div>
  );
}