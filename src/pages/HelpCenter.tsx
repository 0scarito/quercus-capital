import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Link, useParams } from "react-router-dom";
import { BookOpen, Search, ChevronRight, Clock, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { HELP_ARTICLES, slugify, type HelpArticle, type ArticleBlock } from "@/data/helpArticles";

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
      className="group relative border border-border p-6 hover:border-primary/60 hover:bg-primary/[0.03] transition-all flex flex-col h-full w-full min-h-[180px] overflow-hidden"
    >
      <span className="absolute top-0 left-0 h-[2px] w-12 bg-primary group-hover:w-full transition-all duration-500" />
      <div className="h-10 w-10 bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:border-primary/40 transition-colors">
        <BookOpen className="h-4 w-4 text-primary" />
      </div>
      <h3 className="text-xl font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
        <em>{cat.title}</em>
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
    </Link>
  );
}

function HelpIndex({ query, setQuery }: { query: string; setQuery: (s: string) => void }) {
  const q = query.trim().toLowerCase();

  const allArticles = useMemo(() => {
    const list: { catSlug: string; catTitle: string; section: string; item: string }[] = [];
    for (const c of CATEGORIES) {
      for (const s of c.sections) {
        for (const it of s.items) {
          list.push({ catSlug: c.slug, catTitle: c.title, section: s.title, item: it });
        }
      }
    }
    return list;
  }, []);

  const articleResults = useMemo(() => {
    if (!q) return [];
    return allArticles.filter(
      (a) =>
        a.item.toLowerCase().includes(q) ||
        a.section.toLowerCase().includes(q) ||
        a.catTitle.toLowerCase().includes(q),
    );
  }, [q, allArticles]);

  const categoryResults = useMemo(() => {
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
    );
  }, [q]);

  const highlight = (text: string) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-primary/15 text-primary font-medium">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher dans le centre d'aide…"
          className="pl-9 h-11 rounded-none border-border focus-visible:border-primary focus-visible:ring-primary/20"
        />
        {q && (
          <div className="absolute left-0 right-0 top-full mt-2 z-20 border border-border bg-background shadow-lg max-h-[420px] overflow-y-auto">
            {articleResults.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted-foreground">
                Aucun article ne correspond à « {query} ».
              </p>
            ) : (
              <ul>
                {articleResults.slice(0, 12).map((a) => (
                  <li key={`${a.catSlug}-${a.item}`}>
                    <Link
                      to={`/aide/${a.catSlug}/${slugify(a.item)}`}
                      className="flex flex-col gap-1 px-4 py-3 border-b border-border last:border-0 hover:bg-primary/5 hover:border-l-2 hover:border-l-primary transition-all"
                    >
                      <span className="text-sm text-foreground">{highlight(a.item)}</span>
                      <span className="text-xs text-primary/70 font-mono">
                        {a.catTitle} › {a.section}
                      </span>
                    </Link>
                  </li>
                ))}
                {articleResults.length > 12 && (
                  <li className="px-4 py-2 text-xs text-muted-foreground bg-muted/30">
                    +{articleResults.length - 12} autres résultats…
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border auto-rows-fr">
        {categoryResults.map((cat) => (
          <div key={cat.slug} className="bg-background flex">
            <CategoryCard cat={cat} />
          </div>
        ))}
      </div>

      {categoryResults.length === 0 && articleResults.length === 0 && (
        <p className="text-muted-foreground mt-8">Aucun résultat pour « {query} ».</p>
      )}
    </>
  );
}

function CategoryDetail({ cat }: { cat: Category }) {
  return (
    <>
      <nav className="mb-10 text-sm flex items-center gap-2 text-muted-foreground">
        <Link to="/aide" className="hover:text-primary underline-offset-4 hover:underline transition-colors">
          Quercus
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-primary/50" />
        <span className="text-primary font-medium">{cat.title}</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-serif italic mb-3 text-primary">{cat.title}</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl leading-relaxed">{cat.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {cat.sections.map((sec) => (
          <div key={sec.title} className="border border-border p-6 hover:border-primary/40 transition-colors bg-gradient-to-br from-transparent to-primary/[0.02]">
            <h2 className="text-lg font-serif text-foreground pb-3 mb-4 border-b border-primary/20">
              <em>{sec.title}</em>
            </h2>
            <ul className="space-y-3">
              {sec.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  <Link
                    to={`/aide/${cat.slug}/${slugify(item)}`}
                    className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-primary/20 pt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Vous ne trouvez pas la réponse à votre question ?
        </p>
        <Link
          to="/contact"
          className="text-sm font-serif italic text-primary underline underline-offset-4 hover:text-primary/80"
        >
          Contacter notre équipe →
        </Link>
      </div>
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-muted-foreground leading-relaxed mb-5">{block.text}</p>;
    case "h2":
      return (
        <h2 className="text-xl md:text-2xl font-serif italic text-foreground mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-2.5 mb-6">
          {block.items.map((it) => (
            <li key={it} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground/60 flex-shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3 mb-6 counter-reset">
          {block.items.map((it, i) => (
            <li key={it} className="flex items-start gap-4 text-sm text-muted-foreground leading-relaxed">
              <span className="flex-shrink-0 h-7 w-7 border border-border flex items-center justify-center text-xs font-serif text-foreground">
                {i + 1}
              </span>
              <span className="pt-1">{it}</span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          className={`border-l-2 ${
            block.tone === "warning" ? "border-foreground" : "border-muted-foreground/40"
          } pl-5 py-3 my-6 bg-muted/30`}
        >
          {block.title && (
            <p className="text-xs uppercase tracking-[0.18em] text-foreground mb-1.5">
              {block.title}
            </p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
        </div>
      );
    case "table":
      return (
        <div className="border border-border my-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {block.head.map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-serif italic text-foreground text-xs uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {row.map((c, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3 ${
                        j === 0 ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function ArticleView({
  cat,
  article,
  articleSlug,
}: {
  cat: Category;
  article: HelpArticle;
  articleSlug: string;
}) {
  const related = cat.sections
    .flatMap((s) => s.items)
    .filter((it) => slugify(it) !== articleSlug)
    .slice(0, 5);

  return (
    <>
      <nav className="mb-10 text-sm flex items-center gap-2 text-muted-foreground flex-wrap">
        <Link to="/aide" className="hover:text-foreground underline-offset-4 hover:underline">
          Quercus
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          to={`/aide/${cat.slug}`}
          className="hover:text-foreground underline-offset-4 hover:underline"
        >
          {cat.title}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{article.title}</span>
      </nav>

      <div className="grid md:grid-cols-[1fr_240px] gap-12">
        <article className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {article.categoryTitle}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif italic mb-5 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-5 text-xs text-muted-foreground mb-8 pb-8 border-b border-border">
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              Mis à jour le {article.updatedAt}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          </div>

          <p className="text-foreground/90 text-lg font-serif italic leading-relaxed mb-10">
            {article.intro}
          </p>

          {article.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}

          <div className="mt-14 border-t border-border pt-8">
            <p className="text-sm text-foreground mb-4 font-serif italic">
              Cet article vous a-t-il été utile ?
            </p>
            <div className="flex gap-3 mb-10">
              <button className="px-5 py-2 text-sm border border-border hover:border-foreground transition-colors">
                Oui
              </button>
              <button className="px-5 py-2 text-sm border border-border hover:border-foreground transition-colors">
                Non
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Besoin de plus d'informations ?
              </p>
              <Link
                to="/contact"
                className="text-sm font-serif italic text-foreground underline underline-offset-4"
              >
                Contacter notre équipe →
              </Link>
            </div>
          </div>
        </article>

        <aside className="hidden md:block">
          <div className="sticky top-28 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-foreground mb-4">
                Articles liés
              </p>
              <ul className="space-y-3">
                {related.map((it) => (
                  <li key={it}>
                    <Link
                      to={`/aide/${cat.slug}/${slugify(it)}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors leading-relaxed block"
                    >
                      {it}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to={`/aide/${cat.slug}`}
              className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            >
              ← Retour à {cat.title}
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export default function HelpCenter() {
  const { slug, articleSlug } = useParams();
  const [query, setQuery] = useState("");
  const cat = slug ? CATEGORIES.find((c) => c.slug === slug) : undefined;
  const article =
    cat && articleSlug ? HELP_ARTICLES[`${cat.slug}/${articleSlug}`] : undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />
      <main className="flex-1 pt-28 pb-24 max-w-6xl w-full mx-auto px-4 md:px-8">
        {cat && article && articleSlug ? (
          <ArticleView cat={cat} article={article} articleSlug={articleSlug} />
        ) : cat ? (
          <CategoryDetail cat={cat} />
        ) : (
          <HelpIndex query={query} setQuery={setQuery} />
        )}
      </main>
      <LandingFooter />
    </div>
  );
}
