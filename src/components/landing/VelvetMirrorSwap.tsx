import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * Animated "Mirror Swap" diagram for Velvet:
 * left  = volatile basket of equities (oscillating bars)
 * right = stable monetary yield (flat ascending line)
 * center = Quercus seal (the swap)
 */
export function VelvetMirrorSwap() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.25);

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        role="img"
        aria-label="Schéma du Total Return Swap : panier d'actions échangé contre un rendement monétaire stable"
      >
        <defs>
          <linearGradient id="vmsBasket" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="vmsYield" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="1" />
          </linearGradient>
          <filter id="vmsGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* labels */}
        <text x="80" y="22" className="font-mono" fontSize="10" letterSpacing="2" fill="hsl(var(--muted-foreground))">PANIER · ACTIONS</text>
        <text x="380" y="22" className="font-mono" fontSize="10" letterSpacing="2" fill="hsl(var(--muted-foreground))">RENDEMENT · €STR + 0,30 %</text>

        {/* LEFT — oscillating bars */}
        <g transform="translate(40,60)">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const x = i * 26;
            const baseH = 40 + ((i * 37) % 80);
            return (
              <rect
                key={i}
                x={x}
                y={180 - baseH}
                width="18"
                height={baseH}
                fill="url(#vmsBasket)"
                style={{
                  transformOrigin: `${x + 9}px 180px`,
                  transform: isVisible ? "scaleY(1)" : "scaleY(0.3)",
                  transition: `transform 900ms cubic-bezier(0.25,0.8,0.4,1) ${i * 80}ms`,
                }}
              >
                <animate
                  attributeName="height"
                  values={`${baseH};${baseH * 0.6};${baseH * 1.15};${baseH * 0.85};${baseH}`}
                  dur={`${4 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values={`${180 - baseH};${180 - baseH * 0.6};${180 - baseH * 1.15};${180 - baseH * 0.85};${180 - baseH}`}
                  dur={`${4 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </rect>
            );
          })}
          {/* baseline */}
          <line x1="-4" y1="180" x2="200" y2="180" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.4" />
          <text x="0" y="200" fontSize="9" fill="hsl(var(--muted-foreground))" className="font-mono">VOLATILITÉ MARCHÉ</text>
        </g>

        {/* CENTER — Quercus seal */}
        <g transform="translate(300,170)">
          <circle r="38" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle r="32" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="2 3">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="40s"
              repeatCount="indefinite"
            />
          </circle>
          <text textAnchor="middle" y="-2" fontSize="11" className="font-serif" fontStyle="italic" fill="hsl(var(--primary))">Quercus</text>
          <text textAnchor="middle" y="14" fontSize="8" letterSpacing="2" fill="hsl(var(--muted-foreground))" className="font-mono">SWAP TRS</text>
        </g>

        {/* arrows in/out */}
        <g stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.55">
          <path d="M250 170 L268 170" markerEnd="url(#vmsArrow)" />
          <path d="M332 170 L350 170" markerEnd="url(#vmsArrow)" />
        </g>
        <defs>
          <marker id="vmsArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--primary))" />
          </marker>
        </defs>

        {/* RIGHT — flat ascending yield line with glow */}
        <g transform="translate(370,60)">
          <line x1="0" y1="180" x2="200" y2="180" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.4" />
          <path
            d="M0 165 L40 158 L80 150 L120 142 L160 132 L200 122"
            fill="none"
            stroke="url(#vmsYield)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#vmsGlow)"
            strokeDasharray="500"
            strokeDashoffset={isVisible ? 0 : 500}
            style={{ transition: "stroke-dashoffset 1800ms cubic-bezier(0.25,0.8,0.4,1) 400ms" }}
          />
          {/* end dot */}
          <circle
            cx="200"
            cy="122"
            r="4"
            fill="hsl(var(--success))"
            opacity={isVisible ? 1 : 0}
            style={{ transition: "opacity 600ms ease 2000ms" }}
          >
            <animate attributeName="r" values="4;6;4" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="200" fontSize="9" fill="hsl(var(--muted-foreground))" className="font-mono">RENDEMENT GARANTI</text>
        </g>
      </svg>

      <div className={cn("grid grid-cols-3 gap-3 mt-6 text-center")}>
        <div className="border-l-2 border-primary/30 pl-3 text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Étape 01</p>
          <p className="text-sm font-serif italic mt-0.5">Le panier</p>
        </div>
        <div className="border-l-2 border-primary/30 pl-3 text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Étape 02</p>
          <p className="text-sm font-serif italic mt-0.5">L'échange</p>
        </div>
        <div className="border-l-2 border-success/40 pl-3 text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Étape 03</p>
          <p className="text-sm font-serif italic mt-0.5">Le rendement</p>
        </div>
      </div>
    </div>
  );
}