import { Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const bankDetails = [
  { label: "Titulaire", value: "Quercus Capital" },
  { label: "Banque", value: "Memo Bank" },
  { label: "IBAN", value: "FR76 1820 6004 0264 7381 9100 074" },
  { label: "BIC / Swift", value: "MEMOFRP2XXX" },
];

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (value: string, idx: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            <em>Déposer des fonds</em>
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Effectuez un virement bancaire vers le compte ci-dessous. Les fonds reçus avant 12h25 CET seront crédités en T+0.
        </p>
        <Separator />
        <div className="space-y-4">
          {bankDetails.map((detail, idx) => (
            <div key={detail.label} className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{detail.label}</p>
                <p className="text-sm font-medium font-mono">{detail.value}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCopy(detail.value, idx)}
              >
                {copiedIdx === idx ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
