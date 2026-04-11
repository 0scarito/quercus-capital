import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DepositModal } from "@/components/DepositModal";

export default function Dashboard() {
  const [depositOpen, setDepositOpen] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      {/* Balance Section */}
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Solde total</p>
        <div className="flex items-baseline gap-6">
          <h1 className="text-5xl font-serif font-semibold tracking-tight">0,00 EUR</h1>
          <div className="flex items-center gap-1.5 text-success">
            <TrendingUp className="h-4 w-4" />
            <span className="text-lg font-medium">2,20%</span>
            <span className="text-xs text-muted-foreground">rendement</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          size="lg"
          className="px-8"
          onClick={() => setDepositOpen(true)}
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Déposer
        </Button>
        <Button size="lg" variant="outline" className="px-8">
          <ArrowUpFromLine className="mr-2 h-4 w-4" />
          Retirer
        </Button>
      </div>

      <Separator />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-sans font-medium">
              Intérêts générés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-serif font-semibold">0,00 EUR</p>
            <p className="text-xs text-muted-foreground mt-1">Depuis l'ouverture</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-sans font-medium">
              Produits actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-serif font-semibold">0</p>
            <p className="text-xs text-muted-foreground mt-1">Sur 3 disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-sans font-medium">
              Prochaine échéance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-serif font-semibold">—</p>
            <p className="text-xs text-muted-foreground mt-1">Cutoff 12h25 CET</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="font-serif text-lg mb-4"><em>Activité récente</em></h2>
        <div className="border rounded-sm">
          <div className="p-8 text-center text-muted-foreground text-sm">
            Aucune transaction récente.
          </div>
        </div>
      </div>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </div>
  );
}
