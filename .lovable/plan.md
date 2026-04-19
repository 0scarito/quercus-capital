
The user wants the **entire site** translated FR/EN. So far only nav, footer, hero, announcement banner, contact page have keys. Everything else is hardcoded French.

Also there's a console warning: `LanguageSwitcher` is wrapped by something (probably a tooltip or motion) passing a ref → fix by wrapping in `React.forwardRef`.

## Scope of remaining work

**Landing sections (hardcoded FR):**
- TrustBadgeStrip, DashboardPreview, YieldCards, YieldCalculator, LiveNumbers, PartnersSection, SecuritySection, UseCases, ClientSegmentsCards, PressStrip

**App / Auth flow:**
- SignIn, OpenAccount + 7 onboarding stages (Welcome, AccountType, Individual, Corporate, EmailVerification, 2FA, KYC)
- AppLayout, QuercusSidebar, AccountSwitcherPopover, NavLink, ProductCard, DepositModal, ProtectedRoute messages

**Authenticated pages:**
- Dashboard, Products, ProductsPage, Statements, Integrations, AccountSettings

**Public pages:**
- AboutPage, PressPage, LegalPage, PrivacyPage, CookiePage, SolutionsPage, SolutionDetailPage, VelvetPage, TobamPage, NotFound

**Solutions components:** SegmentHero, ComparisonTable, FaqAccordion, IntegrationRoadmap, SecurityBlock, segmentData.ts (data labels)

**Toast / validation messages** scattered across forms.

## Approach

Execute in 4 batches, each batch = expand JSON locales + replace hardcoded strings with `t()` / `<Trans>`:

**Batch 1 — Finish landing page**
All remaining landing components → `landing.json`. Result: full landing fully bilingual.

**Batch 2 — Auth + Onboarding**
SignIn, OpenAccount, all onboarding stages, toasts → `auth.json` + `onboarding.json`. Fix `LanguageSwitcher` ref warning via `forwardRef`.

**Batch 3 — Authenticated app**
Sidebar, AppLayout, Dashboard, Products, Statements, Integrations, AccountSettings, DepositModal, AccountSwitcher, ProductCard → `dashboard.json` + `nav.json`.

**Batch 4 — Public/legal/solutions pages**
About, Press, Legal, Privacy, Cookie, Solutions (+ subpages + components + segmentData), Velvet, Tobam, NotFound → `pages.json`.

After each batch you can verify; if anything looks off we adjust before moving on.

## Notes
- Keep British English (UK spelling: organisation, optimise, recognise, programme).
- Currency formatting stays € everywhere (regulated French entity).
- Dates via `i18n.language` → `toLocaleDateString('fr-FR' | 'en-GB')`.
- `segmentData.ts` will export keys instead of strings; components resolve via `t()`.
- Fix `forwardRef` on `LanguageSwitcher` to silence the React warning shown in console.

## Deliverable order
Batch 1 → Batch 2 → Batch 3 → Batch 4, all in this single follow-up turn (one big implementation pass). Final result: every visible string on every page and every flow is fully translated FR ⇄ EN with persistent toggle.
