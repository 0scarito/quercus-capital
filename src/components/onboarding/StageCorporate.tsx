import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Upload, CheckCircle, Building2, Briefcase, Landmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface StageCorporateProps {
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

const subSteps = [
  "country",
  "org",
  "orgAddress",
  "entityType",
  "sector",
  "deposit",
  "fundsOrigin",
  "documents",
  "referral",
] as const;
type SubStep = typeof subSteps[number];

export function StageCorporate({ onNext, onBack }: StageCorporateProps) {
  const { t } = useTranslation("onboarding");
  const orgSchema = z.object({
    legalName: z.string().min(1, t("corporate.org.errors.required")).max(255),
    legalForm: z.string().min(1, t("corporate.org.errors.required")),
    siren: z.string().min(9, t("corporate.org.errors.sirenInvalid")).max(14),
  });
  const [sub, setSub] = useState<SubStep>("country");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const qc = useQueryClient();

  // Org
  const [legalName, setLegalName] = useState("");
  const [legalForm, setLegalForm] = useState("");
  const [siren, setSiren] = useState("");

  // Address
  const [orgCountry, setOrgCountry] = useState("France");
  const [orgAddress, setOrgAddress] = useState("");
  const [orgCity, setOrgCity] = useState("");
  const [orgPostalCode, setOrgPostalCode] = useState("");

  // Entity type
  const [entityType, setEntityType] = useState("");

  // Sector
  const [activitySector, setActivitySector] = useState("");

  // Finance — split into two screens to match the pro flow
  const [depositAmount, setDepositAmount] = useState("");
  const [fundsSource, setFundsSource] = useState("");

  // Documents
  const [docs, setDocs] = useState<Record<string, File | null>>({
    funds: null, statutes: null, beneficiaries: null,
  });
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  // Referral
  const [referral, setReferral] = useState("");

  const triggerShake = () => { setShake(true); setTimeout(() => setShake(false), 500); };
  const subIndex = subSteps.indexOf(sub);

  const handleFileDrop = useCallback((key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocs(prev => ({ ...prev, [key]: file }));
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress(prev => ({ ...prev, [key]: Math.min(progress, 100) }));
      }, 200);
    }
  }, []);

  const goNext = async () => {
    setErrors({});
    if (sub === "org") {
      const result = orgSchema.safeParse({ legalName, legalForm, siren });
      if (!result.success) {
        const fe: Record<string, string> = {};
        result.error.errors.forEach(e => { fe[e.path[0] as string] = e.message; });
        setErrors(fe);
        triggerShake();
        return;
      }
    }

    if (subIndex < subSteps.length - 1) {
      setSub(subSteps[subIndex + 1]);
    } else {
      if (!user) {
        toast.error(t("corporate.errors.sessionExpired"));
        return;
      }
      setSaving(true);
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          address: orgAddress || null,
          city: orgCity || null,
          postal_code: orgPostalCode || null,
          country: orgCountry || null,
          account_type: "moral",
        })
        .eq("user_id", user.id);
      if (profileError) {
        setSaving(false);
        toast.error(t("corporate.errors.profileSave"));
        return;
      }
      const { error: detailsError } = await supabase
        .from("onboarding_details")
        .upsert({
          user_id: user.id,
          account_type: "moral",
          legal_name: legalName,
          legal_form: legalForm,
          siren,
          entity_type: entityType || null,
          activity_sector: activitySector || null,
          planned_deposit: depositAmount || null,
          funds_origin: fundsSource || null,
          referral_source: referral || null,
        }, { onConflict: "user_id" });
      setSaving(false);
      if (detailsError) {
        toast.error(t("corporate.errors.detailsSave"));
        return;
      }
      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["onboarding_details"] });
      onNext({
        legalName, legalForm, siren,
        orgCountry, orgAddress, orgCity, orgPostalCode,
        entityType, activitySector, depositAmount, fundsSource,
        docs, referral,
      });
    }
  };

  const goBack = () => {
    if (subIndex > 0) setSub(subSteps[subIndex - 1]);
    else onBack();
  };

  const errorClass = (f: string) => errors[f] ? "border-destructive" : "";

  const entityCardsData = t("corporate.entityType.cards", { returnObjects: true }) as Array<{ value: string; label: string; desc: string }>;
  const entityIcons: Record<string, typeof Briefcase> = {
    operative: Briefcase,
    patrimoine: Building2,
    financial: Landmark,
  };
  const entityCards = entityCardsData.map((c) => ({
    ...c,
    icon: entityIcons[c.value] ?? Briefcase,
    recommended: c.value === "operative",
  }));

  const sectorOptions = t("corporate.sector.options", { returnObjects: true }) as string[];
  const depositOptions = t("corporate.deposit.options", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const fundsOriginOptions = t("corporate.fundsOrigin.options", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const countries = t("corporate.country.options", { returnObjects: true }) as string[];
  const docFields = t("corporate.documents.fields", { returnObjects: true }) as Array<{ key: string; label: string; desc: string }>;
  const referralOptions = t("corporate.referral.options", { returnObjects: true }) as string[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-md mx-auto"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-serif">
          <em>{t(`corporate.titles.${sub}`)}</em>
        </h2>
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
          {sub === "country" && (
            <div className="space-y-2">
              <Label>{t("corporate.country.label")}</Label>
              <Select value={orgCountry} onValueChange={setOrgCountry}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {countries.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {sub === "org" && (
            <>
              <div className="space-y-2">
                <Label>{t("corporate.org.legalName")}</Label>
                <Input value={legalName} onChange={e => setLegalName(e.target.value)} className={errorClass("legalName")} />
                {errors.legalName && <p className="text-xs text-destructive">{errors.legalName}</p>}
              </div>
              <div className="space-y-2">
                <Label>{t("corporate.org.legalForm")}</Label>
                <Input
                  value={legalForm}
                  onChange={e => setLegalForm(e.target.value)}
                  placeholder={t("corporate.org.legalFormPlaceholder")}
                  className={errorClass("legalForm")}
                />
                <p className="text-xs text-muted-foreground">{t("corporate.org.legalFormHelp")}</p>
              </div>
              <div className="space-y-2">
                <Label>{t("corporate.org.siren")}</Label>
                <Input
                  value={siren}
                  onChange={e => setSiren(e.target.value.replace(/\D/g, ""))}
                  placeholder={t("corporate.org.sirenPlaceholder")}
                  className={`font-mono ${errorClass("siren")}`}
                  maxLength={14}
                />
                {errors.siren && <p className="text-xs text-destructive">{errors.siren}</p>}
                <p className="text-xs text-muted-foreground">{t("corporate.org.sirenHelp")}</p>
              </div>
            </>
          )}

          {sub === "orgAddress" && (
            <>
              <div className="space-y-2">
                <Label>{t("corporate.orgAddress.address")}</Label>
                <Input value={orgAddress} onChange={e => setOrgAddress(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("corporate.orgAddress.city")}</Label>
                  <Input value={orgCity} onChange={e => setOrgCity(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>{t("corporate.orgAddress.postalCode")}</Label>
                  <Input value={orgPostalCode} onChange={e => setOrgPostalCode(e.target.value)} className="font-mono" />
                </div>
              </div>
            </>
          )}

          {sub === "entityType" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {t("corporate.entityType.intro")}
              </p>
              {entityCards.map(card => (
                <motion.div
                  key={card.value}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setEntityType(card.value)}
                  className={`relative bg-white/40 backdrop-blur-[12px] border p-4 cursor-pointer transition-all flex items-start gap-4 ${
                    entityType === card.value ? "border-primary shadow-[0_0_16px_hsl(173_50%_19%/0.15)]" : "border-white/20 hover:border-primary/40"
                  }`}
                >
                  <card.icon className="w-7 h-7 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{card.label}</p>
                      {card.recommended && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {t("corporate.entityType.recommended")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">
                {t("corporate.entityType.fatca")}
              </p>
            </div>
          )}

          {sub === "sector" && (
            <div className="space-y-2">
              <Label>{t("corporate.sector.label")}</Label>
              <Select value={activitySector} onValueChange={setActivitySector}>
                <SelectTrigger><SelectValue placeholder={t("corporate.sector.placeholder")} /></SelectTrigger>
                <SelectContent>
                  {sectorOptions.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {sub === "deposit" && (
            <RadioGroup value={depositAmount} onValueChange={setDepositAmount} className="space-y-2">
              {depositOptions.map(opt => (
                <label
                  key={opt.value}
                  htmlFor={`dep-${opt.value}`}
                  className={`flex items-center gap-3 bg-white/40 backdrop-blur-[12px] border p-4 cursor-pointer transition-all ${
                    depositAmount === opt.value ? "border-primary shadow-[0_0_16px_hsl(173_50%_19%/0.15)]" : "border-white/20 hover:border-primary/40"
                  }`}
                >
                  <RadioGroupItem value={opt.value} id={`dep-${opt.value}`} />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </RadioGroup>
          )}

          {sub === "fundsOrigin" && (
            <>
              <p className="text-sm text-muted-foreground">
                {t("corporate.fundsOrigin.intro")}
              </p>
              <RadioGroup value={fundsSource} onValueChange={setFundsSource} className="space-y-2">
                {fundsOriginOptions.map(opt => (
                  <label
                    key={opt.value}
                    htmlFor={`fo-${opt.value}`}
                    className={`flex items-start gap-3 bg-white/40 backdrop-blur-[12px] border p-4 cursor-pointer transition-all ${
                      fundsSource === opt.value ? "border-primary shadow-[0_0_16px_hsl(173_50%_19%/0.15)]" : "border-white/20 hover:border-primary/40"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} id={`fo-${opt.value}`} className="mt-0.5" />
                    <span className="text-sm leading-relaxed">{opt.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </>
          )}

          {sub === "documents" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("corporate.documents.intro")}
              </p>
              {docFields.map(doc => (
                <div key={doc.key} className="space-y-2">
                  <Label className="text-sm">{doc.label}</Label>
                  <label className="block bg-white/40 backdrop-blur-[12px] border border-dashed border-white/30 hover:border-primary/50 p-6 text-center cursor-pointer transition-all">
                    <input type="file" className="hidden" onChange={handleFileDrop(doc.key)} accept=".pdf,.jpg,.png" />
                    {docs[doc.key] ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <span className="text-sm font-mono">{docs[doc.key]!.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{doc.desc}</span>
                      </div>
                    )}
                    {uploadProgress[doc.key] !== undefined && uploadProgress[doc.key] < 100 && (
                      <Progress value={uploadProgress[doc.key]} className="mt-2 h-1" />
                    )}
                  </label>
                </div>
              ))}
            </div>
          )}

          {sub === "referral" && (
            <div className="space-y-2">
              <Label>{t("corporate.titles.referral")}</Label>
              <Select value={referral} onValueChange={setReferral}>
                <SelectTrigger><SelectValue placeholder={t("individual.tax.selectPlaceholder", { ns: "onboarding" })} /></SelectTrigger>
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
