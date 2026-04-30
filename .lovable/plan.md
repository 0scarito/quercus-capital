## Objectif

Le bouton FR/EN existe et l'infrastructure i18n (`react-i18next`) est en place, mais une grande majorité du contenu est écrite **en dur en français** dans le code. Résultat : passer en EN ne traduit presque rien. Ce plan refait passer tout le site sous i18n et fournit les traductions anglaises complètes.

## État actuel (audit)

Fichiers de traduction existants : `auth, common, dashboard, footer, landing, nav, onboarding, pages` — mais le namespace `landing` ne couvre qu'une partie, et `pages` est quasi vide (juste les titres).

**Pages avec texte 100% en dur (aucun `useTranslation`) :**
- `AboutPage`, `TobamPage`, `VelvetPage`, `SecurityPage`, `RegulationPage`, `PressPage`, `SolutionDetailPage`, `PortefeuilleConseillePage`, `ProductsPage`, `LegalPage`, `PrivacyPage`, `CookiePage`, `ContactPage`
- `HelpCenter` (et son contenu : `src/data/helpArticles.ts`, ~1000 lignes d'articles FR)

**Composants landing avec texte en dur :**
- `AdvisorThresholdSection`, `CashAndCarryDiagram`, `SecurityArchitecture`, `VelvetSecurityArchitecture`, `VelvetMirrorSwap`, `SpecsTable`, `RiskScale`, `ForEveryoneSection`, `BasisConvergenceChart`, `CMEPremiumChart`, `TobamAnalytics`, `VelvetCollateralDonut`, `VelvetPerformanceChart`, `NavDropdownOverlay`

**Data files à internationaliser :**
- `src/data/helpArticles.ts` (centre d'aide)
- `src/data/landingFaq.ts`
- `src/components/solutions/segmentData.ts`

## Approche

### 1. Restructurer les namespaces de traduction
Créer/étendre des namespaces clairs pour éviter un seul fichier énorme :
- `pages` → étendre avec `about`, `security`, `regulation`, `legal`, `privacy`, `cookie`, `contact`
- Nouveau `products.json` → contenu des pages `TobamPage`, `VelvetPage`, `ProductsPage`, `PortefeuilleConseillePage`, `SolutionDetailPage`, `PressPage`
- Nouveau `help.json` → pour `HelpCenter` + tous les articles de `helpArticles.ts`
- Étendre `landing.json` avec les sections manquantes (advisor threshold, cash & carry diagram, specs, risk scale, for everyone, charts captions, mirror swap, security architecture)
- `nav.json` → vérifier le mega menu (`NavDropdownOverlay`)

### 2. Refactor des composants
Pour chaque fichier listé :
- Ajouter `const { t } = useTranslation("<namespace>")`
- Remplacer chaque chaîne FR par `t("key.subkey")`
- Pour les listes (articles d'aide, étapes, FAQ), externaliser les données dans le JSON i18n et lire via `t("...", { returnObjects: true })`, ou garder une structure data avec uniquement les clés i18n.

### 3. Traductions EN
Pour chaque clé ajoutée en `fr/*.json`, créer la version `en/*.json` avec une traduction anglaise professionnelle, cohérente avec le ton "luxury fintech / Quest for Excellence" déjà utilisé dans `landing.json`. Vocabulaire métier conservé : Smart Cash, Cash & Carry, UCITS, FPS, AMF, ORIAS, depositary bank, etc.

### 4. Cas particuliers
- **Centre d'aide** : `helpArticles.ts` contient ~25 articles avec titres, descriptions et corps en markdown FR. Approche : transformer le tableau en `id` + clés i18n, puis stocker titres/descriptions/corps dans `help.json` (FR) et `help.json` (EN).
- **Charts / diagrammes** : labels d'axes, légendes, tooltips → clés courtes dans `landing.json`.
- **Dates et nombres** : utiliser `Intl.NumberFormat` / `Intl.DateTimeFormat` avec la locale active de i18next pour formatter % et montants.
- **Composants déjà partiellement traduits** (ex. `LandingNav`, `LandingFooter`) : audit fin et compléter les clés manquantes.

### 5. QA
- Basculer en EN sur chaque page principale (`/`, `/a-propos`, `/contact`, `/securite`, `/reglementation`, `/presse`, `/aide`, `/aide/<slug>`, `/produits`, `/produits/velvet`, `/produits/tobam`, `/portefeuille-conseille`, `/solutions`, `/solutions/<slug>`, `/mentions-legales`, `/confidentialite`, `/cookies`) et vérifier qu'il ne reste aucun texte FR.
- Vérifier que la persistance `localStorage` (`quercus_lang`) fonctionne après navigation.

## Détails techniques

- **Pas de changement** au fichier `src/i18n/index.ts` côté config, sauf l'enregistrement des nouveaux namespaces (`products`, `help`).
- Les composants partagés (`Button`, `Card`, etc.) ne sont pas touchés.
- Les emails (`supabase/functions/_shared/email-templates`) sortent du périmètre de cette tâche (ils ont leur propre logique). À traiter dans un plan séparé si besoin.
- Volume estimé : ~40 fichiers refactorés, ~1500 nouvelles clés i18n (FR + EN).

## Découpage proposé

Pour limiter le risque de régression visuelle et garder des diffs reviewables, je propose de livrer en 4 vagues séquentielles dans la même session :

1. **Pages institutionnelles** : About, Contact, Security, Regulation, Press, Legal, Privacy, Cookie
2. **Pages produits** : Products, ProductsPage, VelvetPage, TobamPage, PortefeuilleConseille, SolutionDetailPage + composants associés (SpecsTable, RiskScale, charts, diagrammes)
3. **Composants landing restants** : AdvisorThresholdSection, ForEveryoneSection, CashAndCarryDiagram, SecurityArchitecture, VelvetSecurityArchitecture, VelvetMirrorSwap, NavDropdownOverlay
4. **Centre d'aide** : HelpCenter + tous les articles `helpArticles.ts`

Aucun changement de design ni de structure visuelle — uniquement substitution de texte par clés + ajout des fichiers de traduction.
