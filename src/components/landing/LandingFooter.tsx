import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Linkedin, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import quercusLogo from "@/assets/quercus-logo.jpg";
import { supabase } from "@/integrations/supabase/client";

const productLinks = [
  { label: "Velvet (Smart Cash)", href: "/products/velvet" },
  { label: "TOBAM Crypto Liquidity", href: "/products/tobam" },
  { label: "Tous les produits", href: "/products" },
];

const useCaseLinksLeft = [
  { label: "Holdings", href: "/solutions/holdings" },
  { label: "PME", href: "/solutions/pme" },
  { label: "Start-ups", href: "/solutions/startups" },
  { label: "Crypto", href: "/solutions/crypto" },
];

const useCaseLinksRight = [
  { label: "Freelances", href: "/solutions/freelances" },
  { label: "Fintechs", href: "/solutions/fintechs" },
  { label: "SCI", href: "/solutions/sci" },
  { label: "Particuliers", href: "/solutions/particuliers" },
];

const resourceLinks = [
  { label: "À propos", href: "/a-propos" },
  { label: "Presse", href: "/presse" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
  { label: "Charte cookie", href: "/charte-cookie" },
];

const documentLinks = [
  { label: "Prospectus Velvet", href: "https://www.lfis.com" },
  { label: "KID Velvet", href: "https://www.lfis.com" },
  { label: "Prospectus TOBAM", href: "https://www.tobam.fr" },
  { label: "Informations réglementaires", href: "/mentions-legales" },
];

export function LandingFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase(), source: "footer" });

      if (error) {
        if (error.code === "23505") {
          toast.success("Vous êtes déjà inscrit à notre newsletter.");
        } else {
          console.error("newsletter error", error);
          toast.error("Inscription impossible. Vérifiez votre adresse e-mail.");
        }
      } else {
        toast.success("Merci ! Votre inscription est confirmée.");
        setEmail("");
      }
    } finally {
      setLoading(false);
    }
  };

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
          <div className="md:col-span-4 space-y-6">
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
                Recevez nos analyses de marché et les actualités produits.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email..."
                  className="bg-background text-foreground placeholder:text-muted-foreground border-0 h-11"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  variant="secondary"
                  className="h-11 px-5 bg-foreground text-background hover:bg-foreground/90"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "S'inscrire"}
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
                  <Link to={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
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
                <Link key={item.label} to={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
              {useCaseLinksRight.map((item) => (
                <Link key={item.label} to={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Ressources + Légal */}
          <div className="md:col-span-3 space-y-6">
            <div className="space-y-3">
              <h4 className="text-lg font-serif">Ressources</h4>
              <ul className="space-y-2.5">
                {resourceLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-serif">Légal</h4>
              <ul className="space-y-2.5">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Document downloads */}
        <Separator className="bg-primary-foreground/15 mt-14 mb-8" />
        <div className="space-y-4">
          <h4 className="text-sm uppercase tracking-widest text-primary-foreground/70">
            Documentation produit
          </h4>
          <div className="flex flex-wrap gap-3">
            {documentLinks.map((doc) => (
              <a
                key={doc.label}
                href={doc.href}
                target={doc.href.startsWith("http") ? "_blank" : undefined}
                rel={doc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-xs px-3 py-2 border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                {doc.label}
              </a>
            ))}
          </div>
        </div>

        {/* Distributor disclaimer */}
        <Separator className="bg-primary-foreground/15 mt-10 mb-6" />
        <div className="space-y-4 text-[11px] text-primary-foreground/60 leading-relaxed">
          <p>
            <strong className="text-primary-foreground/80">Avertissement.</strong> Quercus Capital agit en qualité de distributeur des fonds Velvet (FCP UCITS géré par LFIS Capital, agréé AMF n° FCP20230197) et TOBAM Crypto Liquidity Fund (FIA · Fonds Professionnel Spécialisé géré par TOBAM, agréée AMF GP 06 000019). Les fonds sont détenus par les banques dépositaires (BNP Paribas pour Velvet, CACEIS Bank pour TOBAM) et ne sont jamais inscrits au bilan de Quercus Capital. Audités annuellement par PwC.
          </p>
          <p>
            Les performances passées ne préjugent pas des performances futures. Tout investissement comporte un risque de perte en capital. Les rendements affichés sont indicatifs et nets de frais ; ils peuvent varier en fonction des conditions de marché. Avant toute souscription, prenez connaissance du Prospectus et du Document d'Information Clé (KID/DIC) disponibles sur demande ou sur les sites des sociétés de gestion.
          </p>
        </div>

        <Separator className="bg-primary-foreground/15 mt-8 mb-6" />
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
