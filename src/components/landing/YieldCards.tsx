import { GlassCard } from "@/components/landing/GlassCard";
import { useTilt } from "@/hooks/useTilt";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ProductData {
  name: string;
  subtitle: string;
  yield: string;
  description: string;
  features: string[];
  link: string;
}

function ProductCard({ p }: { p: ProductData }) {
  const tilt = useTilt(5);

  return (
    <Link to={p.link}>
      <GlassCard
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        style={tilt.style}
        className="p-8 cursor-pointer group h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.subtitle}</p>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
        <h3 className="text-3xl font-serif font-semibold mb-2"><em>{p.name}</em></h3>
        <p className="text-4xl font-serif font-semibold text-success mb-4">{p.yield}</p>
        <p className="text-muted-foreground leading-relaxed mb-6">{p.description}</p>
        <div className="flex flex-wrap gap-2">
          {p.features.map((f) => (
            <span key={f} className="text-xs px-3 py-1 border border-border/50 text-muted-foreground">
              {f}
            </span>
          ))}
        </div>
      </GlassCard>
    </Link>
  );
}

export function YieldCards() {
  const { t } = useTranslation("landing");
  const products: ProductData[] = [
    {
      name: "Velvet",
      subtitle: t("products.velvet.subtitle"),
      yield: "€STR + 0,30%",
      description: t("products.velvet.description"),
      features: [t("products.velvet.f1"), t("products.velvet.f2"), t("products.velvet.f3")],
      link: "/products/velvet",
    },
    {
      name: "TOBAM Crypto Liquidity",
      subtitle: t("products.tobam.subtitle"),
      yield: "~7–8% p.a.",
      description: t("products.tobam.description"),
      features: [t("products.tobam.f1"), t("products.tobam.f2"), t("products.tobam.f3")],
      link: "/products/tobam",
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-6">
          <em>{t("products.title")}</em>
        </h2>
        <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto text-lg">
          {t("products.subtitle")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
