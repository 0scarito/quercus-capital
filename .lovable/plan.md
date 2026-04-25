## Goal

Make every help center item (currently inert `<a href="#">` links) a real, clickable article page with realistic Quercus content, fully styled in the existing serif/italic, bordered, Quercus aesthetic.

## Scope — every article gets its own page

There are **6 categories** containing **~35 article items total**. Every single one will be implemented — none skipped.

**Ouvrir un compte (10):** Créer un compte particulier, Pièces d'identité acceptées, Justificatif de domicile, Justificatif d'origine des fonds (particuliers), Créer un compte entreprise, Créer un compte association française, Créer un compte entreprise individuelle, Créer un compte syndicat copropriétaires, Justificatif de fonds (personnes morales), Restrictions géographiques.

**Produits (7):** Fiche technique fonds monétaires, Documentation fonds monétaires, Fiche technique Smart Cash, Documentation Smart Cash, Fiche technique Cash & Carry, Documentation Cash & Carry, Comprendre les frais.

**Dépôts et retraits (7):** Dépôt depuis compte tiers, Effectuer un dépôt, Virement non arrivé, Comptes ouverts avant sept. 2025, Retrait standard, Retrait instantané, Conversion de devises.

**Gérer mon compte (7):** Applications tierces, Accès multi-utilisateurs, Ouvrir plusieurs comptes, Mode Quatre Yeux, Modifier mot de passe, Modifier email, 2FA.

**Fiscalité et comptabilité (5):** Fiscalité particuliers, Fiscalité personnes morales, IFU, Traitement comptable fonds monétaires, Relevés et exports.

**À propos (6):** Notre mission, Nos partenaires, Sécurité des fonds, CGU, Politique de confidentialité, Mentions légales.

## Approach

1. **Refactor `HelpCenter.tsx` data model** — give each item an `{ slug, title }` shape (auto-derived slug) instead of plain strings. Keep existing index + category pages working.

2. **Add a third route + view: article detail.**
   - New route: `/aide/:slug/:articleSlug` in `src/App.tsx`.
   - In `HelpCenter.tsx`, when both params exist, render an `ArticleView` component.

3. **Realistic article content.** Create `src/data/helpArticles.ts` keyed by `${categorySlug}/${articleSlug}`. Each article has:
   - `title`, `category`, `updatedAt`, `readTime`
   - `intro` paragraph
   - `sections[]` with heading + body (paragraphs, bullet lists, numbered steps, callout/info boxes)
   - Optional `relatedArticles[]` (links to siblings in same category)
   - Content invented but plausible and consistent with Quercus context already in the codebase (CIF/ORIAS, fonds monétaires, Smart Cash, Cash & Carry, 2FA, Mode Quatre Yeux, etc.). Pulled from existing memory files (legal/compliance, features/onboarding, financial-tools) so it stays coherent with the rest of the site.

4. **Article page layout (Quercus style):**
   - Breadcrumb: Quercus › Category › Article
   - Serif italic H1, small uppercase eyebrow with category, "Mis à jour le …" + lecture time
   - Two-column on desktop: main prose (max-w-2xl) + right rail with "Sur cette page" anchor TOC and "Articles liés"
   - Body uses Tailwind prose-equivalent classes already in the project (border boxes for callouts, bordered numbered steps, bullet lists with the same dot marker as the category page)
   - Footer block: "Cet article vous a-t-il été utile ? Oui / Non" + "Contacter notre équipe" CTA (already used on category page)

5. **Wire the links.** In `CategoryDetail`, replace `<a href="#">` with `<Link to={\`/aide/${cat.slug}/${item.slug}\`}>`.

6. **Search.** Update the index search filter to match the new `{slug,title}` items so search keeps working.

## Files

- edit `src/pages/HelpCenter.tsx` — data model + ArticleView + link wiring + search
- create `src/data/helpArticles.ts` — all ~35 articles' realistic content
- edit `src/App.tsx` — add `/aide/:slug/:articleSlug` route

## Out of scope

- No backend, no CMS — content is static TS data (matches the rest of the marketing site).
- No i18n for articles (rest of help center is FR-only too).
