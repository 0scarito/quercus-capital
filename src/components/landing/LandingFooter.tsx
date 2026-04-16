import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import quercusLogo from "@/assets/quercus-logo.jpg";

const footerLinks = [
  {
    title: "Produits",
    items: [
      { label: "Quercus Euro", href: "/products" },
      { label: "Quercus Dollar", href: "/products" },
      { label: "Quercus Pound", href: "/products" },
      { label: "Quercus Swiss Franc", href: "/products" },
    ],
  },
  {
    title: "Segments",
    items: [
      { label: "PME", href: "/solutions" },
      { label: "Holding", href: "/solutions" },
      { label: "Start-up", href: "/solutions" },
      { label: "SCI", href: "/solutions" },
      { label: "Fintechs", href: "/solutions" },
    ],
  },
  {
    title: "Société",
    items: [
      { label: "À propos", href: "/a-propos" },
      { label: "Presse", href: "/presse" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Légal",
    items: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
      { label: "Charte cookie", href: "/charte-cookie" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-primary-foreground/50 font-serif">{group.title}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-opacity">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-primary-foreground/10" />

        <div className="pt-8 space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <img src={quercusLogo} alt="Quercus" className="h-7 w-auto brightness-0 invert" />
            <p className="text-lg font-serif tracking-widest">QUERCUS</p>
          </div>
          <p className="text-xs text-primary-foreground/40">
            QUERCUS CAPITAL | 231 RUE SAINT-HONORÉ, 75001 PARIS | Tél +33 1 84 20 07 65
          </p>
          <p className="text-xs text-primary-foreground/40">
            RCS PARIS : 928 443 001 | Enregistré auprès de l'ORIAS sous le n°24004789 en qualité de CIF et COA.
          </p>
        </div>
      </div>
    </footer>
  );
}
