import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="pt-20 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
          <em>La quête de l'excellence<br />en gestion de trésorerie.</em>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Générez du rendement quotidien sur votre trésorerie d'entreprise avec une sécurité institutionnelle.
          Vos fonds, détenus par BNP Paribas, ne sont jamais à notre bilan.
        </p>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6 text-lg font-mono">
            <span className="text-success font-semibold">Velvet : €STR + 0,30%</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-success font-semibold">TOBAM : ~7–8% p.a.</span>
          </div>
          <p className="text-xs text-muted-foreground">Rendements nets de frais · Liquidité quotidienne</p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" className="px-10 text-base btn-glow" asChild>
            <Link to="/open-account">Ouvrir un compte</Link>
          </Button>
          <Button size="lg" variant="outline" className="px-10 text-base btn-glow" asChild>
            <Link to="/contact">Prendre rendez-vous</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
