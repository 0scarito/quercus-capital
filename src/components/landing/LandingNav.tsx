import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import quercusLogo from "@/assets/quercus-logo.jpg";
import { segments } from "@/components/solutions/segmentData";

interface LandingNavProps {
  variant?: "default" | "solutions";
  currentSlug?: string;
}

export function LandingNav({ variant = "default", currentSlug }: LandingNavProps = {}) {
  const [scrolled, setScrolled] = useState(false);

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
            <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors py-4">
              Produits
            </Link>
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
