// Single source of truth for live yields shown across the landing page,
// the products comparison table and individual product pages. Keeping the
// numbers here (rather than duplicating literals across components) lets
// the hero card, the comparison table and the product pages stay
// perfectly synchronised — as required by the spec.

export type LiveYield = {
  productKey: "smart-cash" | "cash-and-carry";
  productName: string;
  subtitle: string;
  rateLabel: string; // formatted, ex: "3,42 %" or "Sur devis"
  rateNumeric: number | null; // null when there is no fixed rate
  currency: string;
  liquidity: string;
  liquidityTone: "success" | "info";
  risk: string;
  href: string;
};

export const LIVE_YIELDS: LiveYield[] = [
  {
    productKey: "smart-cash",
    productName: "Quercus Smart Cash",
    subtitle: "Bons du Trésor Zone Euro · €STR + 0,30 %",
    rateLabel: "3,42 %",
    rateNumeric: 3.42,
    currency: "EUR",
    liquidity: "Quotidienne",
    liquidityTone: "success",
    risk: "Très faible",
    href: "/products/velvet",
  },
  {
    productKey: "cash-and-carry",
    productName: "Quercus Cash & Carry",
    subtitle: "Stratégie cash & carry institutionnelle",
    rateLabel: "4,81 %",
    rateNumeric: 4.81,
    currency: "USD / EUR",
    liquidity: "Quotidienne",
    liquidityTone: "success",
    risk: "Très faible",
    href: "/products/tobam",
  },
];

export const PRIMARY_EUR_YIELD = LIVE_YIELDS[0];
