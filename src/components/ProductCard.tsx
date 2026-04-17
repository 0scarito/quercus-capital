import { TrendingUp, Plus, Coins } from "lucide-react";
import type { UserSubscription } from "@/hooks/useProducts";

interface ProductCardProps {
  subscription?: UserSubscription;
  onClick?: () => void;
  variant?: "filled" | "add";
}

const currencySymbol: Record<string, string> = { EUR: "€", USD: "$", GBP: "£" };

export function ProductCard({ subscription, onClick, variant = "filled" }: ProductCardProps) {
  if (variant === "add") {
    return (
      <button
        onClick={onClick}
        className="min-w-[260px] h-[200px] flex flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/[0.02] transition-colors text-muted-foreground hover:text-foreground"
      >
        <Plus className="h-5 w-5" />
        <span className="text-sm font-medium">Ajouter un produit</span>
      </button>
    );
  }

  if (!subscription) return null;
  const { product, amount } = subscription;
  const yieldRate = Number(product?.yield_rate ?? 0);
  // Naive interest projection (annual rate × current balance, prorated since subscription)
  const days = (Date.now() - new Date(subscription.subscribed_at).getTime()) / (1000 * 60 * 60 * 24);
  const interest = (Number(amount) * (yieldRate / 100) * days) / 365;
  const sym = currencySymbol[product?.currency ?? "EUR"] ?? product?.currency;

  return (
    <button
      onClick={onClick}
      className="min-w-[260px] h-[200px] flex flex-col text-left rounded-sm border bg-card hover:shadow-md transition-shadow p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
          <Coins className="h-3.5 w-3.5 text-primary" />
        </div>
        <p className="font-serif text-base"><em>{product?.name}</em></p>
      </div>

      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Solde</p>
        <p className="font-serif text-2xl font-semibold">
          {Number(amount).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
          <span className="text-sm text-muted-foreground">{product?.currency}</span>
        </p>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 pt-3 border-t">
        <div className="bg-muted/40 rounded-sm p-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rendement</p>
          <p className="text-sm font-medium font-mono">{yieldRate.toFixed(2)} %</p>
        </div>
        <div className="bg-muted/40 rounded-sm p-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Intérêts</p>
          <p className="text-sm font-medium font-mono text-success flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {interest.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {sym}
          </p>
        </div>
      </div>
    </button>
  );
}
