import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { useTranslation } from "react-i18next";
import particuliersImg from "@/assets/segments/particuliers.jpg";
import holdingsImg from "@/assets/segments/holdings.jpg";

export function ForEveryoneSection() {
  const { t } = useTranslation("landing");
  const cards = [
    {
      slug: "particuliers",
      eyebrow: t("forEveryone.individuals.eyebrow"),
      title: t("forEveryone.individuals.title"),
      body: t("forEveryone.individuals.body"),
      image: particuliersImg,
      to: "/solutions/particuliers",
    },
    {
      slug: "tresoreries",
      eyebrow: t("forEveryone.treasuries.eyebrow"),
      title: t("forEveryone.treasuries.title"),
      body: t("forEveryone.treasuries.body"),
      image: holdingsImg,
      to: "/solutions",
    },
  ];

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {t("forEveryone.eyebrow")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              {t("forEveryone.titleLeft")} <em>{t("forEveryone.titleEm1")}</em>{t("forEveryone.titleMid")} <em>{t("forEveryone.titleEm2")}</em> {t("forEveryone.titleRight")}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              {t("forEveryone.subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c, i) => (
            <ScrollReveal key={c.slug} delay={i * 100}>
              <Link to={c.to} className="block group h-full">
                <article className="relative h-full overflow-hidden bg-card border border-border/60 transition-all duration-500 group-hover:border-primary/40">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.eyebrow}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-foreground">
                      {c.eyebrow}
                    </div>
                  </div>
                  <div className="p-7 md:p-8 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-2xl md:text-[26px] font-serif leading-tight">
                        <em>{c.title}</em>
                      </h3>
                      <ArrowUpRight className="h-5 w-5 text-primary shrink-0 mt-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">
                      {c.body}
                    </p>
                    <div className="mt-3 pt-4 border-t border-border/50 flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      <span className="inline-block w-8 h-px bg-primary/60" />
                      {t("forEveryone.discover")}
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
