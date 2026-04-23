import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import quercusLogo from "@/assets/quercus-logo.jpg";

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const expired = searchParams.get("expired") === "1";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("Erreur de connexion Google");
        return;
      }
      if (result.redirected) return;
      toast.success("Connexion réussie");
      navigate("/dashboard");
    } catch {
      toast.error("Erreur de connexion Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Connexion réussie");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <img src={quercusLogo} alt="Quercus" className="h-10 w-auto" />
            <span className="text-2xl font-serif tracking-widest">QUERCUS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            The Quest for Excellence in Liquidity Management.
          </p>
        </div>

        <Separator />

        {expired && (
          <div className="rounded-md border border-amber-500/40 bg-amber-500/5 p-4 space-y-1">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Clock className="h-4 w-4" />
              <p className="text-sm font-medium">Vous avez été déconnecté.</p>
            </div>
            <p className="text-xs text-muted-foreground pl-6">
              Votre session a expiré après 15 minutes d'inactivité. Veuillez vous reconnecter.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider">
              Adresse e-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nom@entreprise.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider">
                Mot de passe
              </Label>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground underline">
                Mot de passe oublié ?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
        </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full h-11 gap-3"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {googleLoading ? "Connexion…" : "Continuer avec Google"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link to="/open-account" className="underline hover:text-foreground">
            Ouvrir un compte
          </Link>
        </p>

        <div className="pt-8 text-center space-y-1">
          <p className="text-[10px] text-muted-foreground tracking-wide">
            QUERCUS CAPITAL | 231 RUE SAINT-HONORÉ, 75001 PARIS
          </p>
          <p className="text-[10px] text-muted-foreground">
            RCS PARIS : 928 443 001 | ORIAS n°24004789 — CIF & COA
          </p>
        </div>
      </div>
    </div>
  );
}
