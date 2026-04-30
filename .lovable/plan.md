## i18n — état d'avancement

### ✅ Vague 4 — Plateforme (en cours)
- **JSON FR+EN complets** créés pour `auth`, `onboarding` (welcome, email, 2FA, accountType, individual, corporate, kyc, completeProfile), `dashboard` (sidebar, dashboardPage, settings, statements, products, integrations, advisor, deposit).
- **Refactor effectué** : `SignIn.tsx` (avec LanguageSwitcher en haut à droite), `OpenAccount.tsx` (header avec LanguageSwitcher).

### 🔧 À finir dans une prochaine session — refactor composants plateforme
Les clés JSON existent. Il ne reste que la substitution `useTranslation()` :

**Onboarding stages** (namespace `onboarding`) :
- `StageWelcome.tsx` → `t("welcome.*")` — utiliser `t("welcome.steps", { returnObjects: true })`
- `StageEmailVerification.tsx` → `t("email.*")` — schema zod messages via `t("email.errors.*")`
- `Stage2FA.tsx` → `t("twoFA.*")`
- `StageAccountType.tsx` → `t("accountType.*")`
- `StageIndividual.tsx` → `t("individual.*")` — listes via `returnObjects`
- `StageCorporate.tsx` → `t("corporate.*")` — supprimer le bloc inline `{sub === "country" && ...}` et utiliser `t(\`corporate.titles.\${sub}\`)`
- `StageKYC.tsx` → `t("kyc.ready.*")`, `t("kyc.review.*")`, `t("kyc.done.*")`
- `CompleteProfile.tsx` → `t("completeProfile.*")`

**Dashboard** (namespace `dashboard`) :
- `QuercusSidebar.tsx` → `t("sidebar.*")` + ajouter `<LanguageSwitcher />` dans `SidebarFooter` au-dessus du bouton sign-out
- `Dashboard.tsx` → `t("dashboardPage.*")`
- `AccountSettings.tsx` → `t("settings.*")`
- `Statements.tsx` → `t("statements.*")`
- `Products.tsx` → `t("products.*")`
- `Integrations.tsx` → `t("integrations.*")`
- `dashboard/MonConseiller.tsx` → `t("advisor.*")` (la prop `lockedDesc` et `progress` utilisent `<Trans i18nKey>` pour le markup `<0>...</0>`)
- `DepositModal.tsx` → `t("deposit.*")`

**Pages produits restantes** (namespace `products`/`landing`) :
- `TobamPage.tsx`, `VelvetPage.tsx`, `HelpCenter.tsx` — clés déjà dans `products.json` et `help.json`

**Pattern type** :
```tsx
import { useTranslation } from "react-i18next";
const { t } = useTranslation("onboarding");
// listes : (t("welcome.steps", { returnObjects: true }) as Array<{label:string, desc:string}>)
// interpolation : t("kyc.review.missing", { fields: missing.join(", ") })
```

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
