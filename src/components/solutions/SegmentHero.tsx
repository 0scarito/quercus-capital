import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { segments, SegmentInfo } from "./segmentData";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

interface SegmentHeroProps {
  current: SegmentInfo;
}

export function SegmentHero({ current }: SegmentHeroProps) {
  const navigate = useNavigate();

  return (
    <section className="py-28 md:py-40 px-4 md:px-8">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto text-center space-y-10">
          {/* Pill selector */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {segments.map((s) => (
              <button
                key={s.slug}
                onClick={() => navigate(`/solutions/${s.slug}`)}
                className={`px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300 border ${
                  s.slug === current.slug
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white/40 backdrop-blur-sm text-muted-foreground border-white/30 hover:bg-white/60 hover:text-foreground"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight text-primary">
            <em>{current.heroTitle}</em>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {current.heroDescription}
          </p>
          <p className="text-base font-mono text-success">{current.yields}</p>

          <Button size="lg" className="px-12 py-6 text-base btn-glow" asChild>
            <Link to="/open-account">S'inscrire</Link>
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
