import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { segments, segmentImages } from "@/components/solutions/segmentData";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState, useCallback } from "react";

export function UseCases() {
  const { t } = useTranslation(["landing", "nav"]);
  const loop = [...segments, ...segments];

  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0); // current translateX in px (negative)
  const halfWidthRef = useRef(0); // width of one segments set
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const didDragRef = useRef(false);

  const [isPaused, setIsPaused] = useState(false);
  const SPEED = 60; // px per second

  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
    }
  };

  const normalize = () => {
    const half = halfWidthRef.current;
    if (half <= 0) return;
    if (offsetRef.current <= -half) offsetRef.current += half;
    if (offsetRef.current > 0) offsetRef.current -= half;
  };

  // Measure half-width
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      if (!isPaused && !isDraggingRef.current) {
        offsetRef.current -= SPEED * dt;
        normalize();
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [isPaused]);

  const nudge = useCallback((delta: number) => {
    const start = offsetRef.current;
    const target = start + delta;
    const duration = 500;
    const t0 = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      offsetRef.current = start + (target - start) * ease(p);
      normalize();
      applyTransform();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const cardStep = () => {
    const w = window.innerWidth >= 768 ? 340 : 280;
    return w + 24; // gap-6
  };

  // Pointer drag
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 4) didDragRef.current = true;
    offsetRef.current = dragStartOffsetRef.current + dx;
    normalize();
    applyTransform();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section className="py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
              {t("useCases.title1")} <em>{t("useCases.title2")}</em>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("useCases.subtitle")}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <button
          aria-label="Previous"
          onClick={() => nudge(cardStep())}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center bg-background/90 hover:bg-background border border-border backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => nudge(-cardStep())}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center bg-background/90 hover:bg-background border border-border backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-6 w-max cursor-grab active:cursor-grabbing select-none touch-pan-y"
          style={{ willChange: "transform" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {loop.map((s, i) => {
            const localizedName = t(`nav:solutionsList.${s.slug}`, { defaultValue: s.name });
            return (
              <Link
                key={`${s.slug}-${i}`}
                to={`/solutions/${s.slug}`}
                draggable={false}
                onClick={(e) => {
                  if (didDragRef.current) e.preventDefault();
                }}
                className="relative shrink-0 w-[280px] md:w-[340px] aspect-[4/5] overflow-hidden group/card"
              >
                <img
                  src={segmentImages[s.slug]}
                  alt={localizedName}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover/card:scale-105 group-hover/card:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{localizedName}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-mono opacity-90">{s.yields}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
