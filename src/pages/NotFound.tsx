import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { Button } from "@/components/ui/button";
import { QuercusShield } from "@/components/QuercusShield";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation("landing");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingBlobs />
      <LandingNav />
      <main className="relative z-10 pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center opacity-90">
            <QuercusShield size={180} />
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary/70">
            {t("notFound.code")} · {t("notFound.eyebrow")}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-[1.05]">
            <em>{t("notFound.title")}</em>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t("notFound.subtitle")}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
            {location.pathname}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="lg" className="px-8 btn-glow">
              <Link to="/">{t("notFound.ctaHome")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 btn-glow">
              <Link to="/aide">{t("notFound.ctaHelp")}</Link>
            </Button>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default NotFound;
