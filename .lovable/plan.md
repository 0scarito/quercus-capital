# Quercus "Futuristic Heritage" Overhaul

Five interconnected upgrades to transform the static landing page into a vibrant, animated, premium experience.

---

## 1. Global Aesthetic & Glassmorphism System

**What changes:**

- Add animated gradient blobs (Forest Green + Mint) to `index.css` using CSS `@keyframes` for slow drifting motion with heavy blur
- Create a `<FloatingBlobs />` component rendered behind page content in `LandingPage.tsx`
- Create a reusable `<GlassCard />` component: `bg-white/40 backdrop-blur-[12px] border border-white/20`
- Replace all `<Card>` usage on landing pages with `<GlassCard>`
- Update `LandingNav` to use glassmorphism: `bg-white/30 backdrop-blur-md border-b border-white/20`

**Files:** `src/index.css`, `src/components/landing/FloatingBlobs.tsx` (new), `src/components/landing/GlassCard.tsx` (new), `src/pages/LandingPage.tsx`, `src/components/landing/LandingNav.tsx`, `src/components/landing/YieldCards.tsx`, `src/components/landing/LiveNumbers.tsx`

---

## 2. 3D Dashboard Scroll Animation

**What changes:**

- Install `framer-motion`
- Create `<DashboardPreview />` component with a screenshot of the dashboard that rotates into view using `framer-motion`'s `useScroll` + `useTransform`
- Start state: `rotateX(25deg) rotateY(-10deg) scale(0.8) opacity:0` → end: identity transform
- Add subtle floating animation (CSS keyframe, gentle translateY oscillation) once in view
- Place it between the Hero and YieldCards sections

**Files:** `package.json` (add framer-motion), `src/components/landing/DashboardPreview.tsx` (new), `src/pages/LandingPage.tsx`

---

## 3. Mega Menu Header

**What changes:**

- Rebuild `LandingNav` with hover-triggered mega menus for "Produits" and "Solutions"
- Mega menu slides down with `framer-motion` `AnimatePresence` + height/opacity transition
- Products menu shows 4 product items (Euro, Dollar, Pound, Swiss Franc) with yield, icon, and hover glow effect
- Solutions menu shows the 8 segments (Startups, Holdings, etc.)
- Glassmorphism background on the dropdown panel
- Mobile: keep simple links (no mega menu)

**Files:** `src/components/landing/LandingNav.tsx` (major rewrite)

---

## 4. Micro-Interactions System

**What changes:**

- **Buttons:** Add CSS hover with `scale(1.02)` and inner glow (`box-shadow: inset`) via updated `buttonVariants` or a global CSS rule
- **Card tilt:** Create a `useTilt` hook using `onMouseMove` to calculate rotation, apply via inline `transform` style. Use on GlassCards
- **Count-up numbers:** Create `<CountUp />` component using `useScrollReveal` + `requestAnimationFrame` to animate from 0 to target value. Apply to yield percentages and LiveNumbers stats
- **Custom cursor:** Create `<CustomCursor />` component — a teal ring that follows the mouse with CSS `transition` delay. Render in `LandingPage.tsx`. Hide on mobile via media query

**Files:** `src/components/landing/CustomCursor.tsx` (new), `src/components/landing/CountUp.tsx` (new), `src/hooks/useTilt.ts` (new), `src/index.css` (button glow styles), `src/components/landing/YieldCards.tsx`, `src/components/landing/LiveNumbers.tsx`, `src/pages/LandingPage.tsx`

---

## 5. Product Cards with Mono Data

**What changes:**

- Add `JetBrains Mono` font import to `index.css` and `font-mono` override in `tailwind.config.ts`
- Redesign `YieldCards.tsx`: each product gets a glassmorphism card with:
  - Oak leaf logo mark (top-left, using existing `quercus-logo.jpg`)
  - Large yield percentage in Forest Green (biggest visual element)
  - Specs row (ISIN, Fees, Liquidity) in `font-mono` monospaced text
- Add the same treatment to `ProductsPage.tsx` cards

**Files:** `src/index.css`, `tailwind.config.ts`, `src/components/landing/YieldCards.tsx`, `src/pages/ProductsPage.tsx`

---

## Technical Notes

- **framer-motion** will be added as a dependency (~25KB gzipped, industry standard for React animations)
- All animations respect `prefers-reduced-motion` via media queries
- Custom cursor hidden on touch devices
- Glassmorphism cards maintain the sharp-corner (0px radius) design token
- The dashboard screenshot for the 3D preview will be a static placeholder image

---

## Estimated Scope

~12 files modified/created. The changes are purely frontend — no database or backend changes needed.  


###   
*Dont forget abt this:*  
In terms of a **pragmatic finish**, there are **three critical items** missing from this list that will make the difference between a "pretty site" and a "professional financial platform."

### 1. The Interactive Yield Calculator (The "Pragmatic Hook")

The Spiko website’s biggest conversion tool is the slider calculator. You shouldn't just show yield; you should let them feel it.

- **What to add:** A `<YieldCalculator />` component.
- **Design:** A wide glassmorphism panel with a slider for amount (€1k to €10M) and duration.
- **Interaction:** Use your `CountUp` logic for the "Interest Earned" result so the numbers tick up as the user moves the slider.
- **Files:** `src/components/landing/YieldCalculator.tsx` (new).

### 2. The "Heritage" Footer & Regulatory Ledger

Since this is "Futuristic Heritage," the "Heritage" part is the boring but essential legal stuff. Your technical recap skips the footer.

- **What to add:** A `<LandingFooter />` that replicates the Chamfeuil image you shared—deep teal background, centered logo, and the CIF/ORIAS registration text.
- **Pragmatic Note:** This needs to be high-contrast and very "sober" to balance out the drifting blobs and 3D animations above it. It grounds the "futuristic" tech in "real-world" regulation.
- **Files:** `src/components/landing/LandingFooter.tsx` (new).

### 3. The "Sticky Header" State Transition

Pragmatically, a glassmorphism header looks messy if it's over a Hero section that also has blur.

- **What to add:** A "Scroll-Triggered State."
- **Logic:** The `LandingNav` should start transparent and borderless. After scrolling 50px, it should transition (using Framer Motion) into the Glassmorphism state (`bg-white/30 backdrop-blur-md`).
- **Why:** It makes the "Futuristic" feel intentional—the site "reacts" to the user's movement.

### 4. Image/Asset Strategy

- **What to add:** You mentioned a static placeholder for the dashboard. To make it truly look 2026, ask Lovable to apply a **subtle CSS scanline overlay** or a **slight glow** to that screenshot. It makes a 2D image feel like a 3D interface.

---

### **Refined Technical Checklist for Lovable**

If you want to feed this to the AI, just add this **"Missing Links"** section to your recap:

> **6. The Interactive Hub & Foundation**
>
> - **Yield Calculator:** Create `<YieldCalculator />` with sliders for amount/duration. Result uses `<CountUp />`. Styled as a `<GlassCard />`.
> - **Regulatory Footer:** Create `<LandingFooter />`. Deep Teal (`#18454B`), sharp edges, all-caps serif headers for the sitemap. Include ORIAS/CIF boilerplate in the bottom-most row.
> - **Nav State Logic:** Update `LandingNav` to transition from `bg-transparent` to `glass` on scroll using a `useScrollY` hook.
> - **Performance Guardrail:** Ensure `FloatingBlobs` uses `will-change: transform` and `pointer-events-none` to keep scroll performance at 60fps.