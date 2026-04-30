// Help Center articles — English version
// Mirrors the FR file structure, same keys.
import type { HelpArticle } from "./helpArticles";

export const HELP_ARTICLES_EN: Record<string, HelpArticle> = {
  // ─── Open an account ───────────────────────────────────────────────
  "ouvrir-un-compte/creer-un-compte-pour-particulier": {
    title: "Open an individual account",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "March 12, 2026",
    readTime: "4 min",
    intro:
      "Opening a Quercus account as an individual is fully online and takes less than ten minutes. Here are the steps and the documents to prepare.",
    blocks: [
      { type: "h2", text: "Before you start" },
      { type: "p", text: "Have a valid ID document, a proof of address less than three months old and an IBAN in your name within the EEA." },
      { type: "h2", text: "Account opening steps" },
      {
        type: "ol",
        items: [
          "Enter your email address and create a password.",
          "Confirm your address via the link received by email.",
          "Activate two-factor authentication (2FA).",
          "Select \"Individual account\".",
          "Complete your personal and tax information.",
          "Upload your supporting documents (ID, address, source of funds).",
          "Electronically sign the account agreement.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Validation time",
        text: "Our compliance team reviews your file within 24 to 48 working hours. You receive an email at every status change.",
      },
      { type: "h2", text: "Once your account is validated" },
      { type: "p", text: "You can immediately make a first deposit by SEPA transfer from an account in your name and start investing in our money-market funds." },
    ],
  },
  "ouvrir-un-compte/pieces-d-identite-acceptees": {
    title: "Accepted ID documents",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "February 8, 2026",
    readTime: "2 min",
    intro:
      "Quercus accepts several types of official ID documents, provided they are valid and fully legible.",
    blocks: [
      { type: "h2", text: "Accepted documents" },
      {
        type: "ul",
        items: [
          "National ID card (front and back)",
          "Valid passport",
          "Residence permit for non-EU nationals",
          "European-format driving licence (front and back)",
        ],
      },
      { type: "h2", text: "Quality criteria" },
      {
        type: "ul",
        items: [
          "Document not expired",
          "Sharp photo, no glare or blur",
          "All corners visible",
          "No information masked",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Documents not accepted",
        text: "We cannot accept photocopies, black-and-white scans or expired ID documents, even by a few days.",
      },
    ],
  },
  "ouvrir-un-compte/justificatif-de-domicile": {
    title: "Proof of address",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "February 8, 2026",
    readTime: "2 min",
    intro:
      "The proof of address confirms your tax residency. It must be recent, in your name and issued by a recognised body.",
    blocks: [
      { type: "h2", text: "Accepted documents" },
      {
        type: "ul",
        items: [
          "Electricity, gas, water or internet bill less than 3 months old",
          "Tax notice or local tax for the current year",
          "Rent receipt issued by a real-estate agency",
          "Hosting certificate accompanied by the host's ID document",
        ],
      },
      { type: "h2", text: "Refused documents" },
      {
        type: "ul",
        items: [
          "Mobile phone bills",
          "Bank statements",
          "Documents in a spouse's name without proof of marriage or civil partnership",
        ],
      },
    ],
  },
  "ouvrir-un-compte/justificatif-d-origine-des-fonds-pour-les-particuliers": {
    title: "Source of funds for individuals",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "February 20, 2026",
    readTime: "3 min",
    intro:
      "In line with AML/CFT regulations, Quercus is required to verify the origin of deposited amounts. The type of supporting document depends on the nature of the funds.",
    blocks: [
      { type: "h2", text: "Salaries and employment income" },
      { type: "p", text: "Last three pay slips or last year's tax notice." },
      { type: "h2", text: "Accumulated savings" },
      { type: "p", text: "Statements from the source account showing the gradual build-up of savings." },
      { type: "h2", text: "Sale of an asset" },
      { type: "p", text: "Notarial deed of sale or notary's certificate stating the price and the beneficiary." },
      { type: "h2", text: "Donation or inheritance" },
      { type: "p", text: "Deed of donation or notarial certificate of succession." },
      {
        type: "callout",
        tone: "info",
        text: "For any deposit above €50,000, proof of source of funds is systematically requested.",
      },
    ],
  },
  "ouvrir-un-compte/creer-un-compte-pour-une-entreprise": {
    title: "Open a corporate account",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "April 1, 2026",
    readTime: "5 min",
    intro:
      "Opening a Quercus account for a legal entity is done online. The legal representative must hold the powers required to bind the company.",
    blocks: [
      { type: "h2", text: "Required documents" },
      {
        type: "ul",
        items: [
          "Kbis extract less than 3 months old",
          "Up-to-date and signed articles of association",
          "Legal representative's ID document",
          "ID document of each beneficial owner (≥ 25% of capital)",
          "Legal representative's proof of address",
          "Tax return of the last closed financial year",
        ],
      },
      { type: "h2", text: "Steps" },
      {
        type: "ol",
        items: [
          "Create an account with the legal representative's professional email",
          "Select \"Legal entity\"",
          "Enter SIREN, legal form and country of incorporation",
          "Declare beneficial owners",
          "Upload supporting documents",
          "Electronic signature of the agreement by the legal representative",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Validation",
        text: "For complex structures (holdings, trusts), our compliance team may request additional documents. Usual turnaround: 2 to 5 working days.",
      },
    ],
  },
  "ouvrir-un-compte/creer-un-compte-pour-une-association-francaise": {
    title: "Open an account for a French association",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "March 15, 2026",
    readTime: "4 min",
    intro:
      "French associations (loi 1901) can open a Quercus account to invest their treasury in our money-market funds.",
    blocks: [
      { type: "h2", text: "Required documents" },
      {
        type: "ul",
        items: [
          "Signed and up-to-date statutes",
          "Receipt of declaration to the prefecture",
          "Extract from the Official Journal of associations (JOAFE)",
          "Minutes of the last general meeting appointing the board",
          "ID document of the president and treasurer",
          "Decision authorising the account opening",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Public-utility associations benefit from a simplified procedure. State your RUP status when registering.",
      },
    ],
  },
  "ouvrir-un-compte/creer-un-compte-pour-une-entreprise-individuelle": {
    title: "Open an account for a sole proprietorship",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "March 10, 2026",
    readTime: "3 min",
    intro:
      "Micro-entrepreneurs, sole traders, EIRL, liberal professions: Quercus accepts every form of sole proprietorship registered in France.",
    blocks: [
      { type: "h2", text: "Required documents" },
      {
        type: "ul",
        items: [
          "K extract (sole proprietorships) or Kbis as applicable",
          "SIRENE situation notice",
          "Entrepreneur's ID document",
          "Personal proof of address",
          "Last tax notice for micro-entrepreneurs",
        ],
      },
      { type: "p", text: "The account is legally attached to the natural person of the entrepreneur, but is dedicated to the declared professional activity." },
    ],
  },
  "ouvrir-un-compte/creer-un-compte-pour-un-syndicat-des-coproprietaires-en-france": {
    title: "Open an account for a co-ownership union",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "March 5, 2026",
    readTime: "4 min",
    intro:
      "Co-ownership unions can place the ALUR works fund in interest-bearing vehicles such as Quercus Smart Cash.",
    blocks: [
      { type: "h2", text: "Required documents" },
      {
        type: "ul",
        items: [
          "Co-ownership regulations",
          "Minutes of the general meeting authorising the investment",
          "Valid mandate of the managing agent",
          "ID document of the agent's representative",
          "Proof of registration in the national co-ownership register",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "ALUR compliance",
        text: "Quercus Smart Cash is eligible for the ALUR works fund in line with article 14-2 of law no. 65-557.",
      },
    ],
  },
  "ouvrir-un-compte/justificatif-de-fonds-acceptes-pour-les-personnes-morales": {
    title: "Accepted source-of-funds proofs for legal entities",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "February 20, 2026",
    readTime: "3 min",
    intro:
      "For legal entities, the origin of funds must be traceable to the entity's declared activity or assets.",
    blocks: [
      { type: "h2", text: "Depending on the nature of the funds" },
      {
        type: "ul",
        items: [
          "Operating cash: latest financial statements, tax return, bank statements",
          "Fundraising: shareholders' agreement and contributions auditor's certificate",
          "Asset disposal: deed of sale and notary's or lawyer's certificate",
          "Grants: grant agreement and notification from the issuing body",
          "Shareholder loans: signed loan agreement",
        ],
      },
    ],
  },
  "ouvrir-un-compte/restrictions-geographiques": {
    title: "Geographical restrictions",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Open an account",
    updatedAt: "April 1, 2026",
    readTime: "3 min",
    intro:
      "Quercus is open to residents and businesses of the European Economic Area, subject to applicable regulations.",
    blocks: [
      { type: "h2", text: "Eligible countries" },
      { type: "p", text: "All EU member states, plus Norway, Iceland and Liechtenstein." },
      { type: "h2", text: "Non-eligible countries" },
      { type: "p", text: "Quercus does not currently accept clients tax-resident in the United States, the United Kingdom, Switzerland, or in any country listed by the FATF as under enhanced monitoring." },
      {
        type: "callout",
        tone: "warning",
        text: "Any change of tax residency must be reported to us without delay from your account settings.",
      },
    ],
  },

  // ─── Products ─────────────────────────────────────────────────────
  "produits/fiche-technique-des-fonds-monetaires-quercus": {
    title: "Quercus money-market funds factsheet",
    categorySlug: "produits",
    categoryTitle: "Quercus products",
    updatedAt: "April 1, 2026",
    readTime: "4 min",
    intro:
      "Quercus money-market funds invest exclusively in eurozone treasury bills, with a very short average duration.",
    blocks: [
      { type: "h2", text: "Characteristics" },
      {
        type: "table",
        head: ["Criterion", "Value"],
        rows: [
          ["Fund type", "Short-term VNAV money-market UCITS"],
          ["Reference currency", "EUR"],
          ["Benchmark", "Capitalised €STR"],
          ["Weighted average maturity (WAM)", "≤ 60 days"],
          ["Weighted average life (WAL)", "≤ 120 days"],
          ["Average rating", "AA / AAA"],
          ["Liquidity", "Daily (D+1)"],
        ],
      },
      { type: "h2", text: "Investment universe" },
      { type: "p", text: "The fund is composed exclusively of eurozone sovereign securities issued by states rated at least A by S&P." },
    ],
  },
  "produits/documentation-des-fonds-monetaires-quercus": {
    title: "Quercus money-market funds documentation",
    categorySlug: "produits",
    categoryTitle: "Quercus products",
    updatedAt: "April 1, 2026",
    readTime: "2 min",
    intro:
      "All regulatory documentation for our money-market funds is available for download from your client area.",
    blocks: [
      { type: "h2", text: "Available documents" },
      {
        type: "ul",
        items: [
          "Key Information Document (PRIIPS KID)",
          "Full fund prospectus",
          "Annual and semi-annual reports",
          "Monthly performance reporting",
          "Management company remuneration policy",
        ],
      },
      { type: "p", text: "All documents are updated in line with AMF requirements and downloadable from the \"Documentation\" tab of each product." },
    ],
  },
  "produits/fiche-technique-quercus-smart-cash": {
    title: "Quercus Smart Cash factsheet",
    categorySlug: "produits",
    categoryTitle: "Quercus products",
    updatedAt: "April 1, 2026",
    readTime: "3 min",
    intro:
      "Smart Cash is our short-term cash solution designed for corporate treasuries and individuals seeking a steady yield.",
    blocks: [
      {
        type: "table",
        head: ["Criterion", "Value"],
        rows: [
          ["Underlying", "Euro money-market funds + bank term deposits"],
          ["Yield target", "€STR + 5 to 15 bps"],
          ["Liquidity", "Daily (D+1)"],
          ["Minimum ticket", "€100"],
          ["Entry / exit fees", "0%"],
          ["Annual management fees", "0.12%"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Smart Cash is eligible for cash placement of SCI, SAS, SARL and associations with no duration constraint.",
      },
    ],
  },
  "produits/documentation-de-quercus-smart-cash": {
    title: "Quercus Smart Cash documentation",
    categorySlug: "produits",
    categoryTitle: "Quercus products",
    updatedAt: "April 1, 2026",
    readTime: "2 min",
    intro:
      "Find all contractual and reporting documents for Smart Cash in your client area.",
    blocks: [
      {
        type: "ul",
        items: [
          "Smart Cash specific terms",
          "PRIIPS KID",
          "Monthly reporting",
          "Net-of-fees performance history",
          "Best-execution policy",
        ],
      },
    ],
  },
  "produits/fiche-technique-quercus-cash-and-carry": {
    title: "Quercus Cash & Carry factsheet",
    categorySlug: "produits",
    categoryTitle: "Quercus products",
    updatedAt: "April 1, 2026",
    readTime: "4 min",
    intro:
      "Cash & Carry is a spot-futures arbitrage strategy on short rates that aims to capture a stable premium above the risk-free rate.",
    blocks: [
      {
        type: "table",
        head: ["Criterion", "Value"],
        rows: [
          ["Strategy", "Spot/futures arbitrage on money-market instruments"],
          ["Yield target", "€STR + 30 to 60 bps"],
          ["Target volatility", "< 0.5% annualised"],
          ["Liquidity", "Weekly (Tuesday)"],
          ["Minimum ticket", "€10,000"],
          ["Annual management fees", "0.30%"],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Cash & Carry yield depends on the spot-futures basis and may vary with market conditions.",
      },
    ],
  },
  "produits/documentation-de-quercus-cash-and-carry": {
    title: "Quercus Cash & Carry documentation",
    categorySlug: "produits",
    categoryTitle: "Quercus products",
    updatedAt: "April 1, 2026",
    readTime: "2 min",
    intro:
      "Detailed contractual documents and reporting for the Cash & Carry strategy.",
    blocks: [
      {
        type: "ul",
        items: [
          "Detailed strategy note",
          "PRIIPS KID",
          "Monthly reporting with performance breakdown",
          "History of captured bases",
          "Risk management policy",
        ],
      },
    ],
  },
  "produits/comprendre-les-frais-sur-quercus": {
    title: "Understanding fees on Quercus",
    categorySlug: "produits",
    categoryTitle: "Quercus products",
    updatedAt: "April 1, 2026",
    readTime: "3 min",
    intro:
      "Quercus uses simple and transparent pricing, with no hidden fees. Here are all the costs that may apply to your account.",
    blocks: [
      {
        type: "table",
        head: ["Fee", "Amount"],
        rows: [
          ["Account opening", "€0"],
          ["Account maintenance", "€0"],
          ["SEPA deposit", "€0"],
          ["Standard SEPA withdrawal", "€0"],
          ["Instant withdrawal", "0.10% (min. €1)"],
          ["Money-market funds management fees", "0.10% per year"],
          ["Smart Cash management fees", "0.12% per year"],
          ["Cash & Carry management fees", "0.30% per year"],
        ],
      },
      { type: "p", text: "Management fees are deducted directly from the net asset value and are already included in the displayed yield." },
    ],
  },

  // ─── Deposits and withdrawals ─────────────────────────────────────
  "depots-et-retraits/depot-depuis-un-compte-tiers": {
    title: "Deposit from a third-party account",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Deposits and withdrawals",
    updatedAt: "March 12, 2026",
    readTime: "3 min",
    intro:
      "For regulatory reasons (AML/CFT), Quercus does not accept deposits from an account that is not in the holder's name.",
    blocks: [
      { type: "h2", text: "General rule" },
      { type: "p", text: "The transfer-issuing account must be strictly identical to the Quercus account holder, whether individual or legal entity." },
      {
        type: "callout",
        tone: "warning",
        title: "If a transfer is received from a third party",
        text: "The funds are quarantined and returned to the sender within 5 working days. No investment is made.",
      },
      { type: "h2", text: "Special cases" },
      {
        type: "ul",
        items: [
          "Joint account: allowed if one co-holder is the Quercus account holder",
          "Indivision account: allowed with notarial proof",
          "Proxy: transfer refused, the holder must be the sender",
        ],
      },
    ],
  },
  "depots-et-retraits/effectuer-un-depot": {
    title: "Make a deposit",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Deposits and withdrawals",
    updatedAt: "March 12, 2026",
    readTime: "3 min",
    intro:
      "Deposits are made by SEPA transfer from your bank. The receiving IBAN and reference are unique to your account.",
    blocks: [
      { type: "h2", text: "Steps" },
      {
        type: "ol",
        items: [
          "Log in to your Quercus area",
          "Click \"Deposit\"",
          "Copy your Quercus IBAN and the reference to use",
          "Make the transfer from your bank pasting the reference",
          "The deposit is credited on receipt (1 to 2 working days in standard SEPA)",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "SEPA Instant",
        text: "If your bank supports it, SEPA Instant credits the deposit in less than 10 seconds.",
      },
    ],
  },
  "depots-et-retraits/virement-non-arrive": {
    title: "Transfer not received",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Deposits and withdrawals",
    updatedAt: "February 8, 2026",
    readTime: "3 min",
    intro:
      "The vast majority of transfers arrive within 48 working hours. Here is what to do if it doesn't.",
    blocks: [
      { type: "h2", text: "Initial checks" },
      {
        type: "ol",
        items: [
          "Confirm the transfer was issued from an account in your name",
          "Check the destination IBAN (starts with FR)",
          "Check the reference: it is mandatory to identify your deposit",
        ],
      },
      { type: "h2", text: "Beyond 3 working days" },
      { type: "p", text: "Ask your bank for a payment notice (MT103) and forward it to our support team via the contact form. We usually trace the transfer within 24 hours." },
    ],
  },
  "depots-et-retraits/comptes-ouverts-avant-septembre-2025": {
    title: "Accounts opened before September 2025",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Deposits and withdrawals",
    updatedAt: "October 1, 2025",
    readTime: "2 min",
    intro:
      "Accounts opened before September 2025 use a legacy IBAN. No action is required, but we recommend using the new IBAN.",
    blocks: [
      { type: "p", text: "Old IBANs remain active and continue to receive your transfers normally. The new IBAN, more performant, notably allows the use of SEPA Instant." },
      {
        type: "callout",
        tone: "info",
        text: "You'll find your new IBAN in the \"Deposit\" tab of your client area. Update it in your recurring transfers to benefit from the latest features.",
      },
    ],
  },
  "depots-et-retraits/effectuer-un-retrait-standard": {
    title: "Make a standard withdrawal",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Deposits and withdrawals",
    updatedAt: "March 12, 2026",
    readTime: "2 min",
    intro:
      "Standard withdrawals are free and arrive in your bank account within 1 working day.",
    blocks: [
      {
        type: "ol",
        items: [
          "Click \"Withdraw\" from your dashboard",
          "Enter the amount",
          "Select the destination bank account (pre-registered)",
          "Confirm with your 2FA code",
        ],
      },
      { type: "p", text: "The withdrawal leaves the next working day after net asset value calculation and arrives in your account within 24 hours." },
    ],
  },
  "depots-et-retraits/effectuer-un-retrait-instantane": {
    title: "Make an instant withdrawal",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Deposits and withdrawals",
    updatedAt: "March 12, 2026",
    readTime: "2 min",
    intro:
      "Instant withdrawal uses the SEPA Instant rail and lets you receive your funds in less than 10 seconds, 24/7.",
    blocks: [
      { type: "h2", text: "Conditions" },
      {
        type: "ul",
        items: [
          "Destination account compatible with SEPA Instant",
          "Single amount ≤ €100,000",
          "Fees: 0.10% of amount, minimum €1",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "If your bank does not support SEPA Instant, the withdrawal automatically falls back to standard SEPA at no charge.",
      },
    ],
  },
  "depots-et-retraits/conversion-de-devises": {
    title: "Currency conversion",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Deposits and withdrawals",
    updatedAt: "March 10, 2026",
    readTime: "2 min",
    intro:
      "Quercus operates exclusively in euros. Deposits in another currency are automatically converted at the interbank rate with a transparent spread.",
    blocks: [
      { type: "h2", text: "Accepted incoming currencies" },
      { type: "p", text: "USD, GBP, CHF, NOK, SEK, DKK." },
      { type: "h2", text: "FX pricing" },
      { type: "p", text: "Mid-market interbank rate + 0.15% spread. No fixed fee." },
    ],
  },

  // ─── Manage my account ────────────────────────────────────────────
  "gerer-mon-compte/applications-tierces": {
    title: "Third-party applications",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Manage my account",
    updatedAt: "March 20, 2026",
    readTime: "3 min",
    intro:
      "Quercus integrates with your accounting and banking tools via an open API compliant with PSD2 standards.",
    blocks: [
      { type: "h2", text: "Native integrations" },
      {
        type: "ul",
        items: [
          "Pennylane, Qonto, Sage, Cegid",
          "Notion, Slack, Zapier",
          "Custom webhooks",
        ],
      },
      { type: "p", text: "All connections are managed from the \"Integrations\" tab of your area. You retain control of permissions granted and can revoke access at any time." },
    ],
  },
  "gerer-mon-compte/acces-multi-utilisateurs": {
    title: "Multi-user access",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Manage my account",
    updatedAt: "March 20, 2026",
    readTime: "3 min",
    intro:
      "On legal-entity accounts, you can invite several collaborators with distinct roles.",
    blocks: [
      { type: "h2", text: "Available roles" },
      {
        type: "ul",
        items: [
          "Administrator — full management, user provisioning",
          "Treasurer — initiation of deposits and withdrawals",
          "Approver — approval of operations in Four-Eyes mode",
          "Read-only — consultation and statement export",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Each user has their own credentials and their own 2FA.",
      },
    ],
  },
  "gerer-mon-compte/ouvrir-plusieurs-comptes-quercus": {
    title: "Open several Quercus accounts",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Manage my account",
    updatedAt: "March 15, 2026",
    readTime: "2 min",
    intro:
      "You can manage several Quercus accounts from a single login (e.g. a personal account and a company account).",
    blocks: [
      { type: "p", text: "From the menu in the upper-left of your area, use the account switcher to instantly toggle between your different entities." },
      { type: "p", text: "To open an additional account, click \"Open an account\" in the switcher. You will be guided through the appropriate KYC journey." },
    ],
  },
  "gerer-mon-compte/mode-quatre-yeux": {
    title: "Four-Eyes mode",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Manage my account",
    updatedAt: "March 20, 2026",
    readTime: "3 min",
    intro:
      "Four-Eyes mode requires that an operation initiated by one user is validated by a second user before execution. Ideal for corporate accounts.",
    blocks: [
      { type: "h2", text: "Operations covered" },
      {
        type: "ul",
        items: [
          "Any withdrawal above a configurable threshold",
          "Any change of beneficiary IBAN",
          "Adding a new user",
          "Changes to the list of beneficial owners",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Four-Eyes mode is enabled in Settings → Security. It requires at least two administrators.",
      },
    ],
  },
  "gerer-mon-compte/modifier-mon-mot-de-passe": {
    title: "Change my password",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Manage my account",
    updatedAt: "February 8, 2026",
    readTime: "1 min",
    intro:
      "You can change your password at any time from your account settings.",
    blocks: [
      {
        type: "ol",
        items: [
          "Go to Settings → Security",
          "Click \"Change my password\"",
          "Enter your current password",
          "Choose a new password (12 characters minimum, digits and symbols)",
          "Confirm with your 2FA code",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "For your security, you will be signed out from all active sessions after the change.",
      },
    ],
  },
  "gerer-mon-compte/modifier-mon-email": {
    title: "Change my email",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Manage my account",
    updatedAt: "February 8, 2026",
    readTime: "2 min",
    intro:
      "Changing your email address requires a double confirmation to ensure the security of your account.",
    blocks: [
      {
        type: "ol",
        items: [
          "Settings → Profile → \"Change email\"",
          "Enter the new address",
          "Confirm via the link sent to the old address (valid 24h)",
          "Confirm via the link sent to the new address",
        ],
      },
      { type: "p", text: "The change becomes effective once both links are confirmed." },
    ],
  },
  "gerer-mon-compte/authentification-a-deux-facteurs": {
    title: "Two-factor authentication",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Manage my account",
    updatedAt: "March 20, 2026",
    readTime: "3 min",
    intro:
      "2FA is mandatory on Quercus. It protects your account even if your password is compromised.",
    blocks: [
      { type: "h2", text: "Supported methods" },
      {
        type: "ul",
        items: [
          "TOTP app (Google Authenticator, Authy, 1Password) — recommended",
          "FIDO2 / WebAuthn physical key (YubiKey, Titan)",
          "SMS code (backup method only)",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Keep your recovery codes in a safe place (password manager). They are essential if you lose your device.",
      },
    ],
  },

  // ─── Tax and accounting ───────────────────────────────────────────
  "fiscalite-et-comptabilite/fiscalite-pour-les-particuliers": {
    title: "Tax for individuals",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Tax and accounting",
    updatedAt: "April 1, 2026",
    readTime: "4 min",
    intro:
      "Income generated by Quercus money-market funds qualifies as investment income, subject by default to the French flat tax (PFU).",
    blocks: [
      { type: "h2", text: "Default regime: 30% flat tax" },
      { type: "p", text: "The PFU is composed of 12.8% income tax and 17.2% social contributions. Quercus performs the withholding at source upon withdrawal." },
      { type: "h2", text: "Option for the progressive scale" },
      { type: "p", text: "You may opt for taxation under the progressive income tax scale in your annual return if it is more favourable." },
      {
        type: "callout",
        tone: "info",
        text: "Quercus issues an annual Single Tax Form (IFU) downloadable from your client area.",
      },
    ],
  },
  "fiscalite-et-comptabilite/fiscalite-pour-les-personnes-morales": {
    title: "Tax for legal entities",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Tax and accounting",
    updatedAt: "April 1, 2026",
    readTime: "4 min",
    intro:
      "For a company subject to corporate tax (IS), unrealised gains on money-market funds are taxed each year under the fixed-income securities regime.",
    blocks: [
      { type: "h2", text: "Fair-value measurement" },
      { type: "p", text: "Eligible money-market UCITS are measured at their net asset value at year-end. The valuation gap is taxable income at the prevailing IS rate." },
      { type: "h2", text: "Reporting" },
      { type: "p", text: "Quercus provides a December 31 valuation statement exportable directly to your accounting tools (Pennylane, Sage, Cegid)." },
    ],
  },
  "fiscalite-et-comptabilite/imprime-fiscal-unique-ifu": {
    title: "Single Tax Form (IFU)",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Tax and accounting",
    updatedAt: "February 1, 2026",
    readTime: "2 min",
    intro:
      "The IFU summarises all investment income and capital gains made on your account during the past year.",
    blocks: [
      { type: "p", text: "It is made available each year before February 15, in Documents → Tax of your area." },
      { type: "p", text: "The IFU automatically pre-fills boxes 2DC, 2BH and 2CG of your tax return." },
    ],
  },
  "fiscalite-et-comptabilite/traitement-comptable-des-fonds-monetaires": {
    title: "Accounting treatment of money-market funds",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Tax and accounting",
    updatedAt: "April 1, 2026",
    readTime: "3 min",
    intro:
      "Quercus money-market funds are recorded in class 5 (marketable securities) or class 2 depending on the holding horizon.",
    blocks: [
      { type: "h2", text: "Recommended accounts" },
      {
        type: "ul",
        items: [
          "508 — Other marketable securities and similar receivables",
          "590 — Provision for impairment of marketable securities (if applicable)",
          "764 — Income from marketable securities",
        ],
      },
      { type: "p", text: "Our monthly accounting export is compatible with most ERP systems on the market." },
    ],
  },
  "fiscalite-et-comptabilite/releves-comptables-et-exports": {
    title: "Accounting statements and exports",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Tax and accounting",
    updatedAt: "March 20, 2026",
    readTime: "2 min",
    intro:
      "Your statements are generated automatically every month and accessible in PDF, CSV or via API.",
    blocks: [
      {
        type: "ul",
        items: [
          "Detailed monthly statement (PDF)",
          "Accounting export in FEC or CSV format",
          "Annual summary for the tax return",
          "API export on demand",
        ],
      },
    ],
  },

  // ─── About ────────────────────────────────────────────────────────
  "a-propos/notre-mission": {
    title: "Our mission",
    categorySlug: "a-propos",
    categoryTitle: "About Quercus",
    updatedAt: "January 1, 2026",
    readTime: "2 min",
    intro:
      "Quercus makes the treasury management tools used by institutions for decades available to individuals and businesses.",
    blocks: [
      { type: "p", text: "For years, growing your treasury beyond a basic savings account required prohibitive minimums or opaque contracts. We built a platform that removes those frictions." },
      { type: "p", text: "Our conviction: a cash investment must be safe, liquid and readable — and its yield must belong to its holder, not to an intermediary." },
    ],
  },
  "a-propos/nos-partenaires": {
    title: "Our partners",
    categorySlug: "a-propos",
    categoryTitle: "About Quercus",
    updatedAt: "April 1, 2026",
    readTime: "2 min",
    intro:
      "Quercus relies on an ecosystem of top-tier regulated partners for management, custody and execution.",
    blocks: [
      {
        type: "ul",
        items: [
          "TOBAM — AMF-approved asset manager, manages money-market funds",
          "Caceis Bank — depositary and custodian of assets",
          "Crédit Mutuel Arkéa — banking partner for cash account servicing",
          "Onfido — KYC identity verification partner",
        ],
      },
    ],
  },
  "a-propos/securite-de-vos-fonds": {
    title: "Safety of your funds",
    categorySlug: "a-propos",
    categoryTitle: "About Quercus",
    updatedAt: "April 1, 2026",
    readTime: "4 min",
    intro:
      "Your assets are strictly segregated from Quercus's accounts and held with an independent depositary.",
    blocks: [
      { type: "h2", text: "Asset segregation" },
      { type: "p", text: "Your money-market fund units are held in your own name with the depositary Caceis Bank. In the event of Quercus's failure, your assets do not form part of the insolvency estate." },
      { type: "h2", text: "Applicable guarantees" },
      {
        type: "ul",
        items: [
          "Deposit guarantee (FGDR): €100,000 on the cash account",
          "Securities guarantee: €70,000 on UCITS units in the event of depositary failure",
        ],
      },
      { type: "h2", text: "Technical security" },
      { type: "p", text: "End-to-end TLS 1.3 encryption, mandatory 2FA, annual security audit by an independent firm, ISO 27001 certification in progress." },
    ],
  },
  "a-propos/conditions-generales-d-utilisation": {
    title: "Terms and conditions",
    categorySlug: "a-propos",
    categoryTitle: "About Quercus",
    updatedAt: "April 1, 2026",
    readTime: "2 min",
    intro:
      "The terms and conditions govern the use of the Quercus platform and the related services.",
    blocks: [
      { type: "p", text: "The full T&Cs are available in the Legal notice section of the site, and as a PDF download from your client area." },
      { type: "p", text: "Any material change is notified to you by email at least 30 days before its entry into force." },
    ],
  },
  "a-propos/politique-de-confidentialite": {
    title: "Privacy policy",
    categorySlug: "a-propos",
    categoryTitle: "About Quercus",
    updatedAt: "April 1, 2026",
    readTime: "3 min",
    intro:
      "Quercus collects and processes your data in strict compliance with the GDPR and only for purposes related to the provision of its services.",
    blocks: [
      { type: "h2", text: "Data collected" },
      {
        type: "ul",
        items: [
          "Identity and contact details (regulatory KYC)",
          "Financial data (source of funds, transactions)",
          "Connection data (logs, IP, devices)",
        ],
      },
      { type: "h2", text: "Your rights" },
      { type: "p", text: "You have the right of access, rectification, opposition and portability. Contact our DPO via the contact form." },
    ],
  },
  "a-propos/mentions-legales": {
    title: "Legal notice",
    categorySlug: "a-propos",
    categoryTitle: "About Quercus",
    updatedAt: "April 1, 2026",
    readTime: "2 min",
    intro:
      "Legal and regulatory information about Quercus.",
    blocks: [
      { type: "p", text: "Quercus Capital — SAS with €250,000 share capital — Paris RCS 912 345 678. Registered office: 12 rue de la Paix, 75002 Paris." },
      { type: "p", text: "Quercus is registered with ORIAS (no. 22 003 456) as a Financial Investment Advisor (CIF), member of ANACOFI-CIF, an association approved by the AMF." },
      { type: "p", text: "Publication director: the President of Quercus Capital. Hosting: Vercel Inc., 340 S Lemon Ave, Walnut, CA 91789, USA." },
    ],
  },
};