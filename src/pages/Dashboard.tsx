import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, ChevronDown, Plus, Loader2, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DepositModal } from "@/components/DepositModal";
import { ProductCard } from "@/components/ProductCard";
import { useUserSubscriptions } from "@/hooks/useProducts";
import { useAccounts, useCreateAccount, useRenameAccount, useDeleteAccount } from "@/hooks/useAccounts";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const [depositOpen, setDepositOpen] = useState(false);
  const [newAccountOpen, setNewAccountOpen] = useState(false);
  const [newAccountName, setNewAccountName] = useState("");
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const { data: subscriptions, isLoading } = useUserSubscriptions();
  const { data: accounts } = useAccounts();
  const createAccount = useCreateAccount();
  const renameAccount = useRenameAccount();
  const deleteAccount = useDeleteAccount();

  const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
  const primary = accounts?.find((a) => a.is_primary);
  const currentAccountId = activeAccountId ?? primary?.id ?? null;
  const currentAccount = accounts?.find((a) => a.id === currentAccountId);

  // Filter subscriptions by current account
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

  const handleCreateAccount = async () => {
    if (!newAccountName.trim()) return;
    try {
      const acc = await createAccount.mutateAsync(newAccountName.trim());
      setActiveAccountId(acc.id);
      setNewAccountOpen(false);
      setNewAccountName("");
      toast.success("Compte créé");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-fade-in space-y-8">
      {/* Top row: account switcher + actions */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 font-serif text-base">
              <em>{currentAccount?.name ?? "Compte principal"}</em>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {accounts?.map((a) => (
              <DropdownMenuItem key={a.id} onClick={() => setActiveAccountId(a.id)}>
                {a.name}{a.is_primary && " (principal)"}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setNewAccountOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Nouveau compte
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex gap-2">
          <Button variant="outline" size="default">
            <ArrowUpFromLine className="mr-2 h-4 w-4" /> Retirer
          </Button>
          <Button onClick={() => setDepositOpen(true)}>
            <ArrowDownToLine className="mr-2 h-4 w-4" /> Déposer
          </Button>
        </div>
      </div>

      {/* Balance card */}
      <div className="border rounded-sm p-6 bg-card">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Solde total</p>
            <h1 className="text-4xl font-serif font-semibold tracking-tight">
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
            <p className="text-2xl font-serif font-semibold text-success">
              {totalInterest.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Products carousel */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-serif text-lg"><em>Produits</em></h2>
          <span className="text-xs text-muted-foreground">{accountSubs.length} actif{accountSubs.length > 1 ? "s" : ""}</span>
        </div>

        {isLoading ? (
          <div className="p-12 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
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

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} presetAccountId={currentAccountId ?? undefined} />

      {/* New account dialog */}
      <Dialog open={newAccountOpen} onOpenChange={setNewAccountOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif"><em>Nouveau compte</em></DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom du compte</Label>
            <Input
              placeholder="Ex: Trésorerie"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAccountOpen(false)}>Annuler</Button>
            <Button onClick={handleCreateAccount} disabled={createAccount.isPending}>
              {createAccount.isPending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
