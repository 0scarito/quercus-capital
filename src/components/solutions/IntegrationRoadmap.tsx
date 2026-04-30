import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function IntegrationRoadmap() {
  const { t } = useTranslation("products");
  const steps = (t("roadmap.steps", { returnObjects: true }) as Array<{ title: string; text: string }>) || [];
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
          <em>{t("roadmap.title")}</em>
        </h2>

        <div ref={containerRef} className="relative">
          {/* Capsule (green outline holding the sap) */}
          <div
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-3 rounded-full pointer-events-none overflow-hidden"
            style={{
              border: "1.5px solid hsl(var(--primary))",
              background: "hsl(var(--primary) / 0.06)",
              boxShadow: "inset 0 0 0 1px hsl(var(--primary) / 0.15)",
            }}
          >
            {/* Green sap filling from top */}
            <div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "100%",
                transform: `scaleY(${lineProgress})`,
                background:
                  "linear-gradient(to bottom, hsl(173 50% 28%) 0%, hsl(173 55% 22%) 60%, hsl(173 60% 16%) 100%)",
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
                {/* Marker: ripple halo + check icon that "arrives" when sap reaches it */}
                <div
                  className="absolute left-6 md:left-1/2 z-10 pointer-events-none"
                  style={{ top: "0.25rem", transform: "translateX(-50%)" }}
                >
                  {/* Expanding ripple on arrival */}
                  <span
                    aria-hidden
                    className="absolute inset-0 m-auto rounded-full"
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      border: "1.5px solid hsl(var(--primary))",
                      opacity: lit ? 0 : 0,
                      animation: lit ? "roadmap-ripple 900ms ease-out 1" : "none",
                    }}
                  />
                  {/* Core marker */}
                  <div
                    className="relative w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      border: "2px solid hsl(var(--primary))",
                      background: lit ? "hsl(var(--primary))" : "hsl(var(--background))",
                      transform: lit ? "scale(1.15)" : "scale(1)",
                      transition:
                        "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), background-color 400ms ease",
                      boxShadow: lit
                        ? "0 0 0 4px hsl(var(--primary) / 0.12), 0 4px 12px hsl(var(--primary) / 0.25)"
                        : "none",
                    }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="w-3 h-3"
                      fill="none"
                      stroke="hsl(var(--primary-foreground))"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        opacity: lit ? 1 : 0,
                        transform: lit ? "scale(1)" : "scale(0.4)",
                        transition: "opacity 300ms ease 180ms, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1) 180ms",
                      }}
                    >
                      <path d="M3 8.5L6.5 12L13 4.5" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] transition-all duration-700 ease-out ${
                    visible ? "opacity-100 translate-x-0" : `opacity-0 ${isRight ? "md:-translate-x-8" : "md:translate-x-8"} translate-y-4`
                  } ${isRight ? "md:pr-10" : "md:pl-10 md:ml-auto"}`}
                  style={{
                    transform: lit ? "translateY(-2px)" : undefined,
                    transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <p
                    className="text-xs font-mono mb-2 transition-colors duration-500"
                    style={{ color: lit ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                  >
                    {t("common.stepLabel", { n: i + 1 })}
                  </p>
                  <h3
                    className="font-serif mb-2 whitespace-nowrap text-[clamp(1rem,1.7vw,1.5rem)] transition-colors duration-500"
                    style={{ color: lit ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.55)" }}
                  >
                    <em>{step.title}</em>
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed transition-colors duration-500"
                    style={{ color: lit ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground) / 0.6)" }}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}

          <style>{`
            @keyframes roadmap-ripple {
              0% { transform: scale(1); opacity: 0.55; }
              100% { transform: scale(2.4); opacity: 0; }
            }
          `}</style>

          {/* CTA anchored inside roadmap so sap reaches it */}
          <div ref={ctaRef} className="text-center mt-16 relative">
            <Button
              size="lg"
              className="px-12 py-6 text-base transition-all duration-700"
              style={{
                background: ctaLit ? "hsl(var(--primary))" : "hsl(0 0% 82%)",
                color: ctaLit ? "hsl(var(--primary-foreground))" : "hsl(0 0% 45%)",
                borderColor: ctaLit ? "hsl(var(--primary))" : "hsl(0 0% 75%)",
              }}
              asChild
            >
              <Link to="/open-account">{t("roadmap.openAccount")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
