import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quercusLogo from "@/assets/quercus-logo.jpg";

const productItems = [
  { name: "Quercus Euro", currency: "EUR", yield: "2,20%", flag: "🇪🇺", color: "hsl(173 50% 19%)" },
  { name: "Quercus Dollar", currency: "USD", yield: "4,00%", flag: "🇺🇸", color: "hsl(210 60% 30%)" },
  { name: "Quercus Pound", currency: "GBP", yield: "4,00%", flag: "🇬🇧", color: "hsl(350 50% 35%)" },
  { name: "Quercus Swiss Franc", currency: "CHF", yield: "0,10%", flag: "🇨🇭", color: "hsl(0 70% 40%)" },
];

const solutionItems = [
  { name: "Start-ups", slug: "startups" },
  { name: "Holdings", slug: "holdings" },
  { name: "Entreprises Crypto", slug: "crypto" },
  { name: "Freelances", slug: "freelances" },
  { name: "PME", slug: "pme" },
  { name: "Fintechs", slug: "fintechs" },
  { name: "SCI", slug: "sci" },
  { name: "Particuliers", slug: "particuliers" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.3)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
      }}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={quercusLogo} alt="Quercus" className="h-8 w-auto" />
          <span className="text-lg font-serif tracking-widest">QUERCUS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("products")}
          >
            <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-4">
              Produits
            </Link>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("solutions")}
          >
            <Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-4">
              Solutions
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="btn-glow" asChild>
            <Link to="/signin">Se connecter</Link>
          </Button>
          <Button size="sm" className="px-6 btn-glow" asChild>
            <Link to="/open-account">Ouvrir un compte</Link>
          </Button>
        </div>
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden hidden md:block"
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="max-w-6xl mx-auto px-6 py-8">
              {activeMenu === "products" && (
                <div className="grid grid-cols-4 gap-4">
                  {productItems.map((p) => (
                    <Link
                      to="/products"
                      key={p.currency}
                      className="group p-5 transition-all duration-300 hover:bg-white/30 border border-transparent hover:border-white/30"
                      style={{
                        // @ts-ignore
                        "--glow-color": p.color,
                      } as React.CSSProperties}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{p.flag}</span>
                        <p className="font-serif text-sm">{p.name}</p>
                      </div>
                      <p className="text-3xl font-serif font-semibold text-success group-hover:drop-shadow-[0_0_8px_var(--glow-color)]">
                        {p.yield}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        rendement net en {p.currency}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
              {activeMenu === "solutions" && (
                <div className="grid grid-cols-4 gap-4">
                  {solutionItems.map((s) => (
                    <Link
                      to={`/solutions/${s.slug}`}
                      key={s.slug}
                      className="p-4 text-sm font-medium hover:bg-white/30 border border-transparent hover:border-white/30 transition-all duration-300"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
