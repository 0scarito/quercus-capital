import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  separator?: string;
}

export function CountUp({
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  separator = " ",
}: CountUpProps) {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>(0.3);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, end, duration]);

  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
