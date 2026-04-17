

Plan to address 4 issues:

## 1. Scroll to top on route change

Add a `ScrollToTop` component in `src/components/ScrollToTop.tsx` that listens to `useLocation()` and calls `window.scrollTo(0, 0)` on pathname change. Mount it inside `<BrowserRouter>` in `src/App.tsx`, just above `<Routes>`.

## 2. Remove top whitespace on solution pages + replace nav header with segment pill bar

Currently `SolutionDetailPage.tsx` has `pt-16` (for fixed nav) and `SegmentHero` uses `py-28 md:py-40` — way too much top padding.

Approach:
- Reduce hero top padding to `pt-8 md:pt-12` (keep bottom padding for breathing room before next section).
- The pill segment selector already exists inside `SegmentHero`. Per user request, on solution pages we replace the standard "Produits / Solutions" links in the top nav with the **full row of segment pills** (PME, Startups, Holdings, Crypto, Freelances, PME, Fintechs, SCI, Particuliers), where the current segment stays highlighted in green.
- Implementation: add an optional `variant` prop to `LandingNav` (e.g. `variant="solutions"` with `currentSlug`). When set, render the segment pills instead of the Produits/Solutions links. Pass it from `SolutionDetailPage`.
- Remove the duplicate pill row from `SegmentHero` (since it now lives in the nav).

## 3. Logo positioning + sizing in `LandingNav`

Currently `LandingNav` uses `max-w-6xl mx-auto` which centers everything with margin. To push Quercus further left and the auth buttons further right:
- Change container to full width with `px-6 md:px-10` (no `max-w-6xl mx-auto`).
- Increase logo: `h-8` → `h-11`, brand text `text-lg` → `text-xl`.
- Layout stays `justify-between` so logo hugs left edge and CTAs hug right edge.

## 4. Files impacted

| Action | File |
|--------|------|
| Create | `src/components/ScrollToTop.tsx` |
| Modify | `src/App.tsx` (mount ScrollToTop) |
| Modify | `src/components/landing/LandingNav.tsx` (variant prop, segment pills, wider container, larger logo) |
| Modify | `src/pages/SolutionDetailPage.tsx` (pass variant + currentSlug, reduce top padding) |
| Modify | `src/components/solutions/SegmentHero.tsx` (remove duplicate pill selector, reduce top padding) |

