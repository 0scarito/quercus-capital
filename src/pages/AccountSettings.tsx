import { Shield, CreditCard, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AccountSettings() {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold"><em>Paramètres de compte</em></h1>
        <p className="text-sm text-muted-foreground mt-2">
          Gérez votre profil, sécurité et comptes bancaires.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Profil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Nom</p>
              <p className="font-medium">Jean Dupont</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
              <p className="font-medium">jean.dupont@example.com</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Résidence fiscale</p>
              <p className="font-medium">France</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Identifiant client</p>
              <p className="font-medium font-mono">QRC-2024-0001</p>
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
          <div className="border rounded-sm p-6 text-center text-sm text-muted-foreground">
            Aucun compte bancaire enregistré. Ajoutez un compte pour faciliter vos retraits.
          </div>
          <Button variant="outline" className="mt-4" size="sm">
            Ajouter un compte
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
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-destructive flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5" />
                Clôture du compte
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Cette action est irréversible et entraînera le retrait de tous les fonds.
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">
              Clôturer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
