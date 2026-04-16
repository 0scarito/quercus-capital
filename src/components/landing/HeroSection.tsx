import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="py-28 md:py-40 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
          <em>La quête de l'excellence<br />en gestion de trésorerie.</em>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Générez du rendement quotidien sur votre trésorerie d'entreprise avec une sécurité institutionnelle.
          Vos fonds, investis dans des instruments souverains, ne sont jamais à notre bilan.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" className="px-10 text-base btn-glow" asChild>
            <Link to="/open-account">Ouvrir un compte</Link>
          </Button>
          <Button size="lg" variant="outline" className="px-10 text-base btn-glow" asChild>
            <Link to="/signin">Prendre rendez-vous</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
