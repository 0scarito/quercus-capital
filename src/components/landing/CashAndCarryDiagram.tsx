import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

/**
 * CashAndCarryDiagram — Deux schémas empilés, scroll-driven :
 *   A. Flux Magnétique : deux piliers (Spot ↑ / Future ↓) reliés par
 *      un panneau central glassmorphism « Rendement Sécurisé ».
 *   B. Convergence : Prix Future (haut) et Prix Spot (bas) convergent
 *      vers un point « Échéance » à droite ; l'aire entre les deux est
 *      remplie progressivement d'un dégradé vert au fur et à mesure du
 *      scroll dans la fenêtre.
 */

/* -------------------------------------------------------------------------- */
/*  A. FLUX MAGNÉTIQUE                                                         */
/* -------------------------------------------------------------------------- */

function MagneticFlow() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setAnimate(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Header label */}
      <div className="flex items-center justify-between mb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Schéma de flux magnétique
        </p>
        <span
          className="font-mono text-[9px] uppercase tracking-[0.22em] px-2 py-0.5 border"
          style={{
            borderColor: "hsl(var(--primary) / 0.4)",
            color: "hsl(var(--primary))",
          }}
        >
          Non-directional
        </span>
      </div>

      <div className="relative grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 md:gap-5 min-h-[260px]">
        {/* Glow halo behind central panel */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 240,
            height: 240,
            background:
              "radial-gradient(circle, hsl(var(--success) / 0.35) 0%, hsl(var(--success) / 0) 70%)",
            opacity: animate ? 1 : 0,
            transition: "opacity 1.4s ease-out 0.6s",
          }}
        />

        {/* LEFT — Achat Spot pillar */}
        <Pillar
          label="Achat Spot"
          sub="(ETF NASDAQ)"
          direction="up"
          animate={animate}
          delay={0}
        />

        {/* CENTER — Glassmorphism panel */}
        <div className="relative flex flex-col items-center justify-center px-2 z-10">
          <div
            className="relative flex flex-col items-center justify-center text-center px-4 py-5 transition-all duration-700"
            style={{
              minWidth: 130,
              background:
                "linear-gradient(135deg, hsl(var(--background) / 0.6), hsl(var(--success) / 0.22))",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "0.5px solid hsl(var(--success) / 0.55)",
              boxShadow: animate
                ? "0 0 32px hsl(var(--success) / 0.35), inset 0 0 18px hsl(var(--success) / 0.15)"
                : "0 0 0 hsl(var(--success) / 0)",
              opacity: animate ? 1 : 0,
              transform: animate ? "scale(1)" : "scale(0.92)",
              transitionDelay: "0.5s",
            }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary/80 mb-1">
              Rendement
            </span>
            <span className="font-serif italic text-success text-base md:text-lg leading-tight">
              Sécurisé
            </span>
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground mt-1">
              (Le « Basis »)
            </span>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground mt-3 text-center">
            Convergence
            <br />
            over time
          </p>
        </div>

        {/* RIGHT — Vente Future pillar */}
        <Pillar
          label="Vente Future"
          sub="(CME)"
          direction="down"
          animate={animate}
          delay={0.15}
        />
      </div>
    </div>
  );
}

function Pillar({
  label,
  sub,
  direction,
  animate,
  delay,
}: {
  label: string;
  sub: string;
  direction: "up" | "down";
  animate: boolean;
  delay: number;
}) {
  const isUp = direction === "up";
  const Arrow = isUp ? ArrowUp : ArrowDown;
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-serif italic text-sm md:text-base text-foreground text-center">
        {label}
        <br />
        <span className="font-mono not-italic text-[10px] uppercase tracking-wider text-muted-foreground">
          {sub}
        </span>
      </p>

      {/* Vertical pillar */}
      <div
        className="relative w-14 md:w-16 flex-1 min-h-[150px] flex items-center justify-center"
        style={{
          border: "0.5px solid hsl(var(--primary) / 0.55)",
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.6), hsl(var(--primary) / 0.06))",
        }}
      >
        {/* Animated arrow inside pillar */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
          style={{
            top: animate ? (isUp ? "12%" : "60%") : isUp ? "70%" : "12%",
            transitionDelay: `${0.4 + delay}s`,
            opacity: animate ? 1 : 0.2,
          }}
        >
          <Arrow
            className="text-primary"
            strokeWidth={1}
            style={{ width: 24, height: 24 }}
          />
        </div>

        {/* Faint gridline ticks */}
        {[0.25, 0.5, 0.75].map((t) => (
          <div
            key={t}
            className="absolute left-0 right-0"
            style={{
              top: `${t * 100}%`,
              height: 0.5,
              background: "hsl(var(--primary) / 0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  B. CONVERGENCE — scroll-driven                                            */
/* -------------------------------------------------------------------------- */

function ConvergenceChart() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 selon scroll
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 quand le composant entre par le bas, 1 quand il est centré ou plus haut
      const start = vh * 0.9;
      const end = vh * 0.25;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Geometry
  const W = 640;
  const H = 280;
  const ML = 90;
  const MR = 80;
  const MT = 40;
  const MB = 50;

  // Convergence point (right side, vertically centered)
  const CX = W - MR;
  const CY = MT + (H - MT - MB) / 2;

  // Start positions
  const futureY0 = MT + 14;
  const spotY0 = H - MB - 14;

  // Lines: straight from left start → convergence point on the right
  const futurePath = `M ${ML} ${futureY0} L ${CX} ${CY}`;
  const spotPath = `M ${ML} ${spotY0} L ${CX} ${CY}`;
  // Profit area between them, closed at the convergence point
  const areaPath = `M ${ML} ${futureY0} L ${CX} ${CY} L ${ML} ${spotY0} Z`;

  // Reveal width based on scroll progress
  const revealWidth = (CX - ML) * progress;

  return (
    <div ref={wrapRef} className="relative">
      <div
        className="relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto block"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="conv-profit-fill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.18" />
              <stop offset="60%" stopColor="hsl(var(--success))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id="conv-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.55" />
              <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0" />
            </radialGradient>
            <clipPath id="conv-area-clip">
              <rect x={ML} y={0} width={revealWidth} height={H} />
            </clipPath>
          </defs>

          {/* Subtle grid */}
          {Array.from({ length: 4 }).map((_, i) => {
            const y = MT + ((H - MT - MB) / 4) * (i + 1);
            return (
              <line
                key={`gx-${i}`}
                x1={ML}
                x2={CX}
                y1={y}
                y2={y}
                stroke="hsl(var(--primary))"
                strokeOpacity={0.05}
                strokeWidth={0.5}
              />
            );
          })}

          {/* Axes */}
          <line x1={ML} x2={CX} y1={H - MB} y2={H - MB} stroke="hsl(var(--primary))" strokeOpacity={0.35} strokeWidth={0.5} />
          <line x1={ML} x2={ML} y1={MT} y2={H - MB} stroke="hsl(var(--primary))" strokeOpacity={0.35} strokeWidth={0.5} />

          {/* Profit area (clipped by scroll progress) */}
          <g clipPath="url(#conv-area-clip)">
            <path d={areaPath} fill="url(#conv-profit-fill)" />
          </g>

          {/* Future line (top) */}
          <path
            d={futurePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={1}
          />
          {/* Spot line (bottom) */}
          <path
            d={spotPath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={1}
          />

          {/* Glow at convergence — appears as we approach 100% */}
          <circle
            cx={CX}
            cy={CY}
            r={progress > 0.85 ? 32 : 0}
            fill="url(#conv-glow)"
            style={{ transition: "r 0.6s ease-out" }}
          />
          <circle
            cx={CX}
            cy={CY}
            r={progress > 0.92 ? 5 : 0}
            fill="hsl(var(--success))"
            style={{ transition: "r 0.4s ease-out" }}
          />

          {/* Labels */}
          <text x={ML - 10} y={futureY0 + 4} textAnchor="end" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--primary))" opacity={1} fontWeight={500}>
            Prix Future
          </text>
          <text x={ML - 10} y={spotY0 + 4} textAnchor="end" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--primary))" opacity={1} fontWeight={500}>
            Prix Spot
          </text>
          <text x={CX + 10} y={CY + 4} fontSize="11" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--success))" opacity={progress > 0.6 ? 1 : 0} fontWeight={500} style={{ transition: "opacity 0.5s" }}>
            Maturité
          </text>
          <text x={ML} y={H - MB + 16} fontSize="10" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--primary))" opacity={0.7}>
            T0
          </text>
          <text x={CX} y={H - MB + 16} textAnchor="end" fontSize="10" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--primary))" opacity={0.7}>
            T+1M · Maturité
          </text>
        </svg>

        {/* Hover tooltip — Spread Capturé */}
        <div
          className="absolute pointer-events-none transition-all duration-500"
          style={{
            left: `${((ML + CX) / 2 / W) * 100}%`,
            top: `${(CY / H) * 100}%`,
            transform: "translate(-50%, -120%)",
            opacity: hover && progress > 0.2 ? 1 : 0,
          }}
        >
          <div
            className="px-3 py-2 text-center"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--background) / 0.85), hsl(var(--success) / 0.18))",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "0.5px solid hsl(var(--success) / 0.6)",
              boxShadow: "0 6px 24px hsl(var(--success) / 0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary/80">
              Spread capturé
            </div>
            <div className="font-serif italic text-success text-base leading-tight mt-0.5">
              +7,6&nbsp;% <span className="font-mono not-italic text-[10px] text-muted-foreground">(Ann.)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Combined export                                                            */
/* -------------------------------------------------------------------------- */

export function CashAndCarryDiagram() {
  return (
    <div>
      <ConvergenceChart />
    </div>
  );
}