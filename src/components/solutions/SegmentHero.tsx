import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SegmentInfo } from "./segmentData";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

interface SegmentHeroProps {
  current: SegmentInfo;
}

export function SegmentHero({ current }: SegmentHeroProps) {
  return (
    <section className="pt-8 md:pt-12 pb-20 md:pb-28 px-4 md:px-8">
      <ScrollReveal>
        <div className="max-w-6xl mx-auto text-center space-y-10">
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
