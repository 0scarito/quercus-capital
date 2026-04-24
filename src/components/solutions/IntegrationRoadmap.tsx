import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    title: "Devenez membre Quercus en quelques clics.",
    text: "Renseignez vos informations, sécurisez votre accès via la double authentification (2FA) et validez votre identité. Un processus fluide, digital, et conforme aux plus hautes exigences de sécurité.",
  },
  {
    title: "Déposez vos fonds en toute sérénité.",
    text: "Effectuez un virement vers votre compte Quercus. Vos fonds sont déposés auprès de notre banque dépositaire (CACEIS / Crédit Agricole), garantissant une ségrégation totale et une protection maximale de votre capital.",
  },
  {
    title: "Observez vos intérêts croître chaque jour.",
    text: "Dès le premier jour, votre capital génère des intérêts. Les gains sont automatiquement capitalisés et réinvestis quotidiennement, maximisant ainsi l'effet des intérêts composés sans aucune action de votre part.",
  },
  {
    title: "Disposez de vos liquidités sans contrainte.",
    text: "Retirez tout ou partie de vos fonds à tout moment, sans frais de sortie. Pour toute demande effectuée avant 12h25, vos fonds sont disponibles le jour même (T+0). L'excellence, c'est aussi la liberté.",
  },
];

export function IntegrationRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [litSteps, setLitSteps] = useState<boolean[]>(new Array(steps.length).fill(false));
  const [ctaLit, setCtaLit] = useState(false);
  const [dotPositions, setDotPositions] = useState<number[]>([]);
  const [ctaPosition, setCtaPosition] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stepEls = container.querySelectorAll("[data-step]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-step"));
            setVisibleSteps((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    stepEls.forEach((el) => observer.observe(el));

    const computePositions = () => {
      const cRect = container.getBoundingClientRect();
      const dots: number[] = [];
      stepEls.forEach((el) => {
        const r = (el as HTMLElement).getBoundingClientRect();
        // dot is at top: 0.25rem relative to step container
        dots.push(r.top - cRect.top + 4);
      });
      setDotPositions(dots);
      if (ctaRef.current) {
        const r = ctaRef.current.getBoundingClientRect();
        setCtaPosition(r.top + r.height / 2 - cRect.top);
      }
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = rect.height;
      // sap tip = distance from top of container to ~60% of viewport height
      const tip = viewH * 0.6 - rect.top;
      const scrolled = tip;
      const progress = Math.min(Math.max(scrolled / total, 0), 1);
      setLineProgress(progress);

      setLitSteps((prev) => {
        const next = [...prev];
        dotPositions.forEach((dy, i) => {
          if (tip >= dy) next[i] = true;
        });
        return next;
      });
      if (ctaPosition && tip >= ctaPosition - 20) setCtaLit(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", computePositions);
    computePositions();
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", computePositions);
    };
  }, [dotPositions.length, ctaPosition]);

  return (
    <section className="py-24 px-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-center mb-20 whitespace-nowrap text-[clamp(1.75rem,4.2vw,3.25rem)]">
          <em>Démarrez avec Quercus en quelques minutes</em>
        </h2>

        <div ref={containerRef} className="relative">
          {/* Capsule (green outline holding the sap) */}
          <div
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-3 rounded-full pointer-events-none overflow-hidden"
            style={{
              border: "1.5px solid hsl(152 55% 32%)",
              background: "hsl(152 40% 96%)",
              boxShadow: "inset 0 0 0 1px hsl(152 45% 90%)",
            }}
          >
            {/* Green sap filling from top */}
            <div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "100%",
                transform: `scaleY(${lineProgress})`,
                background:
                  "linear-gradient(to bottom, hsl(152 60% 45%) 0%, hsl(152 65% 38%) 60%, hsl(152 70% 32%) 100%)",
                transition: "transform 140ms linear",
              }}
            />
          </div>

          {steps.map((step, i) => {
            const isRight = i % 2 === 0;
            const visible = visibleSteps[i];
            const lit = litSteps[i];

            return (
              <div
                key={i}
                data-step={i}
                className={`relative flex items-start mb-10 md:mb-14 last:mb-0 ${
                  isRight ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot (fills with green when sap reaches it) */}
                <div
                  className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full border-2 transition-colors duration-500 z-10"
                  style={{
                    top: "0.25rem",
                    borderColor: "hsl(152 55% 32%)",
                    background: lit ? "hsl(152 65% 38%)" : "hsl(152 40% 96%)",
                    transform: "translateX(-50%)",
                  }}
                />

                {/* Content */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] transition-all duration-700 ease-out ${
                    visible ? "opacity-100 translate-x-0" : `opacity-0 ${isRight ? "md:-translate-x-8" : "md:translate-x-8"} translate-y-4`
                  } ${isRight ? "md:pr-10" : "md:pl-10 md:ml-auto"}`}
                >
                  <p
                    className="text-xs font-mono mb-2 transition-colors duration-500"
                    style={{ color: lit ? "hsl(152 60% 30%)" : "hsl(var(--muted-foreground))" }}
                  >
                    Étape {i + 1}
                  </p>
                  <h3 className="font-serif mb-2 whitespace-nowrap text-[clamp(1rem,1.7vw,1.5rem)]">
                    <em>{step.title}</em>
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CTA anchored inside roadmap so sap reaches it */}
          <div ref={ctaRef} className="text-center mt-16 relative">
            <Button
              size="lg"
              className="px-12 py-6 text-base transition-all duration-700"
              style={{
                background: ctaLit ? "hsl(152 65% 34%)" : "hsl(0 0% 82%)",
                color: ctaLit ? "hsl(0 0% 100%)" : "hsl(0 0% 45%)",
                borderColor: ctaLit ? "hsl(152 65% 34%)" : "hsl(0 0% 75%)",
              }}
              asChild
            >
              <Link to="/open-account">Ouvrir mon compte</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
