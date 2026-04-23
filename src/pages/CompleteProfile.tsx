import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Shown to any authenticated user whose profile is missing one of the
 * required fields (name, DOB, address, fiscal info). They must fill
 * everything before they can use the app again.
 */
export default function CompleteProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const queryClient = useQueryClient();

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

  const handleSave = async () => {
    if (!user) return;
    const required: Array<[string, string]> = [
      [firstName.trim(), "Prénom"],
      [lastName.trim(), "Nom"],
      [dateOfBirth, "Date de naissance"],
      [address.trim(), "Adresse"],
      [city.trim(), "Ville"],
      [postalCode.trim(), "Code postal"],
      [country.trim(), "Pays de résidence"],
      [taxCountry.trim(), "Résidence fiscale"],
      [taxId.trim(), "Numéro fiscal (NIF)"],
    ];
    const missing = required.filter(([v]) => !v).map(([, label]) => label);
    if (missing.length) {
      toast.error(`Veuillez renseigner : ${missing.join(", ")}`);
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
      toast.error("Erreur d'enregistrement. Veuillez réessayer.");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
    toast.success("Profil complété.");
    navigate("/dashboard", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-serif"><em>Complétez votre profil</em></h1>
          <p className="text-sm text-muted-foreground">
            Pour des raisons réglementaires, certaines informations obligatoires sont manquantes.
            Merci de les compléter pour continuer à utiliser votre espace.
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-[12px] border border-white/20 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Prénom</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Date de naissance</Label>
            <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Adresse</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Ville</Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Code postal</Label>
              <Input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="font-mono" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Pays de résidence</Label>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Résidence fiscale</Label>
              <Input value={taxCountry} onChange={(e) => setTaxCountry(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">N° fiscal (NIF)</Label>
              <Input value={taxId} onChange={(e) => setTaxId(e.target.value)} className="font-mono" />
            </div>
          </div>

          <Button onClick={handleSave} size="lg" className="btn-glow w-full" disabled={saving}>
            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement…</> : "Enregistrer et continuer"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}