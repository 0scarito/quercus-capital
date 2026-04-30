import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "mask-up" | "fade";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  /** Apply a stagger to direct children (in ms). */
  staggerChildren?: number;
}

const VARIANT_HIDDEN: Record<RevealVariant, string> = {
  "fade-up": "opacity-0 translate-y-6",
  "fade-left": "opacity-0 -translate-x-8",
  "fade-right": "opacity-0 translate-x-8",
  "scale-in": "opacity-0 scale-[0.96]",
  "mask-up": "opacity-0 translate-y-4 [clip-path:inset(0_0_100%_0)]",
  "fade": "opacity-0",
};

const VARIANT_SHOWN: Record<RevealVariant, string> = {
  "fade-up": "opacity-100 translate-y-0",
  "fade-left": "opacity-100 translate-x-0",
  "fade-right": "opacity-100 translate-x-0",
  "scale-in": "opacity-100 scale-100",
  "mask-up": "opacity-100 translate-y-0 [clip-path:inset(0_0_0_0)]",
  "fade": "opacity-100",
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  staggerChildren,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  if (staggerChildren && Array.isArray(children)) {
    return (
      <div ref={ref} className={className}>
        {children.map((child, i) => (
          <div
            key={i}
            className={cn(
              "transition-all duration-700 ease-out will-change-transform",
              isVisible ? VARIANT_SHOWN[variant] : VARIANT_HIDDEN[variant],
            )}
            style={{ transitionDelay: `${delay + i * staggerChildren}ms` }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        isVisible ? VARIANT_SHOWN[variant] : VARIANT_HIDDEN[variant],
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
