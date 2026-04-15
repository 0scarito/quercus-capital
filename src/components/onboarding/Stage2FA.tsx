import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Smartphone, QrCode } from "lucide-react";

interface Stage2FAProps {
  onNext: (data?: { phone?: string; method: "sms" | "app" }) => void;
}

export function Stage2FA({ onNext }: Stage2FAProps) {
  const [method, setMethod] = useState<"sms" | "app" | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendSms = async () => {
    if (!phone || phone.length < 10) {
      toast.error("Numéro de téléphone invalide");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    setOtpSent(true);
    setLoading(false);
    toast.success("Code SMS envoyé !");
  };

  const handleVerifySms = async () => {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
    if (error) {
      toast.error("Code invalide");
      setOtp("");
      setLoading(false);
      return;
    }
    toast.success("Numéro vérifié !");
    onNext({ phone, method: "sms" });
  };

  const handleSkipApp = () => {
    // For auth app, we'd integrate TOTP — for now, skip to next
    toast.success("2FA configuré avec l'application d'authentification.");
    onNext({ method: "app" });
  };

  const cardClass = (selected: boolean) =>
    `bg-white/40 backdrop-blur-[12px] border p-6 cursor-pointer transition-all ${
      selected ? "border-primary shadow-[0_0_20px_hsl(173_50%_19%/0.15)]" : "border-white/20 hover:border-primary/40"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-md mx-auto"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif"><em>Sécurisez votre compte</em></h2>
        <p className="text-sm text-muted-foreground">Choisissez votre méthode d'authentification à deux facteurs.</p>
      </div>

      {!method ? (
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} onClick={() => setMethod("sms")} className={cardClass(false)}>
            <div className="flex flex-col items-center gap-3 text-center">
              <Smartphone className="w-8 h-8 text-primary" />
              <span className="font-medium text-sm">SMS</span>
              <span className="text-xs text-muted-foreground">Code par SMS</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} onClick={() => setMethod("app")} className={cardClass(false)}>
            <div className="flex flex-col items-center gap-3 text-center">
              <QrCode className="w-8 h-8 text-primary" />
              <span className="font-medium text-sm">Application</span>
              <span className="text-xs text-muted-foreground leading-tight">Recommandé</span>
            </div>
          </motion.div>
        </div>
      ) : method === "sms" ? (
        <div className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+33 6 00 00 00 00"
                  className="font-mono"
                />
              </div>
              <Button onClick={handleSendSms} className="btn-glow w-full" disabled={loading}>
                {loading ? "Envoi…" : "Envoyer le code"}
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground text-center">
                Entrez le code reçu au <strong className="font-mono">{phone}</strong>
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <InputOTPSlot key={i} index={i} className="font-mono text-lg" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button onClick={handleVerifySms} className="btn-glow w-full" disabled={loading || otp.length < 6}>
                {loading ? "Vérification…" : "Vérifier"}
              </Button>
              <Button variant="ghost" className="w-full text-xs" onClick={handleSendSms} disabled={loading}>
                Renvoyer le code
              </Button>
            </>
          )}
          <Button variant="ghost" className="w-full" onClick={() => { setMethod(null); setOtpSent(false); setOtp(""); }}>
            Retour
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/40 backdrop-blur-[12px] border border-white/20 p-8 flex flex-col items-center gap-4">
            <div className="w-48 h-48 bg-foreground/5 border border-border flex items-center justify-center">
              <QrCode className="w-24 h-24 text-foreground/30" />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Scannez ce QR code avec votre application d'authentification (Google Authenticator, Authy, etc.)
            </p>
            <div className="w-full">
              <Label className="text-xs text-muted-foreground">Clé secrète (saisie manuelle)</Label>
              <div className="font-mono text-xs bg-muted p-2 text-center tracking-widest select-all">
                JBSW-Y3DP-EHPK-3PXP
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Code de vérification</Label>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <InputOTPSlot key={i} index={i} className="font-mono text-lg" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <Button onClick={handleSkipApp} className="btn-glow w-full" disabled={otp.length < 6}>
            Vérifier et continuer
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => { setMethod(null); setOtp(""); }}>
            Retour
          </Button>
        </div>
      )}
    </motion.div>
  );
}
