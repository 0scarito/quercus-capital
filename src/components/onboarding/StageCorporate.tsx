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

const orgSchema = z.object({
  legalName: z.string().min(1, "Requis").max(255),
  legalForm: z.string().min(1, "Requis"),
  siren: z.string().min(9, "SIREN invalide (9 chiffres)").max(14),
});

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
    {
      value: "operative",
      icon: Briefcase,
      label: "Entité opérationnelle (active)",
      desc: "Plus de 50 % de vos revenus proviennent de la vente de biens ou de services (logiciel, conseil, industrie, prestations, etc.).",
      recommended: true,
    },
    {
      value: "patrimoine",
      icon: Building2,
      label: "Entité patrimoniale (passive)",
      desc: "Plus de 50 % de vos revenus proviennent de revenus passifs (dividendes, intérêts, loyers, plus-values, etc.).",
    },
    {
      value: "financial",
      icon: Landmark,
      label: "Institution financière",
      desc: "Vous êtes une banque, une entreprise d'investissement, un fonds, un établissement de paiement, etc.",
    },
  ];

  const sectorOptions = [
    "Industrie et fabrication",
    "Technologies et logiciels",
    "Services financiers",
    "Conseil et services professionnels",
    "Commerce et distribution",
    "Immobilier et construction",
    "Santé et sciences de la vie",
    "Énergie et utilities",
    "Transport et logistique",
    "Médias, loisirs et communication",
    "Hôtellerie et restauration",
    "Agriculture et agroalimentaire",
    "Éducation",
    "Holding / Gestion de participations",
    "Associations et secteur public",
    "Autre",
  ];

  const depositOptions = [
    { value: "lt_100k", label: "Moins de 100 000 €" },
    { value: "100k_500k", label: "Entre 100 000 € et 500 000 €" },
    { value: "500k_1m", label: "Entre 500 000 € et 1 000 000 €" },
    { value: "1m_5m", label: "Entre 1 000 000 € et 5 000 000 €" },
    { value: "gt_5m", label: "Plus de 5 000 000 €" },
  ];

  const fundsOriginOptions = [
    { value: "operating", label: "De l'activité opérationnelle de l'entreprise ou de l'organisation" },
    { value: "fundraise", label: "De levées de fonds auprès d'investisseurs ou de prêts" },
    { value: "client-funds", label: "Ce sont des fonds qui appartiennent aux clients de l'entreprise ou de l'entité" },
  ];

  const countries = ["France", "Belgique", "Suisse", "Luxembourg", "Allemagne", "Pays-Bas", "Italie", "Espagne", "Autre"];

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
        <h2 className="text-2xl font-serif">
          <em>
            {sub === "country" && "Pays d'immatriculation"}
            {sub === "org" && "Informations sur votre société ou organisation"}
            {sub === "orgAddress" && "Adresse d'immatriculation"}
            {sub === "entityType" && "Votre activité"}
            {sub === "sector" && "Secteur"}
            {sub === "deposit" && "Quel montant pensez-vous déposer sur Quercus ?"}
            {sub === "fundsOrigin" && "Origine des fonds"}
            {sub === "documents" && "Téléchargez les documents nécessaires"}
            {sub === "referral" && "Comment avez-vous entendu parler de Quercus ?"}
          </em>
        </h2>
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
          {sub === "country" && (
            <div className="space-y-2">
              <Label>Pays d'immatriculation</Label>
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
                <Label>Raison sociale</Label>
                <Input value={legalName} onChange={e => setLegalName(e.target.value)} className={errorClass("legalName")} />
                {errors.legalName && <p className="text-xs text-destructive">{errors.legalName}</p>}
              </div>
              <div className="space-y-2">
                <Label>Forme juridique</Label>
                <Input
                  value={legalForm}
                  onChange={e => setLegalForm(e.target.value)}
                  placeholder="Par exemple SAS, SARL, SA, EI, etc."
                  className={errorClass("legalForm")}
                />
                <p className="text-xs text-muted-foreground">Par exemple SAS, SARL, SA, EI, etc.</p>
              </div>
              <div className="space-y-2">
                <Label>SIREN ou numéro d'immatriculation</Label>
                <Input
                  value={siren}
                  onChange={e => setSiren(e.target.value.replace(/\D/g, ""))}
                  placeholder="123 456 789"
                  className={`font-mono ${errorClass("siren")}`}
                  maxLength={14}
                />
                {errors.siren && <p className="text-xs text-destructive">{errors.siren}</p>}
                <p className="text-xs text-muted-foreground">Par exemple le SIREN (France), le numéro d'entreprise BCE/KBO (Belgique), etc.</p>
              </div>
            </>
          )}

          {sub === "orgAddress" && (
            <>
              <div className="space-y-2">
                <Label>Adresse d'immatriculation</Label>
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
              <p className="text-sm text-muted-foreground">
                Sélectionnez l'option qui décrit le mieux l'activité de votre organisation.
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
                          Recommandé
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
              <p className="text-xs text-muted-foreground pt-2">
                En sélectionnant l'une de ces options, vous certifiez de l'exactitude de ces informations conformément aux réglementations FATCA &amp; CRS.
              </p>
            </div>
          )}

          {sub === "sector" && (
            <div className="space-y-2">
              <Label>Secteur d'activité</Label>
              <Select value={activitySector} onValueChange={setActivitySector}>
                <SelectTrigger><SelectValue placeholder="Rechercher…" /></SelectTrigger>
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
                D'où proviennent principalement les fonds que vous souhaitez déposer sur Quercus&nbsp;?
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
                Téléchargez les documents suivants pour valider votre inscription.
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
