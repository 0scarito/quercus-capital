import { useEffect, useRef, useState } from "react";

/**
 * CashAndCarryDiagram — Diagramme « Futuristic Heritage » illustrant
 * la stratégie d'arbitrage Cash & Carry.
 *
 *  - Deux courbes (Spot & Future) convergent vers un point unique à droite.
 *  - L'aire entre les deux est remplie d'un dégradé vert vibrant
 *    représentant le profit accumulé (révélé au scroll).
 *  - Au survol, un « pont » glassmorphism s'étend depuis le centre
 *    pour révéler la valeur du Spread capté (+8.0 %).
 */
export function CashAndCarryDiagram() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
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
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // viewBox
  const W = 640;
  const H = 360;
  const ML = 64;
  const MR = 56;
  const MT = 56;
  const MB = 64;

  // Convergence vers un point unique à droite
  const CX = W - MR;
  const CY = MT + (H - MT - MB) / 2;

  // Future part en haut à gauche, descend vers (CX, CY)
  const futurePath = `M ${ML} ${MT + 8} C ${W * 0.4} ${MT + 18}, ${W * 0.72} ${CY - 18}, ${CX} ${CY}`;
  // Spot part en bas à gauche, monte légèrement vers (CX, CY)
  const spotPath = `M ${ML} ${H - MB - 8} C ${W * 0.4} ${H - MB - 14}, ${W * 0.72} ${CY + 14}, ${CX} ${CY}`;
  // Aire profit entre Future (haut) et Spot (bas), fermée à gauche puis au point de convergence
  const areaPath = `${futurePath} L ${CX} ${CY} C ${W * 0.72} ${CY + 14}, ${W * 0.4} ${H - MB - 14}, ${ML} ${H - MB - 8} Z`;

  // Position du « pont » Spread au milieu géométrique
  const bridgeX = (ML + CX) / 2;
  const bridgeY = CY;

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Badge Non-directional */}
      <div className="absolute top-0 left-0 z-10">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em] px-2.5 py-1 rounded-sm border"
          style={{
            borderColor: "hsl(var(--primary) / 0.4)",
            color: "hsl(var(--primary))",
            background: "hsl(var(--background) / 0.7)",
          }}
        >
          Non-directional
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cc-profit-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.18" />
            <stop offset="60%" stopColor="hsl(var(--success))" stopOpacity="0.45" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="cc-conv-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0" />
          </radialGradient>
          <clipPath id="cc-area-clip">
            <rect
              x={ML}
              y={0}
              width={animate ? CX - ML : 0}
              height={H}
              style={{
                transition: "width 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
              }}
            />
          </clipPath>
        </defs>

        {/* Grille mathématique subtile */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = MT + ((H - MT - MB) / 5) * (i + 1);
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

        {/* Axes ultra-fins */}
        <line x1={ML} x2={CX} y1={H - MB} y2={H - MB} stroke="hsl(var(--primary))" strokeOpacity={0.35} strokeWidth={0.5} />
        <line x1={ML} x2={ML} y1={MT} y2={H - MB} stroke="hsl(var(--primary))" strokeOpacity={0.35} strokeWidth={0.5} />

        {/* Aire profit révélée au scroll via clipPath qui s'étend de gauche à droite */}
        <g clipPath="url(#cc-area-clip)">
          <path d={areaPath} fill="url(#cc-profit-fill)" />
        </g>

        {/* Courbe Future (descend) */}
        <path
          d={futurePath}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={1.2}
          strokeDasharray="900"
          strokeDashoffset={animate ? 0 : 900}
          style={{ transition: "stroke-dashoffset 1.9s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />

        {/* Courbe Spot (monte légèrement) */}
        <path
          d={spotPath}
          fill="none"
          stroke="hsl(var(--success))"
          strokeWidth={1.2}
          strokeDasharray="900"
          strokeDashoffset={animate ? 0 : 900}
          style={{ transition: "stroke-dashoffset 1.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s" }}
        />

        {/* Glow + point de convergence */}
        <circle
          cx={CX}
          cy={CY}
          r={animate ? 36 : 0}
          fill="url(#cc-conv-glow)"
          style={{ transition: "r 0.8s ease-out 1.7s" }}
        />
        <circle
          cx={CX}
          cy={CY}
          r={animate ? 5 : 0}
          fill="hsl(var(--success))"
          style={{ transition: "r 0.5s ease-out 1.8s" }}
        />
        <circle
          cx={CX}
          cy={CY}
          r={animate ? 11 : 0}
          fill="none"
          stroke="hsl(var(--success))"
          strokeOpacity={0.5}
          strokeWidth={0.5}
          style={{ transition: "r 0.7s ease-out 1.9s" }}
        />

        {/* Tick repère sur le point de convergence */}
        <line
          x1={CX}
          x2={CX}
          y1={H - MB}
          y2={H - MB + 6}
          stroke="hsl(var(--primary))"
          strokeOpacity={0.5}
          strokeWidth={0.5}
        />

        {/* Labels axes */}
        <text x={ML - 8} y={MT + 12} textAnchor="end" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--primary))" opacity={0.7}>
          FUTURE
        </text>
        <text x={ML - 8} y={H - MB - 4} textAnchor="end" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--success))" opacity={0.85}>
          SPOT
        </text>
        <text x={ML} y={H - MB + 18} fontSize="9" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--primary))" opacity={0.6}>
          T0
        </text>
        <text x={CX} y={H - MB + 18} textAnchor="end" fontSize="9" fontFamily="JetBrains Mono, monospace" fill="hsl(var(--primary))" opacity={0.6}>
          T+1M · ÉCHÉANCE
        </text>

        {/* Étiquette discrète au point de convergence */}
        <text
          x={CX - 10}
          y={CY - 14}
          textAnchor="end"
          fontSize="9"
          fontFamily="JetBrains Mono, monospace"
          fill="hsl(var(--success))"
          style={{ opacity: animate ? 0.9 : 0, transition: "opacity 0.6s ease-out 2.1s" }}
        >
          CONVERGENCE
        </text>
      </svg>

      {/* Pont central — Spread (HTML overlay positionné en pourcentages du SVG) */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${(bridgeX / W) * 100}%`,
          top: `${(bridgeY / H) * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="flex flex-col items-center justify-center text-center transition-all duration-500 ease-out"
          style={{
            width: hover ? 168 : 96,
            height: hover ? 92 : 60,
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.12), hsl(var(--success) / 0.28))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "0.5px solid hsl(var(--success) / 0.55)",
            boxShadow: hover
              ? "0 0 48px hsl(var(--success) / 0.45), inset 0 0 24px hsl(var(--success) / 0.18)"
              : "0 0 18px hsl(var(--success) / 0.22), inset 0 0 10px hsl(var(--success) / 0.08)",
            opacity: animate ? 1 : 0,
            transitionProperty: "width, height, box-shadow, opacity",
          }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary/80">
            Spread capté
          </span>
          <span
            className="font-serif italic text-success leading-none transition-all duration-500"
            style={{ fontSize: hover ? 26 : 18, marginTop: 4 }}
          >
            +8,0&nbsp;%
          </span>
          <span
            className="font-mono text-[9px] tracking-wider text-muted-foreground transition-all duration-300"
            style={{
              opacity: hover ? 1 : 0,
              maxHeight: hover ? 16 : 0,
              marginTop: hover ? 4 : 0,
              overflow: "hidden",
            }}
          >
            p.a. · annualisé
          </span>
        </div>
      </div>
    </div>
  );
}