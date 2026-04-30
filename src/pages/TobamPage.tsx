import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { AdvisorThresholdSection } from "@/components/landing/AdvisorThresholdSection";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Leaf, ExternalLink } from "lucide-react";
import { RiskScale } from "@/components/landing/RiskScale";
import { SecurityArchitecture } from "@/components/landing/SecurityArchitecture";
import { CashAndCarryDiagram } from "@/components/landing/CashAndCarryDiagram";
import { TobamAnalytics } from "@/components/landing/TobamAnalytics";
import strategyPositionImg from "@/assets/strategy-position.jpg";
import strategyThresholdImg from "@/assets/strategy-threshold.jpg";
import strategyCarbonImg from "@/assets/strategy-carbon.jpg";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const characteristics = [
  { field: "Nom officiel", value: "TOBAM Crypto Liquidity Fund" },
  { field: "Structure juridique", value: "FIA — Fonds Professionnel Spécialisé (FPS)" },
  { field: "Domicile", value: "France" },
  { field: "Date de création", value: "27 juin 2025" },
  { field: "Durée", value: "99 ans" },
  { field: "Objectif", value: "Maximiser les revenus du basis trade BTC/ETH avec exposition nulle aux prix crypto" },
  { field: "Benchmark (EUR)", value: "€STER (ESTCINDX Index)" },
  { field: "Benchmark (USD)", value: "SOFR (SOFRINDX Index)" },
  { field: "Devises disponibles", value: "EUR et USD" },
  { field: "Liquidité", value: "Quotidienne" },
  { field: "Heure de coupure", value: "13h00 Paris (D)" },
  { field: "Règlement", value: "D+1 avant 13h00" },
  { field: "Traitement des revenus", value: "Capitalisation" },
  { field: "Levier brut max", value: "300%" },
  { field: "Drawdown max cible", value: "< -2% sur deux trimestres" },
];

const faqItems = [
  {
    q: "Quels sont les risques ?",
    a: "Risque directionnel faible (exposition crypto entièrement couverte). Risques principaux : risque de base (le spread entre futures et spot peut temporairement diverger), risque d'appel de marge, risque de contrepartie (défaut d'exchange ou broker), risque de levier, risque cyber (atténué — pas de détention directe de BTC, exposition via ETF uniquement), risque de concentration.",
  },
  {
    q: "Comment ce produit est-il structuré juridiquement ?",
    a: "FIA de catégorie Fonds Professionnel Spécialisé (FPS) de droit français. Déclaré auprès de l'AMF mais non agréé. Accessible aux investisseurs professionnels et aux investisseurs dont la souscription initiale est ≥ 100 000 €.",
  },
  {
    q: "Pourquoi Bitcoin en particulier ?",
    a: "Bitcoin est l'actif crypto le plus grand et le plus liquide (~6x la capitalisation d'Ethereum), avec le marché de futures le plus actif sur le CME. Le basis trade a historiquement rapporté ~8% p.a. annualisé et la prime est restée au-dessus de 3% pendant 76% des 5 dernières années.",
  },
  {
    q: "Quelles plateformes sont utilisées ?",
    a: "Position longue : Bitcoin ETF sur NASDAQ (pas de détention directe de crypto, pas de risque de piratage). Position courte : CME Bitcoin futures (bourse régulée avec mécanisme de clearing). Conservation crypto si nécessaire : CACEIS Bank (PSAN enregistré AMF), Taurus, BitGo.",
  },
  {
    q: "Qui peut investir ?",
    a: "Investisseurs professionnels (au sens de l'article L533-16 du Code monétaire et financier) et investisseurs avec souscription initiale ≥ 100 000 €. Durée minimale de détention recommandée : 1 an.",
  },
  {
    q: "Qu'en est-il de l'ESG ?",
    a: "TOBAM calcule l'empreinte carbone annuelle de l'exposition Bitcoin et la compense à 100% via des certificats CO2 (VER — Verified Emission Reductions).",
  },
  {
    q: "Où trouver la documentation légale ?",
    a: "Le prospectus complet est disponible sur tobam.fr. La VL est disponible sur demande.",
  },
];

export default function TobamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        {/* Hero */}
        <section className="py-20 md:py-28 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1 font-mono tracking-wider">
                FIA · Fonds Professionnel Spécialisé
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-[1.1]">
                <em>Captez des rendements élevés<br className="hidden md:block" /> sur les marchés crypto.</em>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
                <span>sans</span>
                <span
                  className="font-mono font-semibold tracking-[0.18em] px-3 py-1 rounded-full text-sm md:text-base"
                  style={{
                    background: "hsl(var(--success))",
                    color: "hsl(var(--background))",
                    boxShadow: "0 0 24px hsl(var(--success) / 0.4)",
                  }}
                >
                  AUCUNE
                </span>
                <span>exposition au prix des crypto-actifs.</span>
              </p>
              <div className="flex justify-center pt-2">
                <Button asChild size="lg" className="px-10 py-6 text-base btn-glow">
                  <Link to="/open-account">Commencer à investir</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Key Metrics */}
        <section className="pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Rendement cible — EUR + USD */}
              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Rendement cible net</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  ~7–10 %
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                  EUR 7–8 % · USD 9–10 %
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">p.a. · net de frais</p>
              </GlassCard>

              {/* Liquidité quotidienne */}
              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Liquidité</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  Quotidienne
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">Retrait 24h · Règlement D+1</p>
              </GlassCard>

              {/* 0 Exposition crypto */}
              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Exposition crypto</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  0 %
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">Position entièrement couverte</p>
              </GlassCard>

              {/* Niveau de risque 2/7 */}
              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Niveau de risque</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  2<span className="text-muted-foreground/60 text-2xl">/7</span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">
                  SRRI / SRI
                  <a
                    href="#risk-detail"
                    className="text-success hover:underline ml-0.5"
                    aria-label="Plus d'information sur l'indicateur de risque"
                  >
                    *
                  </a>
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* What is Cash & Carry — 2 columns layout */}
        <section className="py-14 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Titre en pleine largeur */}
            <ScrollReveal>
              <div className="space-y-5 mb-12 lg:mb-16">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
                  Mécanisme · Cash &amp; Carry
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight max-w-5xl">
                  <em>L'art de l'arbitrage : générer du rendement sans subir la volatilité.</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Colonne gauche — texte pédagogique */}
              <ScrollReveal className="lg:col-span-7">
                <div className="space-y-6">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Le mécanisme de <em>« Cash and Carry »</em> (ou arbitrage de base) exploite
                    une anomalie structurelle du marché crypto : les contrats Futures (prix
                    futur) s'échangent presque toujours à un prix plus élevé que le Spot
                    (prix actuel).
                  </p>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Chez Quercus, via le fonds TOBAM, nous capturons cet écart de prix de
                    manière mathématique et sécurisée :
                  </p>

                  <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {[
                      {
                        n: "01",
                        t: "L'Achat (Long Spot)",
                        d: "Nous achetons du Bitcoin via des ETF régulés au NASDAQ.",
                      },
                      {
                        n: "02",
                        t: "La Vente (Short Future)",
                        d: "Simultanément, nous vendons un contrat futur sur le CME pour une échéance à un mois.",
                      },
                      {
                        n: "03",
                        t: "Le Profit (Contango)",
                        d: "En verrouillant ces positions, nous annulons l'exposition au prix du BTC et empochons la prime qui converge vers zéro.",
                      },
                    ].map((s) => (
                      <li
                        key={s.n}
                        className="border-l border-primary/30 pl-4 py-1"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
                          Étape {s.n}
                        </span>
                        <h3 className="font-serif italic text-base mt-1 mb-1">{s.t}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {s.d}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <p className="text-foreground/90 leading-relaxed pt-2 text-base md:text-lg">
                    <span className="font-serif italic">Le résultat : </span>
                    une performance décorrélée, une volatilité minimale et aucune exposition
                    aux fluctuations de prix du marché crypto.
                  </p>
                </div>
              </ScrollReveal>

              {/* Colonne droite — diagramme interactif */}
              <ScrollReveal delay={120} className="lg:col-span-5">
                <GlassCard className="p-6 md:p-8 h-full">
                  <CashAndCarryDiagram />
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Strategy details */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  Méthodologie
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>La stratégie TOBAM en détail</em>
                </h2>
              </div>
            </ScrollReveal>

            {/* Pillars zigzag — image + texte alternés */}
            <div className="space-y-16 md:space-y-24">
              {[
                {
                  step: "01",
                  title: "Position",
                  desc: "Long Bitcoin ETF (NASDAQ) + Short Bitcoin CME futures → capture du spread de contango. La stratégie utilise aussi Ethereum lorsque l'opportunité est meilleure.",
                  img: strategyPositionImg,
                  alt: "Illustration éditoriale de deux piliers parallèles symbolisant les positions longue et courte de la stratégie cash & carry",
                  reverse: false,
                },
                {
                  step: "02",
                  title: "Seuil d'entrée",
                  desc: "La stratégie n'entre en position que lorsque le rendement du basis dépasse le taux cash + 2 %. Discipline mathématique, optimisation constante du timing.",
                  img: strategyThresholdImg,
                  alt: "Balance de précision avec une goutte dorée au point d'équilibre, symbolisant le seuil d'entrée de la stratégie",
                  reverse: true,
                },
                {
                  step: "03",
                  title: "Compensation carbone",
                  desc: "TOBAM calcule l'empreinte carbone annuelle de l'exposition Bitcoin et la compense via des certificats CO₂ (VER — Verified Emission Reductions).",
                  img: strategyCarbonImg,
                  alt: "Feuille de chêne aux veines dorées sur un treillis moléculaire, symbolisant la compensation carbone du fonds",
                  reverse: false,
                  icon: <Leaf className="h-5 w-5 text-success shrink-0" />,
                },
              ].map((item) => (
                <ScrollReveal key={item.title}>
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${item.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="lg:col-span-4 max-w-[320px] mx-auto lg:mx-0 w-full">
                      <div className="relative aspect-square overflow-hidden border border-primary/10">
                        <img
                          src={item.img}
                          alt={item.alt}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground">
                        Étape {item.step}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-serif leading-tight flex items-center gap-3">
                        {item.icon}
                        <em>{item.title}</em>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Rolling mensuel — bandeau technique sobre */}
            <ScrollReveal delay={80}>
              <GlassCard className="mt-16 md:mt-20 p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="md:w-1/3">
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    Étape 04 · Exécution
                  </p>
                  <h3 className="text-2xl md:text-3xl font-serif"><em>Rolling mensuel</em></h3>
                </div>
                <p className="md:w-2/3 text-muted-foreground leading-relaxed">
                  Futures rollés mensuellement. Position moyenne d'un mois maintenue en permanence. Levier opportuniste jusqu'à <span className="font-mono text-foreground">125 %</span> lorsque le basis est large.
                </p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* Strategy Analytics — graphiques interactifs */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  Key Stats
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>Les chiffres clés de la stratégie</em>
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">
                  Backtest CME Bitcoin Carry · Décembre 2019 — Mars 2025
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <TobamAnalytics />
            </ScrollReveal>
            <p className="text-[11px] text-muted-foreground text-center mt-6 max-w-3xl mx-auto leading-relaxed">
              Les performances passées ne préjugent pas des performances futures. Données issues du backtest TOBAM Crypto Liquidity, à titre illustratif.
            </p>
          </div>
        </section>

        {/* Product characteristics */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Caractéristiques du fonds</em>
              </h2>
              <GlassCard className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider min-w-[220px]">Caractéristique</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Détail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {characteristics.map((c) => (
                      <TableRow key={c.field}>
                        <TableCell className="font-medium text-muted-foreground">{c.field}</TableCell>
                        <TableCell className="font-mono text-sm">{c.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* Security architecture + Risk + AMF */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
                <em>Architecture de sécurité</em>
              </h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
                Cinq acteurs régulés, séparés et indépendants — vos actifs ne sont jamais au bilan de TOBAM ni de Quercus.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <SecurityArchitecture />
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollReveal>
                <GlassCard className="p-8 h-full" id="risk-detail">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Indicateur de risque · SRRI / SRI
                  </p>
                  <RiskScale
                    level={2}
                    label="Stratégie non-directionnelle. Volatilité hebdomadaire ~5 %, max drawdown trimestriel 0 % sur le backtest 2019–2024."
                  />
                  <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                    Le <em>Summary Risk Indicator</em> (SRI / SRRI) est l'échelle réglementaire
                    européenne de 1 (risque le plus faible) à 7 (risque le plus élevé), publiée
                    dans le Document d'Information Clé (KID) de chaque fonds.
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal>
                <GlassCard className="p-8 h-full flex flex-col">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Régulation & vérification</p>
                  <ul className="space-y-3 text-sm flex-1">
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">Structure</span>
                      <span className="font-mono">FIA · FPS</span>
                    </li>
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">Gérant</span>
                      <span className="font-mono">TOBAM · GP 06 000019</span>
                    </li>
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">Dépositaire</span>
                      <span className="font-mono">CACEIS · PSAN AMF</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <span className="text-muted-foreground">Auditeur</span>
                      <span className="font-mono">PwC · annuel</span>
                    </li>
                  </ul>
                  <a
                    href="https://www.amf-france.org/fr/recherche-acteur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Vérifier l'agrément AMF
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Questions fréquentes</em>
              </h2>
              <GlassCard className="p-8 md:p-12">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-lg font-serif">
                        <em>{item.q}</em>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-14 md:py-16 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif">
                <em>Accédez au rendement du basis trade crypto.</em>
              </h2>
              <p className="text-lg text-muted-foreground">
                Stratégie institutionnelle. Liquidité quotidienne. Zéro exposition au prix des crypto-actifs.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="px-12 py-6 text-base btn-glow" asChild>
                  <Link to="/contact">Prendre rendez-vous</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-12 py-6 text-base btn-glow" asChild>
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <AdvisorThresholdSection />

        <LandingFooter />
      </div>
    </div>
  );
}
