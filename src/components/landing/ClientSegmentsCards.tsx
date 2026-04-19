import { Link } from "react-router-dom";
import { ArrowUpRight, Landmark, Factory, User, Bitcoin, Building2 } from "lucide-react";
import { GlassCard } from "@/components/landing/GlassCard";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { useTranslation } from "react-i18next";

export function ClientSegmentsCards() {
  const { t } = useTranslation("landing");
  const segmentCards = [
    { slug: "holdings", icon: Landmark, name: t("segments.holdings.name"), pain: t("segments.holdings.pain") },
    { slug: "pme", icon: Factory, name: t("segments.pme.name"), pain: t("segments.pme.pain") },
    { slug: "freelances", icon: User, name: t("segments.freelances.name"), pain: t("segments.freelances.pain") },
    { slug: "crypto", icon: Bitcoin, name: t("segments.crypto.name"), pain: t("segments.crypto.pain") },
    { slug: "particuliers", icon: Building2, name: t("segments.particuliers.name"), pain: t("segments.particuliers.pain") },
  ];

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif">
              <em>{t("segments.title")}</em>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("segments.subtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {segmentCards.map((s, i) => (
            <ScrollReveal key={s.slug} delay={i * 80}>
              <Link to={`/solutions/${s.slug}`} className="block group h-full">
                <GlassCard className="p-7 h-full flex flex-col gap-4 transition-all group-hover:bg-white/60">
                  <div className="flex items-start justify-between">
                    <s.icon className="h-7 w-7 text-primary" />
                    <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold">
                    <em>{s.name}</em>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{s.pain}</p>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
