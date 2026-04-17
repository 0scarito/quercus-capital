import { useState } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts, useUserSubscriptions, type Product } from "@/hooks/useProducts";
import { useAccounts } from "@/hooks/useAccounts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Products() {
  const { data: products, isLoading } = useProducts();
  const { data: subscriptions } = useUserSubscriptions();
  const { data: accounts } = useAccounts();
  const { user } = useAuth();
  const qc = useQueryClient();

  const [selected, setSelected] = useState<Product | null>(null);
  const [amount, setAmount] = useState("");
  const [accountId, setAccountId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const subscribedIds = new Set(subscriptions?.map((s) => s.product_id));

  const handleOpen = (product: Product) => {
    setSelected(product);
    setAccountId(accounts?.find((a) => a.is_primary)?.id ?? accounts?.[0]?.id ?? "");
  };

  const handleSubscribe = async () => {
    if (!selected || !user || !accountId) {
      toast.error("Sélectionnez un compte");
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Montant invalide");
      return;
    }
    setSubmitting(true);
    const existing = subscriptions?.find(
      (s) => s.product_id === selected.id && s.account_id === accountId
    );
    const { error } = existing
      ? await supabase
          .from("user_subscriptions")
          .update({ amount: Number(existing.amount) + numAmount })
          .eq("id", existing.id)
      : await supabase.from("user_subscriptions").insert({
          user_id: user.id,
          account_id: accountId,
          product_id: selected.id,
          amount: numAmount,
        });
    setSubmitting(false);
    if (error) {
      console.error("Subscription error:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
      return;
    }
    toast.success(`${selected.name} souscrit avec succès`);
    qc.invalidateQueries({ queryKey: ["user_subscriptions"] });
    setSelected(null);
    setAmount("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold"><em>Nos produits</em></h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sélectionnez un produit pour commencer à placer vos liquidités.
        </p>
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">
          Smart Cash & Sovereign Funds
        </h2>
        <div className="border rounded-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-sans text-xs uppercase tracking-wider">Actif</TableHead>
                <TableHead className="font-sans text-xs uppercase tracking-wider">Type</TableHead>
                <TableHead className="font-sans text-xs uppercase tracking-wider">Devise</TableHead>
                <TableHead className="font-sans text-xs uppercase tracking-wider text-right">Rendement</TableHead>
                <TableHead className="w-[120px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => {
                const subscribed = subscribedIds.has(product.id);
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{product.product_type}</TableCell>
                    <TableCell className="text-sm font-mono">{product.currency}</TableCell>
                    <TableCell className="text-right text-sm font-medium text-success">
                      {product.yield_rate.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={subscribed ? "secondary" : "outline"}
                        onClick={() => handleOpen(product)}
                      >
                        {subscribed ? (
                          <>
                            <Check className="mr-1 h-3 w-3" /> Augmenter
                          </>
                        ) : (
                          <>
                            <Plus className="mr-1 h-3 w-3" /> Ajouter
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Liquidité T+0 pour les ordres passés avant 12h25 CET. Les rendements affichés sont indicatifs et nets de frais de gestion.
      </p>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              <em>Souscrire à {selected?.name}</em>
            </DialogTitle>
            <DialogDescription>
              {selected?.description} — Rendement {selected?.yield_rate.toFixed(2)}%
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
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
              <Label htmlFor="amount" className="text-xs uppercase tracking-wider text-muted-foreground">
                Montant ({selected?.currency})
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="10 000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Annuler
            </Button>
            <Button onClick={handleSubscribe} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
