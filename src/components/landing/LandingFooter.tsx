import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import quercusLogo from "@/assets/quercus-logo.jpg";

const productLinks = [
  { label: "Velvet", href: "/products/velvet" },
  { label: "TOBAM Crypto Liquidity", href: "/products/tobam" },
  { label: "Quercus Euro", href: "/products" },
  { label: "Quercus Dollar", href: "/products" },
  { label: "Quercus Pound", href: "/products" },
  { label: "Quercus Franc Suisse", href: "/products" },
];

const useCaseLinksLeft = [
  { label: "Start-ups", href: "/solutions/startups" },
  { label: "PME", href: "/solutions/pme" },
  { label: "Crypto", href: "/solutions/crypto" },
  { label: "Freelances", href: "/solutions/freelances" },
];

const useCaseLinksRight = [
  { label: "Holdings", href: "/solutions/holdings" },
  { label: "Fintechs", href: "/solutions/fintechs" },
  { label: "SCI", href: "/solutions/sci" },
  { label: "Particuliers", href: "/solutions/particuliers" },
];

const resourceLinks = [
  { label: "À propos", href: "/a-propos" },
  { label: "Presse", href: "/presse" },
  { label: "Contact", href: "/contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Charte cookie", href: "/charte-cookie" },
];

export function LandingFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Top: logo */}
        <div className="flex items-center gap-3 mb-10">
          <img src={quercusLogo} alt="Quercus" className="h-10 w-auto brightness-0 invert" />
          <span className="text-3xl font-serif tracking-widest">QUERCUS</span>
        </div>

        <Separator className="bg-primary-foreground/15 mb-12" />

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Newsletter / follow */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-serif">Suivez-nous</h3>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 flex items-center justify-center border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-6 space-y-4">
              <h4 className="text-xl font-serif">Newsletter</h4>
              <p className="text-sm text-primary-foreground/70">
                Inscrivez-vous pour recevoir nos dernières actualités.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <Input
                  type="email"
                  required
                  placeholder="Votre email..."
                  className="bg-background text-foreground placeholder:text-muted-foreground border-0 h-11"
                />
                <Button type="submit" variant="secondary" className="h-11 px-5 bg-foreground text-background hover:bg-foreground/90">
                  S'inscrire
                </Button>
              </form>
            </div>
          </div>

          {/* Produits */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-lg font-serif">Produits</h4>
            <ul className="space-y-2.5">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cas d'usage */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-lg font-serif">Cas d'usage</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {useCaseLinksLeft.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              {useCaseLinksRight.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Ressources */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-lg font-serif">Ressources</h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-primary-foreground/15 mt-14 mb-6" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Quercus Capital — Tous droits réservés.</p>
          <p>
            231 rue Saint-Honoré, 75001 Paris · RCS Paris 928 443 001 · ORIAS n°24004789 (CIF & COA)
          </p>
        </div>
      </div>
    </footer>
  );
}
