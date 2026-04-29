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
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Rendement cible net</p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="flex flex-col items-center border-r border-white/30 pr-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">EUR</span>
                    <span className="text-2xl md:text-3xl font-serif font-semibold text-success leading-tight">~7–8 %</span>
                  </div>
                  <div className="flex flex-col items-center pl-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">USD</span>
                    <span className="text-2xl md:text-3xl font-serif font-semibold text-success leading-tight">~9–10 %</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground pt-1">p.a. · net de frais</p>
              </GlassCard>

              {/* Liquidité quotidienne */}
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Liquidité</p>
                <p className="text-4xl font-serif font-semibold">Quotidienne</p>
                <p className="text-xs text-muted-foreground">Retrait en 24h · Règlement D+1</p>
              </GlassCard>

              {/* 0 Exposition crypto */}
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Exposition crypto</p>
                <p className="text-4xl font-serif font-semibold text-success">0 %</p>
                <p className="text-xs text-muted-foreground">Position entièrement couverte</p>
              </GlassCard>

              {/* Niveau de risque 2/7 */}
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Niveau de risque</p>
                <p className="text-4xl font-serif font-semibold">
                  2<span className="text-muted-foreground/60 text-2xl">/7</span>
                </p>
                <p className="text-xs text-muted-foreground">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Colonne gauche — texte pédagogique */}
              <ScrollReveal>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                    <em>L'art de l'arbitrage : générer du rendement sans subir la volatilité.</em>
                  </h2>

                  <p className="text-muted-foreground leading-relaxed">
                    Le mécanisme de <em>« Cash and Carry »</em> (ou arbitrage de base) exploite
                    une anomalie structurelle du marché crypto : les contrats Futures (prix
                    futur) s'échangent presque toujours à un prix plus élevé que le Spot
                    (prix actuel).
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Chez Quercus, via le fonds TOBAM, nous capturons cet écart de prix de
                    manière mathématique et sécurisée :
                  </p>

                  <div className="space-y-4 pl-1 border-l border-primary/30 pl-5">
                    <div>
                      <h3 className="font-serif italic text-base mb-1">L'Achat (Long Spot).</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Nous achetons du Bitcoin via des ETF régulés au NASDAQ.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-serif italic text-base mb-1">La Vente (Short Future).</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Simultanément, nous vendons un contrat futur sur le CME (Chicago
                        Mercantile Exchange) pour une échéance à un mois.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-serif italic text-base mb-1">Le Profit (Le Contango).</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        En verrouillant ces deux positions, nous annulons totalement
                        l'exposition au prix du Bitcoin. Que le marché monte ou baisse, nous
                        empochons la différence (la prime) qui converge vers zéro à
                        l'échéance.
                      </p>
                    </div>
                  </div>

                  <p className="text-foreground/90 leading-relaxed pt-2">
                    <span className="font-serif italic">Le résultat : </span>
                    une performance décorrélée, une volatilité minimale et aucune exposition
                    aux fluctuations de prix du marché crypto.
                  </p>
                </div>
              </ScrollReveal>

              {/* Colonne droite — diagramme interactif */}
              <ScrollReveal delay={120}>
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
