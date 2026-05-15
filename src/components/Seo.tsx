import { Helmet } from "react-helmet-async";

const SITE_URL = "https://quercus-capital.lovable.app";

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export interface SeoProps {
  title: string;
  description: string;
  path: string; // e.g. "/products"
  ogType?: "website" | "article";
  jsonLd?: JsonLd;
}

/**
 * Per-route head tags. Sets unique <title>, <meta description>,
 * canonical, and Open Graph for each page so social previews and
 * search results aren't all the homepage default.
 */
export function Seo({ title, description, path, ogType = "website", jsonLd }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}