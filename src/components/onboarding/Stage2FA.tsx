import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Smartphone, QrCode } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Stage2FAProps {
  onNext: (data?: { phone?: string; method: "sms" | "app" }) => void;
}

export function Stage2FA({ onNext }: Stage2FAProps) {
  const { t } = useTranslation("onboarding");
  const [method, setMethod] = useState<"sms" | "app" | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendSms = async () => {
    if (!phone || phone.length < 10) {
      toast.error(t("twoFA.toasts.invalidPhone"));
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
    toast.success(t("twoFA.toasts.smsSent"));
  };

  const handleVerifySms = async () => {
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: "sms" });
    if (error) {
      toast.error(t("twoFA.toasts.invalidCode"));
      setOtp("");
      setLoading(false);
      return;
    }
    toast.success(t("twoFA.toasts.phoneVerified"));
    onNext({ phone, method: "sms" });
  };

  const handleSkipApp = () => {
    toast.success(t("twoFA.toasts.appConfigured"));
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
        <h2 className="text-2xl font-serif"><em>{t("twoFA.title")}</em></h2>
        <p className="text-sm text-muted-foreground">{t("twoFA.subtitle")}</p>
      </div>

      {!method ? (
        <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.02 }} onClick={() => setMethod("sms")} className={cardClass(false)}>
            <div className="flex flex-col items-center gap-3 text-center">
              <Smartphone className="w-8 h-8 text-primary" />
              <span className="font-medium text-sm">{t("twoFA.sms")}</span>
              <span className="text-xs text-muted-foreground">{t("twoFA.smsDesc")}</span>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} onClick={() => setMethod("app")} className={cardClass(false)}>
            <div className="flex flex-col items-center gap-3 text-center">
              <QrCode className="w-8 h-8 text-primary" />
              <span className="font-medium text-sm">{t("twoFA.app")}</span>
              <span className="text-xs text-muted-foreground leading-tight">{t("twoFA.appDesc")}</span>
            </div>
          </motion.div>
        </div>
          <Button variant="outline" className="w-full" onClick={() => onNext()}>
            {t("twoFA.skip")}
          </Button>
        </div>
      ) : method === "sms" ? (
        <div className="space-y-4">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("twoFA.phoneLabel")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={t("twoFA.phonePlaceholder")}
                  className="font-mono"
                />
              </div>
              <Button onClick={handleSendSms} className="btn-glow w-full" disabled={loading}>
                {loading ? t("twoFA.sending") : t("twoFA.sendCode")}
              </Button>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground text-center">
                {t("twoFA.codeSent")} <strong className="font-mono">{phone}</strong>
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
                {loading ? t("twoFA.verifying") : t("twoFA.verify")}
              </Button>
              <Button variant="ghost" className="w-full text-xs" onClick={handleSendSms} disabled={loading}>
                {t("twoFA.resend")}
              </Button>
            </>
          )}
          <Button variant="ghost" className="w-full" onClick={() => { setMethod(null); setOtpSent(false); setOtp(""); }}>
            {t("twoFA.back")}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/40 backdrop-blur-[12px] border border-white/20 p-8 flex flex-col items-center gap-4">
            <div className="w-48 h-48 bg-foreground/5 border border-border flex items-center justify-center">
              <QrCode className="w-24 h-24 text-foreground/30" />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {t("twoFA.qrInstruction")}
            </p>
            <div className="w-full">
              <Label className="text-xs text-muted-foreground">{t("twoFA.secretLabel")}</Label>
              <div className="font-mono text-xs bg-muted p-2 text-center tracking-widest select-all">
                JBSW-Y3DP-EHPK-3PXP
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("twoFA.verifyCodeLabel")}</Label>
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
            {t("twoFA.verifyContinue")}
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => { setMethod(null); setOtp(""); }}>
            {t("twoFA.back")}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
