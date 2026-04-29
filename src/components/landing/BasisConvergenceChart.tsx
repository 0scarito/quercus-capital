import { useEffect, useRef, useState } from "react";

/**
 * BasisConvergenceChart — Animation SVG illustrant la convergence
 * du prix Future vers le Spot à l'échéance. L'aire entre les deux
 * courbes est remplie d'un dégradé vert symbolisant le profit
 * accumulé. L'animation se déclenche quand le composant entre
 * dans le viewport.
 */
export function BasisConvergenceChart() {
  const ref = useRef<SVGSVGElement | null>(null);
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
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Coordonnées (viewBox 600x260, marges 40 sur les côtés / 30 haut-bas)
  const W = 600;
  const H = 260;
  const ML = 50;
  const MR = 40;
  const MT = 30;
  const MB = 40;

  // Future : part en haut, descend vers le point de convergence
  const futurePath = `M ${ML} ${MT + 10} C ${W * 0.35} ${MT + 30}, ${W * 0.7} ${MT + 80}, ${W - MR} ${H - MB}`;
  // Spot : part plus bas, monte légèrement vers le même point
  const spotPath = `M ${ML} ${H - MB - 10} C ${W * 0.35} ${H - MB - 18}, ${W * 0.7} ${H - MB - 6}, ${W - MR} ${H - MB}`;
  // Aire entre les deux (profit accumulé)
  const areaPath = `${futurePath} L ${W - MR} ${H - MB} L ${ML} ${H - MB - 10} Z`;

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="profit-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.45" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="profit-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Grille subtile */}
        {Array.from({ length: 4 }).map((_, i) => {
          const y = MT + ((H - MT - MB) / 4) * (i + 1);
          return (
            <line
              key={`gx-${i}`}
              x1={ML}
              x2={W - MR}
              y1={y}
              y2={y}
              stroke="hsl(var(--primary))"
              strokeOpacity={0.06}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Axes */}
        <line
          x1={ML}
          x2={W - MR}
          y1={H - MB}
          y2={H - MB}
          stroke="hsl(var(--primary))"
          strokeOpacity={0.4}
          strokeWidth={0.5}
        />
        <line
          x1={ML}
          x2={ML}
          y1={MT}
          y2={H - MB}
          stroke="hsl(var(--primary))"
          strokeOpacity={0.4}
          strokeWidth={0.5}
        />

        {/* Aire profit (révélée par animation d'opacité + clipPath) */}
        <path
          d={areaPath}
          fill="url(#profit-gradient)"
          style={{
            opacity: animate ? 1 : 0,
            transition: "opacity 1.6s ease-out 0.4s",
          }}
        />

        {/* Courbe Future (descend) */}
        <path
          d={futurePath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.2}
          strokeDasharray="900"
          strokeDashoffset={animate ? 0 : 900}
          style={{
            transition: "stroke-dashoffset 1.8s ease-out",
          }}
        />

        {/* Courbe Spot (monte légèrement) */}
        <path
          d={spotPath}
          fill="none"
          stroke="hsl(var(--success))"
          strokeWidth={1.2}
          strokeDasharray="900"
          strokeDashoffset={animate ? 0 : 900}
          style={{
            transition: "stroke-dashoffset 1.8s ease-out 0.15s",
          }}
        />

        {/* Point de convergence */}
        <circle
          cx={W - MR}
          cy={H - MB}
          r={animate ? 5 : 0}
          fill="hsl(var(--success))"
          style={{ transition: "r 0.6s ease-out 1.6s" }}
        />
        <circle
          cx={W - MR}
          cy={H - MB}
          r={animate ? 12 : 0}
          fill="none"
          stroke="hsl(var(--success))"
          strokeOpacity={0.4}
          strokeWidth={0.5}
          style={{ transition: "r 0.8s ease-out 1.7s" }}
        />

        {/* Labels */}
        <text
          x={ML - 6}
          y={MT + 14}
          textAnchor="end"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fill="hsl(var(--primary))"
          opacity={0.7}
        >
          FUTURE
        </text>
        <text
          x={ML - 6}
          y={H - MB - 6}
          textAnchor="end"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fill="hsl(var(--success))"
          opacity={0.8}
        >
          SPOT
        </text>
        <text
          x={ML}
          y={H - MB + 16}
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fill="hsl(var(--primary))"
          opacity={0.6}
        >
          T0
        </text>
        <text
          x={W - MR}
          y={H - MB + 16}
          textAnchor="end"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fill="hsl(var(--primary))"
          opacity={0.6}
        >
          T+1M · Échéance
        </text>

        {/* Étiquette "Profit capté" au milieu de l'aire */}
        <text
          x={W * 0.5}
          y={H * 0.55}
          textAnchor="middle"
          fontSize="11"
          fontFamily="JetBrains Mono, monospace"
          fill="hsl(var(--success))"
          style={{
            opacity: animate ? 1 : 0,
            transition: "opacity 0.8s ease-out 1.4s",
          }}
        >
          PROFIT CAPTÉ
        </text>
      </svg>
    </div>
  );
}