import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import quercusLogo from "@/assets/quercus-logo.jpg";
import { segments } from "@/components/solutions/segmentData";
import { useAnnouncementVisible } from "@/components/landing/AnnouncementBanner";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavDropdownOverlay } from "@/components/landing/NavDropdownOverlay";

interface LandingNavProps {
  variant?: "default" | "solutions";
  currentSlug?: string;
}

type MenuKey = "products" | "solutions" | "security" | "resources" | null;

const NAV_HEIGHT = 64;

function IconBubble() {
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-full"
      style={{
        width: 36,
        height: 36,
        background: "#E8D5A3",
      }}
    >
      <span
        style={{
          display: "block",
          width: 14,
          height: 1.5,
          background: "#1A3A2A",
          borderRadius: 1,
        }}
      />
    </div>
  );
}

function DropdownPanel({
  open,
  width,
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  open: boolean;
  width: number;
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [render, setRender] = useState(open);
  useEffect(() => {
    if (open) setRender(true);
    else {
      const t = setTimeout(() => setRender(false), 160);
      return () => clearTimeout(t);
    }
  }, [open]);
  if (!render) return null;
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#FFFFFF",
        border: "1px solid hsl(var(--border))",
        borderRadius: 16,
        boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
        padding: 8,
        zIndex: 50,
        minWidth: width,
        width,
        animation: open
          ? "nav-dropdown-in 180ms ease forwards"
          : "nav-dropdown-out 140ms ease forwards",
      }}
    >
      {children}
    </div>
  );
}

function Row({
  to,
  onClick,
  title,
  subtitle,
}: {
  to: string;
  onClick: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-[10px] transition-colors"
      style={{
        padding: "10px 12px",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#F9F7F3";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <IconBubble />
      <div className="flex-1 min-w-0">
        <div
          className="font-serif italic leading-tight"
          style={{ fontSize: 15, color: "#1C1C1C" }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className="mt-1 leading-snug uppercase"
            style={{
              fontSize: 10,
              letterSpacing: "0.07em",
              color: "#9A9A9A",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </Link>
  );
}

function SolutionsCarousel({ currentSlug }: { currentSlug?: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Triple the list to fake an infinite loop
  const items = [...segments, ...segments, ...segments];

  // On mount, jump scroll to the middle copy and center the active item.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const middleStart = el.scrollWidth / 3;
    const activeIndex = segments.findIndex((s) => s.slug === currentSlug);
    let targetLeft = middleStart;
    if (activeIndex >= 0) {
      const activeEl = el.querySelectorAll<HTMLElement>("[data-seg]")[
        segments.length + activeIndex
      ];
      if (activeEl) {
        targetLeft =
          activeEl.offsetLeft - el.clientWidth / 2 + activeEl.clientWidth / 2;
      }
    }
    el.scrollLeft = targetLeft;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug]);

  // Loop scroll: when leaving the middle copy, snap back by one copy width.
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const copyWidth = el.scrollWidth / 3;
    if (el.scrollLeft < copyWidth * 0.5) {
      el.scrollLeft += copyWidth;
    } else if (el.scrollLeft > copyWidth * 1.5) {
      el.scrollLeft -= copyWidth;
    }
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="hidden md:flex items-center gap-2 flex-1 justify-center min-w-0">
      <button
        type="button"
        aria-label="Précédent"
        onClick={() => scrollBy(-1)}
        className="shrink-0 h-7 w-7 flex items-center justify-center bg-white/50 hover:bg-white/80 border border-white/40 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex items-center gap-1 overflow-x-auto scrollbar-none max-w-[520px]"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)",
        }}
      >
        {items.map((s, i) => (
          <Link
            key={`${s.slug}-${i}`}
            data-seg={s.slug}
            to={`/solutions/${s.slug}`}
            className={`px-3 py-1 text-[11px] font-medium tracking-wide transition-all duration-300 border whitespace-nowrap shrink-0 ${
              s.slug === currentSlug
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white/40 backdrop-blur-sm text-muted-foreground border-white/30 hover:bg-white/60 hover:text-foreground"
            }`}
          >
            {s.name}
          </Link>
        ))}
      </div>
      <button
        type="button"
        aria-label="Suivant"
        onClick={() => scrollBy(1)}
        className="shrink-0 h-7 w-7 flex items-center justify-center bg-white/50 hover:bg-white/80 border border-white/40 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function LandingNav({ variant = "default", currentSlug }: LandingNavProps = {}) {
  const { t } = useTranslation(["nav", "common"]);
  const [scrolled, setScrolled] = useState(false);
  const [openMenuKey, setOpenMenuKey] = useState<MenuKey>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const bannerVisible = useAnnouncementVisible();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = (key: MenuKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (openTimer.current) window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpenMenuKey(key), 120);
  };
  const scheduleClose = () => {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenuKey(null), 80);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const close = () => setOpenMenuKey(null);

  const productItems = [
    {
      name: "Velvet",
      subtitle: t("nav:productsList.velvetSubtitle"),
      href: "/products/velvet",
    },
    {
      name: "TOBAM Crypto Liquidity",
      subtitle: t("nav:productsList.tobamSubtitle"),
      href: "/products/tobam",
    },
  ];

  const solutionItems = [
    { slug: "holdings", title: t("nav:solutionsList.holdings"), desc: t("nav:solutionsList.holdingsDesc") },
    { slug: "pme", title: t("nav:solutionsList.pme"), desc: t("nav:solutionsList.pmeDesc") },
    { slug: "crypto", title: t("nav:solutionsList.crypto"), desc: t("nav:solutionsList.cryptoDesc") },
    { slug: "freelances", title: t("nav:solutionsList.freelances"), desc: t("nav:solutionsList.freelancesDesc") },
    { slug: "particuliers", title: t("nav:solutionsList.particuliers"), desc: t("nav:solutionsList.particuliersDesc") },
  ];

  const resourceItems = [
    { href: "/a-propos", title: t("nav:resourcesList.about"), desc: t("nav:resourcesList.aboutDesc") },
    { href: "/contact", title: t("nav:resourcesList.contact"), desc: t("nav:resourcesList.contactDesc") },
    { href: "/aide", title: t("nav:resourcesList.help"), desc: t("nav:resourcesList.helpDesc") },
  ];

  const securityItems = [
    { href: "/securite", title: t("nav:securityList.security"), desc: t("nav:securityList.securityDesc") },
    { href: "/regulation", title: t("nav:securityList.regulation"), desc: t("nav:securityList.regulationDesc") },
    { href: "/securite#audits", title: t("nav:securityList.audit"), desc: t("nav:securityList.auditDesc") },
  ];

  const overlayTop = (bannerVisible ? 36 : 0) + NAV_HEIGHT;

  const triggerClass = (key: MenuKey) =>
    `text-sm transition-colors py-4 inline-flex items-center gap-1 border-b-2 ${
      openMenuKey === key
        ? "text-primary border-accent"
        : "text-muted-foreground hover:text-foreground border-transparent"
    }`;

  return (
    <>
      <NavDropdownOverlay open={openMenuKey !== null} top={overlayTop} />
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: bannerVisible ? "36px" : "0",
          height: NAV_HEIGHT,
          backgroundColor: scrolled || openMenuKey ? "rgba(255,255,255,0.85)" : "transparent",
          backdropFilter: scrolled || openMenuKey ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled || openMenuKey ? "blur(16px)" : "none",
          borderBottom: "1px solid hsl(var(--border))",
        }}
      >
        <div className="px-6 md:px-10 h-full flex items-center justify-between gap-4 relative">
          <div className="flex items-center gap-4 shrink-0">
            <LanguageSwitcher />
            <div className="h-6 w-px bg-border" aria-hidden="true" />
            <Link to="/" className="flex items-center gap-3">
              <img src={quercusLogo} alt="Quercus" className="h-11 w-auto" />
              <span className="text-xl font-serif tracking-widest">QUERCUS</span>
            </Link>
          </div>

          {variant === "solutions" ? (
            <SolutionsCarousel currentSlug={currentSlug} />
          ) : (
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {/* Products */}
              <div className="relative" onMouseEnter={() => open("products")} onMouseLeave={scheduleClose}>
                <Link to="/products" className={triggerClass("products")}>
                  {t("nav:products")}
                </Link>
                <DropdownPanel
                  open={openMenuKey === "products"}
                  width={480}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="flex flex-col">
                    {productItems.map((p) => (
                      <Row
                        key={p.name}
                        to={p.href}
                        onClick={close}
                        title={p.name}
                        subtitle={p.subtitle}
                      />
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid hsl(var(--border))", margin: "4px 0" }} />
                  <Link
                    to="/products"
                    onClick={close}
                    className="flex items-center justify-between rounded-[10px] transition-colors"
                    style={{ padding: "10px 12px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F9F7F3")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: 13, color: "#1A3A2A", fontFamily: "'DM Sans', sans-serif" }}>
                      {t("nav:viewAllProducts")} →
                    </span>
                  </Link>
                </DropdownPanel>
              </div>

              {/* Solutions */}
              <div className="relative" onMouseEnter={() => open("solutions")} onMouseLeave={scheduleClose}>
                <Link to="/solutions" className={triggerClass("solutions")}>
                  {t("nav:solutions")}
                </Link>
                <DropdownPanel
                  open={openMenuKey === "solutions"}
                  width={480}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="flex flex-col">
                    {solutionItems.map((s) => (
                      <Row
                        key={s.slug}
                        to={`/solutions/${s.slug}`}
                        onClick={close}
                        title={s.title}
                        subtitle={s.desc}
                      />
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid hsl(var(--border))", margin: "4px 0" }} />
                  <Link
                    to="/solutions"
                    onClick={close}
                    className="flex items-center justify-between rounded-[10px] transition-colors"
                    style={{ padding: "10px 12px" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#F9F7F3")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: 13, color: "#1A3A2A", fontFamily: "'DM Sans', sans-serif" }}>
                      {t("nav:allSolutions")} →
                    </span>
                  </Link>
                </DropdownPanel>
              </div>

              {/* Security & Regulation */}
              <div className="relative" onMouseEnter={() => open("security")} onMouseLeave={scheduleClose}>
                <Link to="/securite" className={triggerClass("security")}>{t("nav:security")}</Link>
                <DropdownPanel
                  open={openMenuKey === "security"}
                  width={480}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="flex flex-col">
                    {securityItems.map((r) => (
                      <Row
                        key={r.href}
                        to={r.href}
                        onClick={close}
                        title={r.title}
                        subtitle={r.desc}
                      />
                    ))}
                  </div>
                </DropdownPanel>
              </div>

              {/* Resources / À propos */}
              <div className="relative" onMouseEnter={() => open("resources")} onMouseLeave={scheduleClose}>
                <Link to="/a-propos" className={triggerClass("resources")}>{t("nav:resources")}</Link>
                <DropdownPanel
                  open={openMenuKey === "resources"}
                  width={480}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="flex flex-col">
                    {resourceItems.map((r) => (
                      <Row
                        key={r.href}
                        to={r.href}
                        onClick={close}
                        title={r.title}
                        subtitle={r.desc}
                      />
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid hsl(var(--border))", margin: "4px 0" }} />
                  <Link
                    to="/mentions-legales"
                    onClick={close}
                    className="block transition-colors"
                    style={{ padding: "8px 12px", fontSize: 11, color: "#9A9A9A" }}
                  >
                    {t("nav:resourcesList.legal")}
                  </Link>
                </DropdownPanel>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="ghost" size="sm" className="btn-glow" asChild>
              <Link to="/signin">{t("common:actions.signIn")}</Link>
            </Button>
            <Button size="sm" className="px-6 btn-glow" asChild>
              <Link to="/open-account">{t("common:actions.openAccount")}</Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
