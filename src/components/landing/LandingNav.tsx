import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import quercusLogo from "@/assets/quercus-logo.jpg";
import { segments } from "@/components/solutions/segmentData";
import { useAnnouncementVisible } from "@/components/landing/AnnouncementBanner";

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

const solutionItems = [
  { name: "Holdings & Family Offices", slug: "holdings" },
  { name: "PME & Start-ups", slug: "pme" },
  { name: "Entreprises Crypto", slug: "crypto" },
  { name: "Professions libérales", slug: "freelances" },
  { name: "Particuliers", slug: "particuliers" },
];

const resourceItems = [
  { name: "À propos", href: "/a-propos", desc: "Notre mission et notre équipe" },
  { name: "Presse", href: "/presse", desc: "Communiqués et couverture média" },
  { name: "Contact", href: "/contact", desc: "Prendre rendez-vous" },
  { name: "Mentions légales", href: "/mentions-legales", desc: "Information réglementaire" },
];

type MenuKey = "products" | "solutions" | "resources" | null;

export function LandingNav({ variant = "default", currentSlug }: LandingNavProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState<MenuKey>(null);
  const closeTimer = useRef<number | null>(null);
  const bannerVisible = useAnnouncementVisible();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = (key: MenuKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenuKey(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenuKey(null), 120);
  };

  return (
    <nav
      className="fixed left-0 right-0 z-50 transition-all duration-500"
      style={{
        top: bannerVisible ? "36px" : "0",
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
            {/* Produits */}
            <div className="relative" onMouseEnter={() => open("products")} onMouseLeave={scheduleClose}>
              <Link
                to="/products"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-4 inline-flex items-center gap-1"
              >
                Produits
              </Link>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
                  openMenuKey === "products"
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
                        onClick={() => setOpenMenuKey(null)}
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
                    <Button asChild size="sm" className="w-full btn-glow">
                      <Link to="/products" onClick={() => setOpenMenuKey(null)}>
                        Voir tous les produits
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div className="relative" onMouseEnter={() => open("solutions")} onMouseLeave={scheduleClose}>
              <Link
                to="/solutions"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-4"
              >
                Solutions
              </Link>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
                  openMenuKey === "solutions"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="w-[320px] bg-background/95 backdrop-blur-xl border border-border shadow-xl">
                  <div className="flex flex-col">
                    {solutionItems.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/solutions/${s.slug}`}
                        onClick={() => setOpenMenuKey(null)}
                        className="group px-5 py-3 hover:bg-muted/40 transition-colors flex items-center justify-between border-b border-border last:border-0"
                      >
                        <span className="text-sm">{s.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link to="/solutions" onClick={() => setOpenMenuKey(null)}>
                        Toutes les solutions
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ressources */}
            <div className="relative" onMouseEnter={() => open("resources")} onMouseLeave={scheduleClose}>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors py-4">
                Ressources
              </button>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
                  openMenuKey === "resources"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="w-[340px] bg-background/95 backdrop-blur-xl border border-border shadow-xl">
                  {resourceItems.map((r) => (
                    <Link
                      key={r.href}
                      to={r.href}
                      onClick={() => setOpenMenuKey(null)}
                      className="group block px-5 py-3 hover:bg-muted/40 transition-colors border-b border-border last:border-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{r.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{r.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
