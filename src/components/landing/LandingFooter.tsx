import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Linkedin, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function LandingFooter() {
  const { t } = useTranslation(["footer"]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const productLinks = [
    { label: t("footer:products.velvet"), href: "/products/velvet" },
    { label: t("footer:products.tobam"), href: "/products/tobam" },
    { label: t("footer:products.portefeuille"), href: "/products" },
    { label: t("footer:products.all"), href: "/products" },
  ];

  const useCaseLinksLeft = [
    { label: t("footer:useCases.holdings"), href: "/solutions/holdings" },
    { label: t("footer:useCases.pme"), href: "/solutions/pme" },
    { label: t("footer:useCases.startups"), href: "/solutions/startups" },
    { label: t("footer:useCases.crypto"), href: "/solutions/crypto" },
  ];

  const useCaseLinksRight = [
    { label: t("footer:useCases.freelances"), href: "/solutions/freelances" },
    { label: t("footer:useCases.fintechs"), href: "/solutions/fintechs" },
    { label: t("footer:useCases.sci"), href: "/solutions/sci" },
    { label: t("footer:useCases.particuliers"), href: "/solutions/particuliers" },
  ];

  const resourceLinks = [
    { label: t("footer:resources.about"), href: "/a-propos" },
    { label: t("footer:resources.press"), href: "/presse" },
    { label: t("footer:resources.contact"), href: "/contact" },
    { label: t("footer:resources.help"), href: "/aide" },
  ];

  const legalLinks = [
    { label: t("footer:legal.mentions"), href: "/mentions-legales" },
    { label: t("footer:legal.privacy"), href: "/confidentialite" },
    { label: t("footer:legal.cookies"), href: "/charte-cookie" },
    { label: t("footer:legal.amf"), href: "/mentions-legales" },
  ];

  const companyLinks = [
    { label: t("footer:company.mission"), href: "/a-propos" },
    { label: t("footer:company.about"), href: "/a-propos" },
    { label: t("footer:company.careers"), href: "/contact" },
  ];

  const contactLinks = [
    { label: t("footer:contactCol.email"), href: "mailto:contact@quercus-capital.fr" },
    { label: t("footer:contactCol.book"), href: "/contact" },
    { label: t("footer:contactCol.press"), href: "/presse" },
    { label: t("footer:contactCol.help"), href: "/aide" },
  ];

  const documentLinks = [
    { label: t("footer:documents.velvetProspectus"), href: "https://www.lfis.com" },
    { label: t("footer:documents.velvetKid"), href: "https://www.lfis.com" },
    { label: t("footer:documents.tobamProspectus"), href: "https://www.tobam.fr" },
    { label: t("footer:documents.regulatory"), href: "/mentions-legales" },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim().toLowerCase(), source: "footer" });

      if (error) {
        if (error.code === "23505") {
          toast.success(t("footer:newsletter.successAlready"));
        } else {
          console.error("newsletter error", error);
          toast.error(t("footer:newsletter.error"));
        }
      } else {
        toast.success(t("footer:newsletter.successNew"));
        setEmail("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="flex items-center justify-between gap-3 mb-10">
          <span className="text-3xl font-serif tracking-widest">QUERCUS</span>
          <LanguageSwitcher variant="dark" />
        </div>

        <Separator className="bg-primary-foreground/15 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-serif">{t("footer:follow")}</h3>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 flex items-center justify-center border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-6 space-y-4">
              <h4 className="text-xl font-serif">{t("footer:newsletter.title")}</h4>
              <p className="text-sm text-primary-foreground/70">{t("footer:newsletter.desc")}</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer:newsletter.placeholder")}
                  className="bg-background text-foreground placeholder:text-muted-foreground border-0 h-11"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  variant="secondary"
                  className="h-11 px-5 bg-foreground text-background hover:bg-foreground/90"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("footer:newsletter.subscribe")}
                </Button>
              </form>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <h4 className="text-xl font-serif">{t("footer:sections.products")}</h4>
              <ul className="space-y-3">
                {productLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-serif">{t("footer:sections.useCases")}</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-left">
                <ul className="space-y-3">
                  {useCaseLinksLeft.map((item) => (
                    <li key={item.label}>
                      <Link to={item.href} className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {useCaseLinksRight.map((item) => (
                    <li key={item.label}>
                      <Link to={item.href} className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-serif">{t("footer:sections.resources")}</h4>
              <ul className="space-y-3">
                {resourceLinks.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-base text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/15 mt-14 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm uppercase tracking-widest text-primary-foreground/70">
              {t("footer:sections.documentation")}
            </h4>
            <div className="flex flex-wrap gap-3">
              {documentLinks.map((doc) => (
                <a
                  key={doc.label}
                  href={doc.href}
                  target={doc.href.startsWith("http") ? "_blank" : undefined}
                  rel={doc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-xs px-3 py-2 border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
                >
                  <FileText className="h-3.5 w-3.5" />
                  {doc.label}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-4 md:text-right">
            <h4 className="text-sm uppercase tracking-widest text-primary-foreground/70">
              {t("footer:sections.legal")}
            </h4>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-primary-foreground/15 mt-10 mb-6" />
        <div className="space-y-4 text-[11px] text-primary-foreground/60 leading-relaxed">
          <p>
            <strong className="text-primary-foreground/80">{t("footer:disclaimer.warningLabel")}</strong>{" "}
            {t("footer:disclaimer.warning")}
          </p>
          <p>{t("footer:disclaimer.performance")}</p>
        </div>

        <Separator className="bg-primary-foreground/15 mt-8 mb-6" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-primary-foreground/50">
          <p>{t("footer:copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("footer:address")}</p>
        </div>
      </div>
    </footer>
  );
}
