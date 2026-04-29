import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { AdvisorThresholdSection } from "@/components/landing/AdvisorThresholdSection";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowDownUp, Lock, Leaf, ExternalLink } from "lucide-react";
import { RiskScale } from "@/components/landing/RiskScale";
import { CMEPremiumChart } from "@/components/landing/CMEPremiumChart";
import { SecurityArchitecture } from "@/components/landing/SecurityArchitecture";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const backtest = [
  { metric: "Rendement annualisé", tobam: "7,6%", credit: "1,1%", cash: "2,1%" },
  { metric: "Volatilité hebdomadaire", tobam: "4,9%", credit: "1,8%", cash: "0,3%" },
  { metric: "Volatilité trimestrielle", tobam: "2,8%", credit: "2,8%", cash: "1,2%" },
  { metric: "Ratio rendement/risque", tobam: "1,5", credit: "0,6", cash: "6,7" },
  { metric: "Hit ratio (hebdo)", tobam: "63%", credit: "60%", cash: "59%" },
  { metric: "Max drawdown (quotidien)", tobam: "-5,9%", credit: "-6,6%", cash: "-0,9%" },
  { metric: "Max drawdown (trimestriel)", tobam: "0%", credit: "-6,0%", cash: "-0,8%" },
];

const shareClasses = [
  { cls: "A1", isin: "FR00140100J0", ccy: "EUR", min: "10 000 000 €", fees: "Max 0,9% p.a." },
  { cls: "A2", isin: "FR00140100K8", ccy: "USD", min: "$10 000 000", fees: "Max 0,9% p.a." },
  { cls: "B1", isin: "FR00140100M4", ccy: "EUR", min: "100 000 €", fees: "Max 1,8% p.a." },
  { cls: "B2", isin: "FR00140100N2", ccy: "USD", min: "$100 000", fees: "Max 1,8% p.a." },
  { cls: "R1", isin: "FR00140100P7", ccy: "EUR", min: "1 000 000 €", fees: "Max 1,3% p.a." },
  { cls: "R2", isin: "FR00140100O0", ccy: "USD", min: "$1 000 000", fees: "Max 1,3% p.a." },
  { cls: "P1", isin: "FR00140100L6", ccy: "EUR", min: "10 000 €", fees: "0,3% + 20% perf fee > €STER" },
];

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
            <div className="max-w-6xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1 font-mono tracking-wider">
                FIA · Fonds Professionnel Spécialisé
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-tight">
                <em>TOBAM Crypto<br />Liquidity Fund</em>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Captez des rendements élevés sur les marchés crypto — sans aucune exposition au prix des crypto-actifs.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Key Metrics */}
        <section className="pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Rendement cible net (EUR)</p>
                <p className="text-4xl font-serif font-semibold text-success">~7–8% p.a.</p>
              </GlassCard>
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Niveau de risque</p>
                <p className="text-4xl font-serif font-semibold">Faible</p>
                <p className="text-xs text-muted-foreground">Vol. 2-3% · Max DD &lt; -4%</p>
              </GlassCard>
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Liquidité</p>
                <p className="text-4xl font-serif font-semibold">Quotidienne</p>
                <p className="text-xs text-muted-foreground">Règlement D+1</p>
              </GlassCard>
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Exposition crypto</p>
                <p className="text-4xl font-serif font-semibold text-success">0%</p>
                <p className="text-xs text-muted-foreground">Entièrement couvert</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* What is Cash & Carry */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-6">
                <em>Qu'est-ce que le Cash & Carry ?</em>
              </h2>
              <p className="text-center text-muted-foreground mb-16 max-w-3xl mx-auto text-lg">
                Une stratégie d'arbitrage non-directionnelle qui capture la prime des futures crypto.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Achat de Bitcoin via ETF (long spot)",
                  desc: "Acquérir une exposition au Bitcoin via un ETF régulé coté sur le NASDAQ. Aucune détention directe de crypto, aucun risque de piratage.",
                  icon: TrendingUp,
                },
                {
                  step: "02",
                  title: "Vente simultanée de futures (short CME)",
                  desc: "Vendre des contrats futures Bitcoin sur le CME expirant dans environ un mois à un prix supérieur au spot. Le CME est une bourse régulée avec mécanisme de clearing.",
                  icon: ArrowDownUp,
                },
                {
                  step: "03",
                  title: "Capturer le spread (le « basis »)",
                  desc: "Conserver les deux positions jusqu'à l'expiration. La différence entre le prix du futures et le prix spot constitue votre rendement. La position est non-directionnelle — si Bitcoin monte ou baisse, les deux jambes bougent ensemble.",
                  icon: Lock,
                },
              ].map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 120}>
                  <GlassCard className="p-8 h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-5xl font-serif font-semibold text-primary/20">{s.step}</span>
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold mb-4"><em>{s.title}</em></h3>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why crypto */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Pourquoi les crypto-futures ?</em>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { stat: "~8%", label: "Prime annualisée historique des futures BTC CME depuis 2017" },
                { stat: "76%", label: "Du temps, la prime est restée au-dessus de 3% sur 5 ans" },
                { stat: "6×", label: "Capitalisation du Bitcoin vs Ethereum" },
                { stat: "$16 Mds", label: "Volume mensuel de futures BTC sur le CME" },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <GlassCard className="p-8 text-center h-full">
                    <p className="text-4xl font-serif font-semibold text-success mb-3">{item.stat}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.label}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Worked example + CME chart */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
                <em>Le basis trade en chiffres</em>
              </h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
                Un exemple concret + 5 ans de prime CME observée.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollReveal>
                <GlassCard className="p-8 h-full space-y-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Exemple à 1 mois</p>
                  <h3 className="text-2xl font-serif">
                    <em>Bitcoin spot vs futures CME</em>
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">BTC spot (long ETF)</span>
                      <span className="font-mono">$ 109 042</span>
                    </div>
                    <div className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">BTC futures CME (short, 1 mois)</span>
                      <span className="font-mono">$ 109 920</span>
                    </div>
                    <div className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">Spread capturé</span>
                      <span className="font-mono text-success">+ $ 878</span>
                    </div>
                    <div className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">Rendement mensuel</span>
                      <span className="font-mono text-success">≈ 0,80 %</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-semibold">Annualisé (composé)</span>
                      <span className="font-mono text-success font-semibold">≈ 10,0 %</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground pt-2 border-t border-white/30">
                    Position non-directionnelle. Si BTC monte ou baisse, les deux jambes bougent ensemble — seul le spread est capté.
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal>
                <GlassCard className="p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Prime CME futures BTC · 5 ans
                    </p>
                    <p className="text-[11px] text-muted-foreground">Annualisée, mensuelle</p>
                  </div>
                  <CMEPremiumChart />
                  <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                    Moyenne sur 5 ans : ~8 % p.a. — la prime est restée au-dessus de 3 % pendant 76 % du temps.
                  </p>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Strategy details */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>La stratégie TOBAM en détail</em>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Position", desc: "Long Bitcoin ETF (NASDAQ) + Short Bitcoin CME futures → capture du spread de contango. Utilise aussi Ethereum quand l'opportunité est meilleure." },
                { title: "Seuil d'entrée", desc: "La stratégie entre en position uniquement lorsque le rendement du basis dépasse le taux cash + 2%. Optimisation constante du timing." },
                { title: "Rolling mensuel", desc: "Futures rollés mensuellement. Position moyenne d'un mois maintenue en permanence. Levier opportuniste jusqu'à 125% quand le basis est large." },
                { title: "Compensation carbone", desc: "TOBAM calcule l'empreinte carbone annuelle du BTC et la compense via des certificats CO2 (VER — Verified Emission Reductions)." },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                  <GlassCard className="p-8 h-full flex items-start gap-4">
                    {i === 3 && <Leaf className="h-6 w-6 text-success shrink-0 mt-1" />}
                    <div>
                      <h3 className="text-xl font-serif font-semibold mb-3"><em>{item.title}</em></h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Backtest performance */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-6">
                <em>Performance backtestée</em>
              </h2>
              <p className="text-center text-muted-foreground mb-14 max-w-2xl mx-auto text-lg">
                Décembre 2019 — Décembre 2024
              </p>
              <GlassCard className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider min-w-[220px]">Métrique</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">
                        <span className="text-primary font-semibold">TOBAM</span>
                      </TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Short Term IG Credit</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Cash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backtest.map((row) => (
                      <TableRow key={row.metric}>
                        <TableCell className="font-medium">{row.metric}</TableCell>
                        <TableCell className="text-success font-semibold font-mono">{row.tobam}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{row.credit}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{row.cash}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* Share classes */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Classes de parts</em>
              </h2>
              <GlassCard className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider">Classe</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">ISIN</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Devise</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Souscription min.</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Frais</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shareClasses.map((sc) => (
                      <TableRow key={sc.cls}>
                        <TableCell className="font-semibold">Part {sc.cls}</TableCell>
                        <TableCell className="font-mono text-sm">{sc.isin}</TableCell>
                        <TableCell className="font-mono">{sc.ccy}</TableCell>
                        <TableCell className="font-mono text-sm">{sc.min}</TableCell>
                        <TableCell className="text-sm">{sc.fees}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </GlassCard>
            </ScrollReveal>
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
                <GlassCard className="p-8 h-full">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Indicateur de risque</p>
                  <RiskScale
                    level={2}
                    label="Stratégie non-directionnelle. Volatilité hebdomadaire ~5 %, max drawdown trimestriel 0 % sur le backtest 2019–2024."
                  />
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

        {/* Partners */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Partenaires</em>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  role: "Gérant",
                  name: "TOBAM",
                  desc: "Agréé AMF GP 06 000019, $2 Mds d'actifs, fondée en 2005, 92% détenue par ses employés, 8% Amundi. Pionnier crypto depuis 2016.",
                },
                {
                  role: "Dépositaire & Administrateur",
                  name: "CACEIS Bank",
                  desc: "Groupe Crédit Agricole. Enregistré PSAN auprès de l'AMF depuis juin 2023.",
                },
                {
                  role: "Courtiers crypto",
                  name: "Taurus, BitGo, Binance",
                  desc: "Exécution spot et dérivés. Infrastructure institutionnelle multi-venues.",
                },
                {
                  role: "Auditeur",
                  name: "PwC",
                  desc: "Audit annuel des comptes et contrôle indépendant de la valorisation.",
                },
              ].map((p, i) => (
                <ScrollReveal key={p.name} delay={i * 100}>
                  <GlassCard className="p-8 h-full">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{p.role}</p>
                    <h3 className="text-xl font-serif font-semibold mb-4"><em>{p.name}</em></h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{p.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
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
