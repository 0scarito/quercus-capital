
# Retirer "Portefeuille Conseillé" des produits + verrou 3 M€ dans la plateforme

## Site public

### 1. Retirer le Portefeuille Conseillé de la liste "Nos produits"
- **Menu déroulant** (`src/components/landing/LandingNav.tsx`) : retirer la 3ème entrée du dropdown "Nos produits" (garder seulement Velvet et TOBAM).
- **Tableau comparatif** (`src/pages/ProductsPage.tsx` via `src/data/liveYields.ts`) : retirer l'entrée `portefeuille-conseille` du tableau `LIVE_YIELDS` pour qu'elle disparaisse aussi de `/products` et de la home.
- **Footer** (`src/i18n/locales/fr/footer.json` + `en/footer.json`) : retirer la ligne "Portefeuille Conseillé" de la section produits.
- **Garder la page** `/products/portefeuille-conseille` accessible (route conservée dans `App.tsx`) — utile pour les liens depuis les CTA des pages produits, mais elle n'est plus listée publiquement.

### 2. Ajouter une section "Conseiller dédié" en bas de chaque page produit
Ajouter une nouvelle section juste avant le CTA final sur :
- `src/pages/VelvetPage.tsx`
- `src/pages/TobamPage.tsx`

**Contenu de la section :**
- Titre : *« Au-delà d'un certain encours, un conseiller dédié »*
- Texte : explique qu'à partir d'un certain niveau d'encours sur la plateforme, le client se voit attribuer un Conseiller en Gestion de Patrimoine dédié qui peut construire une allocation sur-mesure (Portefeuille Conseillé) intégrant Smart Cash, Cash & Carry, obligations, actions et alternatifs.
- Visuel : carte glassmorphism cohérente avec le reste de la page (icône `Users` ou `Compass`).
- CTA : bouton secondaire « Découvrir le Portefeuille Conseillé » → `/products/portefeuille-conseille` + bouton « Prendre rendez-vous » → `/contact`.

---

## Plateforme authentifiée (page "Nos produits" interne)

### 3. Verrou 3 M€ sur le Portefeuille Conseillé dans `src/pages/Products.tsx`

**Logique :**
- Calculer l'encours total = somme de `amount` sur toutes les `user_subscriptions` actives de l'utilisateur (toutes devises confondues — pour la v1, simple somme; on pourra raffiner plus tard).
- Définir une constante `ADVISED_PORTFOLIO_THRESHOLD = 3_000_000`.
- Le Portefeuille Conseillé n'est **pas** un produit dans la table `products` actuellement (la BDD contient seulement Quercus Euro, Quercus Dollar, Quercus Pound). Pas de migration BDD : on l'ajoute comme **carte virtuelle** dans l'UI uniquement, sans souscription via la BDD.

**UI :**
- Sous le tableau actuel des produits, ajouter une carte/section dédiée « Portefeuille Conseillé · Allocation sur-mesure ».
- **Si encours < 3 M€** : carte affichée mais **verrouillée** (visuel grisé, icône cadenas `Lock`), avec :
  - Titre : *Portefeuille Conseillé*
  - Sous-titre : « Allocation patrimoniale sur-mesure construite avec votre conseiller dédié »
  - Bandeau : *« Disponible à partir de 3 000 000 € d'encours sur votre compte »*
  - Barre de progression : encours actuel / 3 000 000 €
  - Bouton désactivé
- **Si encours ≥ 3 M€** : carte active, badge « Disponible », bouton « Prendre rendez-vous avec votre conseiller » qui redirige vers `/dashboard/conseiller`.

---

## Fichiers modifiés

1. `src/data/liveYields.ts` — retirer entrée `portefeuille-conseille`
2. `src/components/landing/LandingNav.tsx` — retirer entrée du dropdown produits
3. `src/i18n/locales/fr/footer.json` + `en/footer.json` — retirer entrée
4. `src/pages/VelvetPage.tsx` — ajouter section "Conseiller dédié"
5. `src/pages/TobamPage.tsx` — ajouter section "Conseiller dédié"
6. `src/pages/Products.tsx` — ajouter carte verrouillée Portefeuille Conseillé avec calcul d'encours et seuil 3 M€

Aucun changement de schéma BDD nécessaire.
