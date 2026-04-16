import { Building2, Landmark, Bitcoin, User, Factory, Cpu, Home, Users, LucideIcon } from "lucide-react";

export interface SegmentInfo {
  slug: string;
  name: string;
  icon: LucideIcon;
  heroTitle: string;
  heroDescription: string;
  yields: string;
  yieldEUR?: string;
  yieldUSD?: string;
}

export const segments: SegmentInfo[] = [
  {
    slug: "startups",
    name: "Start-ups",
    icon: Cpu,
    heroTitle: "Placement de trésorerie pour Start-ups",
    heroDescription: "Optimisez votre runway avec un rendement quotidien. Déployez votre trésorerie dormante dans des instruments à rendement quotidien tout en conservant une liquidité immédiate.",
    yields: "EUR 2,20% · USD 4,00%",
    yieldEUR: "2,20%",
    yieldUSD: "4,00%",
  },
  {
    slug: "holdings",
    name: "Holdings",
    icon: Landmark,
    heroTitle: "Placement de trésorerie pour Holdings",
    heroDescription: "Gestion institutionnelle, transparence totale. Accédez à une gestion de trésorerie de qualité institutionnelle avec une conservation séparée de vos actifs.",
    yields: "EUR 2,20% · GBP 4,00%",
    yieldEUR: "2,20%",
    yieldUSD: "4,00%",
  },
  {
    slug: "crypto",
    name: "Entreprises Crypto",
    icon: Bitcoin,
    heroTitle: "Placement de trésorerie pour Entreprises Crypto",
    heroDescription: "Sécurisez vos réserves fiat. Placez vos réserves en devises traditionnelles dans des instruments souverains sécurisés, avec une liquidité T+0.",
    yields: "USD 4,00% · CHF 0,10%",
    yieldEUR: "2,20%",
    yieldUSD: "4,00%",
  },
  {
    slug: "freelances",
    name: "Freelances",
    icon: User,
    heroTitle: "Placement de trésorerie pour Freelances",
    heroDescription: "Faites fructifier chaque euro. Transformez votre épargne de précaution en source de rendement quotidien sans immobiliser votre capital.",
    yields: "EUR 2,20%",
    yieldEUR: "2,20%",
  },
  {
    slug: "pme",
    name: "PME",
    icon: Factory,
    heroTitle: "Placement de trésorerie pour PME",
    heroDescription: "Faites fructifier vos excédents sans immobilisation. Obtenez un rendement compétitif sur vos réserves sans les bloquer dans des dépôts à terme.",
    yields: "EUR 2,20% · USD 4,00%",
    yieldEUR: "2,20%",
    yieldUSD: "4,00%",
  },
  {
    slug: "fintechs",
    name: "Fintechs",
    icon: Cpu,
    heroTitle: "Placement de trésorerie pour Fintechs",
    heroDescription: "Intégration API-first. Produits de rendement en marque blanche pour vos clients finaux, intégrés via notre API de trésorerie.",
    yields: "Multi-devises",
    yieldEUR: "2,20%",
    yieldUSD: "4,00%",
  },
  {
    slug: "sci",
    name: "SCI",
    icon: Home,
    heroTitle: "Placement de trésorerie pour SCI",
    heroDescription: "Valorisez votre trésorerie immobilière. Placez les liquidités entre deux acquisitions dans des instruments souverains à rendement quotidien.",
    yields: "EUR 2,20%",
    yieldEUR: "2,20%",
  },
  {
    slug: "particuliers",
    name: "Particuliers",
    icon: Users,
    heroTitle: "Placement de trésorerie pour Particuliers",
    heroDescription: "L'épargne institutionnelle accessible. Accédez aux mêmes instruments souverains que les institutions. Rendement quotidien, liquidité immédiate.",
    yields: "EUR 2,20% · USD 4,00%",
    yieldEUR: "2,20%",
    yieldUSD: "4,00%",
  },
];

export function getSegmentBySlug(slug: string): SegmentInfo | undefined {
  return segments.find((s) => s.slug === slug);
}
