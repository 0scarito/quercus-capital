import { useState } from "react";
import { Copy, Check, ArrowLeft, Loader2, Download, Clock, AlertCircle } from "lucide-react";
import { jsPDF } from "jspdf";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuercusShield } from "@/components/QuercusShield";
import { useProducts } from "@/hooks/useProducts";
import { useAccounts } from "@/hooks/useAccounts";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presetProductId?: string;
  presetAccountId?: string;
}

const bankByCurrency: Record<string, { holder: string; bank: string; iban: string; bic: string }> = {
  EUR: { holder: "Quercus / Quercus Euro", bank: "BNP Paribas", iban: "FR76 1820 6004 0264 7381 9100 074", bic: "BNPAFRPPXXX" },
  USD: { holder: "Quercus / Quercus Dollar", bank: "CACEIS Bank", iban: "FR76 3148 9000 1000 0123 4567 890", bic: "CACEFRPPXXX" },
  GBP: { holder: "Quercus / Quercus Pound", bank: "BNP Paribas London", iban: "GB29 NWBK 6016 1331 9268 19", bic: "BNPAGB22XXX" },
};

type Step = "product" | "instructions" | "waiting";

export function DepositModal({ open, onOpenChange, presetProductId, presetAccountId }: DepositModalProps) {
  const { data: products } = useProducts();
  const { data: accounts } = useAccounts();
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const qc = useQueryClient();

  const [step, setStep] = useState<Step>("product");
  const [productId, setProductId] = useState<string>(presetProductId ?? "");
  const [accountId, setAccountId] = useState<string>(presetAccountId ?? "");
  const [proofAmount, setProofAmount] = useState("");
  const [proofOpen, setProofOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [reference, setReference] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const product = products?.find((p) => p.id === productId);
  const bank = product ? bankByCurrency[product.currency] ?? bankByCurrency.EUR : null;
  const account = accounts?.find((a) => a.id === accountId) ?? accounts?.find((a) => a.is_primary);

  const reset = () => {
    setStep("product");
    setProductId(presetProductId ?? "");
    setAccountId(presetAccountId ?? "");
    setProofAmount("");
    setReference("");
  };

  const handleClose = (o: boolean) => {
    if (!o) setTimeout(reset, 200);
    onOpenChange(o);
  };

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    toast.success("Copié");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleNextFromProduct = () => {
    if (!productId || !accountId) {
      toast.error("Sélectionnez un produit et un compte");
      return;
    }
    setStep("instructions");
  };

  const handleConfirmTransfer = async () => {
    if (!user || !product || !account) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("deposit_intents")
      .insert({
        user_id: user.id,
        account_id: account.id,
        product_id: product.id,
        amount: 0,
      })
      .select()
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Erreur : " + error.message);
      return;
    }
    setReference(data.reference);
    qc.invalidateQueries({ queryKey: ["deposit_intents"] });
    setStep("waiting");
  };

  const generateProofPDF = () => {
    if (!product || !bank) return;
    const value = parseFloat(proofAmount);
    if (isNaN(value) || value < 1) {
      toast.error("Montant invalide");
      return;
    }
    const doc = new jsPDF();
    const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || user?.email || "";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("QUERCUS CAPITAL", 20, 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Promesse de souscription", 20, 33);
    doc.line(20, 38, 190, 38);

    doc.setFontSize(11);
    doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, 20, 50);
    doc.text(`Souscripteur : ${fullName}`, 20, 58);
    doc.text(`Email : ${user?.email ?? ""}`, 20, 66);

    doc.setFont("helvetica", "bold");
    doc.text("Détails de la souscription", 20, 82);
    doc.setFont("helvetica", "normal");
    doc.text(`Produit : ${product.name}`, 20, 92);
    doc.text(`Devise : ${product.currency}`, 20, 100);
    doc.text(`Rendement indicatif : ${product.yield_rate.toFixed(2)} %`, 20, 108);
    doc.text(`Montant prévu : ${value.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} ${product.currency}`, 20, 116);

    doc.setFont("helvetica", "bold");
    doc.text("Coordonnées bancaires de réception", 20, 132);
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.text(`Titulaire : ${bank.holder}`, 20, 142);
    doc.text(`Banque : ${bank.bank}`, 20, 150);
    doc.text(`IBAN : ${bank.iban}`, 20, 158);
    doc.text(`BIC : ${bank.bic}`, 20, 166);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text(
      "Ce document atteste de votre intention de souscrire au produit ci-dessus. Il peut être remis",
      20,
      185
    );
    doc.text("à votre banque pour justifier l'émission du virement correspondant.", 20, 191);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Quercus Capital — CIF / ORIAS — contact@quercus.capital", 20, 280);

    doc.save(`Quercus-Promesse-${product.currency}-${Date.now()}.pdf`);
    toast.success("Justificatif téléchargé");
    setProofOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background/80 backdrop-blur-2xl border-border/40 p-0 overflow-hidden">
        {/* Header with shield */}
        <div className="relative px-6 pt-6 pb-4 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex items-center gap-4">
            <QuercusShield size={48} />
            <div>
              <DialogHeader className="text-left">
                <DialogTitle className="font-serif text-xl">
                  <em>Déposer des fonds</em>
                </DialogTitle>
              </DialogHeader>
              <p className="text-xs text-muted-foreground mt-0.5">
                {step === "product" && "Choisissez un produit et un compte"}
                {step === "instructions" && "Effectuez votre virement"}
                {step === "waiting" && "Virement en attente"}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {step === "product" && (
            <>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Compte de destination</Label>
                <Select value={accountId} onValueChange={setAccountId}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner un compte" /></SelectTrigger>
                  <SelectContent>
                    {accounts?.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}{a.is_primary && " (principal)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Produit</Label>
                <div className="border rounded-sm divide-y">
                  {products?.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setProductId(p.id)}
                      className={`w-full flex items-center justify-between p-3 text-left transition-colors ${
                        productId === p.id ? "bg-primary/5" : "hover:bg-muted/50"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.product_type} · {p.currency}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-success">{p.yield_rate.toFixed(2)} %</p>
                        {productId === p.id && <Check className="h-4 w-4 text-primary inline ml-1" />}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground">Dépôt minimum : 1,00 {product?.currency ?? "EUR"}</p>
              </div>

              <Button onClick={handleNextFromProduct} className="w-full">Continuer</Button>
            </>
          )}

          {step === "instructions" && product && bank && (
            <>
              <div className="flex items-start gap-2 p-3 rounded-sm bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                  Effectuez uniquement des virements depuis un compte bancaire à votre nom. Le montant que vous virez détermine votre souscription.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { key: "holder", label: "Titulaire", value: bank.holder, mono: false },
                  { key: "bank", label: "Banque", value: bank.bank, mono: false },
                  { key: "iban", label: "IBAN", value: bank.iban, mono: true },
                  { key: "bic", label: "BIC / SWIFT", value: bank.bic, mono: true },
                ].map((d) => (
                  <div key={d.key} className="flex items-center justify-between gap-3 pb-3 border-b last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.label}</p>
                      <p className={`text-sm ${d.mono ? "font-mono" : "font-medium"} truncate`}>{d.value}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => handleCopy(d.key, d.value)}>
                      {copiedKey === d.key ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-2">
                <Button variant="ghost" size="sm" onClick={() => setStep("product")}>
                  <ArrowLeft className="h-3 w-3 mr-1" /> Retour
                </Button>
                <Button variant="outline" size="sm" onClick={() => { setProofAmount(""); setProofOpen(true); }}>
                  <Download className="h-3 w-3 mr-1" /> J'ai besoin d'un justificatif
                </Button>
              </div>

              <Button onClick={handleConfirmTransfer} disabled={submitting} className="w-full">
                {submitting && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                J'ai effectué le virement
              </Button>
            </>
          )}

          {step === "waiting" && product && (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl"><em>Nous attendons votre virement</em></h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Vos fonds apparaîtront généralement sous 24 h ouvrées. Vous serez notifié par email à leur réception.
                </p>
              </div>
              <div className="bg-muted/40 rounded-sm p-3 text-left">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Référence de suivi</p>
                <p className="font-mono text-sm font-medium">{reference}</p>
              </div>
              <Button onClick={() => handleClose(false)} variant="outline" className="w-full">Fermer</Button>
            </div>
          )}
        </div>

        {/* Proof sub-modal */}
        <Dialog open={proofOpen} onOpenChange={setProofOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="font-serif"><em>Promesse de souscription</em></DialogTitle>
            </DialogHeader>
            <p className="text-xs text-muted-foreground">
              Génère un PDF à remettre à votre banque pour justifier le virement.
            </p>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Montant prévu ({product?.currency})
              </Label>
              <Input
                type="number"
                min="1"
                step="0.01"
                placeholder="10 000,00"
                value={proofAmount}
                onChange={(e) => setProofAmount(e.target.value)}
                className="font-mono"
              />
            </div>
            <Button onClick={generateProofPDF} className="w-full">
              <Download className="h-3 w-3 mr-1" /> Télécharger le PDF
            </Button>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
