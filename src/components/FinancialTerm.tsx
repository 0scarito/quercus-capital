import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface FinancialTermProps {
  /** The displayed term (e.g. "€STR", "WAM"). */
  term: string;
  /** One-line definition shown in the popover. */
  definition: string;
  className?: string;
}

/**
 * Inline glossary tooltip for financial jargon (€STR, WAM, VNAV, PFU, basis…).
 * Renders the term with a discreet dotted underline; on hover or focus, a
 * small popover reveals the definition. Educational + trust-building.
 */
export function FinancialTerm({ term, definition, className }: FinancialTermProps) {
  return (
    <Tooltip delayDuration={120}>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className={cn(
            "underline decoration-dotted decoration-primary/40 underline-offset-[3px] cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]",
            className,
          )}
        >
          {term}
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-xs text-xs leading-relaxed font-sans bg-foreground text-background px-3 py-2"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-background/70 mb-1">
          {term}
        </p>
        <p>{definition}</p>
      </TooltipContent>
    </Tooltip>
  );
}