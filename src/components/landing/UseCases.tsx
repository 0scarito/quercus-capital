import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { ArrowUpRight } from "lucide-react";
import { segments, segmentImages } from "@/components/solutions/segmentData";

export function UseCases() {
  // Duplicate for seamless marquee loop
  const loop = [...segments, ...segments];

  return (
    <section className="py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
              Une <em>solution universelle</em>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto">
              PME, start-ups, holdings, freelances, particuliers : Quercus s'adresse à toute organisation
              qui exige davantage de sa trésorerie.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal scrolling marquee */}
      <div className="relative group">
        <div className="flex gap-5 animate-marquee-slow whitespace-nowrap group-hover:[animation-play-state:paused]">
          {loop.map((s, i) => (
            <Link
              key={`${s.slug}-${i}`}
              to={`/solutions/${s.slug}`}
              className="relative shrink-0 w-[280px] md:w-[340px] aspect-[4/5] overflow-hidden group/card"
            >
              <img
                src={segmentImages[s.slug]}
                alt={s.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{s.name}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
