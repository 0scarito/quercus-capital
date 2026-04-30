import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface SectionRuleProps {
  className?: string;
  /** Optional ornamental glyph in the middle of the rule. */
  ornament?: string;
}

/**
 * Editorial section divider — a thin, animated rule that draws on scroll
 * with an optional centered ornamental glyph. Replaces plain <Separator />
 * to give the page real rhythm.
 */
export function SectionRule({ className, ornament = "❦" }: SectionRuleProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.4);
  return (
    <div
      ref={ref}
      className={cn(
        "max-w-7xl mx-auto px-4 md:px-8 py-6 flex items-center gap-4",
        className,
      )}
      aria-hidden
    >
      <span
        className="block h-px bg-foreground/20 origin-right"
        style={{
          flex: 1,
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1100ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <span
        className="text-primary/50 text-base font-serif italic shrink-0 select-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(4px)",
          transition: "all 700ms ease-out 350ms",
        }}
      >
        {ornament}
      </span>
      <span
        className="block h-px bg-foreground/20 origin-left"
        style={{
          flex: 1,
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1100ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </div>
  );
}