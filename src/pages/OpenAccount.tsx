import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import quercusLogo from "@/assets/quercus-logo.jpg";

export default function OpenAccount() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
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

  const handleSignUp = async () => {
    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (!form.acceptTerms) {
      toast.error("Veuillez accepter les conditions générales");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
          account_type: form.type,
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Move to phone verification step
    setStep(4);
    setLoading(false);
  };

  const handleSendOtp = async () => {
    if (!form.phone) {
      toast.error("Veuillez renseigner votre numéro de téléphone");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      phone: form.phone,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setOtpSent(true);
    setLoading(false);
    toast.success("Code de vérification envoyé par SMS");
  };

  const handleVerifyOtp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      phone: form.phone,
      token: otp,
      type: "sms",
    });

    if (error) {
      toast.error("Code invalide. Veuillez réessayer.");
      setLoading(false);
      return;
    }

    toast.success("Numéro vérifié ! Bienvenue chez Quercus.");
    navigate("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      await handleSignUp();
    } else if (step === 4 && !otpSent) {
      await handleSendOtp();
    } else if (step === 4 && otpSent) {
      await handleVerifyOtp();
    }
  };

  const stepLabels: Record<number, string> = {
    1: "Type de compte",
    2: "Informations personnelles",
    3: "Sécurité",
    4: "Vérification téléphone",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
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
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 transition-colors ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Étape {step} sur 4 — {stepLabels[step]}
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
                  <Input id="firstName" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone (pour la vérification 2FA)</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+33 6 00 00 00 00" required />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="terms" checked={form.acceptTerms} onCheckedChange={(v) => update("acceptTerms", !!v)} />
                <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                  J'accepte les{" "}
                  <span className="underline">conditions générales</span> et la{" "}
                  <span className="underline">politique de confidentialité</span> de Quercus Capital.
                </Label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {!otpSent
                    ? `Un code de vérification sera envoyé au ${form.phone}`
                    : `Entrez le code reçu au ${form.phone}`}
                </p>
              </div>

              {otpSent && (
                <div className="flex justify-center">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}

              {otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-xs text-muted-foreground underline hover:text-foreground"
                >
                  Renvoyer le code
                </button>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading
              ? "Chargement…"
              : step < 3
                ? "Continuer"
                : step === 3
                  ? "Créer mon compte"
                  : !otpSent
                    ? "Envoyer le code"
                    : "Vérifier"}
          </Button>

          {step > 1 && step < 4 && (
            <Button type="button" variant="ghost" className="w-full" onClick={() => setStep(step - 1)}>
              Retour
            </Button>
          )}

          {step === 4 && (
            <Button type="button" variant="ghost" className="w-full" onClick={() => navigate("/dashboard")}>
              Passer la vérification
            </Button>
          )}
        </form>

        {step < 4 && (
          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
