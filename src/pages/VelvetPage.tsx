import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { GlassCard } from "@/components/landing/GlassCard";
import { CountUp } from "@/components/landing/CountUp";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Banknote, FileText, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const counterparties = [
  "BNP Paribas", "Société Générale", "Crédit Agricole CIB", "Natixis",
  "Goldman Sachs", "J.P. Morgan", "Citi", "Morgan Stanley",
  "Barclays", "UBS", "BBVA", "HSBC", "Santander", "Bank of America",
];

const collateral = [
  { sector: "Technology", pct: 34 },
  { sector: "Financials", pct: 18 },
  { sector: "Healthcare", pct: 12 },
  { sector: "Consumer Discretionary", pct: 10 },
  { sector: "Communications", pct: 8 },
  { sector: "Industrials", pct: 7 },
  { sector: "Energy", pct: 5 },
  { sector: "Others", pct: 6 },
];

const characteristics = [
  { field: "Nom officiel", i2: "FCP Velvet", i3: "FCP Velvet" },
  { field: "ISIN", i2: "FR0014010AT3", i3: "FR0014010IJ7" },
  { field: "Bloomberg", i2: "FCPVVI2 FP Equity", i3: "FCPVVI3 FP Equity" },
  { field: "Mandat", i2: "TRS avec banques de premier rang", i3: "Idem" },
  { field: "Devise de référence", i2: "EUR", i3: "EUR" },
  { field: "Frais de gestion", i2: "0,15% p.a. (max 0,25%)", i3: "0,10% p.a. (max 0,20%)" },
  { field: "Traitement des revenus", i2: "Capitalisation", i3: "Capitalisation" },
  { field: "Souscription minimale", i2: "500 000 €", i3: "1 000 000 €" },
  { field: "Investisseurs éligibles", i2: "Clients professionnels", i3: "Idem" },
  { field: "Règlement", i2: "J+2 ouvrés", i3: "J+2 ouvrés" },
  { field: "Heure de coupure", i2: "J avant 14h00 Paris", i3: "J avant 14h00 Paris" },
  { field: "Publication VL", i2: "J+1 ouvré", i3: "J+1 ouvré" },
  { field: "Domicile", i2: "France", i3: "France" },
  { field: "Forme juridique", i2: "FCP — UCITS", i3: "FCP — UCITS" },
  { field: "Date de création", i2: "07/12/2023", i3: "07/12/2023" },
  { field: "Gérant", i2: "LFIS Capital", i3: "LFIS Capital" },
  { field: "Dépositaire", i2: "BNP Paribas SA", i3: "BNP Paribas SA" },
  { field: "Auditeur", i2: "PwC", i3: "PwC" },
  { field: "Régulateur", i2: "AMF (n° FCP20230197)", i3: "Idem" },
  { field: "SFDR", i2: "Article 6", i3: "Article 6" },
  { field: "Indicateur de risque", i2: "1/7 (le plus bas)", i3: "1/7 (le plus bas)" },
  { field: "Durée recommandée", i2: "3 mois", i3: "3 mois" },
];

const performance = [
  { period: "2024 année complète", velvet: "4,01%", estr: "3,73%" },
  { period: "YTD 2025 (au 30 mai)", velvet: "1,31%", estr: "1,07%" },
  { period: "Cumulé (jan. 2024 – mai 2025)", velvet: "5,38%", estr: "4,84%" },
];

const faqItems = [
  {
    q: "Quels sont les frais ?",
    a: "Frais de gestion uniquement : 0,15% p.a. pour la Part I2, 0,10% pour la Part I3. Aucun frais d'entrée, de sortie ou de souscription. Les rendements affichés sont toujours nets de frais.",
  },
  {
    q: "Quels sont les risques et comment mes fonds sont-ils protégés ?",
    a: "Vos fonds sont adossés à une banque de premier rang (BNP Paribas). Le risque principal est celui du défaut de la contrepartie, atténué par le portefeuille de collatéral (actions liquides) détenu par le fonds et liquidable immédiatement. Le fonds dispose d'une créance senior sur la banque en cas de pertes résiduelles. Cette stratégie n'a jamais connu de défaut depuis 2014.",
  },
  {
    q: "Que se passe-t-il si LFIS Capital fait faillite ?",
    a: "Aucune exposition financière à l'insolvabilité de LFIS. Les actifs sont détenus par BNP Paribas en tant que dépositaire, séparés du bilan de LFIS. Vous pouvez toujours soumettre vos ordres de rachat directement auprès du gérant par téléphone ou e-mail.",
  },
  {
    q: "Pourquoi les banques paient-elles au-dessus du taux sans risque ?",
    a: "Détenir des actifs financiers au bilan est coûteux pour les banques en raison des exigences réglementaires en fonds propres. Les banques paient une prime à des institutions comme Velvet pour détenir ces actifs hors bilan via un TRS — un arrangement mutuellement bénéfique.",
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
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const nextAccrual = new Date(now);
  nextAccrual.setUTCHours(23, 0, 0, 0);
  if (nextAccrual <= now) nextAccrual.setDate(nextAccrual.getDate() + 1);
  const diff = nextAccrual.getTime() - now.getTime();
  const hh = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav />
      <div className="pt-16 relative z-10">
        {/* Hero */}
        <section className="py-28 md:py-40 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-6xl mx-auto text-center space-y-8">
              <Badge variant="outline" className="text-sm px-4 py-1 font-mono tracking-wider">
                FCP UCITS · AMF n° FCP20230197
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-tight">
                <em>Velvet</em>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Générez un rendement quotidien garanti par les plus grandes banques mondiales.
                Vos fonds, détenus par BNP Paribas, ne sont jamais au bilan de Quercus.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Key Metrics */}
        <section className="pb-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Rendement net actuel</p>
                <p className="text-4xl font-serif font-semibold text-success">€STR + 0,30%</p>
              </GlassCard>
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Fréquence des intérêts</p>
                <p className="text-4xl font-serif font-semibold">Quotidien</p>
              </GlassCard>
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Prochain calcul</p>
                <p className="text-4xl font-serif font-semibold font-mono tracking-wider">{hh}:{mm}:{ss}</p>
              </GlassCard>
              <GlassCard className="p-8 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Disponibilité</p>
                <p className="text-4xl font-serif font-semibold">T+1</p>
                <p className="text-xs text-muted-foreground">Règlement J+2 · Coupure 14h00</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Counterparty Logos */}
        <section className="py-16 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">Contreparties bancaires</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {counterparties.map((name) => (
                  <span key={name} className="text-sm font-medium text-muted-foreground/70 hover:text-foreground transition-colors">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* How it works */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-6">
                <em>Comment ça fonctionne</em>
              </h2>
              <p className="text-center text-muted-foreground mb-16 max-w-3xl mx-auto text-lg">
                Le mécanisme du Total Return Swap expliqué en 3 étapes.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Les banques allègent leur bilan",
                  desc: "Pour limiter les coûts en fonds propres réglementaires, les banques cherchent à s'exposer à des actifs financiers (actions, obligations) sans les détenir directement.",
                  icon: Banknote,
                },
                {
                  step: "02",
                  title: "Velvet achète et entre en TRS",
                  desc: "Velvet détient un panier diversifié d'actifs liquides et échange sa performance avec BNP Paribas via un Total Return Swap. En retour, Velvet reçoit un rendement monétaire quotidien garanti.",
                  icon: FileText,
                },
                {
                  step: "03",
                  title: "Vous percevez des intérêts quotidiens",
                  desc: "Chaque jour, BNP Paribas verse €STR + spread à Velvet. En cas de défaut hypothétique, Velvet liquiderait le portefeuille de collatéral. Aucun défaut depuis 2014.",
                  icon: Shield,
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

        {/* Collateral */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-6">
                <em>Portefeuille de collatéral</em>
              </h2>
              <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
                Contrepartie : BNP Paribas · 100% actions US liquides
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <GlassCard className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {collateral.map((c) => (
                    <div key={c.sector} className="text-center">
                      <p className="text-3xl font-serif font-semibold text-primary">
                        <CountUp end={c.pct} suffix="%" />
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{c.sector}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* Live stats */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Transparence en temps réel</em>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <GlassCard className="p-10 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Actifs sous gestion</p>
                <p className="text-4xl font-serif font-semibold">
                  €<CountUp end={424.35} decimals={2} suffix=" M" />
                </p>
              </GlassCard>
              <GlassCard className="p-10 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Rendement net actuel</p>
                <p className="text-4xl font-serif font-semibold text-success">€STR + 0,30%</p>
              </GlassCard>
              <GlassCard className="p-10 text-center space-y-2">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Intérêts générés</p>
                <p className="text-4xl font-serif font-semibold">
                  €<CountUp end={47.2} decimals={1} suffix=" M" />
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Performance</em>
              </h2>
              <GlassCard className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider">Période</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">Velvet (Part I)</TableHead>
                      <TableHead className="text-xs uppercase tracking-wider">€STR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performance.map((p) => (
                      <TableRow key={p.period}>
                        <TableCell className="font-medium">{p.period}</TableCell>
                        <TableCell className="text-success font-semibold font-mono">{p.velvet}</TableCell>
                        <TableCell className="font-mono text-muted-foreground">{p.estr}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>

        {/* Product characteristics */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Caractéristiques du produit</em>
              </h2>
              <GlassCard className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs uppercase tracking-wider min-w-[200px]">Caractéristique</TableHead>
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

        {/* Partners */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Partenaires institutionnels</em>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  role: "Gérant",
                  name: "LFIS Capital",
                  desc: "Détenue par ses collaborateurs, agréée AMF GP13000004, > 5 Mds$ d'actifs, Paris & Montréal.",
                },
                {
                  role: "Contrepartie & Dépositaire",
                  name: "BNP Paribas SA",
                  desc: "Notée Fitch AA- / Moody's A1 / S&P A+. Première banque de la zone euro.",
                },
                {
                  role: "Auditeur",
                  name: "PricewaterhouseCoopers",
                  desc: "4 audits annuels. Contrôle indépendant des comptes et de la valorisation.",
                },
              ].map((p, i) => (
                <ScrollReveal key={p.name} delay={i * 100}>
                  <GlassCard className="p-8 h-full">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{p.role}</p>
                    <h3 className="text-2xl font-serif font-semibold mb-4"><em>{p.name}</em></h3>
                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Security pillars */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-center mb-14">
                <em>Sécurité & Régulation</em>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Régulé & supervisé",
                  desc: "Fonds UCITS agréé par l'AMF sous le n° FCP20230197. Gérant LFIS Capital agréé AMF sous le n° GP13000004.",
                },
                {
                  title: "Conservation & transparence",
                  desc: "Fonds détenus par BNP Paribas (dépositaire + administrateur). Jamais au bilan de LFIS.",
                },
                {
                  title: "Partenaires institutionnels",
                  desc: "LFIS Capital (gérant), BNP Paribas (contrepartie, dépositaire), PwC (auditeur statutaire, 4x/an).",
                },
                {
                  title: "Risque minimal",
                  desc: "Indicateur de risque 1/7 (le plus bas). Aucun défaut de la stratégie depuis sa création en 2014.",
                },
              ].map((p, i) => (
                <ScrollReveal key={p.title} delay={i * 80}>
                  <GlassCard className="p-8 h-full">
                    <h3 className="text-xl font-serif font-semibold mb-3"><em>{p.title}</em></h3>
                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 md:px-8">
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
        <section className="py-24 px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif">
                <em>Commencez à générer du rendement avec Velvet.</em>
              </h2>
              <p className="text-lg text-muted-foreground">
                Vos fonds détenus par BNP Paribas. Rendement quotidien net de frais.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="px-12 py-6 text-base btn-glow" asChild>
                  <Link to="/open-account">Ouvrir un compte</Link>
                </Button>
                <Button size="lg" variant="outline" className="px-12 py-6 text-base btn-glow" asChild>
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
