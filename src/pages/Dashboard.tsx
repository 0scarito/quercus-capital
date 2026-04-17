import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DepositModal } from "@/components/DepositModal";
import { useUserSubscriptions, useProducts } from "@/hooks/useProducts";

export default function Dashboard() {
  const [depositOpen, setDepositOpen] = useState(false);
  const { data: subscriptions, isLoading } = useUserSubscriptions();
  const { data: products } = useProducts();

  // Aggregate balance in EUR (simple sum, no FX conversion for now)
  const totalEur = subscriptions
    ?.filter((s) => s.product?.currency === "EUR")
    .reduce((acc, s) => acc + Number(s.amount), 0) ?? 0;

  // Weighted average yield
  const totalAmount = subscriptions?.reduce((acc, s) => acc + Number(s.amount), 0) ?? 0;
  const weightedYield = totalAmount > 0
    ? (subscriptions?.reduce((acc, s) => acc + Number(s.amount) * Number(s.product?.yield_rate ?? 0), 0) ?? 0) / totalAmount
    : 0;

  const activeCount = subscriptions?.length ?? 0;
  const totalProducts = products?.length ?? 0;

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      {/* Balance */}
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Solde total</p>
        <div className="flex items-baseline gap-6">
          <h1 className="text-5xl font-serif font-semibold tracking-tight">
            {isLoading ? "—" : totalEur.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR
          </h1>
          <div className="flex items-center gap-1.5 text-success">
            <TrendingUp className="h-4 w-4" />
            <span className="text-lg font-medium">{weightedYield.toFixed(2)}%</span>
            <span className="text-xs text-muted-foreground">rendement moyen</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button size="lg" className="px-8" onClick={() => setDepositOpen(true)}>
          <ArrowDownToLine className="mr-2 h-4 w-4" /> Déposer
        </Button>
        <Button size="lg" variant="outline" className="px-8">
          <ArrowUpFromLine className="mr-2 h-4 w-4" /> Retirer
        </Button>
      </div>

      <Separator />

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
            <p className="text-2xl font-serif font-semibold">{activeCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Sur {totalProducts} disponibles</p>
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

      {/* My products */}
      <div>
        <h2 className="font-serif text-lg mb-4"><em>Mes produits</em></h2>
        <div className="border rounded-sm">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : !subscriptions?.length ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              Aucun produit souscrit. Rendez-vous dans <em>Produits</em> pour commencer.
            </div>
          ) : (
            <div className="divide-y">
              {subscriptions.map((s) => (
                <div key={s.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium text-sm">{s.product?.name}</p>
                    <p className="text-xs text-muted-foreground">{s.product?.product_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono font-medium">
                      {Number(s.amount).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} {s.product?.currency}
                    </p>
                    <p className="text-xs text-success">{Number(s.product?.yield_rate).toFixed(2)}%</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </div>
  );
}
