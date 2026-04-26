// 11 verbatim Q/A from the Quercus Capital frontend spec, organised in
// the three customer-centric categories the spec recommends.

export type FaqItem = { q: string; a: string };
export type FaqCategory = { key: "security" | "interest" | "advisor"; items: FaqItem[] };

export const LANDING_FAQ: FaqCategory[] = [
  {
    key: "security",
    items: [
      {
        q: "Que se passe-t-il si Quercus Capital fait faillite ?",
        a: "Votre argent n'est jamais conservé par Quercus Capital. Il est directement détenu par une banque dépositaire agréée (BNP Paribas / CACEIS), indépendante de notre structure. En cas de défaillance de Quercus Capital, vos fonds ne sont pas concernés et restent intégralement accessibles via la société de gestion du fonds.",
      },
      {
        q: "Les fonds sont-ils garantis ?",
        a: "Les fonds monétaires ne sont pas des produits garantis au sens strict. Cependant, ils investissent exclusivement dans des titres d'État (bons du Trésor), considérés comme les actifs les plus sûrs au monde. Le risque de perte en capital est extrêmement faible — il n'existerait qu'en cas de défaut souverain des États de la Zone Euro ou des États-Unis.",
      },
      {
        q: "Quelle régulation encadre ces fonds ?",
        a: "Les fonds distribués par Quercus Capital sont approuvés et supervisés par l'Autorité des Marchés Financiers (AMF). Quercus Capital est enregistré comme CIF & COA auprès de l'ORIAS (n°24004789) et opère également en qualité de Conseiller en Gestion de Patrimoine (CGP). Nous sommes membres de la CNCEF.",
      },
      {
        q: "Qui est la banque dépositaire ?",
        a: "Les fonds sont conservés par une banque dépositaire de premier rang — BNP Paribas pour Velvet (Smart Cash) et CACEIS pour TOBAM (Cash & Carry) — toutes deux filiales de grands groupes bancaires européens. Chaque dépositaire est agréé par la Banque Centrale Européenne et supervise la comptabilité du fonds de manière indépendante.",
      },
    ],
  },
  {
    key: "interest",
    items: [
      {
        q: "Comment les intérêts sont-ils calculés ?",
        a: "Chaque jour ouvré, l'administrateur du fonds calcule la valeur des bons du Trésor en portefeuille. La différence de valorisation entre deux jours constitue l'intérêt quotidien. Ce montant est automatiquement réinvesti dans le fonds (capitalisation), augmentant la valeur de vos parts.",
      },
      {
        q: "Les intérêts sont-ils versés ou réinvestis ?",
        a: "Les fonds fonctionnent par capitalisation : les intérêts augmentent la valeur de vos parts chaque jour. Vous ne percevez pas de versement quotidien, mais la valeur de votre investissement croît de façon continue. Vous réalisez votre gain lors d'un retrait.",
      },
      {
        q: "Quels sont les frais ?",
        a: "Les frais de gestion du fonds sont déduits quotidiennement de l'intérêt brut. Le taux affiché sur notre site est toujours le taux net de frais — ce que vous percevez réellement. Il n'y a pas de frais d'entrée ni de sortie. Les frais de conseil de votre CGP font l'objet d'une convention séparée.",
      },
      {
        q: "Que se passe-t-il le week-end ?",
        a: "Les marchés financiers étant fermés le week-end, les intérêts du vendredi sont triplés pour couvrir samedi et dimanche. Ils apparaissent dans votre espace client le lundi suivant.",
      },
    ],
  },
  {
    key: "advisor",
    items: [
      {
        q: "Pourquoi ai-je besoin d'un conseiller pour investir dans ces fonds ?",
        a: "Les fonds monétaires sont des instruments simples, mais leur intégration dans votre patrimoine global demande une analyse de votre situation fiscale, de votre horizon de placement et de vos objectifs. Votre conseiller Quercus Capital s'assure que le fonds choisi est le plus adapté à votre profil et optimise l'aspect fiscal de votre investissement.",
      },
      {
        q: "Mon conseiller a-t-il accès à mon compte ?",
        a: "Votre conseiller dispose d'un accès en lecture à votre espace client pour suivre l'évolution de votre investissement et vous alerter en cas de changement de marché. Il ne peut pas effectuer de mouvements sur votre compte sans votre validation explicite.",
      },
      {
        q: "À quelle fréquence mon conseiller me contacte-t-il ?",
        a: "Votre conseiller vous contacte a minima une fois par trimestre pour un point de suivi. Il peut également vous alerter en cas de modification significative des conditions de marché ou d'opportunité patrimoniale. Vous pouvez le contacter à tout moment via votre espace client.",
      },
    ],
  },
];
