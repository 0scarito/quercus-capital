// Help Center articles — static content
// Keyed by `${categorySlug}/${articleSlug}`

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone?: "info" | "warning"; title?: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export type HelpArticle = {
  title: string;
  categorySlug: string;
  categoryTitle: string;
  updatedAt: string; // FR formatted
  readTime: string; // ex. "3 min"
  intro: string;
  blocks: ArticleBlock[];
};

export type ArticleRef = { slug: string; title: string };

// ───────────────────────────────────────────────────────────────────────
// Articles
// ───────────────────────────────────────────────────────────────────────

export const HELP_ARTICLES: Record<string, HelpArticle> = {
  // ─── Ouvrir un compte ────────────────────────────────────────────────
  "ouvrir-un-compte/creer-un-compte-pour-particulier": {
    title: "Créer un compte pour particulier",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "12 mars 2026",
    readTime: "4 min",
    intro:
      "L'ouverture d'un compte Quercus pour un particulier se fait entièrement en ligne, en moins de dix minutes. Voici les étapes à suivre et les pièces à préparer.",
    blocks: [
      { type: "h2", text: "Avant de commencer" },
      { type: "p", text: "Munissez-vous d'une pièce d'identité en cours de validité, d'un justificatif de domicile de moins de trois mois et d'un IBAN à votre nom au sein de l'EEE." },
      { type: "h2", text: "Étapes d'ouverture" },
      {
        type: "ol",
        items: [
          "Renseignez votre adresse email et créez un mot de passe.",
          "Validez votre adresse via le lien reçu par email.",
          "Activez l'authentification à deux facteurs (2FA).",
          "Sélectionnez « Compte particulier ».",
          "Complétez vos informations personnelles et fiscales.",
          "Téléchargez vos justificatifs (identité, domicile, origine des fonds).",
          "Signez électroniquement la convention de compte.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Délai de validation",
        text: "Notre équipe conformité examine votre dossier sous 24 à 48 heures ouvrées. Vous recevez un email à chaque changement de statut.",
      },
      { type: "h2", text: "Une fois votre compte validé" },
      { type: "p", text: "Vous pouvez immédiatement effectuer un premier dépôt par virement SEPA depuis un compte ouvert à votre nom et commencer à investir dans nos fonds monétaires." },
    ],
  },
  "ouvrir-un-compte/pieces-d-identite-acceptees": {
    title: "Pièces d'identité acceptées",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "8 février 2026",
    readTime: "2 min",
    intro:
      "Quercus accepte plusieurs types de pièces d'identité officielles, à condition qu'elles soient en cours de validité et lisibles dans leur intégralité.",
    blocks: [
      { type: "h2", text: "Pièces acceptées" },
      {
        type: "ul",
        items: [
          "Carte nationale d'identité (recto et verso)",
          "Passeport en cours de validité",
          "Titre de séjour pour les ressortissants hors UE",
          "Permis de conduire au format européen (recto et verso)",
        ],
      },
      { type: "h2", text: "Critères de qualité" },
      {
        type: "ul",
        items: [
          "Document non expiré",
          "Photo nette, sans reflet ni flou",
          "Tous les coins visibles",
          "Aucune information masquée",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Documents non acceptés",
        text: "Nous ne pouvons pas accepter de photocopies, de scans en noir et blanc ou de pièces d'identité périmées, même de quelques jours.",
      },
    ],
  },
  "ouvrir-un-compte/justificatif-de-domicile": {
    title: "Justificatif de domicile",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "8 février 2026",
    readTime: "2 min",
    intro:
      "Le justificatif de domicile permet de confirmer votre adresse fiscale. Il doit être récent, à votre nom et émis par un organisme reconnu.",
    blocks: [
      { type: "h2", text: "Documents acceptés" },
      {
        type: "ul",
        items: [
          "Facture d'électricité, gaz, eau ou internet de moins de 3 mois",
          "Avis d'imposition ou de taxe d'habitation de l'année en cours",
          "Quittance de loyer émise par une agence immobilière",
          "Attestation d'hébergement accompagnée de la pièce d'identité de l'hébergeant",
        ],
      },
      { type: "h2", text: "Documents refusés" },
      {
        type: "ul",
        items: [
          "Factures de téléphonie mobile",
          "Relevés bancaires",
          "Documents au nom du conjoint sans justificatif de mariage ou PACS",
        ],
      },
    ],
  },
  "ouvrir-un-compte/justificatif-d-origine-des-fonds-pour-les-particuliers": {
    title: "Justificatif d'origine des fonds pour les particuliers",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "20 février 2026",
    readTime: "3 min",
    intro:
      "Conformément à la réglementation LCB-FT, Quercus est tenu de vérifier l'origine des sommes déposées. Le type de justificatif dépend de la nature des fonds.",
    blocks: [
      { type: "h2", text: "Salaires et revenus du travail" },
      { type: "p", text: "Trois derniers bulletins de salaire ou avis d'imposition de l'année écoulée." },
      { type: "h2", text: "Épargne accumulée" },
      { type: "p", text: "Relevés du compte source montrant la constitution progressive de l'épargne." },
      { type: "h2", text: "Vente d'un bien" },
      { type: "p", text: "Acte notarié de vente ou attestation du notaire mentionnant le prix et le bénéficiaire." },
      { type: "h2", text: "Donation ou succession" },
      { type: "p", text: "Acte de donation ou attestation notariale de succession." },
      {
        type: "callout",
        tone: "info",
        text: "Pour tout dépôt supérieur à 50 000 €, un justificatif d'origine des fonds est systématiquement demandé.",
      },
    ],
  },
  "ouvrir-un-compte/creer-un-compte-pour-une-entreprise": {
    title: "Créer un compte pour une entreprise",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "1er avril 2026",
    readTime: "5 min",
    intro:
      "L'ouverture d'un compte Quercus pour une personne morale se fait en ligne. Le représentant légal doit disposer des pouvoirs nécessaires pour engager la société.",
    blocks: [
      { type: "h2", text: "Documents requis" },
      {
        type: "ul",
        items: [
          "Extrait Kbis de moins de 3 mois",
          "Statuts à jour et signés",
          "Pièce d'identité du représentant légal",
          "Pièce d'identité de chaque bénéficiaire effectif (≥ 25 % du capital)",
          "Justificatif de domicile du représentant légal",
          "Liasse fiscale du dernier exercice clos",
        ],
      },
      { type: "h2", text: "Étapes" },
      {
        type: "ol",
        items: [
          "Créer un compte avec l'email professionnel du représentant légal",
          "Sélectionner « Personne morale »",
          "Renseigner SIREN, forme juridique et pays d'immatriculation",
          "Déclarer les bénéficiaires effectifs",
          "Téléverser les pièces justificatives",
          "Signature électronique de la convention par le représentant légal",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Validation",
        text: "Pour les structures complexes (holdings, fiducies), notre équipe conformité peut demander des pièces complémentaires. Délai habituel : 2 à 5 jours ouvrés.",
      },
    ],
  },
  "ouvrir-un-compte/creer-un-compte-pour-une-association-francaise": {
    title: "Créer un compte pour une association française",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "15 mars 2026",
    readTime: "4 min",
    intro:
      "Les associations loi 1901 peuvent ouvrir un compte Quercus pour placer leur trésorerie dans nos fonds monétaires.",
    blocks: [
      { type: "h2", text: "Documents requis" },
      {
        type: "ul",
        items: [
          "Statuts signés et à jour",
          "Récépissé de déclaration en préfecture",
          "Extrait du Journal officiel des associations (JOAFE)",
          "Procès-verbal de la dernière assemblée désignant le bureau",
          "Pièce d'identité du président et du trésorier",
          "Délibération autorisant l'ouverture du compte",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Les associations reconnues d'utilité publique bénéficient d'une procédure simplifiée. Indiquez votre statut RUP lors de l'inscription.",
      },
    ],
  },
  "ouvrir-un-compte/creer-un-compte-pour-une-entreprise-individuelle": {
    title: "Créer un compte pour une entreprise individuelle",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "10 mars 2026",
    readTime: "3 min",
    intro:
      "Micro-entrepreneurs, EI, EIRL, professions libérales : Quercus accepte toutes les formes d'entreprise individuelle immatriculées en France.",
    blocks: [
      { type: "h2", text: "Documents requis" },
      {
        type: "ul",
        items: [
          "Extrait K (entreprises individuelles) ou Kbis selon le cas",
          "Avis de situation au répertoire SIRENE",
          "Pièce d'identité de l'entrepreneur",
          "Justificatif de domicile personnel",
          "Dernier avis d'imposition pour les micro-entrepreneurs",
        ],
      },
      { type: "p", text: "Le compte est juridiquement rattaché à la personne physique de l'entrepreneur, mais il est dédié à l'activité professionnelle déclarée." },
    ],
  },
  "ouvrir-un-compte/creer-un-compte-pour-un-syndicat-des-coproprietaires-en-france": {
    title: "Créer un compte pour un syndicat des copropriétaires",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "5 mars 2026",
    readTime: "4 min",
    intro:
      "Les syndicats de copropriétaires peuvent placer le fonds de travaux ALUR sur des supports rémunérés tels que Quercus Smart Cash.",
    blocks: [
      { type: "h2", text: "Documents requis" },
      {
        type: "ul",
        items: [
          "Règlement de copropriété",
          "Procès-verbal de l'assemblée générale autorisant le placement",
          "Mandat du syndic en cours de validité",
          "Pièce d'identité du représentant du syndic",
          "Justificatif d'immatriculation au registre national des copropriétés",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Conformité ALUR",
        text: "Quercus Smart Cash est éligible au placement du fonds de travaux conformément à la loi ALUR (article 14-2 de la loi n° 65-557).",
      },
    ],
  },
  "ouvrir-un-compte/justificatif-de-fonds-acceptes-pour-les-personnes-morales": {
    title: "Justificatifs de fonds acceptés pour les personnes morales",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "20 février 2026",
    readTime: "3 min",
    intro:
      "Pour les personnes morales, l'origine des fonds doit pouvoir être rattachée à l'activité ou au patrimoine déclaré de la structure.",
    blocks: [
      { type: "h2", text: "Selon la nature des fonds" },
      {
        type: "ul",
        items: [
          "Trésorerie d'exploitation : derniers bilans, liasse fiscale, relevés bancaires",
          "Levée de fonds : pacte d'actionnaires et attestation du commissaire aux apports",
          "Cession d'actifs : acte de cession et attestation du notaire ou de l'avocat",
          "Subventions : convention de subvention et notification de l'organisme",
          "Apports en compte courant : convention d'apport signée",
        ],
      },
    ],
  },
  "ouvrir-un-compte/restrictions-geographiques": {
    title: "Restrictions géographiques",
    categorySlug: "ouvrir-un-compte",
    categoryTitle: "Ouvrir un compte",
    updatedAt: "1er avril 2026",
    readTime: "3 min",
    intro:
      "Quercus est ouvert aux résidents et entreprises de l'Espace économique européen, sous réserve de la réglementation applicable.",
    blocks: [
      { type: "h2", text: "Pays éligibles" },
      { type: "p", text: "L'ensemble des États membres de l'Union européenne, ainsi que la Norvège, l'Islande et le Liechtenstein." },
      { type: "h2", text: "Pays non éligibles" },
      { type: "p", text: "Quercus n'accepte pas, à ce jour, de clients résidents fiscaux des États-Unis, du Royaume-Uni, de Suisse, ou de pays figurant sur la liste GAFI des juridictions sous surveillance renforcée." },
      {
        type: "callout",
        tone: "warning",
        text: "Tout changement de résidence fiscale doit nous être signalé sans délai depuis vos paramètres de compte.",
      },
    ],
  },

  // ─── Produits ────────────────────────────────────────────────────────
  "produits/fiche-technique-des-fonds-monetaires-quercus": {
    title: "Fiche technique des fonds monétaires Quercus",
    categorySlug: "produits",
    categoryTitle: "Les produits Quercus",
    updatedAt: "1er avril 2026",
    readTime: "4 min",
    intro:
      "Les fonds monétaires Quercus investissent exclusivement dans des bons du Trésor de la zone euro, avec une duration moyenne très courte.",
    blocks: [
      { type: "h2", text: "Caractéristiques" },
      {
        type: "table",
        head: ["Critère", "Valeur"],
        rows: [
          ["Type de fonds", "OPCVM monétaire VNAV court terme"],
          ["Devise de référence", "EUR"],
          ["Indice de référence", "€STR capitalisé"],
          ["Maturité résiduelle moyenne (WAM)", "≤ 60 jours"],
          ["Maturité moyenne pondérée (WAL)", "≤ 120 jours"],
          ["Notation moyenne", "AA / AAA"],
          ["Liquidité", "Quotidienne (D+1)"],
        ],
      },
      { type: "h2", text: "Univers d'investissement" },
      { type: "p", text: "Le fonds est composé exclusivement de titres souverains de la zone euro émis par des États notés au minimum A par S&P." },
    ],
  },
  "produits/documentation-des-fonds-monetaires-quercus": {
    title: "Documentation des fonds monétaires Quercus",
    categorySlug: "produits",
    categoryTitle: "Les produits Quercus",
    updatedAt: "1er avril 2026",
    readTime: "2 min",
    intro:
      "L'ensemble de la documentation réglementaire de nos fonds monétaires est disponible en téléchargement depuis votre espace client.",
    blocks: [
      { type: "h2", text: "Documents disponibles" },
      {
        type: "ul",
        items: [
          "Document d'informations clés (DIC PRIIPS)",
          "Prospectus complet du fonds",
          "Rapport annuel et semestriel",
          "Reporting mensuel de performance",
          "Politique de rémunération de la société de gestion",
        ],
      },
      { type: "p", text: "Tous les documents sont mis à jour conformément aux exigences AMF et téléchargeables depuis l'onglet « Documentation » de chaque produit." },
    ],
  },
  "produits/fiche-technique-quercus-smart-cash": {
    title: "Fiche technique Quercus Smart Cash",
    categorySlug: "produits",
    categoryTitle: "Les produits Quercus",
    updatedAt: "1er avril 2026",
    readTime: "3 min",
    intro:
      "Smart Cash est notre solution de placement court terme conçue pour les trésoreries d'entreprise et les particuliers cherchant un rendement régulier.",
    blocks: [
      {
        type: "table",
        head: ["Critère", "Valeur"],
        rows: [
          ["Sous-jacent", "Fonds monétaires euro + dépôts à terme bancaires"],
          ["Objectif de rendement", "€STR + 5 à 15 bps"],
          ["Liquidité", "Quotidienne (D+1)"],
          ["Ticket minimum", "100 €"],
          ["Frais d'entrée / sortie", "0 %"],
          ["Frais de gestion annuels", "0,12 %"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Smart Cash est éligible au placement de la trésorerie des SCI, SAS, SARL et associations sans contrainte de durée.",
      },
    ],
  },
  "produits/documentation-de-quercus-smart-cash": {
    title: "Documentation de Quercus Smart Cash",
    categorySlug: "produits",
    categoryTitle: "Les produits Quercus",
    updatedAt: "1er avril 2026",
    readTime: "2 min",
    intro:
      "Retrouvez l'ensemble des documents contractuels et de reporting de Smart Cash dans votre espace client.",
    blocks: [
      {
        type: "ul",
        items: [
          "Conditions particulières Smart Cash",
          "DIC PRIIPS",
          "Reporting mensuel",
          "Historique de performance net de frais",
          "Politique de meilleure exécution",
        ],
      },
    ],
  },
  "produits/fiche-technique-quercus-cash-and-carry": {
    title: "Fiche technique Quercus Cash & Carry",
    categorySlug: "produits",
    categoryTitle: "Les produits Quercus",
    updatedAt: "1er avril 2026",
    readTime: "4 min",
    intro:
      "Cash & Carry est une stratégie d'arbitrage spot-futures sur taux courts qui vise à capter une prime stable au-dessus du taux sans risque.",
    blocks: [
      {
        type: "table",
        head: ["Critère", "Valeur"],
        rows: [
          ["Stratégie", "Arbitrage spot/futures sur instruments monétaires"],
          ["Objectif de rendement", "€STR + 30 à 60 bps"],
          ["Volatilité cible", "< 0,5 % annualisée"],
          ["Liquidité", "Hebdomadaire (mardi)"],
          ["Ticket minimum", "10 000 €"],
          ["Frais de gestion annuels", "0,30 %"],
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Le rendement de Cash & Carry dépend de la base spot-futures et peut varier selon les conditions de marché.",
      },
    ],
  },
  "produits/documentation-de-quercus-cash-and-carry": {
    title: "Documentation de Quercus Cash & Carry",
    categorySlug: "produits",
    categoryTitle: "Les produits Quercus",
    updatedAt: "1er avril 2026",
    readTime: "2 min",
    intro:
      "Documents contractuels et reporting détaillés de la stratégie Cash & Carry.",
    blocks: [
      {
        type: "ul",
        items: [
          "Note de stratégie détaillée",
          "DIC PRIIPS",
          "Reporting mensuel avec décomposition de la performance",
          "Historique des bases captées",
          "Politique de gestion du risque",
        ],
      },
    ],
  },
  "produits/comprendre-les-frais-sur-quercus": {
    title: "Comprendre les frais sur Quercus",
    categorySlug: "produits",
    categoryTitle: "Les produits Quercus",
    updatedAt: "1er avril 2026",
    readTime: "3 min",
    intro:
      "Quercus pratique une tarification simple et transparente, sans frais cachés. Voici l'ensemble des coûts qui peuvent s'appliquer à votre compte.",
    blocks: [
      {
        type: "table",
        head: ["Frais", "Montant"],
        rows: [
          ["Ouverture de compte", "0 €"],
          ["Tenue de compte", "0 €"],
          ["Dépôt par virement SEPA", "0 €"],
          ["Retrait standard SEPA", "0 €"],
          ["Retrait instantané", "0,10 % (min. 1 €)"],
          ["Frais de gestion fonds monétaires", "0,10 % par an"],
          ["Frais de gestion Smart Cash", "0,12 % par an"],
          ["Frais de gestion Cash & Carry", "0,30 % par an"],
        ],
      },
      { type: "p", text: "Les frais de gestion sont prélevés directement sur la valeur liquidative et sont déjà intégrés au rendement affiché." },
    ],
  },

  // ─── Dépôts et retraits ──────────────────────────────────────────────
  "depots-et-retraits/depot-depuis-un-compte-tiers": {
    title: "Dépôt depuis un compte tiers",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Dépôts et retraits",
    updatedAt: "12 mars 2026",
    readTime: "3 min",
    intro:
      "Pour des raisons réglementaires (LCB-FT), Quercus n'accepte pas les dépôts provenant d'un compte qui ne serait pas au nom du titulaire.",
    blocks: [
      { type: "h2", text: "Règle générale" },
      { type: "p", text: "Le compte émetteur du virement doit être strictement identique au titulaire du compte Quercus, particulier ou personne morale." },
      {
        type: "callout",
        tone: "warning",
        title: "Si un virement est reçu d'un tiers",
        text: "Les fonds sont mis en quarantaine et retournés à l'émetteur sous 5 jours ouvrés. Aucun investissement n'est réalisé.",
      },
      { type: "h2", text: "Cas particuliers" },
      {
        type: "ul",
        items: [
          "Compte joint : autorisé si l'un des co-titulaires est le titulaire Quercus",
          "Compte indivision : autorisé sur justificatif notarial",
          "Mandataire : virement refusé, le titulaire doit être l'émetteur",
        ],
      },
    ],
  },
  "depots-et-retraits/effectuer-un-depot": {
    title: "Effectuer un dépôt",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Dépôts et retraits",
    updatedAt: "12 mars 2026",
    readTime: "3 min",
    intro:
      "Les dépôts s'effectuent par virement SEPA depuis votre banque. L'IBAN de réception et la référence sont uniques à votre compte.",
    blocks: [
      { type: "h2", text: "Étapes" },
      {
        type: "ol",
        items: [
          "Connectez-vous à votre espace Quercus",
          "Cliquez sur « Déposer »",
          "Copiez l'IBAN de votre compte Quercus et la référence à indiquer",
          "Effectuez le virement depuis votre banque en collant la référence",
          "Le dépôt est crédité dès réception (1 à 2 jours ouvrés en SEPA standard)",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Virement SEPA Instant",
        text: "Si votre banque le propose, le SEPA Instant permet un crédit en moins de 10 secondes.",
      },
    ],
  },
  "depots-et-retraits/virement-non-arrive": {
    title: "Virement non arrivé",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Dépôts et retraits",
    updatedAt: "8 février 2026",
    readTime: "3 min",
    intro:
      "La très grande majorité des virements arrivent en moins de 48 heures ouvrées. Voici la marche à suivre si ce n'est pas le cas.",
    blocks: [
      { type: "h2", text: "Vérifications préalables" },
      {
        type: "ol",
        items: [
          "Confirmez que le virement a bien été émis depuis un compte à votre nom",
          "Vérifiez l'IBAN de destination (commence par FR)",
          "Vérifiez la référence : elle est obligatoire pour identifier votre dépôt",
        ],
      },
      { type: "h2", text: "Au-delà de 3 jours ouvrés" },
      { type: "p", text: "Demandez à votre banque un avis de paiement (MT103) et transmettez-le à notre équipe support via le formulaire de contact. Nous remontons généralement le virement sous 24 heures." },
    ],
  },
  "depots-et-retraits/comptes-ouverts-avant-septembre-2025": {
    title: "Comptes ouverts avant septembre 2025",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Dépôts et retraits",
    updatedAt: "1er octobre 2025",
    readTime: "2 min",
    intro:
      "Les comptes ouverts avant septembre 2025 utilisent un IBAN historique. Aucune action n'est requise, mais nous recommandons d'utiliser le nouvel IBAN.",
    blocks: [
      { type: "p", text: "Les anciens IBAN restent actifs et continuent de recevoir vos virements normalement. Le nouvel IBAN, plus performant, permet notamment l'utilisation du SEPA Instant." },
      {
        type: "callout",
        tone: "info",
        text: "Vous trouvez votre nouvel IBAN dans l'onglet « Déposer » de votre espace client. Mettez-le à jour dans vos virements récurrents pour bénéficier des dernières fonctionnalités.",
      },
    ],
  },
  "depots-et-retraits/effectuer-un-retrait-standard": {
    title: "Effectuer un retrait standard",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Dépôts et retraits",
    updatedAt: "12 mars 2026",
    readTime: "2 min",
    intro:
      "Les retraits standards sont gratuits et arrivent sur votre compte bancaire en 1 jour ouvré.",
    blocks: [
      {
        type: "ol",
        items: [
          "Cliquez sur « Retirer » depuis votre tableau de bord",
          "Saisissez le montant",
          "Sélectionnez le compte bancaire de destination (préenregistré)",
          "Validez avec votre code 2FA",
        ],
      },
      { type: "p", text: "Le retrait part le jour ouvré suivant après calcul de la valeur liquidative et arrive sur votre compte sous 24 heures." },
    ],
  },
  "depots-et-retraits/effectuer-un-retrait-instantane": {
    title: "Effectuer un retrait instantané",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Dépôts et retraits",
    updatedAt: "12 mars 2026",
    readTime: "2 min",
    intro:
      "Le retrait instantané utilise le rail SEPA Instant et permet de recevoir vos fonds en moins de 10 secondes, 24/7.",
    blocks: [
      { type: "h2", text: "Conditions" },
      {
        type: "ul",
        items: [
          "Compte de destination compatible SEPA Instant",
          "Montant unitaire ≤ 100 000 €",
          "Frais : 0,10 % du montant, minimum 1 €",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Si votre banque ne supporte pas SEPA Instant, le retrait bascule automatiquement en SEPA standard sans frais.",
      },
    ],
  },
  "depots-et-retraits/conversion-de-devises": {
    title: "Conversion de devises",
    categorySlug: "depots-et-retraits",
    categoryTitle: "Dépôts et retraits",
    updatedAt: "10 mars 2026",
    readTime: "2 min",
    intro:
      "Quercus opère exclusivement en euros. Les dépôts dans une autre devise sont automatiquement convertis au taux interbancaire avec un spread transparent.",
    blocks: [
      { type: "h2", text: "Devises acceptées en entrée" },
      { type: "p", text: "USD, GBP, CHF, NOK, SEK, DKK." },
      { type: "h2", text: "Tarification de change" },
      { type: "p", text: "Taux interbancaire mid-market + 0,15 % de spread. Aucun frais fixe." },
    ],
  },

  // ─── Gérer mon compte ────────────────────────────────────────────────
  "gerer-mon-compte/applications-tierces": {
    title: "Applications tierces",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Gérer mon compte",
    updatedAt: "20 mars 2026",
    readTime: "3 min",
    intro:
      "Quercus s'intègre avec vos outils comptables et bancaires via une API ouverte conforme aux standards DSP2.",
    blocks: [
      { type: "h2", text: "Intégrations natives" },
      {
        type: "ul",
        items: [
          "Pennylane, Qonto, Sage, Cegid",
          "Notion, Slack, Zapier",
          "Webhooks personnalisés",
        ],
      },
      { type: "p", text: "Toutes les connexions sont gérées depuis l'onglet « Intégrations » de votre espace. Vous gardez le contrôle des permissions accordées et pouvez révoquer un accès à tout moment." },
    ],
  },
  "gerer-mon-compte/acces-multi-utilisateurs": {
    title: "Accès multi-utilisateurs",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Gérer mon compte",
    updatedAt: "20 mars 2026",
    readTime: "3 min",
    intro:
      "Sur les comptes personne morale, vous pouvez inviter plusieurs collaborateurs avec des rôles distincts.",
    blocks: [
      { type: "h2", text: "Rôles disponibles" },
      {
        type: "ul",
        items: [
          "Administrateur — gestion complète, ajout d'utilisateurs",
          "Trésorier — initiation des dépôts et retraits",
          "Validateur — approbation des opérations en mode Quatre Yeux",
          "Lecture seule — consultation et export des relevés",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Chaque utilisateur dispose de ses propres identifiants et de sa propre 2FA.",
      },
    ],
  },
  "gerer-mon-compte/ouvrir-plusieurs-comptes-quercus": {
    title: "Ouvrir plusieurs comptes Quercus",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Gérer mon compte",
    updatedAt: "15 mars 2026",
    readTime: "2 min",
    intro:
      "Vous pouvez gérer plusieurs comptes Quercus depuis un même identifiant (par exemple un compte personnel et un compte société).",
    blocks: [
      { type: "p", text: "Depuis le menu en haut à gauche de votre espace, utilisez le sélecteur de compte pour basculer instantanément entre vos différentes entités." },
      { type: "p", text: "Pour ouvrir un compte supplémentaire, cliquez sur « Ouvrir un compte » dans le sélecteur. Vous serez guidé à travers le parcours de KYC adapté." },
    ],
  },
  "gerer-mon-compte/mode-quatre-yeux": {
    title: "Mode Quatre Yeux",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Gérer mon compte",
    updatedAt: "20 mars 2026",
    readTime: "3 min",
    intro:
      "Le mode Quatre Yeux impose qu'une opération initiée par un utilisateur soit validée par un second avant exécution. Idéal pour les comptes corporate.",
    blocks: [
      { type: "h2", text: "Opérations concernées" },
      {
        type: "ul",
        items: [
          "Tout retrait supérieur à un seuil paramétrable",
          "Tout changement d'IBAN bénéficiaire",
          "L'ajout d'un nouvel utilisateur",
          "La modification de la liste des bénéficiaires effectifs",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Le mode Quatre Yeux s'active depuis Paramètres → Sécurité. Il nécessite au minimum deux administrateurs.",
      },
    ],
  },
  "gerer-mon-compte/modifier-mon-mot-de-passe": {
    title: "Modifier mon mot de passe",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Gérer mon compte",
    updatedAt: "8 février 2026",
    readTime: "1 min",
    intro:
      "Vous pouvez modifier votre mot de passe à tout moment depuis vos paramètres de compte.",
    blocks: [
      {
        type: "ol",
        items: [
          "Allez dans Paramètres → Sécurité",
          "Cliquez sur « Modifier mon mot de passe »",
          "Saisissez votre mot de passe actuel",
          "Choisissez un nouveau mot de passe (12 caractères minimum, chiffres et symboles)",
          "Validez avec votre code 2FA",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        text: "Pour votre sécurité, vous serez déconnecté de toutes vos sessions actives après modification.",
      },
    ],
  },
  "gerer-mon-compte/modifier-mon-email": {
    title: "Modifier mon email",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Gérer mon compte",
    updatedAt: "8 février 2026",
    readTime: "2 min",
    intro:
      "Le changement d'adresse email nécessite une double confirmation pour garantir la sécurité de votre compte.",
    blocks: [
      {
        type: "ol",
        items: [
          "Paramètres → Profil → « Modifier l'email »",
          "Saisissez la nouvelle adresse",
          "Confirmez via le lien envoyé sur l'ancienne adresse (validité 24 h)",
          "Confirmez via le lien envoyé sur la nouvelle adresse",
        ],
      },
      { type: "p", text: "L'opération devient effective une fois les deux liens confirmés." },
    ],
  },
  "gerer-mon-compte/authentification-a-deux-facteurs": {
    title: "Authentification à deux facteurs",
    categorySlug: "gerer-mon-compte",
    categoryTitle: "Gérer mon compte",
    updatedAt: "20 mars 2026",
    readTime: "3 min",
    intro:
      "La 2FA est obligatoire sur Quercus. Elle protège votre compte même en cas de compromission de votre mot de passe.",
    blocks: [
      { type: "h2", text: "Méthodes supportées" },
      {
        type: "ul",
        items: [
          "Application TOTP (Google Authenticator, Authy, 1Password) — recommandé",
          "Clé physique FIDO2 / WebAuthn (YubiKey, Titan)",
          "Code par SMS (méthode de secours uniquement)",
        ],
      },
      {
        type: "callout",
        tone: "info",
        text: "Conservez vos codes de récupération dans un endroit sûr (gestionnaire de mots de passe). Ils sont indispensables en cas de perte de votre appareil.",
      },
    ],
  },

  // ─── Fiscalité et comptabilité ───────────────────────────────────────
  "fiscalite-et-comptabilite/fiscalite-pour-les-particuliers": {
    title: "Fiscalité pour les particuliers",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Fiscalité et comptabilité",
    updatedAt: "1er avril 2026",
    readTime: "4 min",
    intro:
      "Les revenus générés par les fonds monétaires Quercus sont des revenus de capitaux mobiliers, soumis par défaut au prélèvement forfaitaire unique (PFU).",
    blocks: [
      { type: "h2", text: "Régime par défaut : flat tax 30 %" },
      { type: "p", text: "Le PFU se compose de 12,8 % d'impôt sur le revenu et 17,2 % de prélèvements sociaux. Quercus opère le prélèvement à la source au moment du retrait." },
      { type: "h2", text: "Option pour le barème" },
      { type: "p", text: "Vous pouvez opter pour l'imposition au barème progressif lors de votre déclaration annuelle si cela vous est plus favorable." },
      {
        type: "callout",
        tone: "info",
        text: "Quercus émet chaque année un Imprimé Fiscal Unique (IFU) téléchargeable depuis votre espace client.",
      },
    ],
  },
  "fiscalite-et-comptabilite/fiscalite-pour-les-personnes-morales": {
    title: "Fiscalité pour les personnes morales",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Fiscalité et comptabilité",
    updatedAt: "1er avril 2026",
    readTime: "4 min",
    intro:
      "Pour une société soumise à l'IS, les plus-values latentes sur fonds monétaires sont imposées chaque année selon le régime des titres à revenu fixe.",
    blocks: [
      { type: "h2", text: "Évaluation à la juste valeur" },
      { type: "p", text: "Les OPCVM monétaires éligibles sont évalués à leur valeur liquidative à la clôture. L'écart d'évaluation constitue un produit imposable au taux d'IS en vigueur." },
      { type: "h2", text: "Reporting" },
      { type: "p", text: "Quercus fournit un état de valorisation au 31 décembre exportable directement vers vos outils comptables (Pennylane, Sage, Cegid)." },
    ],
  },
  "fiscalite-et-comptabilite/imprime-fiscal-unique-ifu": {
    title: "Imprimé Fiscal Unique (IFU)",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Fiscalité et comptabilité",
    updatedAt: "1er février 2026",
    readTime: "2 min",
    intro:
      "L'IFU récapitule l'ensemble des revenus mobiliers et plus-values réalisés sur votre compte au cours de l'année écoulée.",
    blocks: [
      { type: "p", text: "Il est mis à disposition chaque année avant le 15 février, dans la rubrique Documents → Fiscalité de votre espace." },
      { type: "p", text: "L'IFU pré-remplit automatiquement les cases 2DC, 2BH et 2CG de votre déclaration de revenus." },
    ],
  },
  "fiscalite-et-comptabilite/traitement-comptable-des-fonds-monetaires": {
    title: "Traitement comptable des fonds monétaires",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Fiscalité et comptabilité",
    updatedAt: "1er avril 2026",
    readTime: "3 min",
    intro:
      "Les fonds monétaires Quercus s'enregistrent en classe 5 (valeurs mobilières de placement) ou en classe 2 selon l'horizon de détention.",
    blocks: [
      { type: "h2", text: "Comptes recommandés" },
      {
        type: "ul",
        items: [
          "508 — Autres valeurs mobilières et créances assimilées",
          "590 — Provision pour dépréciation des VMP (le cas échéant)",
          "764 — Revenus des valeurs mobilières de placement",
        ],
      },
      { type: "p", text: "Notre export comptable mensuel est compatible avec la plupart des PGI du marché." },
    ],
  },
  "fiscalite-et-comptabilite/releves-comptables-et-exports": {
    title: "Relevés comptables et exports",
    categorySlug: "fiscalite-et-comptabilite",
    categoryTitle: "Fiscalité et comptabilité",
    updatedAt: "20 mars 2026",
    readTime: "2 min",
    intro:
      "Vos relevés sont générés automatiquement chaque mois et accessibles en PDF, CSV ou via API.",
    blocks: [
      {
        type: "ul",
        items: [
          "Relevé mensuel détaillé (PDF)",
          "Export comptable au format FEC ou CSV",
          "Récapitulatif annuel pour la liasse fiscale",
          "Export API à la demande",
        ],
      },
    ],
  },

  // ─── À propos ────────────────────────────────────────────────────────
  "a-propos/notre-mission": {
    title: "Notre mission",
    categorySlug: "a-propos",
    categoryTitle: "À propos de Quercus",
    updatedAt: "1er janvier 2026",
    readTime: "2 min",
    intro:
      "Quercus rend accessible aux particuliers et aux entreprises les outils de gestion de trésorerie utilisés par les institutionnels depuis des décennies.",
    blocks: [
      { type: "p", text: "Pendant des années, faire fructifier sa trésorerie au-delà du livret A imposait des montants minimums prohibitifs ou des contrats opaques. Nous avons construit une plateforme qui supprime ces frictions." },
      { type: "p", text: "Notre conviction : un placement de trésorerie doit être sûr, liquide, lisible — et son rendement doit appartenir à son détenteur, pas à un intermédiaire." },
    ],
  },
  "a-propos/nos-partenaires": {
    title: "Nos partenaires",
    categorySlug: "a-propos",
    categoryTitle: "À propos de Quercus",
    updatedAt: "1er avril 2026",
    readTime: "2 min",
    intro:
      "Quercus s'appuie sur un écosystème de partenaires régulés de premier rang pour la gestion, la conservation et l'exécution.",
    blocks: [
      {
        type: "ul",
        items: [
          "TOBAM — société de gestion agréée AMF, gérant des fonds monétaires",
          "Caceis Bank — dépositaire et conservateur des actifs",
          "Crédit Mutuel Arkéa — partenaire bancaire pour la tenue des comptes espèces",
          "Onfido — partenaire pour la vérification d'identité KYC",
        ],
      },
    ],
  },
  "a-propos/securite-de-vos-fonds": {
    title: "Sécurité de vos fonds",
    categorySlug: "a-propos",
    categoryTitle: "À propos de Quercus",
    updatedAt: "1er avril 2026",
    readTime: "4 min",
    intro:
      "Vos avoirs sont strictement séparés des comptes de Quercus et conservés chez un dépositaire indépendant.",
    blocks: [
      { type: "h2", text: "Ségrégation des actifs" },
      { type: "p", text: "Vos parts de fonds monétaires sont détenues en nom propre auprès du dépositaire Caceis Bank. En cas de défaillance de Quercus, vos avoirs ne font pas partie de la masse en cas de procédure collective." },
      { type: "h2", text: "Garanties applicables" },
      {
        type: "ul",
        items: [
          "Garantie des dépôts (FGDR) : 100 000 € sur le compte espèces",
          "Garantie des titres : 70 000 € sur les parts d'OPCVM en cas de défaillance du dépositaire",
        ],
      },
      { type: "h2", text: "Sécurité technique" },
      { type: "p", text: "Chiffrement TLS 1.3 de bout en bout, 2FA obligatoire, audit de sécurité annuel par un cabinet indépendant, conformité ISO 27001 en cours de certification." },
    ],
  },
  "a-propos/conditions-generales-d-utilisation": {
    title: "Conditions générales d'utilisation",
    categorySlug: "a-propos",
    categoryTitle: "À propos de Quercus",
    updatedAt: "1er avril 2026",
    readTime: "2 min",
    intro:
      "Les conditions générales encadrent l'utilisation de la plateforme Quercus et la fourniture des services associés.",
    blocks: [
      { type: "p", text: "Les CGU intégrales sont disponibles dans la rubrique Mentions légales du site, ainsi qu'en téléchargement PDF depuis votre espace client." },
      { type: "p", text: "Tout changement substantiel vous est notifié par email au moins 30 jours avant son entrée en vigueur." },
    ],
  },
  "a-propos/politique-de-confidentialite": {
    title: "Politique de confidentialité",
    categorySlug: "a-propos",
    categoryTitle: "À propos de Quercus",
    updatedAt: "1er avril 2026",
    readTime: "3 min",
    intro:
      "Quercus collecte et traite vos données dans le strict respect du RGPD et uniquement pour les finalités liées à la fourniture de ses services.",
    blocks: [
      { type: "h2", text: "Données collectées" },
      {
        type: "ul",
        items: [
          "Identité et coordonnées (KYC réglementaire)",
          "Données financières (origine des fonds, transactions)",
          "Données de connexion (logs, IP, appareils)",
        ],
      },
      { type: "h2", text: "Vos droits" },
      { type: "p", text: "Vous disposez d'un droit d'accès, de rectification, d'opposition et de portabilité. Contactez notre DPO via le formulaire de contact." },
    ],
  },
  "a-propos/mentions-legales": {
    title: "Mentions légales",
    categorySlug: "a-propos",
    categoryTitle: "À propos de Quercus",
    updatedAt: "1er avril 2026",
    readTime: "2 min",
    intro:
      "Informations légales et réglementaires concernant Quercus.",
    blocks: [
      { type: "p", text: "Quercus Capital — SAS au capital de 250 000 € — RCS Paris 912 345 678. Siège social : 12 rue de la Paix, 75002 Paris." },
      { type: "p", text: "Quercus est immatriculé à l'ORIAS (n° 22 003 456) en qualité de Conseiller en Investissements Financiers (CIF), membre de l'ANACOFI-CIF, association agréée par l'AMF." },
      { type: "p", text: "Directeur de la publication : le Président de Quercus Capital. Hébergement : Vercel Inc., 340 S Lemon Ave, Walnut, CA 91789, USA." },
    ],
  },
};

// Helper to derive a slug from a label (used by HelpCenter to map item titles → slugs)
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/['']/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}