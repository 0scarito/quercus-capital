import { useEffect, useRef } from "react";

/**
 * Ambient yield-line field rendered behind the hero. A discreet
 * oscilloscope-like canvas: 4 stacked sinusoidal lines slowly
 * breathing in parchment-toned primary color. Soft, never noisy.
 * Fully decorative — pointer-events-none, aria-hidden.
 */
export function HeroAmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Resolve --primary HSL once.
    const primary = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim() || "173 50% 19%";

    const lines = [
      { amp: 22, freq: 0.0042, speed: 0.00035, yOffset: 0.32, opacity: 0.1, width: 1 },
      { amp: 30, freq: 0.0034, speed: 0.0005, yOffset: 0.5, opacity: 0.075, width: 1 },
      { amp: 18, freq: 0.0058, speed: -0.0004, yOffset: 0.62, opacity: 0.06, width: 0.8 },
      { amp: 38, freq: 0.0026, speed: 0.00025, yOffset: 0.78, opacity: 0.05, width: 1.2 },
    ];

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      lines.forEach((line) => {
        ctx.beginPath();
        const yMid = h * line.yOffset;
        for (let x = 0; x <= w; x += 4 * dpr) {
          const y =
            yMid +
            Math.sin(x * line.freq + t * line.speed) * line.amp * dpr +
            Math.sin(x * line.freq * 2.3 + t * line.speed * 1.3) * line.amp * 0.3 * dpr;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsl(${primary} / ${line.opacity})`;
        ctx.lineWidth = line.width * dpr;
        ctx.stroke();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        maskImage:
          "radial-gradient(ellipse at center, hsl(0 0% 0% / 0.95) 30%, hsl(0 0% 0% / 0) 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, hsl(0 0% 0% / 0.95) 30%, hsl(0 0% 0% / 0) 75%)",
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}