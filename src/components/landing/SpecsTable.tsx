import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const specs = [
  { label: "Official Name", euro: "Quercus Euro", dollar: "Quercus Dollar", pound: "Quercus Pound" },
  { label: "ISIN", euro: "FR001401XXXX", dollar: "FR0014015LE1", pound: "FR001401YYYY" },
  { label: "Currency", euro: "EUR", dollar: "USD", pound: "GBP" },
  { label: "Net Yield", euro: "2,20%", dollar: "4,00%", pound: "4,00%" },
  { label: "Management Fee", euro: "0,23%", dollar: "0,23%", pound: "0,23%" },
  { label: "Liquidity", euro: "T+0 / T+1", dollar: "T+0 / T+1", pound: "T+0 / T+1" },
  { label: "Minimum Deposit", euro: "1 €", dollar: "$1", pound: "£1" },
  { label: "Domicile", euro: "France", dollar: "France", pound: "France" },
  { label: "Underlying", euro: "€STR TRS", dollar: "US T-Bills", pound: "Short-term Gilts" },
];

export function SpecsTable() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-4">
          <em>Product Specifications</em>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Complete technical details for institutional due diligence.
        </p>
        <div className="border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-serif text-base w-[200px]">Specification</TableHead>
                <TableHead className="font-serif text-base">Euro</TableHead>
                <TableHead className="font-serif text-base">Dollar</TableHead>
                <TableHead className="font-serif text-base">Pound</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specs.map((s) => (
                <TableRow key={s.label}>
                  <TableCell className="font-medium text-muted-foreground">{s.label}</TableCell>
                  <TableCell>{s.euro}</TableCell>
                  <TableCell>{s.dollar}</TableCell>
                  <TableCell>{s.pound}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
