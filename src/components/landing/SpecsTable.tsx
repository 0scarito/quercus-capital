import { GlassCard } from "@/components/landing/GlassCard";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Spec = { label: string; [key: string]: string };

interface SpecsTableProps {
  title?: string;
  subtitle?: string;
  columns: { key: string; label: string }[];
  specs: Spec[];
}

export function SpecsTable({
  title = "Spécifications produit",
  subtitle = "Données techniques complètes pour la due diligence institutionnelle.",
  columns,
  specs,
}: SpecsTableProps) {
  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
          <em>{title}</em>
        </h2>
        <p className="text-center text-base text-muted-foreground mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <GlassCard className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-serif text-base w-[220px]">Spécification</TableHead>
                {columns.map((c) => (
                  <TableHead key={c.key} className="font-serif text-base">{c.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {specs.map((s) => (
                <TableRow key={s.label}>
                  <TableCell className="font-medium text-muted-foreground">{s.label}</TableCell>
                  {columns.map((c) => (
                    <TableCell key={c.key} className="font-mono text-sm">{s[c.key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </GlassCard>
      </div>
    </section>
  );
}
