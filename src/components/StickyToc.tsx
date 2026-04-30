import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface StickyTocProps {
  items: TocItem[];
  className?: string;
  /** Translated label for the TOC heading (default "Sommaire"). */
  heading?: string;
}

/**
 * Right-rail sticky table of contents with scroll-spy highlighting
 * the active section. Hidden on mobile (use the in-page headings).
 * Caller is responsible for ensuring each item.id matches an
 * existing element id in the document.
 */
export function StickyToc({ items, className, heading = "Sommaire" }: StickyTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;
    const elements = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      aria-label={heading}
      className={cn(
        "hidden lg:block sticky top-28 self-start max-w-[240px] text-sm",
        className,
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
        {heading}
      </p>
      <ul className="space-y-2 border-l border-border/60">
        {items.map((it) => {
          const active = it.id === activeId;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={cn(
                  "block pl-4 -ml-px py-1 border-l-2 transition-colors leading-snug",
                  active
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}