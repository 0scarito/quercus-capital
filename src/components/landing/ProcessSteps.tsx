import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  n: string;
  title: string;
  desc: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  /** Label like "Étape" prefixed before the number, optional. */
  stepLabel?: (n: string) => string;
  className?: string;
}

/**
 * Scrollytelling process steps. As the row enters the viewport, a
 * vertical (mobile) / horizontal (desktop) hairline draws between
 * the numbered badges and each step fades in with a stagger.
 * Replaces a plain <ol> for product process descriptions.
 */
export function ProcessSteps({ steps, stepLabel, className }: ProcessStepsProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className={cn(
        "relative grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 pt-3",
        className,
      )}
    >
      {/* Connector — horizontal on desktop, drawn left→right with scroll reveal */}
      <div
        aria-hidden
        className="hidden sm:block absolute top-[14px] left-[12%] right-[12%] h-px bg-primary/20 origin-left"
        style={{
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1200ms cubic-bezier(0.22,1,0.36,1) 200ms",
        }}
      />
      {steps.map((s, i) => (
        <div
          key={s.n}
          className="relative pl-4 sm:pl-0 sm:pt-10 will-change-transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(14px)",
            transition: `all 700ms cubic-bezier(0.22,1,0.36,1) ${300 + i * 180}ms`,
          }}
        >
          {/* Mobile vertical bar */}
          <span
            aria-hidden
            className="sm:hidden absolute left-0 top-1 bottom-1 w-px bg-primary/30"
          />
          {/* Numbered badge */}
          <span
            aria-hidden
            className="hidden sm:flex absolute left-0 top-0 h-7 w-7 items-center justify-center bg-background border border-primary/40 font-mono text-[10px] tracking-wider text-primary"
          >
            {s.n}
          </span>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70 sm:ml-10">
            {stepLabel ? stepLabel(s.n) : s.n}
          </p>
          <h3 className="font-serif italic text-base mt-1 mb-1.5 sm:ml-10">{s.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed sm:ml-10">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}