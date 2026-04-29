import { useState } from "react";
import { TrendingUp, TrendingDown, Shield, Scale } from "lucide-react";

/**
 * CashAndCarryDiagram — Diagramme "Futuristic Heritage" illustrant
 * l'arbitrage Spot/Future :
 *  - Pilier gauche : Achat Spot via ETF NASDAQ (flèche montante).
 *  - Pilier droit : Vente Future sur le CME (flèche descendante).
 *  - Pont central glassmorphism « Rendement Sécurisé »
 *    qui s'élargit au hover et révèle la valeur du spread.
 */
export function CashAndCarryDiagram() {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center overflow-hidden">
      {/* Motif de grille mathématique en arrière-plan */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.06) 0.5px, transparent 0.5px), linear-gradient(90deg, hsl(var(--primary) / 0.06) 0.5px, transparent 0.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Bouclier en filigrane derrière le centre */}
      <Shield
        aria-hidden
        className="absolute text-success/10"
        style={{
          width: 260,
          height: 260,
          filter: "drop-shadow(0 0 40px hsl(var(--success) / 0.25))",
        }}
        strokeWidth={0.5}
      />

      <div className="relative w-full max-w-md mx-auto px-4">
        {/* Badge Non-directional + balance */}
        <div className="flex flex-col items-center mb-6 gap-2">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-sm border"
            style={{
              borderColor: "hsl(var(--primary) / 0.4)",
              color: "hsl(var(--primary))",
              background: "hsl(var(--background) / 0.6)",
            }}
          >
            Non-directional
          </span>
          <Scale
            aria-hidden
            className="text-primary/70"
            strokeWidth={0.6}
            size={28}
          />
        </div>

        {/* Les deux piliers + pont */}
        <div
          className="grid grid-cols-[1fr,auto,1fr] items-stretch gap-0"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Pilier gauche — Long Spot */}
          <div
            className="relative flex flex-col items-center justify-between py-6 px-4 border"
            style={{
              borderColor: "hsl(var(--primary) / 0.6)",
              borderWidth: "0.5px",
              background: "hsl(var(--background) / 0.4)",
              backdropFilter: "blur(6px)",
            }}
          >
            <TrendingUp
              className="text-success mb-3"
              size={28}
              strokeWidth={1}
            />
            <div className="text-center space-y-1">
              <p className="font-serif italic text-sm leading-tight">
                Achat Spot
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                ETF · NASDAQ
              </p>
            </div>
            <div
              className="mt-4 w-px"
              style={{
                height: 36,
                background:
                  "linear-gradient(to bottom, hsl(var(--success)), transparent)",
              }}
            />
          </div>

          {/* Pont central — Rendement Sécurisé */}
          <div className="relative flex items-center">
            <div
              className="relative flex flex-col items-center justify-center text-center transition-all duration-500 ease-out"
              style={{
                width: hover ? 132 : 96,
                height: 132,
                background:
                  "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--success) / 0.25))",
                backdropFilter: "blur(10px)",
                border: "0.5px solid hsl(var(--success) / 0.5)",
                boxShadow: hover
                  ? "0 0 40px hsl(var(--success) / 0.4), inset 0 0 20px hsl(var(--success) / 0.15)"
                  : "0 0 20px hsl(var(--success) / 0.2), inset 0 0 12px hsl(var(--success) / 0.08)",
              }}
            >
              <Shield
                className="text-success mb-1"
                size={22}
                strokeWidth={1}
              />
              <p className="font-serif italic text-[11px] leading-tight px-2 text-foreground">
                Rendement
                <br />
                Sécurisé
              </p>
              <div
                className="absolute font-mono text-[10px] tracking-wider text-success transition-all duration-500"
                style={{
                  bottom: hover ? -22 : -2,
                  opacity: hover ? 1 : 0,
                }}
              >
                Spread +8.0 %
              </div>
            </div>
          </div>

          {/* Pilier droit — Short Future */}
          <div
            className="relative flex flex-col items-center justify-between py-6 px-4 border"
            style={{
              borderColor: "hsl(var(--primary) / 0.6)",
              borderWidth: "0.5px",
              background: "hsl(var(--background) / 0.4)",
              backdropFilter: "blur(6px)",
            }}
          >
            <TrendingDown
              className="text-primary mb-3"
              size={28}
              strokeWidth={1}
            />
            <div className="text-center space-y-1">
              <p className="font-serif italic text-sm leading-tight">
                Vente Future
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                CME · 1 mois
              </p>
            </div>
            <div
              className="mt-4 w-px"
              style={{
                height: 36,
                background:
                  "linear-gradient(to bottom, hsl(var(--primary)), transparent)",
              }}
            />
          </div>
        </div>

        {/* Légende sous le diagramme */}
        <p className="text-center text-[11px] text-muted-foreground mt-6 font-mono uppercase tracking-wider">
          Long Spot ⊕ Short Future ⇒ Spread capté
        </p>
      </div>
    </div>
  );
}