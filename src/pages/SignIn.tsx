import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import quercusLogo from "@/assets/quercus-logo.jpg";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
