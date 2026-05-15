import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { segments, segmentImages } from "@/components/solutions/segmentData";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";

export default function SolutionsPage() {
  const { t } = useTranslation(["pages", "products", "nav"]);
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Seo title="Solutions par profil — Particuliers, entreprises, holdings | Quercus Capital" description="Solutions Quercus pour particuliers, holdings, startups, PME, fintechs, SCI, freelances et acteurs crypto." path="/solutions" />

      <FloatingBlobs />
      <LandingNav />
      <div className="pt-20 relative z-10">
        <section className="pt-8 md:pt-12 pb-12 md:pb-16 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight">
                <em>{t("pages:solutions.heroTitle", { defaultValue: "À qui s'adresse Quercus ?" })}</em>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {t("pages:solutions.heroSubtitle", { defaultValue: "Quercus est conçu pour les organisations et les individus qui exigent davantage de leur trésorerie." })}
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section className="pb-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {segments.map((s, i) => (
              <ScrollReveal key={s.slug} delay={i * 60}>
                <Link
                  to={`/solutions/${s.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden bg-card"
                >
                  <img
                    src={segmentImages[s.slug]}
                    alt={t(`nav:solutionsList.${s.slug}`, { defaultValue: s.name })}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{t(`nav:solutionsList.${s.slug}`, { defaultValue: s.name })}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
                    <p className="text-sm leading-snug opacity-90 line-clamp-2">
                      {t(`products:segments.${s.slug}.heroDescription`, { defaultValue: s.heroDescription }).split(".")[0]}.
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="py-20 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif">
                <em>{t("pages:solutions.ctaTitle", { defaultValue: "Prêt à optimiser votre trésorerie ?" })}</em>
              </h2>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" className="px-10 btn-glow" asChild>
                  <Link to="/open-account">{t("products:common.openAccount")}</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-10 btn-glow" asChild>
                  <Link to="/contact">{t("products:common.contactUs")}</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
