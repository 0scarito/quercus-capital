import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    name: "Quercus Euro",
    description: "TRS-backed Euro fund",
    currency: "EUR",
    yield: "2,20%",
    type: "Smart Cash",
  },
  {
    name: "Quercus Dollar",
    description: "US Treasury Bills",
    currency: "USD",
    yield: "4,85%",
    type: "Smart Cash",
  },
  {
    name: "Quercus Pound",
    description: "Short-term Gilts",
    currency: "GBP",
    yield: "4,50%",
    type: "Sovereign Fund",
  },
];

export default function Products() {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold"><em>Nos produits</em></h1>
        <p className="text-sm text-muted-foreground mt-2">
          Sélectionnez un produit pour commencer à placer vos liquidités.
        </p>
      </div>

      {/* Smart Cash */}
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
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.description}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{product.type}</TableCell>
                  <TableCell className="text-sm font-mono">{product.currency}</TableCell>
                  <TableCell className="text-right text-sm font-medium text-success">{product.yield}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Plus className="mr-1 h-3 w-3" />
                      Ajouter
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Liquidité T+0 pour les ordres passés avant 12h25 CET. Les rendements affichés sont indicatifs et nets de frais de gestion.
      </p>
    </div>
  );
}
