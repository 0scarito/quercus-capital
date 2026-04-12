import { useCallback, useRef, useState } from "react";

export function useTilt(maxTilt = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(600px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(1.02)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [maxTilt]
  );

  const handleLeave = useCallback(() => {
    setStyle({
      transform: "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)",
      transition: "transform 0.4s ease-out",
    });
  }, []);

  return { ref, style, onMouseMove: handleMove, onMouseLeave: handleLeave };
}
