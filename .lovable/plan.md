

# Plan : Pages Solutions Individuelles avec 5 Sections

## Résumé

Transformer la page `/solutions` actuelle (grille de cartes) en une page de hub qui redirige vers 8 pages individuelles par segment (`/solutions/pme`, `/solutions/startups`, etc.). Chaque page suit la même structure en 5 sections avec du contenu personnalisé.

## Architecture

### Nouveau fichier principal : `src/pages/SolutionDetailPage.tsx`

Une seule page paramétrée par segment (via `useParams`). Pas besoin de 8 fichiers séparés — un seul composant avec un objet de données par segment.

### Composants à créer (dans `src/components/solutions/`)

1. **`SegmentHero.tsx`** — Hero avec sélecteur en pilules pour changer de segment. Titre dynamique "Placement de trésorerie pour [Segment]". Le clic sur une pilule navigue vers `/solutions/[slug]`. Fond beige, titre vert forêt, CTA "S'inscrire" imposant.

2. **`ComparisonTable.tsx`** — Tableau glassmorphism comparant Compte Courant vs Compte à Terme vs Quercus. Colonne Quercus mise en avant (bordure `#18454B`, badge "Recommandé"). Lignes : immobilisation, frais de retrait, frais de tenue, rendement net. Couleurs vert/rouge pour indiquer avantage/désavantage. Animation fade-up au scroll via `ScrollReveal`.

3. **`IntegrationRoadmap.tsx`** — Roadmap verticale alternée avec 4 étapes :
   - Ligne centrale 1px `#18454B` qui se "dessine" au scroll (CSS `scaleY` piloté par `IntersectionObserver`)
   - Points qui passent de vide à plein au scroll
   - Blocs alternant gauche/droite avec fade + slide depuis leur côté
   - Contenu : Ouverture de compte → Dépôt → Capitalisation quotidienne → Disponibilité T+0
   - CTA final centré "Ouvrir mon compte"

4. **`SecurityBlock.tsx`** — Bouclier SVG stylisé avec effet parallaxe au mouvement de souris (via `onMouseMove` comme le `useTilt` existant, mais en translation légère). Texte centré "Votre sécurité est notre priorité absolue" + explication CACEIS/Crédit Agricole. Beaucoup d'espace blanc.

5. **`FaqAccordion.tsx`** — Accordéon Shadcn (`Accordion` existant) avec les 4 questions clés : frais, protection, retrait le dimanche, régulation ORIAS.

### Données par segment

Un objet `segmentData` avec pour chaque slug (pme, startups, holdings, crypto, freelances, fintechs, sci, particuliers) :
- `title`, `description`, `icon`, `yields` (repris des données existantes dans `SolutionsPage.tsx`)

### Routing

Ajouter dans `App.tsx` :
```
<Route path="/solutions/:segment" element={<SolutionDetailPage />} />
```

### Mise à jour de `SolutionsPage.tsx`

Les cartes de segments deviennent des liens vers `/solutions/[slug]`.

### Mise à jour de `LandingNav.tsx`

Les items du menu Solutions deviennent des liens vers les pages individuelles.

## Détails techniques

- **Parallaxe bouclier** : Hook custom `useParallax` — écoute `mousemove` sur le conteneur, applique `transform: translate(x, y)` proportionnel à la position souris (amplitude ~10px max).
- **Roadmap scroll animation** : `IntersectionObserver` par étape + CSS transitions. La ligne utilise `transform: scaleY()` avec `transform-origin: top`. Pas besoin de framer-motion pour ça, CSS suffit.
- **Tableau comparatif** : Réutilise `GlassCard` existant. La colonne Quercus a une `border-2 border-primary` et un `Badge` "Recommandé".
- **Responsive** : Roadmap passe en vertical simple (tout à gauche) sur mobile. Tableau en scroll horizontal sur mobile.

## Fichiers impactés

| Action | Fichier |
|--------|---------|
| Créer | `src/pages/SolutionDetailPage.tsx` |
| Créer | `src/components/solutions/SegmentHero.tsx` |
| Créer | `src/components/solutions/ComparisonTable.tsx` |
| Créer | `src/components/solutions/IntegrationRoadmap.tsx` |
| Créer | `src/components/solutions/SecurityBlock.tsx` |
| Créer | `src/components/solutions/FaqAccordion.tsx` |
| Créer | `src/hooks/useParallax.ts` |
| Modifier | `src/App.tsx` (ajouter route) |
| Modifier | `src/pages/SolutionsPage.tsx` (liens vers sous-pages) |
| Modifier | `src/components/landing/LandingNav.tsx` (liens menu) |

