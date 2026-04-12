import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import quercusLogo from "@/assets/quercus-logo.jpg";

export default function OpenAccount() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={quercusLogo} alt="Quercus" className="h-10 w-auto" />
            <span className="text-xl font-serif tracking-widest">QUERCUS</span>
          </Link>
          <h1 className="text-2xl font-serif">
            <em>Ouvrir un compte</em>
          </h1>
          <p className="text-sm text-muted-foreground">
            Accédez aux rendements souverains en quelques minutes.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 transition-colors ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Étape {step} sur 3 — {step === 1 ? "Type de compte" : step === 2 ? "Informations personnelles" : "Sécurité"}
        </p>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <Label>Type de compte</Label>
              <Select value={form.type} onValueChange={(v) => update("type", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="particulier">Particulier</SelectItem>
                  <SelectItem value="entreprise">Entreprise</SelectItem>
                  <SelectItem value="sci">SCI</SelectItem>
                  <SelectItem value="holding">Holding</SelectItem>
                  <SelectItem value="freelance">Freelance / Indépendant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+33 6 00 00 00 00"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  required
                />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={form.acceptTerms}
                  onCheckedChange={(v) => update("acceptTerms", !!v)}
                />
                <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                  J'accepte les{" "}
                  <span className="underline">conditions générales</span> et la{" "}
                  <span className="underline">politique de confidentialité</span> de Quercus Capital.
                </Label>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            {step < 3 ? "Continuer" : "Créer mon compte"}
          </Button>

          {step > 1 && (
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep(step - 1)}
            >
              Retour
            </Button>
          )}
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
