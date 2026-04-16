const partners = [
  "Amundi",
  "BNP Paribas",
  "CACEIS",
  "PwC",
  "Société Générale",
  "Crédit Agricole",
];

export function PartnersSection() {
  const doubled = [...partners, ...partners];

  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
          Infrastructure institutionnelle de confiance
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="mx-12 text-2xl md:text-3xl font-serif font-semibold text-foreground/30 shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
