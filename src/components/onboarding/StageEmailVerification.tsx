import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const emailSchema = z.object({
  email: z.string().trim().email("Adresse email invalide").max(255),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères").max(128),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

interface StageEmailVerificationProps {
  onNext: (data: { email: string }) => void;
  defaultEmail?: string;
}

export function StageEmailVerification({ onNext, defaultEmail = "" }: StageEmailVerificationProps) {
  const [phase, setPhase] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSignUp = async () => {
    const result = emailSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(e => { fieldErrors[e.path[0] as string] = e.message; });
      setErrors(fieldErrors);
      triggerShake();
      return;
    }
    setErrors({});
    setLoading(true);

    const redirectUrl = new URL("/open-account", window.location.origin);
    redirectUrl.searchParams.set("type", "signup");
    redirectUrl.searchParams.set("email", email);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl.toString() },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Un code de vérification a été envoyé à votre email.");
    setPhase("otp");
    setLoading(false);
  };

  const handleResendCode = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Code renvoyé !");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp]);

  const handleVerifyOtp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    });

    if (error) {
      toast.error("Code invalide. Veuillez réessayer.");
      setOtp("");
      setLoading(false);
      return;
    }

    toast.success("Email vérifié !");
    onNext({ email });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-md mx-auto"
    >
      {phase === "credentials" ? (
        <>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-serif"><em>Créez votre accès</em></h2>
            <p className="text-sm text-muted-foreground">Renseignez votre email et choisissez un mot de passe sécurisé.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>
          </div>

          <motion.div animate={shake ? { x: [-4, 4, -4, 4, 0] } : {}} transition={{ duration: 0.4 }}>
            <Button onClick={handleSignUp} size="lg" className="btn-glow w-full" disabled={loading}>
              {loading ? "Chargement…" : "Créer mon compte"}
            </Button>
          </motion.div>
        </>
      ) : (
        <>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-serif"><em>Vérifiez votre email</em></h2>
            <p className="text-sm text-muted-foreground">
              Entrez le code à 6 chiffres envoyé à <strong className="font-mono">{email}</strong>
            </p>
          </div>

          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <InputOTPSlot key={i} index={i} className="font-mono text-lg" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button variant="ghost" className="w-full text-xs" onClick={handleResendCode} disabled={loading}>
            Renvoyer le code
          </Button>
        </>
      )}
    </motion.div>
  );
}
