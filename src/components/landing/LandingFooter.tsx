import { Separator } from "@/components/ui/separator";
import quercusLogo from "@/assets/quercus-logo.jpg";

const footerLinks = [
  { title: "Products", items: ["Quercus Euro", "Quercus Dollar", "Quercus Pound", "Quercus Swiss Franc"] },
  { title: "Segments", items: ["PME", "Holding", "Start-up", "Real Estate"] },
  { title: "Company", items: ["About", "Careers", "Press", "Contact"] },
  { title: "Legal", items: ["Mentions légales", "Confidentialité", "Charte cookie"] },
];

export function LandingFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-background/50">{group.title}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-background/70 hover:text-background transition-opacity">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-background/10" />

        <div className="pt-8 space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <img src={quercusLogo} alt="Quercus" className="h-7 w-auto brightness-0 invert" />
            <p className="text-lg font-serif tracking-widest">QUERCUS</p>
          </div>
          <p className="text-xs text-background/40">
            QUERCUS CAPITAL | 231 RUE SAINT-HONORÉ, 75001 PARIS | Tél +33 1 84 20 07 65
          </p>
          <p className="text-xs text-background/40">
            RCS PARIS : 928 443 001 | Enregistré auprès de l'ORIAS sous le n°24004789 en qualité de CIF et COA.
          </p>
        </div>
      </div>
    </footer>
  );
}
