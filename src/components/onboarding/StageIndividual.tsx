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
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const addressSchema = z.object({
  country: z.string().min(1, "Requis"),
  address: z.string().min(1, "Requis").max(255),
  city: z.string().min(1, "Requis").max(100),
  postalCode: z.string().min(1, "Requis").max(20),
});

interface StageIndividualProps {
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

const subSteps = ["address", "tax", "profession", "wealth", "funds", "referral"] as const;
type SubStep = typeof subSteps[number];

export function StageIndividual({ onNext, onBack }: StageIndividualProps) {
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
        toast.error("Veuillez renseigner votre pays de résidence fiscale et votre NIF.");
        triggerShake();
        return;
      }
    }

    if (sub === "profession" && (!sector || !income)) {
      toast.error("Veuillez sélectionner votre secteur et votre revenu annuel.");
      triggerShake();
      return;
    }

    if (sub === "wealth" && (!patrimoine || !deposit.trim())) {
      toast.error("Veuillez renseigner votre patrimoine et le dépôt prévu.");
      triggerShake();
      return;
    }

    if (sub === "funds" && !fundsOrigin) {
      toast.error("Veuillez sélectionner l'origine des fonds.");
      triggerShake();
      return;
    }

    if (sub === "referral" && !referral) {
      toast.error("Veuillez indiquer comment vous avez connu Quercus.");
      triggerShake();
      return;
    }

    if (subIndex < subSteps.length - 1) {
      setSub(subSteps[subIndex + 1]);
    } else {
      if (!user) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
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
        toast.error("Erreur d'enregistrement du profil.");
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
        toast.error("Erreur d'enregistrement des informations.");
        return;
      }
      qc.invalidateQueries({ queryKey: ["profile"] });
      qc.invalidateQueries({ queryKey: ["onboarding_details"] });
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-md mx-auto"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-serif"><em>Informations personnelles</em></h2>
        <p className="text-xs text-muted-foreground">Étape {subIndex + 1} sur {subSteps.length}</p>
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
                <Label>Pays de résidence</Label>
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
                <Label>Adresse complète</Label>
                <Input value={address} onChange={e => setAddress(e.target.value)} className={errorClass("address")} />
                {errors.address && <p className="text-xs text-destructive">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input value={city} onChange={e => setCity(e.target.value)} className={errorClass("city")} />
                </div>
                <div className="space-y-2">
                  <Label>Code postal</Label>
                  <Input value={postalCode} onChange={e => setPostalCode(e.target.value)} className={`font-mono ${errorClass("postalCode")}`} />
                </div>
              </div>
            </>
          )}

          {sub === "tax" && (
            <>
              <div className="flex items-center justify-between">
                <Label>Résidence fiscale en France ?</Label>
                <Switch checked={taxFrance} onCheckedChange={setTaxFrance} />
              </div>
              {!taxFrance && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Pays de résidence fiscale</Label>
                    <Select value={taxCountry} onValueChange={setTaxCountry}>
                      <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                      <SelectContent>
                        {["Belgique", "Suisse", "Luxembourg", "Allemagne", "Espagne", "Italie", "Royaume-Uni", "États-Unis", "Autre"].map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Numéro d'identification fiscale (NIF)</Label>
                    <Input value={taxId} onChange={e => setTaxId(e.target.value)} className="font-mono" />
                  </div>
                </motion.div>
              )}
            </>
          )}

          {sub === "profession" && (
            <>
              <div className="space-y-2">
                <Label>Secteur d'activité</Label>
                <Select value={sector} onValueChange={setSector}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                  <SelectContent>
                    {["Finance", "Technologie", "Santé", "Immobilier", "Commerce", "Éducation", "Étudiant", "Retraité", "Autre"].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Revenu annuel</Label>
                <Select value={income} onValueChange={setIncome}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<50k">Moins de 50 000 €</SelectItem>
                    <SelectItem value="50-100k">50 000 € — 100 000 €</SelectItem>
                    <SelectItem value="100-150k">100 000 € — 150 000 €</SelectItem>
                    <SelectItem value=">150k">Plus de 150 000 €</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {sub === "wealth" && (
            <>
              <div className="space-y-2">
                <Label>Patrimoine total</Label>
                <Select value={patrimoine} onValueChange={setPatrimoine}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<50k">Moins de 50 000 €</SelectItem>
                    <SelectItem value="50-200k">50 000 € — 200 000 €</SelectItem>
                    <SelectItem value="200k-1M">200 000 € — 1 000 000 €</SelectItem>
                    <SelectItem value=">1M">Plus de 1 000 000 €</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Montant prévu du premier dépôt</Label>
                <Input
                  value={deposit}
                  onChange={e => setDeposit(e.target.value)}
                  placeholder="Ex: 10 000 €"
                  className="font-mono"
                />
              </div>
            </>
          )}

          {sub === "funds" && (
            <div className="space-y-2">
              <Label>Origine des fonds</Label>
              <RadioGroup value={fundsOrigin} onValueChange={setFundsOrigin} className="space-y-3">
                {[
                  { value: "salary", label: "Salaire / Revenus professionnels" },
                  { value: "inheritance", label: "Héritage / Donation" },
                  { value: "real-estate", label: "Vente immobilière" },
                  { value: "crypto", label: "Gains crypto" },
                  { value: "other", label: "Autre" },
                ].map(opt => (
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
              <Label>Comment avez-vous entendu parler de Quercus ?</Label>
              <Select value={referral} onValueChange={setReferral}>
                <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                <SelectContent>
                  {["LinkedIn", "Recommandation d'un ami", "Recherche Google", "Presse", "Événement", "Autre"].map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <Button variant="ghost" onClick={goBack} className="flex-1">Retour</Button>
        <motion.div className="flex-1" animate={shake ? { x: [-4, 4, -4, 4, 0] } : {}} transition={{ duration: 0.4 }}>
          <Button onClick={goNext} className="btn-glow w-full" disabled={saving}>
            {saving ? "Enregistrement…" : subIndex === subSteps.length - 1 ? "Valider" : "Suivant"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
