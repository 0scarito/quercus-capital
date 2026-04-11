import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Statements() {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold"><em>Relevés</em></h1>
        <p className="text-sm text-muted-foreground mt-2">
          Consultez et téléchargez vos relevés de compte mensuels.
        </p>
      </div>

      <div className="border rounded-sm">
        <div className="p-12 text-center space-y-4">
          <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto" />
          <p className="text-muted-foreground text-sm">
            Aucun relevé disponible pour le moment.
          </p>
          <p className="text-xs text-muted-foreground">
            Les relevés seront générés automatiquement à la fin de chaque mois.
          </p>
        </div>
      </div>
    </div>
  );
}
