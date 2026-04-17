import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import quercusLogo from "@/assets/quercus-logo.jpg";
import { segments } from "@/components/solutions/segmentData";

interface LandingNavProps {
  variant?: "default" | "solutions";
  currentSlug?: string;
}

const productItems = [
  {
    name: "Velvet",
    subtitle: "Smart Cash · FCP UCITS",
    yield: "€STR + 0,30%",
    href: "/products/velvet",
  },
  {
    name: "TOBAM Crypto Liquidity",
    subtitle: "Cash & Carry · FIA FPS",
    yield: "~7–8% p.a.",
    href: "/products/tobam",
  },
];

export function LandingNav({ variant = "default", currentSlug }: LandingNavProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProductsOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 120);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.3)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
      }}
    >
      <div className="px-6 md:px-10 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={quercusLogo} alt="Quercus" className="h-11 w-auto" />
          <span className="text-xl font-serif tracking-widest">QUERCUS</span>
        </Link>

        {/* Desktop nav */}
        {variant === "solutions" ? (
          <div className="hidden md:flex items-center gap-1.5 flex-1 justify-center overflow-x-auto">
            {segments.map((s) => (
              <Link
                key={s.slug}
                to={`/solutions/${s.slug}`}
                className={`px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 border whitespace-nowrap ${
                  s.slug === currentSlug
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white/40 backdrop-blur-sm text-muted-foreground border-white/30 hover:bg-white/60 hover:text-foreground"
                }`}
              >
                {s.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            >
              <Link
                to="/products"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-4 inline-flex items-center gap-1"
              >
                Produits
              </Link>

              {/* Dropdown */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
                  productsOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="w-[520px] bg-background/95 backdrop-blur-xl border border-border shadow-xl">
                  <div className="grid grid-cols-2 gap-px bg-border">
                    {productItems.map((p) => (
                      <Link
                        key={p.name}
                        to={p.href}
                        onClick={() => setProductsOpen(false)}
                        className="group bg-background p-5 hover:bg-muted/40 transition-colors flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-base font-serif font-semibold">
                            <em>{p.name}</em>
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                          {p.subtitle}
                        </span>
                        <span className="text-sm font-mono text-success mt-1">{p.yield}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 bg-background border-t border-border">
                    <Button asChild size="sm" className="w-full btn-glow" >
                      <Link to="/products" onClick={() => setProductsOpen(false)}>
                        Voir tous les produits
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-4">
              Solutions
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" className="btn-glow" asChild>
            <Link to="/signin">Se connecter</Link>
          </Button>
          <Button size="sm" className="px-6 btn-glow" asChild>
            <Link to="/open-account">Ouvrir un compte</Link>
          </Button>
        </div>
      </div>

    </nav>
  );
}
