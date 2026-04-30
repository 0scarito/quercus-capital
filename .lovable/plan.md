## i18n — état d'avancement

### ✅ Terminé
- **Vague 1 — Pages institutionnelles** : AboutPage, SecurityPage, RegulationPage, PressPage, LegalPage, PrivacyPage, CookiePage, ContactPage refactorées vers `pages` namespace.
- **Infrastructure i18n** : namespaces `pages`, `products`, `help` créés et enregistrés dans `src/i18n/index.ts`.
- **Traductions JSON FR+EN complètes** pour :
  - `products.json` — Tobam, Velvet, Portefeuille Conseillé, ProductsPage, Products dashboard, segments (8), SegmentHero, ComparisonTable, IntegrationRoadmap, SecurityBlock, SolutionsFaq, RiskScale.
  - `landing.json` étendu — ForEveryone, AdvisorThreshold, RiskScale, SecurityArchitecture (Tobam+Velvet), CashAndCarryDiagram, MirrorSwap, BasisChart, PremiumChart, CollateralDonut, PerformanceChart, TobamAnalytics, ComparisonTable, IntegrationRoadmap, SecurityBlock, SolutionsFaq.
  - `help.json` — UI du centre d'aide + structure des 6 catégories.

### 🔧 Reste à faire — refactor des composants (les clés existent toutes)

Les fichiers JSON FR+EN sont prêts. Il ne reste que la substitution `useTranslation()` dans les composants suivants :

**Pages produits** (les clés sont dans `products` namespace) :
- `src/pages/TobamPage.tsx` → utiliser `t("tobam.*")`
- `src/pages/VelvetPage.tsx` → `t("velvet.*")`
- `src/pages/ProductsPage.tsx` → `t("productsListing.*")`
- `src/pages/Products.tsx` (dashboard) → `t("dashboardProducts.*")`
- `src/pages/PortefeuilleConseillePage.tsx` → `t("portefeuille.*")`
- `src/pages/SolutionsPage.tsx` → `t("solutionsList.*")` + `t("segments.*.name/heroDescription")`
- `src/pages/SolutionDetailPage.tsx` (déjà minimal, dépend de segmentData)
- `src/components/solutions/segmentData.ts` → externaliser `name`/`heroTitle`/`heroDescription` via clés i18n
- `src/components/solutions/SegmentHero.tsx` → `t("segmentHero.register")`
- `src/components/solutions/ComparisonTable.tsx` → `t("comparison.*")`
- `src/components/solutions/IntegrationRoadmap.tsx` → `t("roadmap.*")`
- `src/components/solutions/SecurityBlock.tsx` → `t("securityBlock.*")`
- `src/components/solutions/FaqAccordion.tsx` → `t("solutionsFaq.*")`

**Composants landing** (les clés sont dans `landing` namespace étendu) :
- `AdvisorThresholdSection.tsx` → `t("advisorThreshold.*")`
- `RiskScale.tsx` → `t("riskScale.low/high")`
- `SecurityArchitecture.tsx` → `t("securityArch.tobam.*")`
- `VelvetSecurityArchitecture.tsx` → `t("securityArch.velvet.*")`
- `CashAndCarryDiagram.tsx` → `t("cashCarry.*")`
- `VelvetMirrorSwap.tsx` → `t("mirrorSwap.*")`
- `BasisConvergenceChart.tsx` → `t("basisChart.*")`
- `CMEPremiumChart.tsx` → `t("premiumChart.*")`
- `VelvetCollateralDonut.tsx` → `t("collateralDonut.*")`
- `VelvetPerformanceChart.tsx` → `t("perfChart.*")`
- `TobamAnalytics.tsx` → `t("tobamAnalytics.*")`
- `ForEveryoneSection.tsx` → `t("forEveryone.*")`
- `NavDropdownOverlay.tsx` (overlay seul, peu de texte)

**Centre d'aide** :
- `src/pages/HelpCenter.tsx` → consommer `help.ui.*` et `help.categories.*` au lieu du tableau `CATEGORIES` codé en dur
- `src/data/helpArticles.ts` (~1020 lignes, 25 articles avec markdown) → 
  **Approche recommandée** : conserver une seule source de vérité dans `helpArticles.ts` avec une structure `{ fr: {...}, en: {...} }` par article, ou créer `src/i18n/locales/{fr,en}/helpArticles.json`. À traiter dans une session dédiée vu le volume de traduction éditoriale.

### Pattern de refactor type
```tsx
import { useTranslation } from "react-i18next";
const { t } = useTranslation("products"); // ou "landing", "help"
// <h1>{t("tobam.heroTitle")}</h1>
// Pour les listes : t("tobam.faq", { returnObjects: true }) as Array<{q: string, a: string}>
```
