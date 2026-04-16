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
    <section className="py-24 md:py-32 px-6">
      <ScrollReveal>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Pill selector */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {segments.map((s) => (
              <button
                key={s.slug}
                onClick={() => navigate(`/solutions/${s.slug}`)}
                className={`px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 border ${
                  s.slug === current.slug
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white/40 backdrop-blur-sm text-muted-foreground border-white/30 hover:bg-white/60 hover:text-foreground"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight text-primary">
            <em>{current.heroTitle}</em>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {current.heroDescription}
          </p>
          <p className="text-sm font-mono text-success">{current.yields}</p>

          <Button size="lg" className="px-12 py-6 text-base btn-glow" asChild>
            <Link to="/open-account">S'inscrire</Link>
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
