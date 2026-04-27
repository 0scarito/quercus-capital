import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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

function IconBubble({ children, size = 36 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: "hsl(40 50% 78%)",
        fontSize: size === 36 ? 16 : 14,
      }}
    >
      {children}
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
  icon,
  title,
  subtitle,
  rate,
  iconSize = 36,
  alwaysBg = false,
}: {
  to: string;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  rate?: string;
  iconSize?: number;
  alwaysBg?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex items-start gap-3 px-3 py-2.5 rounded-[10px] transition-colors"
      style={{
        background: alwaysBg ? "hsl(var(--background))" : "transparent",
      }}
      onMouseEnter={(e) => {
        if (!alwaysBg) e.currentTarget.style.background = "hsl(var(--background))";
      }}
      onMouseLeave={(e) => {
        if (!alwaysBg) e.currentTarget.style.background = "transparent";
      }}
    >
      <IconBubble size={iconSize}>{icon}</IconBubble>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-serif text-foreground leading-tight">{title}</div>
        {subtitle && (
          <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug uppercase tracking-[0.05em]">
            {subtitle}
          </div>
        )}
      </div>
      {rate && (
        <div className="text-[13px] font-medium shrink-0 self-center" style={{ color: "hsl(var(--success))" }}>
          {rate}
        </div>
      )}
    </Link>
  );
}

function SolutionRow({
  to,
  onClick,
  icon,
  title,
  subtitle,
  alwaysBg = false,
}: {
  to: string;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  alwaysBg?: boolean;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-start gap-3 px-3 py-2.5 rounded-[10px] transition-colors"
      style={{ background: alwaysBg ? "hsl(var(--background))" : "transparent" }}
      onMouseEnter={(e) => {
        if (!alwaysBg) e.currentTarget.style.background = "hsl(var(--background))";
      }}
      onMouseLeave={(e) => {
        if (!alwaysBg) e.currentTarget.style.background = "transparent";
      }}
    >
      <IconBubble size={32}>{icon}</IconBubble>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-foreground leading-tight">{title}</div>
        <div className="text-[12px] text-muted-foreground mt-0.5 leading-snug">{subtitle}</div>
      </div>
    </Link>
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
      icon: "💵",
      name: "Quercus Smart Cash",
      subtitle: t("nav:productsList.velvetSubtitle"),
      yield: "€STR + 0,30 %",
      href: "/products/velvet",
    },
    {
      icon: "🔄",
      name: "Quercus Cash & Carry",
      subtitle: t("nav:productsList.tobamSubtitle"),
      yield: "~7–8 % p.a.",
      href: "/products/tobam",
    },
    {
      icon: "📋",
      name: t("nav:productsList.advisedName"),
      subtitle: t("nav:productsList.advisedSubtitle"),
      yield: t("nav:productsList.advisedYield"),
      href: "/portefeuille-conseille",
    },
  ];

  const solutionLeft = [
    { icon: "🛡", slug: "holdings", title: t("nav:solutionsList.holdings"), desc: t("nav:solutionsList.holdingsDesc") },
    { icon: "🏢", slug: "pme", title: t("nav:solutionsList.pme"), desc: t("nav:solutionsList.pmeDesc") },
    { icon: "🔐", slug: "crypto", title: t("nav:solutionsList.crypto"), desc: t("nav:solutionsList.cryptoDesc") },
  ];
  const solutionRight = [
    { icon: "⚖️", slug: "freelances", title: t("nav:solutionsList.freelances"), desc: t("nav:solutionsList.freelancesDesc") },
    { icon: "👤", slug: "particuliers", title: t("nav:solutionsList.particuliers"), desc: t("nav:solutionsList.particuliersDesc") },
  ];

  const resourceItems = [
    { icon: "🌿", href: "/a-propos", title: t("nav:resourcesList.about"), desc: t("nav:resourcesList.aboutDesc") },
    { icon: "📰", href: "/presse", title: t("nav:resourcesList.press"), desc: t("nav:resourcesList.pressDesc") },
    { icon: "📞", href: "/contact", title: t("nav:resourcesList.contact"), desc: t("nav:resourcesList.contactDesc") },
    { icon: "❓", href: "/aide", title: t("nav:resourcesList.help"), desc: t("nav:resourcesList.helpDesc") },
  ];

  const securityItems = [
    { icon: "🛡", href: "/securite", title: t("nav:securityList.security"), desc: t("nav:securityList.securityDesc") },
    { icon: "⚖️", href: "/regulation", title: t("nav:securityList.regulation"), desc: t("nav:securityList.regulationDesc") },
    { icon: "📋", href: "/securite#audits", title: t("nav:securityList.audit"), desc: t("nav:securityList.auditDesc") },
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
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={quercusLogo} alt="Quercus" className="h-11 w-auto" />
            <span className="text-xl font-serif tracking-widest">QUERCUS</span>
          </Link>

          {variant === "solutions" ? (
            <div className="hidden md:flex items-center gap-1.5 flex-1 justify-center overflow-x-auto">
              {segments.map((s) => (
                <Link
                  key={s.slug}
                  to={`/solutions/${s.slug}`}
                  className={`px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 border whitespace-nowrap ${
                    s.slug === currentSlug
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white/40 backdrop-blur-sm text-muted-foreground border-white/30 hover:bg-white/60 hover:text-foreground"
                  }`}
                >
                  {s.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {/* Products */}
              <div className="relative" onMouseEnter={() => open("products")} onMouseLeave={scheduleClose}>
                <Link to="/products" className={triggerClass("products")}>
                  {t("nav:products")}
                </Link>
                <DropdownPanel
                  open={openMenuKey === "products"}
                  width={600}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="flex flex-col">
                    {productItems.map((p) => (
                      <Row
                        key={p.name}
                        to={p.href}
                        onClick={close}
                        icon={p.icon}
                        title={p.name}
                        subtitle={p.subtitle}
                        rate={p.yield}
                      />
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid hsl(var(--border))", margin: "4px 0" }} />
                  <Link
                    to="/products"
                    onClick={close}
                    className="flex items-center justify-between px-3 py-2.5 rounded-[10px] transition-colors hover:bg-background"
                  >
                    <span className="text-[13px] font-medium text-primary">{t("nav:viewAllProducts")}</span>
                    <span className="text-[13px] text-primary">→</span>
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
                  width={560}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {solutionLeft.map((s) => (
                      <SolutionRow
                        key={s.slug}
                        to={`/solutions/${s.slug}`}
                        onClick={close}
                        icon={s.icon}
                        title={s.title}
                        subtitle={s.desc}
                      />
                    ))}
                    {solutionRight.map((s) => (
                      <SolutionRow
                        key={s.slug}
                        to={`/solutions/${s.slug}`}
                        onClick={close}
                        icon={s.icon}
                        title={s.title}
                        subtitle={s.desc}
                      />
                    ))}
                    <SolutionRow
                      to="/solutions"
                      onClick={close}
                      icon="🌐"
                      title={`${t("nav:solutionsList.allTitle")} →`}
                      subtitle={t("nav:solutionsList.allDesc")}
                      alwaysBg
                    />
                  </div>
                </DropdownPanel>
              </div>

              {/* Security & Regulation */}
              <div className="relative" onMouseEnter={() => open("security")} onMouseLeave={scheduleClose}>
                <button className={triggerClass("security")}>{t("nav:security")}</button>
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
                        icon={r.icon}
                        title={r.title}
                        subtitle={r.desc}
                      />
                    ))}
                  </div>
                </DropdownPanel>
              </div>

              {/* Resources / À propos */}
              <div className="relative" onMouseEnter={() => open("resources")} onMouseLeave={scheduleClose}>
                <button className={triggerClass("resources")}>{t("nav:resources")}</button>
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
                        icon={r.icon}
                        title={r.title}
                        subtitle={r.desc}
                      />
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid hsl(var(--border))", margin: "4px 0" }} />
                  <Link
                    to="/mentions-legales"
                    onClick={close}
                    className="block px-3 py-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t("nav:resourcesList.legal")}
                  </Link>
                </DropdownPanel>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" className="btn-glow" asChild>
              <Link to="/signin">{t("common:actions.signIn")}</Link>
            </Button>
            <Button size="sm" className="px-6 btn-glow" asChild>
              <Link to="/contact">{t("common:actions.bookMeeting")}</Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
