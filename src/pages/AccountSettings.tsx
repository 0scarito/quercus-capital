import { useEffect, useState } from "react";
import { Shield, CreditCard, MapPin, AlertTriangle, Loader2, Users, Globe, Pencil, Save, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useProfile, useOnboardingDetails, type Profile } from "@/hooks/useProfile";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AccountSettings() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const { data: onboarding } = useOnboardingDetails();
  const qc = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Profile>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        date_of_birth: form.date_of_birth || null,
        address: form.address,
        city: form.city,
        postal_code: form.postal_code,
        country: form.country,
        tax_country: form.tax_country,
        tax_id: form.tax_id,
      })
      .eq("user_id", user.id);
    setSaving(false);
    if (error) {
      console.error("Profile update error:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      return;
    }
    toast.success("Profil mis à jour");
    qc.invalidateQueries({ queryKey: ["profile"] });
    setEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const displayName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "—";
  const accountTypeLabel = profile?.account_type === "moral" || profile?.account_type === "corporate"
    ? "Personne morale"
    : "Particulier";

  const Field = ({
    label,
    value,
    field,
    mono,
  }: {
    label: string;
    value: string | null | undefined;
    field: keyof Profile;
    mono?: boolean;
  }) => (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      {editing ? (
        <Input
          value={(form[field] as string) ?? ""}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          className={`h-9 ${mono ? "font-mono" : ""}`}
        />
      ) : (
        <p className={`font-medium text-sm ${mono ? "font-mono" : ""}`}>{value || "—"}</p>
      )}
    </div>
  );

  const ReadOnly = ({ label, value, mono }: { label: string; value: string | null | undefined; mono?: boolean }) => (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-medium text-sm ${mono ? "font-mono" : ""}`}>{value || "—"}</p>
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-serif font-semibold"><em>Paramètres de compte</em></h1>
          <p className="text-sm text-muted-foreground mt-2">
            Gérez votre profil, sécurité et comptes bancaires.
          </p>
        </div>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
            <Pencil className="mr-2 h-3 w-3" /> Modifier
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { setEditing(false); setForm(profile ?? {}); }}>
              <X className="mr-2 h-3 w-3" /> Annuler
            </Button>
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Save className="mr-2 h-3 w-3" />}
              Enregistrer
            </Button>
          </div>
        )}
      </div>

      {/* Titulaire */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Titulaire du compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Prénom" value={profile?.first_name} field="first_name" />
            <Field label="Nom" value={profile?.last_name} field="last_name" />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
              <p className="font-medium text-sm">{user?.email || "—"}</p>
            </div>
            <Field label="Téléphone" value={profile?.phone} field="phone" mono />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Type de compte</p>
              <p className="font-medium text-sm">{accountTypeLabel}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Identifiant</p>
              <p className="font-medium text-xs font-mono">{user?.id?.slice(0, 8).toUpperCase() || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gestion des utilisateurs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
            <Users className="h-4 w-4" /> Gestion des utilisateurs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            Gérez les personnes autorisées à accéder à votre compte.
          </p>
          <div className="border rounded-sm p-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1">Titulaire</span>
            </div>
          </div>
          {(profile?.account_type === "moral" || profile?.account_type === "corporate") && (
            <Button variant="outline" className="mt-4" size="sm">
              + Ajouter un utilisateur
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Résidence fiscale */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
            <Globe className="h-4 w-4" /> Résidence fiscale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Pays de résidence fiscale" value={profile?.tax_country} field="tax_country" />
            <Field label="Numéro d'identification fiscale" value={profile?.tax_id} field="tax_id" mono />
            <Field label="Adresse" value={profile?.address} field="address" />
            <Field label="Ville" value={profile?.city} field="city" />
            <Field label="Code postal" value={profile?.postal_code} field="postal_code" mono />
            <Field label="Pays" value={profile?.country} field="country" />
          </div>
        </CardContent>
      </Card>

      {/* Profil financier */}
      {onboarding && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
              <Wallet className="h-4 w-4" /> Profil financier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {onboarding.account_type === "particulier" ? (
                <>
                  <ReadOnly label="Secteur d'activité" value={onboarding.sector} />
                  <ReadOnly label="Revenu annuel" value={onboarding.income_band} />
                  <ReadOnly label="Patrimoine" value={onboarding.wealth_band} />
                  <ReadOnly label="Dépôt prévu" value={onboarding.planned_deposit} mono />
                  <ReadOnly label="Origine des fonds" value={onboarding.funds_origin} />
                  <ReadOnly label="Source de découverte" value={onboarding.referral_source} />
                </>
              ) : (
                <>
                  <ReadOnly label="Raison sociale" value={onboarding.legal_name} />
                  <ReadOnly label="Forme juridique" value={onboarding.legal_form} />
                  <ReadOnly label="SIREN" value={onboarding.siren} mono />
                  <ReadOnly label="Type d'entité" value={onboarding.entity_type} />
                  <ReadOnly label="Secteur d'activité" value={onboarding.activity_sector} />
                  <ReadOnly label="Dépôt prévu" value={onboarding.planned_deposit} mono />
                  <ReadOnly label="Source des fonds" value={onboarding.funds_origin} />
                  <ReadOnly label="Source de découverte" value={onboarding.referral_source} />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bank Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Comptes bancaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">Ce sont les comptes vers lesquels vous pouvez retirer vos fonds.</p>
          <div className="border rounded-sm p-6 text-center text-sm text-muted-foreground">
            Aucun compte bancaire ajouté
          </div>
          <Button variant="outline" className="mt-4" size="sm">
            + Ajouter un compte bancaire
          </Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" /> Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Authentification à deux facteurs</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Protégez votre compte avec un code de vérification supplémentaire.
              </p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div>
            <Label className="text-sm font-medium text-destructive flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Clôture du compte
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5 mb-3">
              Votre compte Quercus sera définitivement supprimé. Cette action est irréversible.
            </p>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">
              Clôturer mon compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
