import { useMemo, useState } from "react";
import { ChevronsUpDown, Pencil, Trash2, List, Plus, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAccounts, useCreateAccount, useRenameAccount, useDeleteAccount, type Account } from "@/hooks/useAccounts";
import type { UserSubscription } from "@/hooks/useProducts";
import { toast } from "sonner";

interface AccountSwitcherPopoverProps {
  currentAccountId: string | null;
  onSelect: (id: string) => void;
  subscriptions: UserSubscription[];
}

const PRIMARY_NAME = "Compte principal";

function summarize(subs: UserSubscription[], accountId: string) {
  const accSubs = subs.filter((s) => s.account_id === accountId);
  const balance = accSubs.reduce((acc, s) => acc + Number(s.amount), 0);
  const interest = accSubs.reduce((acc, s) => {
    const days = (Date.now() - new Date(s.subscribed_at).getTime()) / (1000 * 60 * 60 * 24);
    return acc + (Number(s.amount) * Number(s.product?.yield_rate ?? 0) / 100) * days / 365;
  }, 0);
  return { balance, interest };
}

const fmt = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function AccountSwitcherPopover({ currentAccountId, onSelect, subscriptions }: AccountSwitcherPopoverProps) {
  const { data: accounts } = useAccounts();
  const createAccount = useCreateAccount();
  const renameAccount = useRenameAccount();
  const deleteAccount = useDeleteAccount();

  const [open, setOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [createValue, setCreateValue] = useState("");

  const current = accounts?.find((a) => a.id === currentAccountId) ?? null;
  const sortedAccounts = useMemo(() => {
    if (!accounts) return [];
    return [...accounts].sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1;
      if (!a.is_primary && b.is_primary) return 1;
      return a.sort_order - b.sort_order;
    });
  }, [accounts]);

  const displayName = (a: Account) => (a.is_primary ? PRIMARY_NAME : a.name);

  const canEdit = current && !current.is_primary;

  const openRename = () => {
    if (!current || current.is_primary) {
      toast.error("Le compte principal ne peut pas être renommé");
      return;
    }
    setRenameValue(current.name);
    setRenameOpen(true);
  };

  const handleRename = async () => {
    if (!current || !renameValue.trim()) return;
    try {
      await renameAccount.mutateAsync({ id: current.id, name: renameValue.trim() });
      setRenameOpen(false);
      toast.success("Compte renommé");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDelete = async () => {
    if (!current || current.is_primary) return;
    if (!confirm(`Supprimer le compte "${current.name}" ?`)) return;
    try {
      await deleteAccount.mutateAsync(current.id);
      const fallback = sortedAccounts.find((a) => a.is_primary);
      if (fallback) onSelect(fallback.id);
      toast.success("Compte supprimé");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleCreate = async () => {
    if (!createValue.trim()) return;
    try {
      const acc = await createAccount.mutateAsync(createValue.trim());
      onSelect(acc.id);
      setCreateOpen(false);
      setCreateValue("");
      toast.success("Compte créé");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 font-serif text-base h-10">
            <em>{current ? displayName(current) : PRIMARY_NAME}</em>
            <ChevronsUpDown className="h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[380px] p-0">
          {/* Top actions */}
          <div className="p-2">
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(openRename, 50);
              }}
              disabled={!canEdit}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-muted/60 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Pencil className="h-4 w-4" />
              <span className="text-sm">Modifier le nom du compte</span>
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(handleDelete, 50);
              }}
              disabled={!canEdit}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm hover:bg-muted/60 transition-colors text-left disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4" />
              <span className="text-sm">Supprimer le compte</span>
            </button>
          </div>

          <Separator />

          {/* Section header */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <List className="h-4 w-4" />
              <span>Changer de compte</span>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => setCreateOpen(true), 50);
              }}
              className="text-sm text-primary hover:underline"
            >
              Ajouter un compte
            </button>
          </div>

          {/* Account list */}
          <div className="px-2 pb-2 max-h-[320px] overflow-y-auto">
            {sortedAccounts.map((a) => {
              const { balance, interest } = summarize(subscriptions, a.id);
              const isActive = a.id === currentAccountId;
              return (
                <button
                  key={a.id}
                  onClick={() => {
                    onSelect(a.id);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-3 rounded-sm transition-colors ${
                    isActive ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-serif text-base font-semibold">{displayName(a)}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Solde total</p>
                      <p className="text-sm font-mono">
                        {fmt(balance)} <span className="text-primary">EUR</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Intérêts générés</p>
                      <p className="text-sm font-mono text-success">{fmt(interest)} EUR</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      {/* Rename dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif"><em>Renommer le compte</em></DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nouveau nom</Label>
            <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} autoFocus />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameOpen(false)}>Annuler</Button>
            <Button onClick={handleRename} disabled={renameAccount.isPending}>
              {renameAccount.isPending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-serif"><em>Nouveau compte</em></DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nom du compte</Label>
            <Input
              placeholder="Ex: Trésorerie"
              value={createValue}
              onChange={(e) => setCreateValue(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Annuler</Button>
            <Button onClick={handleCreate} disabled={createAccount.isPending}>
              {createAccount.isPending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
