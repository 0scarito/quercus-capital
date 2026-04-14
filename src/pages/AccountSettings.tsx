import { useEffect, useState } from "react";
import { Shield, CreditCard, MapPin, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  account_type: string | null;
}

export default function AccountSettings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("first_name, last_name, phone, account_type")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        setProfile(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const displayName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "—";
  const accountTypeLabel = profile?.account_type === "moral" ? "Personne morale" : "Particulier";

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold"><em>Paramètres de compte</em></h1>
        <p className="text-sm text-muted-foreground mt-2">
          Gérez votre profil, sécurité et comptes bancaires.
        </p>
      </div>

      {/* Titulaire du compte */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Titulaire du compte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Prénom</p>
              <p className="font-medium">{profile?.first_name || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Nom</p>
              <p className="font-medium">{profile?.last_name || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
              <p className="font-medium">{user?.email || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Téléphone</p>
              <p className="font-medium font-mono">{profile?.phone || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Type de compte</p>
              <p className="font-medium">{accountTypeLabel}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Identifiant</p>
              <p className="font-medium font-mono text-xs">{user?.id?.slice(0, 8).toUpperCase() || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
