import { useTranslation } from "react-i18next";

const partners = [
  "Amundi",
  "BNP Paribas",
  "CACEIS",
  "PwC",
  "Société Générale",
  "Crédit Agricole",
];

export function PartnersSection() {
  const { t } = useTranslation("landing");
  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
          {t("partners.label")}
        </p>
      </div>
      <div
        className="relative group"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, hsl(0 0% 0%) 8%, hsl(0 0% 0%) 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, hsl(0 0% 0%) 8%, hsl(0 0% 0%) 92%, transparent)",
        }}
      >
        <div className="flex animate-marquee-slow whitespace-nowrap [animation-play-state:running] group-hover:[animation-play-state:paused]">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="mx-12 text-2xl md:text-3xl font-serif font-semibold text-foreground/30 shrink-0 transition-colors hover:text-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
