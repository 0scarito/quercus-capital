import { useState, useMemo } from "react";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, Loader2, Search, ArrowDownLeft, ArrowUpRight, Coins, MessageSquare } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DepositModal } from "@/components/DepositModal";
import { ProductCard } from "@/components/ProductCard";
import { AccountSwitcherPopover } from "@/components/AccountSwitcherPopover";
import { useUserSubscriptions } from "@/hooks/useProducts";
import { useAccounts } from "@/hooks/useAccounts";
import { useProfile } from "@/hooks/useProfile";

type TxType = "deposit" | "withdrawal" | "interest";

interface Transaction {
  id: string;
  date: Date;
  type: TxType;
  product: string;
  amount: number;
  currency: string;
  status: "completed" | "pending";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [depositOpen, setDepositOpen] = useState(false);

  const { data: subscriptions, isLoading } = useUserSubscriptions();
  const { data: accounts } = useAccounts();
  const { data: profile } = useProfile();

  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const primary = accounts?.find((a) => a.is_primary);
  const currentAccountId = activeAccountId ?? primary?.id ?? null;

  const accountSubs = subscriptions?.filter((s) => s.account_id === currentAccountId) ?? [];

  const totalEur = accountSubs
    .filter((s) => s.product?.currency === "EUR")
    .reduce((acc, s) => acc + Number(s.amount), 0);

  const totalAmount = accountSubs.reduce((acc, s) => acc + Number(s.amount), 0);
  const weightedYield = totalAmount > 0
    ? accountSubs.reduce((acc, s) => acc + Number(s.amount) * Number(s.product?.yield_rate ?? 0), 0) / totalAmount
    : 0;

  const totalInterest = accountSubs.reduce((acc, s) => {
    const days = (Date.now() - new Date(s.subscribed_at).getTime()) / (1000 * 60 * 60 * 24);
    return acc + (Number(s.amount) * Number(s.product?.yield_rate ?? 0) / 100) * days / 365;
  }, 0);

  // Derive transactions from subscriptions (initial deposit + monthly interest entries)
  const transactions: Transaction[] = useMemo(() => {
    const txs: Transaction[] = [];
    accountSubs.forEach((s) => {
      const subDate = new Date(s.subscribed_at);
      txs.push({
        id: `${s.id}-dep`,
        date: subDate,
        type: "deposit",
        product: s.product?.name ?? "—",
        amount: Number(s.amount),
        currency: s.product?.currency ?? "EUR",
        status: "completed",
      });
      // Monthly interest accruals
      const now = new Date();
      const cursor = new Date(subDate);
      cursor.setMonth(cursor.getMonth() + 1);
      let i = 0;
      while (cursor <= now && i < 24) {
        const monthlyInterest = (Number(s.amount) * Number(s.product?.yield_rate ?? 0) / 100) / 12;
        txs.push({
          id: `${s.id}-int-${i}`,
          date: new Date(cursor),
          type: "interest",
          product: s.product?.name ?? "—",
          amount: monthlyInterest,
          currency: s.product?.currency ?? "EUR",
          status: "completed",
        });
        cursor.setMonth(cursor.getMonth() + 1);
        i++;
      }
    });
    return txs.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [accountSubs]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | TxType>("all");

  const filteredTx = transactions.filter((t) => {
    if (typeFilter !== "all" && t.type !== typeFilter) return false;
    if (search && !t.product.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const typeLabel: Record<TxType, string> = {
    deposit: "Dépôt",
    withdrawal: "Retrait",
    interest: "Intérêts",
  };

  return (
    <div className="h-full flex flex-col p-6 max-w-6xl mx-auto w-full animate-fade-in gap-5 overflow-hidden">
      {profile?.first_name && (
        <div className="shrink-0">
          <h1 className="font-serif text-2xl">
            Bonjour, <em>{profile.first_name}</em>
          </h1>
        </div>
      )}

      {/* Advisor banner */}
      <div className="shrink-0 border rounded-sm bg-card px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xs font-serif shrink-0">
            AB
          </div>
          <div className="min-w-0">
            <p className="text-sm">
              Votre conseiller <span className="font-medium">Alexandre Bernard</span> est disponible pour répondre à vos questions.
            </p>
            <p className="text-[11px] text-muted-foreground">CGP — CIF ORIAS n° 24004789</p>
          </div>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link to="/dashboard/conseiller">
            <MessageSquare className="mr-2 h-3.5 w-3.5" /> Envoyer un message
          </Link>
        </Button>
      </div>

      {/* Top row */}
      <div className="flex items-start justify-between gap-4 flex-wrap shrink-0">
        <AccountSwitcherPopover
          currentAccountId={currentAccountId}
          onSelect={setActiveAccountId}
          subscriptions={subscriptions ?? []}
        />
        <div className="flex gap-2">
          <Button variant="outline" size="default">
            <ArrowUpFromLine className="mr-2 h-4 w-4" /> Retirer
          </Button>
          <Button onClick={() => setDepositOpen(true)}>
            <ArrowDownToLine className="mr-2 h-4 w-4" /> Investir
          </Button>
        </div>
      </div>

      {/* Balance card */}
      <div className="border rounded-sm p-5 bg-card shrink-0">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Solde total</p>
            <h1 className="text-3xl font-serif font-semibold tracking-tight">
              {isLoading ? "—" : totalEur.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              {" "}<span className="text-primary">EUR</span>
            </h1>
            <div className="flex items-center gap-1.5 text-success mt-2">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="text-sm font-medium font-mono">{weightedYield.toFixed(2)} %</span>
              <span className="text-xs text-muted-foreground">rendement moyen</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Intérêts générés</p>
            <p className="text-xl font-serif font-semibold text-success">
              {totalInterest.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR
            </p>
          </div>
        </div>
      </div>

      {/* Products carousel */}
      <div className="shrink-0">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-serif text-base"><em>Produits</em></h2>
          <span className="text-xs text-muted-foreground">{accountSubs.length} actif{accountSubs.length > 1 ? "s" : ""}</span>
        </div>
        {isLoading ? (
          <div className="p-8 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
            {accountSubs.map((s) => (
              <div key={s.id} className="snap-start">
                <ProductCard subscription={s} onClick={() => navigate("/produits")} />
              </div>
            ))}
            <div className="snap-start">
              <ProductCard variant="add" onClick={() => navigate("/produits")} />
            </div>
          </div>
        )}
      </div>

      {/* Transactions panel — fills remaining height, internal scroll */}
      <div className="flex-1 min-h-0 border rounded-sm bg-card flex flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b shrink-0 flex-wrap">
          <h2 className="font-serif text-base"><em>Transactions</em></h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit"
                className="h-8 pl-8 w-48 text-sm"
              />
            </div>
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as typeof typeFilter)}>
              <SelectTrigger className="h-8 w-36 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="deposit">Dépôts</SelectItem>
                <SelectItem value="withdrawal">Retraits</SelectItem>
                <SelectItem value="interest">Intérêts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredTx.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-muted-foreground p-8">
              Aucune transaction
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card border-b z-10">
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  <th className="text-left font-medium px-4 py-2.5">Date</th>
                  <th className="text-left font-medium px-4 py-2.5">Type</th>
                  <th className="text-left font-medium px-4 py-2.5">Produit</th>
                  <th className="text-right font-medium px-4 py-2.5">Montant</th>
                  <th className="text-right font-medium px-4 py-2.5">Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredTx.map((t) => {
                  const Icon = t.type === "deposit" ? ArrowDownLeft : t.type === "withdrawal" ? ArrowUpRight : Coins;
                  const colorClass = t.type === "withdrawal" ? "text-foreground" : "text-success";
                  const sign = t.type === "withdrawal" ? "-" : "+";
                  return (
                    <tr key={t.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                        {t.date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center bg-muted/60 ${colorClass}`}>
                            <Icon className="h-3 w-3" />
                          </div>
                          <span>{typeLabel[t.type]}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 font-serif italic">{t.product}</td>
                      <td className={`px-4 py-2.5 text-right font-mono font-medium ${colorClass}`}>
                        {sign}{t.amount.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {t.currency}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <span className="text-[10px] uppercase tracking-wider font-mono text-success border border-success/30 px-1.5 py-0.5 rounded-sm">
                          {t.status === "completed" ? "Réglé" : "En cours"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} presetAccountId={currentAccountId ?? undefined} />
    </div>
  );
}
