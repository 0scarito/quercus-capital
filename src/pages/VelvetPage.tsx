import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { CountUp } from "@/components/landing/CountUp";
import { AdvisorThresholdSection } from "@/components/landing/AdvisorThresholdSection";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { RiskScale } from "@/components/landing/RiskScale";
import { VelvetSecurityArchitecture } from "@/components/landing/VelvetSecurityArchitecture";
import { VelvetMirrorSwap } from "@/components/landing/VelvetMirrorSwap";
import { VelvetPerformanceChart } from "@/components/landing/VelvetPerformanceChart";
import { VelvetCollateralDonut } from "@/components/landing/VelvetCollateralDonut";
import velvetAnchorImg from "@/assets/velvet-anchor.jpg";
import velvetPedestalImg from "@/assets/velvet-pedestal.jpg";
import velvetMirrorImg from "@/assets/velvet-mirror.jpg";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const characteristics = [
  { field: "Nom officiel", i2: "FCP Velvet", i3: "FCP Velvet" },
  { field: "Code ISIN", i2: "FR0014010AT3", i3: "FR0014010IJ7" },
  { field: "Bloomberg", i2: "FCPVVI2 FP Equity", i3: "FCPVVI3 FP Equity" },
  { field: "Forme juridique", i2: "FCP — UCITS (OPCVM)", i3: "FCP — UCITS (OPCVM)" },
  { field: "Domicile", i2: "France", i3: "France" },
  { field: "Date de création", i2: "07/12/2023", i3: "07/12/2023" },
  { field: "Devise de référence", i2: "EUR", i3: "EUR" },
  { field: "Frais de gestion (max)", i2: "0,25 %", i3: "0,20 %" },
  { field: "Souscription minimale", i2: "500 000 €", i3: "1 000 000 €" },
  { field: "Investisseurs éligibles", i2: "Clients professionnels", i3: "Idem" },
  { field: "Heure de coupure", i2: "J avant 14h00 (Paris)", i3: "Idem" },
  { field: "Publication VL", i2: "J+1 ouvré", i3: "J+1 ouvré" },
  { field: "Règlement", i2: "J+2 ouvrés", i3: "J+2 ouvrés" },
  { field: "Traitement des revenus", i2: "Capitalisation", i3: "Capitalisation" },
  { field: "Classification SFDR", i2: "Article 6", i3: "Article 6" },
  { field: "Indicateur de risque", i2: "1 / 7", i3: "1 / 7" },
  { field: "Régulateur", i2: "AMF n° FCP20230197", i3: "Idem" },
];

const faqItems = [
  {
    q: "Quels sont les frais ?",
    a: "Frais de gestion uniquement : 0,25 % p.a. (max) pour la Part I2, 0,20 % pour la Part I3. Aucun frais d'entrée, de sortie ou de souscription. Les rendements affichés sont toujours nets de frais.",
  },
  {
    q: "Quels sont les risques et comment mes fonds sont-ils protégés ?",
    a: "Vos fonds sont adossés à une banque de premier rang (BNP Paribas). Le risque principal est celui du défaut de la contrepartie, atténué par le portefeuille de collatéral (actions liquides Tier-1) détenu par le fonds et liquidable immédiatement. Cette stratégie n'a jamais connu de défaut depuis 2014.",
  },
  {
    q: "Que se passe-t-il si LFIS Capital fait faillite ?",
    a: "Aucune exposition financière à l'insolvabilité du gérant. Les actifs sont détenus par BNP Paribas en tant que dépositaire, séparés du bilan de LFIS. Vous pouvez toujours soumettre vos ordres de rachat directement.",
  },
  {
    q: "Pourquoi les banques paient-elles au-dessus du taux sans risque ?",
    a: "Détenir des actifs financiers au bilan est coûteux pour les banques en raison des exigences réglementaires en fonds propres. Les banques paient une prime à des fonds comme Velvet pour détenir ces actifs hors bilan via un TRS — un arrangement mutuellement bénéfique.",
  },
  {
    q: "Comment fonctionnent les flux financiers quotidiens ?",
    a: "Chaque jour, Velvet et BNP Paribas échangent la performance. Si le panier d'actions monte, Velvet paie le gain à BNP. S'il baisse, BNP paie la différence à Velvet. Quelles que soient les conditions de marché, BNP paie €STR + spread à Velvet quotidiennement.",
  },
  {
    q: "Y a-t-il un risque de change ?",
    a: "Non. La contrepartie paie le rendement quotidien en EUR, indépendamment de la devise des actifs sous-jacents du panier.",
  },
  {
    q: "Où trouver la documentation légale ?",
    a: "Le prospectus et le KID sont disponibles sur lfis.com.",
  },
];

export default function VelvetPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        {/* ===================== HERO ===================== */}
        <section className="py-20 md:py-28 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1 font-mono tracking-wider">
                FCP UCITS · AMF n° FCP20230197
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-[1.1]">
                <em>La puissance institutionnelle pour votre trésorerie au quotidien.</em>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                Maximisez vos excédents de trésorerie avec <em className="font-serif">Velvet</em>.
                Un rendement cible de <span className="font-mono">€STR + 0,30 %</span>, une sécurité
                UCITS de grade institutionnel, et une liquidité quotidienne sans frais d'entrée
                ni de sortie.
              </p>
              <div className="flex justify-center pt-2">
                <Button asChild size="lg" className="px-10 py-6 text-base btn-glow">
                  <Link to="/open-account">Commencer à investir</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ===================== KEY METRICS ===================== */}
        <section className="pb-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Rendement net</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  3,5 – 3,8 %
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                  €STR + 0,30 %
                </p>
                <p className="text-[11px] text-muted-foreground mt-1">temps réel · net de frais</p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Indicateur de risque</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  1<span className="text-muted-foreground/60 text-2xl">/7</span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">
                  Le plus faible du marché
                  <a href="#risk-detail" className="text-success hover:underline ml-0.5">*</a>
                </p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Liquidité</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  Quotidienne
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">VL J+1 · Règlement J+2</p>
              </GlassCard>

              <GlassCard className="p-6 min-h-[180px] flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Sécurité</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  UCITS
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">Agréé par l'AMF</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* ===================== MIRROR SWAP — 2 col layout ===================== */}
        <section className="py-14 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <ScrollReveal className="lg:col-span-7">
                <div className="space-y-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
                    Mécanisme · Mirror Swap
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                    <em>Transformer la performance des actions en un rendement monétaire stable.</em>
                  </h2>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Velvet utilise un <em>Total Return Swap (TRS)</em> — un contrat d'échange de
                    performance avec les plus grandes banques mondiales. Le résultat : un rendement
                    monétaire garanti, protégé des fluctuations boursières.
                  </p>

                  <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {[
                      {
                        n: "01",
                        t: "Le panier de collatéral",
                        d: "Velvet détient un portefeuille diversifié d'actions internationales Tier-1 qui servent de garantie.",
                      },
                      {
                        n: "02",
                        t: "L'échange (le swap)",
                        d: "Velvet échange la performance de ce panier contre un taux monétaire garanti (€STR + spread) auprès de banques de premier plan.",
                      },
                      {
                        n: "03",
                        t: "La capture du taux",
                        d: "L'investisseur reçoit un rendement stable, protégé des fluctuations boursières par le contrat d'échange.",
                      },
                    ].map((s) => (
                      <li key={s.n} className="border-l border-primary/30 pl-4 py-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
                          Étape {s.n}
                        </span>
                        <h3 className="font-serif italic text-base mt-1 mb-1">{s.t}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                      </li>
                    ))}
                  </ol>

                  <p className="text-foreground/90 leading-relaxed pt-2 text-base md:text-lg">
                    <span className="font-serif italic">Le résultat : </span>
                    un rendement quotidien régulier, indépendant des marchés actions, garanti
                    contractuellement par BNP Paribas.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={120} className="lg:col-span-5">
                <GlassCard className="p-6 md:p-8 h-full">
                  <VelvetMirrorSwap />
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ===================== STRATEGY ZIGZAG — éditorial avec photos ===================== */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  Méthodologie
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>La stratégie Velvet en détail</em>
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-16 md:space-y-24">
              {[
                {
                  step: "01",
                  title: "Stabilité",
                  desc: "Velvet ne prend aucun pari directionnel sur les marchés actions. Le swap transforme la volatilité du panier en un rendement monétaire fixe garanti par BNP Paribas — l'ancrage absolu de votre trésorerie.",
                  img: velvetAnchorImg,
                  alt: "Ancre marine en laiton sur parchemin avec rubans deep teal — symbole de stabilité",
                  reverse: false,
                },
                {
                  step: "02",
                  title: "Surperformance régulière",
                  desc: "La prime de 0,30 % au-dessus de l'€STR est captée chaque jour, sans frais d'entrée ni de sortie. +5,38 % cumulés contre +4,84 % pour l'€STR sur 17 mois.",
                  img: velvetPedestalImg,
                  alt: "Pièce dorée en équilibre sur un piédestal de marbre — symbole de rendement stable",
                  reverse: true,
                },
                {
                  step: "03",
                  title: "Symétrie & garantie",
                  desc: "Chaque jour, BNP Paribas et Velvet échangent la performance. Quelles que soient les conditions de marché, le rendement contractuel €STR + spread est versé. Aucun défaut depuis 2014.",
                  img: velvetMirrorImg,
                  alt: "Balance de précision en équilibre avec piles de pièces — symbole de l'échange équilibré du Total Return Swap",
                  reverse: false,
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
                      <h3 className="text-3xl md:text-4xl font-serif leading-tight">
                        <em>{item.title}</em>
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== KEY STATS — chart + AUM ===================== */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  Key Stats
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>Les chiffres clés du fonds</em>
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">
                  Performance & transparence — données Velvet en temps réel
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
              <GlassCard className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Actifs sous gestion</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold leading-none">
                  €<CountUp end={424.35} decimals={2} suffix=" M" />
                </p>
              </GlassCard>
              <GlassCard className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Intérêts générés (cumul)</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  €<CountUp end={47.2} decimals={1} suffix=" M" />
                </p>
              </GlassCard>
              <GlassCard className="p-8 text-center min-h-[160px] flex flex-col items-center justify-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Surperformance / €STR</p>
                <p className="text-3xl md:text-[2.25rem] font-serif font-semibold text-success leading-none">
                  +<CountUp end={54} decimals={0} suffix=" bps" />
                </p>
                <p className="text-[11px] text-muted-foreground mt-3">Cumul 17 mois</p>
              </GlassCard>
            </div>

            <ScrollReveal delay={120}>
              <GlassCard className="p-6 md:p-10">
                <VelvetPerformanceChart />
              </GlassCard>
            </ScrollReveal>

            <p className="text-[11px] text-muted-foreground text-center mt-6 max-w-3xl mx-auto leading-relaxed">
              Les performances passées ne préjugent pas des performances futures. Données Velvet (Part I), nettes de frais.
            </p>
          </div>
        </section>

        {/* ===================== COLLATERAL DONUT ===================== */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono mb-3">
                  Composition
                </p>
                <h2 className="text-4xl md:text-5xl font-serif">
                  <em>Le panier de collatéral</em>
                </h2>
                <p className="text-muted-foreground mt-4 text-lg">
                  100 % actions internationales Tier-1, diversifiées par secteur.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <GlassCard className="p-8 md:p-10">
                <VelvetCollateralDonut />
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* ===================== CHARACTERISTICS TABLE ===================== */}
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
                      <TableHead className="text-xs uppercase tracking-wider">Part I2 EUR</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Part I3 EUR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {characteristics.map((c) => (
                      <TableRow key={c.field}>
                        <TableCell className="font-medium text-muted-foreground">{c.field}</TableCell>
                        <TableCell className="font-mono text-sm">{c.i2}</TableCell>
                        <TableCell className="font-mono text-sm">{c.i3}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* ===================== SECURITY ARCHITECTURE ===================== */}
        <section className="py-14 md:py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
                <em>Architecture de sécurité</em>
              </h2>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg">
                Cinq acteurs régulés, séparés et indépendants — vos fonds ne sont jamais au bilan
                de LFIS ni de Quercus.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <VelvetSecurityArchitecture />
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ScrollReveal>
                <GlassCard className="p-8 h-full" id="risk-detail">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Indicateur de risque · SRI
                  </p>
                  <RiskScale
                    level={1}
                    label="Velvet est noté 1/7 sur l'échelle synthétique de risque (SRI). Aucun défaut depuis 2014."
                  />
                  <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                    Le <em>Summary Risk Indicator</em> (SRI) est l'échelle réglementaire européenne
                    de 1 (risque le plus faible) à 7 (risque le plus élevé), publiée dans le
                    Document d'Information Clé (KID) de chaque fonds.
                  </p>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal>
                <GlassCard className="p-8 h-full flex flex-col">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
                    Notation BNP Paribas
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center mb-6">
                    <div>
                      <p className="text-2xl font-serif font-semibold text-primary">AA-</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Fitch</p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-semibold text-primary">A1</p>
                      <p className="text-[11px] text-muted-foreground mt-1">Moody's</p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-semibold text-primary">A+</p>
                      <p className="text-[11px] text-muted-foreground mt-1">S&amp;P</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm flex-1">
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">Structure</span>
                      <span className="font-mono">FCP · UCITS</span>
                    </li>
                    <li className="flex justify-between border-b border-white/30 pb-2">
                      <span className="text-muted-foreground">Gérant</span>
                      <span className="font-mono">LFIS · GP13000004</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <span className="text-muted-foreground">Auditeur</span>
                      <span className="font-mono">PwC · trimestriel</span>
                    </li>
                  </ul>
                  <a
                    href="https://geco.amf-france.org/Bio/rech_opcvm.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    Vérifier l'agrément AMF n° FCP20230197
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
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

        {/* ===================== CTA ===================== */}
        <section className="py-20 md:py-16 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif">
                <em>Faites travailler votre trésorerie chaque jour.</em>
              </h2>
              <p className="text-lg text-muted-foreground">
                Vos fonds détenus par BNP Paribas. Rendement quotidien net de frais. Liquidité quotidienne.
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