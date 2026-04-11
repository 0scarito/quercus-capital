import { Key, Copy, Check, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Integrations() {
  const [copied, setCopied] = useState(false);
  const demoKey = "qrc_live_sk_...redacted";

  const handleCopy = () => {
    navigator.clipboard.writeText(demoKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold"><em>Intégrations</em></h1>
        <p className="text-sm text-muted-foreground mt-2">
          Connectez votre logiciel de trésorerie via nos clés API.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm uppercase tracking-wider font-sans font-medium flex items-center gap-2">
            <Key className="h-4 w-4" /> Clés API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between border rounded-sm p-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Clé de production</p>
              <p className="text-sm font-mono">{demoKey}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-1 h-3 w-3" />
            Générer une nouvelle clé
          </Button>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Documentation API disponible sur demande. Contactez votre gestionnaire de compte pour obtenir un accès.
      </p>
    </div>
  );
}
