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
  const [lineProgress, setLineProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(steps.length).fill(false));

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

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      const total = rect.height;
      const scrolled = viewH - rect.top;
      const progress = Math.min(Math.max(scrolled / total, 0), 1);
      setLineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-16">
          <em>Démarrez avec Quercus en quelques minutes</em>
        </h2>

        <div ref={containerRef} className="relative">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border">
            <div
              className="w-full bg-primary transition-transform duration-100 origin-top"
              style={{ height: "100%", transform: `scaleY(${lineProgress})` }}
            />
          </div>

          {steps.map((step, i) => {
            const isRight = i % 2 === 0;
            const visible = visibleSteps[i];

            return (
              <div
                key={i}
                data-step={i}
                className={`relative flex items-start mb-16 last:mb-0 ${
                  isRight ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary transition-all duration-500 z-10 ${
                    visible ? "bg-primary scale-100" : "bg-background scale-75"
                  }`}
                  style={{ top: "0.25rem" }}
                />

                {/* Content */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] transition-all duration-700 ease-out ${
                    visible ? "opacity-100 translate-x-0" : `opacity-0 ${isRight ? "md:-translate-x-8" : "md:translate-x-8"} translate-y-4`
                  } ${isRight ? "md:pr-12" : "md:pl-12 md:ml-auto"}`}
                >
                  <p className="text-xs font-mono text-muted-foreground mb-2">
                    Étape {i + 1}
                  </p>
                  <h3 className="text-2xl font-serif mb-3">
                    <em>{step.title}</em>
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="px-12 py-6 text-base btn-glow" asChild>
            <Link to="/open-account">Ouvrir mon compte</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
