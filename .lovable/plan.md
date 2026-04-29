
# Refonte du début de la page TOBAM Crypto Liquidity

## 1. Hero — réécriture complète

Fichier : `src/pages/TobamPage.tsx` (section `Hero`)

Nouveau contenu :
- Titre principal (Playfair italique) : *« Captez des rendements élevés sur les marchés crypto »*
- Ligne 2 : *« sans <span class="badge-aucune">AUCUNE</span> exposition au prix des crypto-actifs. »*
  - Le mot **AUCUNE** est rendu dans une **pastille verte à coins arrondis** (badge inline) en JetBrains Mono, fond `hsl(var(--success))`, texte clair.
- CTA principal juste sous le titre : bouton **« Commencer à investir »** → `/open-account` (style `btn-glow` cohérent avec le site).
- Suppression du sous-paragraphe muted actuel (remplacé par la ligne 2 ci-dessus).
- Conserver le badge `FIA · Fonds Professionnel Spécialisé` au-dessus du titre.

## 2. Cartes "Key Metrics" — restructuration

4 cartes (au lieu de 4 actuelles, recomposées) :

1. **Rendement cible (EUR & USD dans la même carte)**
   - Deux mini-blocs côte à côte dans la carte : `EUR ~7–8 % p.a.` / `USD ~9–10 % p.a.` (chiffres conservés du backtest existant; on garde aussi la valeur EUR existante et on ajoute USD).
2. **Liquidité quotidienne** — sous-texte : *« Retrait en 24h (règlement D+1) »*
3. **0 % Exposition crypto** — sous-texte : *« Position entièrement couverte »*
4. **Niveau de risque 2/7** — utilise `RiskScale` en version compacte, libellé *« SRRI / SRI »* + petit `*` cliquable qui scrolle vers la section Risque/Architecture plus bas (id `#risk-detail`).

## 3. Section "Qu'est-ce que le Cash & Carry ?" — refonte 2 colonnes

Remplacement de la grille 3-cartes actuelle par un layout **2 colonnes** :

### Colonne de gauche (texte pédagogique)
- Titre serif italique : *« L'art de l'arbitrage : générer du rendement sans subir la volatilité. »*
- Texte de corps complet fourni par l'utilisateur (Cash & Carry, Long Spot, Short Future, Contango, conclusion sur la performance décorrélée).
- Mises en valeur : les 3 sous-points (Achat / Vente / Profit) dans des sous-titres compacts en italique.
- Petit badge JetBrains Mono : `NON-DIRECTIONAL` (fond translucide, bordure fine teal).

### Colonne de droite — nouveau composant `CashAndCarryDiagram`

Création de `src/components/landing/CashAndCarryDiagram.tsx` :

```text
 ┌──────────────────┐                ┌──────────────────┐
 │  Achat Spot      │                │  Vente Future    │
 │  ETF NASDAQ ↑    │ ═══ Bridge ═══ │  CME ↓           │
 └────────┬─────────┘                └────────┬─────────┘
          │                                   │
          └──────────► Rendement Sécurisé ◄───┘
                  (Glassmorphism · halo vert)
```

- Deux barres verticales parallèles (Spot / Future), trait fin 0.5px en `#18454B`.
- **Pont central lumineux** (gradient teal → success) qui s'élargit au hover et révèle un tooltip `Spread +8.0 %`.
- Bloc central glassmorphism « Rendement Sécurisé » avec halo subtil.
- Icônes minimalistes Lucide : `TrendingUp` (spot) / `TrendingDown` (future) / `Shield` (centre).
- Fond subtil avec **motif de grille mathématique** (CSS `background-image` linéaire répété, opacité ~0.04) pour l'aspect algorithmique.
- Petite **balance** (icône `Scale` Lucide, trait fin) sous le badge "Non-directional" pour symboliser l'équilibre.
- Petit **bouclier** (`Shield`) en filigrane derrière le texte « Zéro exposition au prix » avec un effet `drop-shadow` glow vert.

## 4. Animation "Convergence" — nouveau composant `BasisConvergenceChart`

Création de `src/components/landing/BasisConvergenceChart.tsx`, intégré dans la section "Le basis trade en chiffres" (qui sera fusionnée avec le bloc Cash & Carry juste en dessous, voir §5).

- SVG animé : deux courbes (Spot en bas / Future en haut) qui partent écartées à gauche et **convergent vers un point unique à droite** (l'expiration).
- L'aire entre les deux courbes est remplie d'un **dégradé vert vibrant** (`hsl(var(--success))` → transparent) symbolisant le profit accumulé.
- Animation déclenchée au scroll via `IntersectionObserver` (pas de lib supplémentaire) : `stroke-dasharray` + `stroke-dashoffset` qui se résorbent.
- Axes minimalistes, marqueur "Échéance" à droite, libellés `T0` / `T+1M`.

## 5. Section "Le basis trade en chiffres" — reworked

Conservée mais retravaillée :
- Le bloc **exemple chiffré à 1 mois** (BTC spot vs futures, +$878, ≈ 10 %) est maintenu mais redesigné avec une mise en page plus aérée (colonnes alignées, libellés en JetBrains Mono).
- Le composant `CMEPremiumChart` actuel est **remplacé** par le nouveau `BasisConvergenceChart` côté droit (ou placé sous l'exemple — layout vertical sur mobile).
- On garde la phrase clé : *« Moyenne sur 5 ans : ~8 % p.a. — la prime est restée au-dessus de 3 % pendant 76 % du temps. »*

## 6. Suppression de la section "Pourquoi les crypto-futures ?"

Supprimer entièrement la section actuelle (lignes 189–213) avec les 4 cartes (`~8%`, `76%`, `6×`, `$16 Mds`). Les chiffres pertinents sont déjà repris dans la section "basis trade en chiffres".

## Détails techniques

**Fichiers modifiés :**
- `src/pages/TobamPage.tsx` — hero, key metrics, Cash & Carry section, suppression "Pourquoi les crypto-futures", intégration nouveaux composants
- `src/components/landing/CashAndCarryDiagram.tsx` *(nouveau)* — diagramme 2 piliers + pont
- `src/components/landing/BasisConvergenceChart.tsx` *(nouveau)* — courbes de convergence animées au scroll
- Petit ajout CSS pour le motif de grille mathématique (style inline ou utilitaire Tailwind dans le composant)

**Aucune nouvelle dépendance** — tout en SVG natif + Tailwind + design tokens existants (`--primary`, `--success`, `--accent`, `--border`).

**Cohérence design :**
- Coins droits (`--radius: 0px`) sauf pour la pastille AUCUNE (coins arrondis explicitement)
- Palette : `#18454B` (primary teal) + `success` pour les éléments verts + or subtil sur les accents (badge AUCUNE peut utiliser un vert plus vibrant pour ressortir)
- Typographie : Playfair italique pour titres, JetBrains Mono pour les valeurs et badges techniques, Inter pour le corps
