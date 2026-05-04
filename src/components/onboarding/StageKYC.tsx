import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScanFace, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import quercusLogo from "@/assets/quercus-logo.jpg";

interface StageKYCProps {
  onComplete: () => void;
}

export function StageKYC({ onComplete }: StageKYCProps) {
  const { t } = useTranslation("onboarding");
  const [phase, setPhase] = useState<"ready" | "verifying" | "review" | "done">("ready");
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const queryClient = useQueryClient();

  // Editable fields extracted/confirmed from the ID document.
  // Pre-filled with what we already know about the user so they only correct
  // mismatches before everything is written to `profiles`.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("France");
  const [taxCountry, setTaxCountry] = useState("France");
  const [taxId, setTaxId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFirstName(profile.first_name ?? "");
    setLastName(profile.last_name ?? "");
    setDateOfBirth(profile.date_of_birth ?? "");
    setAddress(profile.address ?? "");
    setCity(profile.city ?? "");
    setPostalCode(profile.postal_code ?? "");
    setCountry(profile.country ?? "France");
    setTaxCountry(profile.tax_country ?? "France");
    setTaxId(profile.tax_id ?? "");
  }, [profile]);

  const handleVerify = async () => {
    setPhase("verifying");
    // Simulate KYC provider OCR / identity extraction
    await new Promise((r) => setTimeout(r, 3000));
    setPhase("review");
  };

  const handleConfirm = async () => {
    if (!user) return;
    const required: Array<[string, string]> = [
      [firstName.trim(), t("kyc.review.firstName")],
      [lastName.trim(), t("kyc.review.lastName")],
      [dateOfBirth, t("kyc.review.dob")],
      [address.trim(), t("kyc.review.address")],
      [city.trim(), t("kyc.review.city")],
      [postalCode.trim(), t("kyc.review.postalCode")],
      [country.trim(), t("kyc.review.country")],
      [taxCountry.trim(), t("kyc.review.taxCountry")],
      [taxId.trim(), t("kyc.review.tin")],
    ];
    const missing = required.filter(([v]) => !v).map(([, label]) => label);
    if (missing.length) {
      toast.error(t("kyc.review.missing", { fields: missing.join(", ") }));
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        date_of_birth: dateOfBirth,
        address: address.trim(),
        city: city.trim(),
        postal_code: postalCode.trim(),
        country: country.trim(),
        tax_country: taxCountry.trim(),
        tax_id: taxId.trim(),
        onboarding_completed: true,
      })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      toast.error(t("kyc.review.saveError"));
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
    // Fire-and-forget welcome email — failure must never block onboarding.
    void supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "welcome",
        recipientEmail: user.email,
        idempotencyKey: `welcome-${user.id}`,
        templateData: { firstName: firstName.trim() },
      },
    }).catch((err) => console.warn("welcome email failed to enqueue", err));
    setPhase("done");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-md mx-auto text-center"
    >
      {phase === "ready" && (
        <>
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <ScanFace className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-serif"><em>{t("kyc.ready.title")}</em></h2>
            <p className="text-sm text-muted-foreground">
              {t("kyc.ready.subtitle")}
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-[12px] border border-white/20 p-6 space-y-3 text-left">
            <p className="text-sm font-medium">{t("kyc.ready.needsTitle")}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {(t("kyc.ready.needs", { returnObjects: true }) as string[]).map((n) => (
                <li key={n} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" /> {n}
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={handleVerify} size="lg" className="btn-glow w-full">
            {t("kyc.ready.cta")}
          </Button>
        </>
      )}

      {phase === "verifying" && (
        <div className="space-y-6 py-12">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">{t("kyc.verifying")}</p>
        </div>
      )}

      {phase === "review" && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5 text-left"
        >
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-serif"><em>{t("kyc.review.title")}</em></h2>
            <p className="text-sm text-muted-foreground">
              {t("kyc.review.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.firstName")}</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.lastName")}</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.dob")}</Label>
            <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.address")}</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.city")}</Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.postalCode")}</Label>
              <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="font-mono" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.country")}</Label>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.taxCountry")}</Label>
              <Input value={taxCountry} onChange={(e) => setTaxCountry(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("kyc.review.tin")}</Label>
              <Input value={taxId} onChange={(e) => setTaxId(e.target.value)} className="font-mono" />
            </div>
          </div>

          <Button onClick={handleConfirm} size="lg" className="btn-glow w-full" disabled={saving}>
            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t("kyc.review.saving")}</> : t("kyc.review.confirm")}
          </Button>
        </motion.div>
      )}

      {phase === "done" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="space-y-6 py-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.img
              src={quercusLogo}
              alt="Quercus"
              className="w-24 h-24 object-contain"
              initial={{ filter: "grayscale(100%) brightness(1.5)", opacity: 0.3 }}
              animate={{ filter: "grayscale(0%) brightness(1)", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>

          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.8 }}
            >
              <CheckCircle className="w-12 h-12 text-success mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-serif"><em>{t("kyc.done.title")}</em></h2>
            <p className="text-sm text-muted-foreground">
              {t("kyc.done.subtitle")}
            </p>
          </div>

          <Button onClick={onComplete} size="lg" className="btn-glow w-full">
            {t("kyc.done.cta")}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
