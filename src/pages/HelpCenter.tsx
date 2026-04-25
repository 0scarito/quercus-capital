import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Link, useParams } from "react-router-dom";
import { BookOpen, Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

type Category = {
  slug: string;
  title: string;
  description: string;
  sections: { title: string; items: string[] }[];
};

const CATEGORIES: Category[] = [
  {
    slug: "ouvrir-un-compte",
    title: "Ouvrir un compte",
    description: "Tout ce qu'il faut savoir pour ouvrir un compte Quercus.",
    sections: [
      {
        title: "Ouvrir un compte en tant que particulier",
        items: [
          "Créer un compte pour particulier",
          "Pièces d'identité acceptées",
          "Justificatif de domicile",
          "Justificatif d'origine des fonds pour les particuliers",
        ],
      },
      {
        title: "Ouvrir un compte en tant que personne morale",
        items: [
          "Créer un compte pour une entreprise",
          "Créer un compte pour une association française",
          "Créer un compte pour une entreprise individuelle",
          "Créer un compte pour un syndicat des copropriétaires en France",
          "Justificatif de fonds acceptés pour les personnes morales",
        ],
      },
      {
        title: "Pays éligibles",
        items: ["Restrictions géographiques"],
      },
    ],
  },
  {
    slug: "produits",
    title: "Les produits Quercus",
    description: "Découvrez les produits proposés par Quercus.",
    sections: [
      {
        title: "Quercus bons du Trésor",
        items: [
          "Fiche technique des fonds monétaires Quercus",
          "Documentation des fonds monétaires Quercus",
        ],
      },
      {
        title: "Quercus Smart Cash",
        items: ["Fiche technique Quercus Smart Cash", "Documentation de Quercus Smart Cash"],
      },
      {
        title: "Quercus Cash & Carry",
        items: ["Fiche technique Quercus Cash & Carry", "Documentation de Quercus Cash & Carry"],
      },
      {
        title: "Frais",
        items: ["Comprendre les frais sur Quercus"],
      },
    ],
  },
  {
    slug: "depots-et-retraits",
    title: "Dépôts et retraits",
    description: "Comment déposer et retirer des fonds sur votre compte Quercus.",
    sections: [
      {
        title: "Effectuer un dépôt",
        items: [
          "Dépôt depuis un compte tiers",
          "Effectuer un dépôt",
          "Virement non arrivé",
          "Comptes ouverts avant septembre 2025",
        ],
      },
      {
        title: "Effectuer un retrait",
        items: ["Effectuer un retrait standard", "Effectuer un retrait instantané"],
      },
      {
        title: "Conversion de devises",
        items: ["Conversion de devises"],
      },
    ],
  },
  {
    slug: "gerer-mon-compte",
    title: "Gérer mon compte",
    description: "Paramètres, sécurité et gestion de votre espace personnel.",
    sections: [
      {
        title: "Fonctionnalités de la plateforme",
        items: [
          "Applications tierces",
          "Accès multi-utilisateurs",
          "Ouvrir plusieurs comptes Quercus",
          "Mode Quatre Yeux",
        ],
      },
      {
        title: "Sécurité et connexion",
        items: [
          "Modifier mon mot de passe",
          "Modifier mon email",
          "Authentification à deux facteurs",
        ],
      },
    ],
  },
  {
    slug: "fiscalite-et-comptabilite",
    title: "Fiscalité et comptabilité",
    description: "Trouver les informations sur la fiscalité et la comptabilité.",
    sections: [
      {
        title: "Fiscalité",
        items: [
          "Fiscalité pour les particuliers",
          "Fiscalité pour les personnes morales",
          "Imprimé Fiscal Unique (IFU)",
        ],
      },
      {
        title: "Comptabilité",
        items: ["Traitement comptable des fonds monétaires", "Relevés comptables et exports"],
      },
    ],
  },
  {
    slug: "a-propos",
    title: "À propos de Quercus",
    description: "Tout savoir sur Quercus et nos partenaires, et accéder à notre documentation juridique.",
    sections: [
      {
        title: "Quercus",
        items: ["Notre mission", "Nos partenaires", "Sécurité de vos fonds"],
      },
      {
        title: "Documentation juridique",
        items: [
          "Conditions générales d'utilisation",
          "Politique de confidentialité",
          "Mentions légales",
        ],
      },
    ],
  },
];

function CategoryCard({ cat }: { cat: Category }) {
  return (
    <Link
      to={`/aide/${cat.slug}`}
      className="group border border-border p-6 hover:border-foreground transition-colors block"
    >
      <div className="h-9 w-9 border border-border flex items-center justify-center mb-5 group-hover:border-foreground transition-colors">
        <BookOpen className="h-4 w-4 text-foreground" />
      </div>
      <h3 className="text-xl font-serif text-foreground mb-2">{cat.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
    </Link>
  );
}

function HelpIndex({ query, setQuery }: { query: string; setQuery: (s: string) => void }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.sections.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.items.some((i) => i.toLowerCase().includes(q)),
        ),
    );
  }, [query]);

  return (
    <>
      <div className="mb-12 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Centre d'aide
        </p>
        <h1 className="text-5xl md:text-6xl font-serif italic mb-6">Comment pouvons-nous vous aider ?</h1>
        <p className="text-muted-foreground leading-relaxed">
          Parcourez nos guides ou recherchez une réponse précise concernant votre compte,
          nos produits et l'utilisation de la plateforme Quercus.
        </p>
      </div>

      <div className="relative mb-12 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher dans le centre d'aide…"
          className="pl-9 h-11 rounded-none border-border"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
        {filtered.map((cat) => (
          <div key={cat.slug} className="bg-background">
            <CategoryCard cat={cat} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted-foreground mt-8">Aucun résultat pour « {query} ».</p>
      )}
    </>
  );
}

function CategoryDetail({ cat }: { cat: Category }) {
  return (
    <>
      <nav className="mb-10 text-sm flex items-center gap-2 text-muted-foreground">
        <Link to="/aide" className="hover:text-foreground underline-offset-4 hover:underline">
          Quercus
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{cat.title}</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-serif italic mb-3">{cat.title}</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl leading-relaxed">{cat.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {cat.sections.map((sec) => (
          <div key={sec.title} className="border border-border p-6">
            <h2 className="text-lg font-serif text-foreground pb-3 mb-4 border-b border-border">
              {sec.title}
            </h2>
            <ul className="space-y-3">
              {sec.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 flex-shrink-0" />
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Vous ne trouvez pas la réponse à votre question ?
        </p>
        <Link
          to="/contact"
          className="text-sm font-serif italic text-foreground underline underline-offset-4"
        >
          Contacter notre équipe →
        </Link>
      </div>
    </>
  );
}

export default function HelpCenter() {
  const { slug } = useParams();
  const [query, setQuery] = useState("");
  const cat = slug ? CATEGORIES.find((c) => c.slug === slug) : undefined;

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main className="pt-28 pb-24 max-w-6xl mx-auto px-4 md:px-8">
        {cat ? <CategoryDetail cat={cat} /> : <HelpIndex query={query} setQuery={setQuery} />}
      </main>
      <LandingFooter />
    </div>
  );
}
