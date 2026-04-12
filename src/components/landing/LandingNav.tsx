import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import quercusLogo from "@/assets/quercus-logo.jpg";

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={quercusLogo} alt="Quercus" className="h-8 w-auto" />
          <span className="text-lg font-serif tracking-widest">QUERCUS</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-opacity">
            Produits
          </Link>
          <Link to="/solutions" className="text-sm text-muted-foreground hover:text-foreground transition-opacity">
            Solutions
          </Link>
          <a href="/#calculator" className="text-sm text-muted-foreground hover:text-foreground transition-opacity">
            Calculateur
          </a>
          <a href="/#partners" className="text-sm text-muted-foreground hover:text-foreground transition-opacity">
            Partenaires
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button size="sm" className="px-6">Open Account</Button>
        </div>
      </div>
    </nav>
  );
}
