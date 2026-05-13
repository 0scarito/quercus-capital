import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { bridge } from "@/lib/chamfeuil-bridge";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface StageIndividualProps {
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

const subSteps = ["address", "tax", "profession", "wealth", "funds", "referral"] as const;
type SubStep = typeof subSteps[number];

export function StageIndividual({ onNext, onBack }: StageIndividualProps) {
  const { t } = useTranslation("onboarding");
  const addressSchema = z.object({
    country: z.string().min(1, t("individual.errors.fieldRequired")),
    address: z.string().min(1, t("individual.errors.fieldRequired")).max(255),
    city: z.string().min(1, t("individual.errors.fieldRequired")).max(100),
    postalCode: z.string().min(1, t("individual.errors.fieldRequired")).max(20),
  });
  const [sub, setSub] = useState<SubStep>("address");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const qc = useQueryClient();

  // Address
  const [country, setCountry] = useState("France");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Tax
  const [taxFrance, setTaxFrance] = useState(true);
  const [taxCountry, setTaxCountry] = useState("");
  const [taxId, setTaxId] = useState("");

  // Profession
  const [sector, setSector] = useState("");
  const [income, setIncome] = useState("");

  // Wealth
  const [patrimoine, setPatrimoine] = useState("");
  const [deposit, setDeposit] = useState("");

  // Funds
  const [fundsOrigin, setFundsOrigin] = useState("");

  // Referral
  const [referral, setReferral] = useState("");

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 500); };

  const subIndex = subSteps.indexOf(sub);

  const goNext = async () => {
    setErrors({});
    if (sub === "address") {
      const result = addressSchema.safeParse({ country, address, city, postalCode });
      if (!result.success) {
        const fe: Record<string, string> = {};
        result.error.errors.forEach(e => { fe[e.path[0] as string] = e.message; });
        setErrors(fe);
        triggerShake();
        return;
      }
    }

    if (sub === "tax" && !taxFrance) {
      if (!taxCountry || !taxId.trim()) {
        toast.error(t("individual.errors.addressRequired"));
        triggerShake();
        return;
      }
    }

    if (sub === "profession" && (!sector || !income)) {
      toast.error(t("individual.errors.professionRequired"));
      triggerShake();
      return;
    }

    if (sub === "wealth" && (!patrimoine || !deposit.trim())) {
      toast.error(t("individual.errors.wealthRequired"));
      triggerShake();
      return;
    }

    if (sub === "funds" && !fundsOrigin) {
      toast.error(t("individual.errors.fundsRequired"));
      triggerShake();
      return;
    }

    if (sub === "referral" && !referral) {
      toast.error(t("individual.errors.referralRequired"));
      triggerShake();
      return;
    }

    if (subIndex < subSteps.length - 1) {
      setSub(subSteps[subIndex + 1]);
    } else {
      if (!user) {
        toast.error(t("individual.errors.sessionExpired"));
        return;
      }
      setSaving(true);
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          address, city, postal_code: postalCode, country,
          tax_country: taxFrance ? country : (taxCountry || null),
          tax_id: taxId || null,
          account_type: "particulier",
        })
        .eq("user_id", user.id);
      if (profileError) {
        setSaving(false);
        toast.error(t("individual.errors.profileSave"));
        return;
      }
      const { error: detailsError } = await supabase
        .from("onboarding_details")
        .upsert({
          user_id: user.id,
          account_type: "particulier",
          sector: sector || null,
          income_band: income || null,
          wealth_band: patrimoine || null,
          planned_deposit: deposit || null,
          funds_origin: fundsOrigin || null,
          referral_source: referral || null,
        }, { onConflict: "user_id" });
      setSaving(false);
      if (detailsError) {
        toast.error(t("individual.errors.detailsSave"));
        return;
      }
      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["onboarding_details"] });
      // Mirror onboarding answers to the Chamfeuil KYC backend — profile
      // fields go to kyc_clients (via sync_profile), the wealth/income
      // signals are logged as a profile_updated activity with full metadata
      // for the CGP's risk profiling.
      bridge.profileUpdated({
        address,
        city,
        postal_code: postalCode,
        country,
        tax_country: taxFrance ? country : (taxCountry || undefined),
        tax_id: taxId || undefined,
      });
      bridge.activity("profile_updated", "Onboarding individuel complété", {
        account_type: "particulier",
        sector, income_band: income, wealth_band: patrimoine,
        planned_deposit: deposit, funds_origin: fundsOrigin, referral_source: referral,
      });
      onNext({
        country, address, city, postalCode,
        taxFrance, taxCountry, taxId,
        sector, income, patrimoine, deposit,
        fundsOrigin, referral,
      });
    }
  };

  const goBack = () => {
    if (subIndex > 0) setSub(subSteps[subIndex - 1]);
    else onBack();
  };

  const errorClass = (field: string) => errors[field] ? "border-destructive" : "";

  const incomeOptions = t("individual.profession.incomeOptions", { returnObjects: true }) as Record<string, string>;
  const wealthOptions = t("individual.wealth.patrimoineOptions", { returnObjects: true }) as Record<string, string>;
  const sectorList = t("individual.profession.sectors", { returnObjects: true }) as string[];
  const fundsOptions = t("individual.funds.options", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const referralOptions = t("individual.referral.options", { returnObjects: true }) as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-md mx-auto"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-serif"><em>{t("individual.title")}</em></h2>
        <p className="text-xs text-muted-foreground">{t("common.stepOf", { current: subIndex + 1, total: subSteps.length })}</p>
      </div>

      <div className="flex gap-1">
        {subSteps.map((_, i) => (
          <div key={i} className={`h-0.5 flex-1 transition-colors ${i <= subIndex ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sub}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {sub === "address" && (
            <>
              <div className="space-y-2">
                <Label>{t("individual.address.country")}</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className={errorClass("country")}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["France", "Belgique", "Suisse", "Luxembourg", "Monaco", "Allemagne", "Espagne", "Italie", "Royaume-Uni", "Autre"].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("individual.address.address")}</Label>
                <Input value={address} onChange={e => setAddress(e.target.value)} className={errorClass("address")} />
                {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("individual.address.city")}</Label>
                  <Input value={city} onChange={e => setCity(e.target.value)} className={errorClass("city")} />
                </div>
                <div className="space-y-2">
                  <Label>{t("individual.address.postalCode")}</Label>
                  <Input value={postalCode} onChange={e => setPostalCode(e.target.value)} className={`font-mono ${errorClass("postalCode")}`} />
                </div>
              </div>
            </>
          )}

          {sub === "tax" && (
            <>
              <div className="flex items-center justify-between">
                <Label>{t("individual.tax.isFrance")}</Label>
                <Switch checked={taxFrance} onCheckedChange={setTaxFrance} />
              </div>
              {!taxFrance && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("individual.tax.country")}</Label>
                    <Select value={taxCountry} onValueChange={setTaxCountry}>
                      <SelectTrigger><SelectValue placeholder={t("individual.tax.selectPlaceholder")} /></SelectTrigger>
                      <SelectContent>
                        {["Belgique", "Suisse", "Luxembourg", "Allemagne", "Espagne", "Italie", "Royaume-Uni", "États-Unis", "Autre"].map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("individual.tax.tin")}</Label>
                    <Input value={taxId} onChange={e => setTaxId(e.target.value)} className="font-mono" />
                  </div>
                </motion.div>
              )}
            </>
          )}

          {sub === "profession" && (
            <>
              <div className="space-y-2">
                <Label>{t("individual.profession.sector")}</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger><SelectValue placeholder={t("individual.tax.selectPlaceholder")} /></SelectTrigger>
                  <SelectContent>
                    {sectorList.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("individual.profession.income")}</Label>
                <Select value={income} onValueChange={setIncome}>
                  <SelectTrigger><SelectValue placeholder={t("individual.tax.selectPlaceholder")} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<50k">{incomeOptions.lt50}</SelectItem>
                    <SelectItem value="50-100k">{incomeOptions["50_100"]}</SelectItem>
                    <SelectItem value="100-150k">{incomeOptions["100_150"]}</SelectItem>
                    <SelectItem value=">150k">{incomeOptions.gt150}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {sub === "wealth" && (
            <>
              <div className="space-y-2">
                <Label>{t("individual.wealth.patrimoine")}</Label>
                <Select value={patrimoine} onValueChange={setPatrimoine}>
                  <SelectTrigger><SelectValue placeholder={t("individual.tax.selectPlaceholder")} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<50k">{wealthOptions.lt50}</SelectItem>
                    <SelectItem value="50-200k">{wealthOptions["50_200"]}</SelectItem>
                    <SelectItem value="200k-1M">{wealthOptions["200_1M"]}</SelectItem>
                    <SelectItem value=">1M">{wealthOptions.gt1M}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("individual.wealth.deposit")}</Label>
                <Input
                  value={deposit}
                  onChange={e => setDeposit(e.target.value)}
                  placeholder={t("individual.wealth.depositPlaceholder")}
                  className="font-mono"
                />
              </div>
            </>
          )}

          {sub === "funds" && (
            <div className="space-y-2">
              <Label>{t("individual.funds.label")}</Label>
              <RadioGroup value={fundsOrigin} onValueChange={setFundsOrigin} className="space-y-3">
                {fundsOptions.map(opt => (
                  <div key={opt.value} className="flex items-center gap-3 bg-white/40 backdrop-blur-[12px] border border-white/20 p-3 cursor-pointer hover:border-primary/40 transition-colors">
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <Label htmlFor={opt.value} className="cursor-pointer text-sm">{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {sub === "referral" && (
            <div className="space-y-2">
              <Label>{t("individual.referral.label")}</Label>
              <Select value={referral} onValueChange={setReferral}>
                <SelectTrigger><SelectValue placeholder={t("individual.tax.selectPlaceholder")} /></SelectTrigger>
                <SelectContent>
                  {referralOptions.map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={goBack} className="flex-1">{t("common.back")}</Button>
        <motion.div className="flex-1" animate={shake ? { x: [-4, 4, -4, 4, 0] } : {}} transition={{ duration: 0.4 }}>
          <Button onClick={goNext} className="btn-glow w-full" disabled={saving}>
            {saving ? t("common.saving") : subIndex === subSteps.length - 1 ? t("common.validate") : t("common.next")}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
