import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { bridge } from "@/lib/chamfeuil-bridge";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

interface StageEmailVerificationProps {
  onNext: (data: { email: string }) => void;
  defaultEmail?: string;
}

export function StageEmailVerification({ onNext, defaultEmail = "" }: StageEmailVerificationProps) {
  const { t } = useTranslation("onboarding");
  const emailSchema = z.object({
    firstName: z.string().trim().min(1, t("email.errors.firstNameRequired")).max(100),
    lastName: z.string().trim().min(1, t("email.errors.lastNameRequired")).max(100),
    email: z.string().trim().email(t("email.errors.emailInvalid")).max(255),
    password: z.string().min(8, t("email.errors.passwordMin")).max(128),
    confirmPassword: z.string(),
  }).refine(d => d.password === d.confirmPassword, {
    message: t("email.errors.passwordMismatch"),
    path: ["confirmPassword"],
  });

  const [phase, setPhase] = useState<"credentials" | "otp">("credentials");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
    const result = emailSchema.safeParse({ firstName, lastName, email, password, confirmPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(e => { fieldErrors[e.path[0] as string] = e.message; });
      setErrors(fieldErrors);
      triggerShake();
      return;
    }
    setErrors({});
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: new URL("/open-account", window.location.origin).toString(),
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          // Tag this user as a Quercus-side signup. The chamfeuil-bridge
          // edge function uses this (alongside the JWT) to know that this
          // identity should land in the Chamfeuil KYC backend as a
          // `kyc_clients` row with environment='quercus'.
          env: "quercus",
          source: "quercus_website",
          skip_email_verification: true,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Push the signup into the Chamfeuil KYC DB (creates kyc_clients row +
    // first activity log entry). Fire-and-forget — never blocks onboarding.
    bridge.signup({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    });

    onNext({ email });
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
      toast.success(t("email.resend"));
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
      toast.error(t("twoFA.toasts.invalidCode"));
      setOtp("");
      setLoading(false);
      return;
    }

    // Belt-and-suspenders signup sync — covers the case where the JWT wasn't
    // valid at handleSignUp time (rare but possible with email-confirm flows).
    bridge.signup({});

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
            <h2 className="text-2xl font-serif"><em>{t("email.title")}</em></h2>
            <p className="text-sm text-muted-foreground">{t("email.subtitle")}</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("email.firstName")}</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("email.lastName")}</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email.email")}</Label>
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
              <Label htmlFor="password">{t("email.password")}</Label>
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
              <Label htmlFor="confirmPassword">{t("email.confirmPassword")}</Label>
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
              {loading ? t("email.loading") : t("email.submit")}
            </Button>
          </motion.div>
        </>
      ) : (
        <>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-serif"><em>{t("email.verifyTitle")}</em></h2>
            <p className="text-sm text-muted-foreground">
              {t("email.verifySubtitle")} <strong className="font-mono">{email}</strong>
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
            {t("email.resend")}
          </Button>
        </>
      )}
    </motion.div>
  );
}
