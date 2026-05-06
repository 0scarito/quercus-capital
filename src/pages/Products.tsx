import { useState } from "react";
import { Plus, Check, Loader2, Lock, Compass, Sparkles } from "lucide-react";
import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
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
import { useTranslation } from "react-i18next";

const ADVISED_PORTFOLIO_THRESHOLD = 3_000_000;

export default function Products() {
  const { t, i18n } = useTranslation("dashboard");
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

  // Encours total (somme brute toutes devises confondues, v1).
  const totalEncours = (subscriptions ?? []).reduce(
    (sum, s) => sum + Number(s.amount ?? 0),
    0,
  );
  const advisedUnlocked = totalEncours >= ADVISED_PORTFOLIO_THRESHOLD;
  const progressPct = Math.min(
    100,
    (totalEncours / ADVISED_PORTFOLIO_THRESHOLD) * 100,
  );

  const formatEUR = (n: number) =>
    new Intl.NumberFormat(i18n.language === "en" ? "en-US" : "fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n);

  const handleOpen = (product: Product) => {
    setSelected(product);
    setAccountId(accounts?.find((a) => a.is_primary)?.id ?? accounts?.[0]?.id ?? "");
  };

  const handleSubscribe = async () => {
    if (!selected || !user || !accountId) {
      toast.error(t("products.modal.selectAccount"));
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error(t("products.modal.invalidAmount"));
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
      logger.error("Subscription error:", error);
      toast.error(t("products.modal.error"));
      return;
    }
    toast.success(t("products.modal.subscribed", { name: selected.name }));
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
        <h1 className="text-3xl font-serif font-semibold"><em>{t("products.title")}</em></h1>
        <p className="text-sm text-muted-foreground mt-2">{t("products.subtitle")}</p>
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">
          {t("products.smartCash")}
        </h2>
        <div className="border rounded-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-sans text-xs uppercase tracking-wider">{t("products.headers.asset")}</TableHead>
                <TableHead className="font-sans text-xs uppercase tracking-wider">{t("products.headers.type")}</TableHead>
                <TableHead className="font-sans text-xs uppercase tracking-wider">{t("products.headers.currency")}</TableHead>
                <TableHead className="font-sans text-xs uppercase tracking-wider text-right">{t("products.headers.yield")}</TableHead>
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
                            <Check className="mr-1 h-3 w-3" /> {t("products.increase")}
                          </>
                        ) : (
                          <>
                            <Plus className="mr-1 h-3 w-3" /> {t("products.add")}
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

      <p className="text-xs text-muted-foreground">{t("products.liquidity")}</p>

      {/* Portefeuille Conseillé — verrouillé tant que l'encours n'atteint pas 3 M€ */}
      <div>
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">
          {t("products.advised.section")}
        </h2>
        <div
          className={`border rounded-sm p-6 md:p-8 transition-opacity ${
            advisedUnlocked ? "" : "bg-muted/30"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div
              className="flex items-center justify-center rounded-full shrink-0"
              style={{
                width: 56,
                height: 56,
                background: advisedUnlocked
                  ? "hsl(var(--accent) / 0.15)"
                  : "hsl(var(--muted))",
              }}
            >
              {advisedUnlocked ? (
                <Compass className="h-6 w-6 text-primary" />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-serif font-semibold">
                  <em>{t("products.advised.title")}</em>
                </h3>
                {advisedUnlocked ? (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm bg-success/15 text-success">
                    <Sparkles className="h-3 w-3" /> {t("products.advised.available")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm bg-muted text-muted-foreground">
                    <Lock className="h-3 w-3" /> {t("products.advised.locked")}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("products.advised.desc")}</p>

              {!advisedUnlocked && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="text-muted-foreground">
                      {t("products.advised.availableFrom", { amount: formatEUR(ADVISED_PORTFOLIO_THRESHOLD) })}
                    </span>
                    <span className="font-mono text-foreground">
                      {formatEUR(totalEncours)} / {formatEUR(ADVISED_PORTFOLIO_THRESHOLD)}
                    </span>
                  </div>
                  <Progress value={progressPct} className="h-1.5" />
                </div>
              )}
            </div>

            <div className="shrink-0">
              {advisedUnlocked ? (
                <Button asChild size="sm">
                  <Link to="/dashboard/conseiller">
                    {t("products.advised.bookMeeting")}
                  </Link>
                </Button>
              ) : (
                <Button size="sm" variant="outline" disabled>
                  <Lock className="mr-1 h-3 w-3" /> {t("products.advised.unavailable")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              <em>{t("products.subscribe", { name: selected?.name ?? "" })}</em>
            </DialogTitle>
            <DialogDescription>
              {selected?.description} — Rendement {selected?.yield_rate.toFixed(2)}%
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">{t("products.modal.destination")}</Label>
              <Select value={accountId} onValueChange={setAccountId}>
                <SelectTrigger><SelectValue placeholder={t("products.modal.destinationPlaceholder")} /></SelectTrigger>
                <SelectContent>
                  {accounts?.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name}{a.is_primary && ` ${t("products.modal.principal")}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs uppercase tracking-wider text-muted-foreground">
                {t("products.modal.amount", { currency: selected?.currency ?? "" })}
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder={t("products.modal.amountPlaceholder")}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="font-mono"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              {t("products.modal.cancel")}
            </Button>
            <Button onClick={handleSubscribe} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              {t("products.modal.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
