import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import quercusLogo from "@/assets/quercus-logo.jpg";
interface StageWelcomeProps {
  onNext: () => void;
}

const stepIcons = [ShieldCheck, FileText, ScanFace];

export function StageWelcome({ onNext }: StageWelcomeProps) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const { t } = useTranslation("onboarding");
  const steps = (t("welcome.steps", { returnObjects: true }) as Array<{ label: string; desc: string }>).map((s, i) => ({
    ...s,
    icon: stepIcons[i] ?? ShieldCheck,
  }));

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/open-account`,
      });
      if (result.error) {
        toast.error("Erreur de connexion Google");
        setGoogleLoading(false);
        return;
      }
      // If redirected, browser will navigate. Otherwise OpenAccount detects session and skips ahead.
    } catch {
      toast.error("Erreur de connexion Google");
      setGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10 text-center"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src={quercusLogo} alt="Quercus" className="h-8 w-auto" />
          <span className="text-lg font-serif tracking-widest">QUERCUS</span>
        </div>
        <h1 className="text-3xl font-serif">
          <em>{t("welcome.title")}</em>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          {t("welcome.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            className="bg-white/40 backdrop-blur-[12px] border border-white/20 p-6 flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="font-medium text-sm">{s.label}</span>
            <span className="text-xs text-muted-foreground">{s.desc}</span>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        <Button onClick={onNext} size="lg" className="btn-glow w-full">
          {t("welcome.startEmail")}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">{t("welcome.or")}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full gap-3"
          onClick={handleGoogle}
          disabled={googleLoading}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {googleLoading ? t("welcome.googleLoading") : t("welcome.google")}
        </Button>
        <p className="text-xs text-muted-foreground">
          {t("welcome.afterGoogle")}
        </p>
      </div>
    </motion.div>
  );
}
