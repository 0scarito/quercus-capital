## Spec rewrite — Quercus Capital v1.0

Based on your answers:
- **Apply the full spec** across landing, navigation, products, dashboard, login, About, FAQ, testimonials.
- **Regulatory identity = both** : keep CIF / COA / ORIAS n°24004789 mentions, and add the new CGP / AMF wording from the spec alongside.
- **Keep current products** : Velvet (Smart Cash) and Tobam (Cash & Carry) stay. The spec's "Fonds Monétaire EUR / USD / Portefeuille Conseillé" comparison table is adapted to use Smart Cash, Cash & Carry, and a third "Portefeuille Conseillé" line presented as a bespoke advisory option.

### Section 01 — Navigation & Footer

**Navbar (`LandingNav.tsx`, `nav.json` FR/EN)**
- Replace the 3 main menu labels with: `Notre approche`, `Nos produits`, `Sécurité & régulation`, `À propos` (4 items, no mega-menu rework — the existing dropdowns stay attached to the matching labels; "Ressources" is folded into "À propos").
- CTA button : `Get started / Ouvrir un compte` → `Prendre rendez-vous`, linking to `/contact`.
- Add a small regulatory line under the logo (10px, muted): `CGP enregistré — CIF n° ORIAS 24004789 — Membre CNCEF`.

**Footer (`LandingFooter.tsx`, `footer.json`)**
- Reorganize into 4 columns: Quercus Capital / Produits / Légal / Contact, with the rows from the spec (mission, à propos, carrières // Smart Cash, Cash & Carry, Portefeuille conseillé // mentions, confidentialité, CGU, déclaration AMF // contact@quercus-capital.fr, prendre RDV, presse).
- Add a regulatory band below the columns with the long disclaimer (CIF + CGP, performances passées, risque de perte en capital).

### Section 02 — Landing Hero (split-screen)

`HeroSection.tsx`
- Switch from centered to a 2-column flex layout (50/50 desktop, stacked mobile, text first).
- Left column: eyebrow `Conseiller en Gestion de Patrimoine · Agréé AMF`, H1 `Votre épargne liquide, travaille chaque jour.`, subtitle `Accédez à des fonds monétaires institutionnels…`, two CTAs: `Prendre rendez-vous` (primary → `/contact`) and `Découvrir nos produits` (secondary → `/produits`).
- Right column: new `LiveYieldCard` component — eyebrow `RENDEMENTS EN DIRECT`, big EUR rate + green `net / an` badge, separator, three rows (Smart Cash EUR · Cash & Carry · Liquidité Quotidienne), footer note `Mis à jour chaque jour ouvré · Net de frais de gestion`. Reuses existing yield numbers from `YieldCalculator` / `YieldCards` so both stay synced.

### Section 03 — "Comment ça marche" 2×2 grid

Replace the existing `UseCases` / vertical steps with a new `HowItWorks` section: CSS grid `2×2`, gap 16px, single column on mobile.
Cards (icon in 40px circle, step number, title, description):
1. Rencontrez votre conseiller
2. Ouvrez votre compte
3. Investissez à votre rythme
4. Votre argent travaille
Section title: `Comment ça marche, concrètement`.

### Section 04 — Stats / chiffres clés

Update `LiveNumbers.tsx` with the Option B set:
- 3,42 % — Rendement net EUR (actualisé quotidiennement)
- Quotidienne — Liquidité des fonds
- 0 % — Frais d'entrée et de sortie
- AMF — Régulation française
Sub-headline reword: `Ouverture de compte en 5 minutes, accompagné par votre conseiller`.

### Section 05 — Sécurité / chaîne de confiance

Replace `SecurityArchitecture` flow diagram with a 3-block "chaîne de confiance" inside `SecuritySection`:
- 🛡️ Agréé et supervisé (AMF + CIF/ORIAS mentioned together)
- 🔒 Vos fonds sont ségrégués (CACEIS still cited as the dépositaire)
- 📄 Transparence totale (prospectus AMF / commissaire aux comptes)
Section title: `Votre épargne, protégée à chaque étape`.

### Section 06 — Page Produits (tableau comparatif)

Refactor `ProductsPage.tsx` from card-based to a single comparison table with 5 columns: Produit · Rendement net · Devise · Liquidité · Niveau de risque. 3 rows mapped to current products:
| Produit | Sous-titre | Rendement | Devise | Liquidité | Risque |
|---|---|---|---|---|---|
| Quercus Smart Cash | Bons du Trésor Zone Euro | 3,42 % | EUR | Quotidienne (badge vert) | Très faible |
| Quercus Cash & Carry | Stratégie cash & carry institutionnelle | 4,81 % | USD/EUR | Quotidienne (badge vert) | Très faible |
| Portefeuille Conseillé | Allocation sur-mesure définie avec votre CGP | Sur devis (badge bleu) | Multi-devises | Variable (badge bleu) | Adapté à votre profil |
- Note de bas de tableau with the "performances passées" disclaimer.
- Mobile: horizontal scroll wrapper.
- Each row links to its detail page (`/produits/velvet`, `/produits/tobam`, new `/produits/portefeuille-conseille`).

**Detail pages (`VelvetPage.tsx`, `TobamPage.tsx`, new `PortefeuilleConseillePage.tsx`)**
Restructure into 6 blocks: header with regulatory badge + live rate · 2×2 metrics grid · prose description · "Comment investir" 3 steps + CTA `Prendre rendez-vous` · documents légaux · 3-5 FAQ. Use the spec's exact prose for EUR/USD descriptions.

### Section 07 — Témoignages

Replace existing testimonial component data with the 3 new personas (Sophie M., Laurent B., Marie & Thomas D.) and section title `Ce que nos clients disent de leur expérience`.

### Section 08 — FAQ

Reorganize landing FAQ (`FaqAccordion.tsx`) into 3 categories with the 11 Q/A from the spec, verbatim:
- Mon argent est-il en sécurité ? (4 Q)
- Comment est-ce que je gagne des intérêts ? (4 Q)
- Quel est le rôle de mon conseiller ? (3 Q)
Render as 3 grouped accordions with category headings.

### Section 09 — Espace client

**Login (`SignIn.tsx`, `auth.json`)**
- Title: `Accéder à mon espace Quercus`
- Subtitle: `Suivi de vos investissements et communication avec votre conseiller`
- Labels FR : `Adresse e-mail`, `Mot de passe`, button `Se connecter`, `Mot de passe oublié ?`
- Replace the signup link with: `Pas encore client ? Prenez rendez-vous avec un conseiller` → `/contact`.

**Dashboard (`Dashboard.tsx`, `QuercusSidebar.tsx`, `dashboard.json`)**
- Add a welcome banner at the top: `Bonjour [Prénom]. Votre conseiller [Nom du CGP] est disponible pour répondre à vos questions. → Envoyer un message`.
- Rename sidebar tabs: Portfolio → `Mes investissements`, Transactions → `Mes mouvements`, Settings → `Mon profil`.
- Add a new sidebar entry `Mon conseiller` → new route `/dashboard/conseiller` with mocked advisor card (name, photo placeholder, AMF reg. number, email, phone, message textarea posting via existing toast).
- Action buttons: `Deposit / Withdraw` → `Investir / Retirer`.

### Section 10 — Page À propos (`AboutPage.tsx`)

Restructure into:
1. Hero `Notre mission` + 2-3 phrase intro on the CGP approach
2. `Notre équipe` — placeholder advisor cards with name, role, AMF/ORIAS reg. number
3. `Notre approche` — 3 differentiating values (Indépendance, Transparence, Accompagnement humain)
4. `Nos agréments` — AMF + CNCEF + ORIAS badges with link to the public ORIAS registry
5. CTA bas de page : `Rencontrons-nous — Prendre rendez-vous`

### Section 11 — Final checklist

- Browser tab title (`index.html`) : confirm it's `Quercus Capital`, no "Spiko".
- Make sure every `Prendre rendez-vous` CTA points to `/contact`.
- Single source for the live rates so hero card + products table + product pages stay in sync (small `src/data/liveYields.ts`).
- All product/yield blocks include `Net de frais de gestion` and the `performances passées` disclaimer.
- Footer + About both display `CIF n° ORIAS 24004789` AND `CGP — AMF` mentions side by side.

### Open question (will assume defaults if unanswered after approval)

- The spec leaves `[NUMÉRO AMF]` blank for the CGP registration. I'll use the existing ORIAS n°24004789 and add a placeholder `[N° AMF à compléter]` for the CGP-specific number where the spec asks for it. Replace later when you have it.

## Files to create / edit (technical)

**Create**
- `src/components/landing/LiveYieldCard.tsx`
- `src/components/landing/HowItWorks.tsx`
- `src/components/landing/TrustChain.tsx`
- `src/components/landing/ProductsComparisonTable.tsx`
- `src/data/liveYields.ts`
- `src/pages/PortefeuilleConseillePage.tsx`
- `src/pages/dashboard/MonConseiller.tsx`

**Edit**
- `src/components/landing/LandingNav.tsx`, `LandingFooter.tsx`, `HeroSection.tsx`, `LiveNumbers.tsx`, `SecuritySection.tsx`, `UseCases.tsx` (replace with HowItWorks)
- `src/components/solutions/FaqAccordion.tsx` (or move to landing-level FAQ component if needed)
- `src/pages/ProductsPage.tsx`, `VelvetPage.tsx`, `TobamPage.tsx`, `AboutPage.tsx`, `SignIn.tsx`, `Dashboard.tsx`
- `src/components/QuercusSidebar.tsx`
- `src/App.tsx` (add `/produits/portefeuille-conseille` and `/dashboard/conseiller` routes)
- `src/i18n/locales/{fr,en}/{nav,footer,landing,auth,dashboard,pages}.json`
- `index.html` (title check)

No backend / database changes are required.
