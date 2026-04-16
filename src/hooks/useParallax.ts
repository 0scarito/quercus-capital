import { useCallback, useRef, useState } from "react";

export function useParallax(amplitude = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transition: "transform 0.15s ease-out",
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * amplitude;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * amplitude;
      setStyle({ transform: `translate(${x}px, ${y}px)`, transition: "transform 0.15s ease-out" });
    },
    [amplitude]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: "translate(0, 0)", transition: "transform 0.4s ease-out" });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
