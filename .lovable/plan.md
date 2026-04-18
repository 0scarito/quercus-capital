

# Quercus vs Spiko — Full Audit Implementation Plan

I'll inspect the current state to scope only what's missing, then deliver in focused phases.

## Discovery summary (from current code)

Already in place (no rework needed):
- Sticky nav with Products mega-menu (Velvet/TOBAM) + Solutions
- Hero + dual yield mention + dual CTAs (Ouvrir compte / RDV)
- Yield cards (Velvet / TOBAM) with link to dedicated pages
- Yield Calculator, LiveNumbers (AUM, intérêts, countdown)
- SecuritySection, PartnersSection (marquee), UseCases
- Dedicated pages: VelvetPage, TobamPage, SolutionsPage, LegalPage, PrivacyPage, CookiePage, PressPage
- Footer with legal mentions + RCS + ORIAS

## Gaps to fix (prioritised)

### Phase 1 — Navigation & Trust signals
1. **Announcement banner** above nav (dismissible, slim, e.g. "Quercus Capital — Plateforme désormais ouverte aux holdings et family offices").
2. **Resources dropdown** in nav: Centre d'aide, Blog, À propos, Presse, Contact.
3. **Solutions dropdown** preview (currently single link) — mini mega-menu with: Holdings, PME & Start-ups, Professions libérales, Particuliers, Institutionnels.
4. **Custodian trust badge** strip directly under Hero: "Fonds détenus par BNP Paribas & CACEIS · Audités par PwC · Régulés AMF" with small logos.

### Phase 2 — Hero & Live Yield refinement
5. Tighten hero sub-tagline to address *who/what/why now* more directly (keep current French tone).
6. Add **"as of [date]"** note + footnote on yield row ("Rendements nets de frais, payés par contrepartie bancaire").
7. Add a **3rd live stat** to LiveNumbers row (e.g. "Investisseurs actifs" or "Volume traité").

### Phase 3 — Product pages deep content
**VelvetPage additions:**
- TRS mechanism 3-step visual (Dépôt → Swap TRS BNP Paribas → Intérêts quotidiens)
- Collateral basket breakdown (100% US equities, sector pie: Communications/Financials/Tech…)
- Bank counterparty logo strip (BNP Paribas, SocGen, Goldman, JPM)
- Performance table vs €STR + peer funds
- AMF verification link + credit ratings block (Fitch AA- / Moody's A1 / S&P A+)
- FAQ (6–8 Q)

**TobamPage additions:**
- Cash & Carry explainer with worked example (BTC spot $109,042 / fut $109,920 → 0.8%/mo ≈ 10% ann.)
- CME premium chart (5Y, avg 8%, >3% during 76% of time) — SVG/Recharts static
- Backtest table (7.6% ann. vs 1.1% IG credit vs 2.1% cash)
- Security architecture diagram (CACEIS admin/custodian · PwC · TOBAM · brokers régulés)
- Share class table with all ISINs + minimums (P1 €10k / B1 €100k…)
- ESG / carbon offset block
- FAQ

### Phase 4 — Homepage segments & social proof
8. **Client segment cards** on landing (4–5 cards, one-line pain point each) linking to /solutions/[slug].
9. **Press / Trust strip**: TOBAM press credentials (FT "Europe's first Bitcoin mutual fund", Fonds Online) + institutional partners logo row (CACEIS, BNP Paribas, PwC, TOBAM, LFIS Capital).

### Phase 5 — Footer & legal
10. Expand footer into **4 link columns** (Produits / Cas d'usage / Ressources / Légal) + newsletter signup (stores in `newsletter_subscribers` table) + social links.
11. Add explicit **distributor disclaimer** + "Les fonds sont détenus par la banque dépositaire, jamais par Quercus Capital".
12. Link all legal docs: Prospectus Velvet, KID Velvet, Prospectus TOBAM, Informations réglementaires (placeholder PDFs OK for now).

## Technical notes
- All new sections use existing `GlassCard`, `ScrollReveal`, design tokens (Playfair italic, JetBrains Mono for figures, Beige Papier `#F5F3ED`, deep teal `#18454B`).
- Charts via existing Recharts dep.
- New table `newsletter_subscribers` (email, created_at, RLS: insert-only public, select service_role).
- No backend changes for product pages (static content sourced from PDFs already analysed).
- Risk-scale visual reused across both product cards & pages.

## Suggested order of delivery
Phase 1 → 2 → 4 (highest landing-page impact) → 3 (deep product pages) → 5 (footer polish).
Phases can ship independently. Each phase ≈ 1 message.

## Confirmation needed
Approve the full plan, or tell me which phase(s) to start with first. Default if you just say "go": I start with **Phase 1 + 2** in one batch (highest visible impact on landing).

