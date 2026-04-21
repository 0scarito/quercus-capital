import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, Building2, Briefcase, Landmark } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const orgSchema = z.object({
  legalName: z.string().min(1, "Requis").max(255),
  legalForm: z.string().min(1, "Requis"),
  siren: z.string().min(9, "SIREN invalide (9 chiffres)").max(14),
});

interface StageCorporateProps {
  onNext: (data: Record<string, unknown>) => void;
  onBack: () => void;
}

const subSteps = ["org", "orgAddress", "entityType", "sector", "finance", "documents", "referral"] as const;
type SubStep = typeof subSteps[number];

export function StageCorporate({ onNext, onBack }: StageCorporateProps) {
  const [sub, setSub] = useState<SubStep>("org");
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

  // Finance
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
        toast.error("Session expirée. Veuillez vous reconnecter.");
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
        toast.error("Erreur d'enregistrement du profil.");
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
        toast.error("Erreur d'enregistrement des informations.");
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

  const entityCards = [
    { value: "operative", icon: Briefcase, label: "Entité opérationnelle", desc: "Activité commerciale de biens/services" },
    { value: "patrimoine", icon: Building2, label: "Entité patrimoniale", desc: "Gestion passive d'actifs" },
    { value: "financial", icon: Landmark, label: "Institution financière", desc: "Banque, fonds, PSP" },
  ];

  const docFields = [
    { key: "funds", label: "Justificatif d'origine des fonds", desc: "Dernier bilan ou relevé bancaire" },
    { key: "statutes", label: "Statuts de la société", desc: "Document officiel" },
    { key: "beneficiaries", label: "Registre des bénéficiaires effectifs", desc: "Liste des ayants droit" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-md mx-auto"
    >
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-serif"><em>Informations de l'entité</em></h2>
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
          {sub === "org" && (
            <>
              <div className="space-y-2">
                <Label>Raison sociale</Label>
                <Input value={legalName} onChange={e => setLegalName(e.target.value)} className={errorClass("legalName")} />
                {errors.legalName && <p className="text-xs text-destructive">{errors.legalName}</p>}
              </div>
              <div className="space-y-2">
                <Label>Forme juridique</Label>
                <Select value={legalForm} onValueChange={setLegalForm}>
                  <SelectTrigger className={errorClass("legalForm")}><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                  <SelectContent>
                    {["SAS", "SARL", "SA", "SCI", "SASU", "EURL", "SNC", "Autre"].map(f => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Numéro SIREN</Label>
                <Input
                  value={siren}
                  onChange={e => setSiren(e.target.value.replace(/\D/g, ""))}
                  placeholder="123 456 789"
                  className={`font-mono ${errorClass("siren")}`}
                  maxLength={14}
                />
                {errors.siren && <p className="text-xs text-destructive">{errors.siren}</p>}
              </div>
            </>
          )}

          {sub === "orgAddress" && (
            <>
              <div className="space-y-2">
                <Label>Pays du siège social</Label>
                <Select value={orgCountry} onValueChange={setOrgCountry}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["France", "Belgique", "Suisse", "Luxembourg", "Allemagne", "Autre"].map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Adresse du siège social</Label>
                <Input value={orgAddress} onChange={e => setOrgAddress(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input value={orgCity} onChange={e => setOrgCity(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Code postal</Label>
                  <Input value={orgPostalCode} onChange={e => setOrgPostalCode(e.target.value)} className="font-mono" />
                </div>
              </div>
            </>
          )}

          {sub === "entityType" && (
            <div className="space-y-3">
              <Label>Type d'entité</Label>
              {entityCards.map(card => (
                <motion.div
                  key={card.value}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setEntityType(card.value)}
                  className={`bg-white/40 backdrop-blur-[12px] border p-4 cursor-pointer transition-all flex items-center gap-4 ${
                    entityType === card.value ? "border-primary shadow-[0_0_16px_hsl(173_50%_19%/0.15)]" : "border-white/20 hover:border-primary/40"
                  }`}
                >
                  <card.icon className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{card.label}</p>
                    <p className="text-xs text-muted-foreground">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {sub === "sector" && (
            <div className="space-y-2">
              <Label>Secteur d'activité (code NAF)</Label>
              <Select value={activitySector} onValueChange={setActivitySector}>
                <SelectTrigger><SelectValue placeholder="Rechercher…" /></SelectTrigger>
                <SelectContent>
                  {[
                    "64.19Z — Autres intermédiations monétaires",
                    "64.20Z — Activités des sociétés holding",
                    "66.19B — Autres activités auxiliaires de services financiers",
                    "62.01Z — Programmation informatique",
                    "68.20A — Location de logements",
                    "70.10Z — Activités des sièges sociaux",
                    "Autre",
                  ].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {sub === "finance" && (
            <>
              <div className="space-y-2">
                <Label>Montant à déposer</Label>
                <Input
                  value={depositAmount}
                  onChange={e => setDepositAmount(e.target.value)}
                  placeholder="Ex: 500 000 €"
                  className="font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label>Source des fonds</Label>
                <RadioGroup value={fundsSource} onValueChange={setFundsSource} className="space-y-2">
                  {[
                    { value: "operating", label: "Activité opérationnelle" },
                    { value: "fundraise", label: "Levée de fonds" },
                    { value: "client-funds", label: "Fonds clients" },
                    { value: "other", label: "Autre" },
                  ].map(opt => (
                    <div key={opt.value} className="flex items-center gap-3 bg-white/40 backdrop-blur-[12px] border border-white/20 p-3 cursor-pointer hover:border-primary/40 transition-colors">
                      <RadioGroupItem value={opt.value} id={`corp-${opt.value}`} />
                      <Label htmlFor={`corp-${opt.value}`} className="cursor-pointer text-sm">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

          {sub === "documents" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Téléchargez les documents requis pour la vérification.</p>
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
              <Label>Comment avez-vous entendu parler de Quercus ?</Label>
              <Select value={referral} onValueChange={setReferral}>
                <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
                <SelectContent>
                  {["LinkedIn", "Recommandation", "Recherche Google", "Presse", "Événement", "Autre"].map(r => (
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
