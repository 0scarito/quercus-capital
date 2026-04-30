import { GlassCard } from "@/components/landing/GlassCard";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";

type Spec = { label: string; [key: string]: string };

interface SpecsTableProps {
  title?: string;
  subtitle?: string;
  columns: { key: string; label: string }[];
  specs: Spec[];
}

export function SpecsTable({
  title,
  subtitle,
  columns,
  specs,
}: SpecsTableProps) {
  const { t } = useTranslation("landing");
  const finalTitle = title ?? t("specsTable.title");
  const finalSubtitle = subtitle ?? t("specsTable.subtitle");
  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
          <em>{finalTitle}</em>
        </h2>
        <p className="text-center text-base text-muted-foreground mb-12 max-w-2xl mx-auto">
          {finalSubtitle}
        </p>
        <GlassCard className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-serif text-base w-[220px]">{t("specsTable.specification")}</TableHead>
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
