import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
}

export function LanguageSwitcher({ variant = "light" }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "fr").slice(0, 2).toUpperCase();
  const next = current === "FR" ? "en" : "fr";

  const toggle = () => {
    i18n.changeLanguage(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  };

  const colorClasses =
    variant === "dark"
      ? "text-primary-foreground/70 hover:text-primary-foreground border-primary-foreground/20 hover:border-primary-foreground/40"
      : "text-muted-foreground hover:text-foreground border-border hover:border-foreground/30";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch language. Current: ${current}`}
      className={`text-[11px] font-mono tracking-widest px-2.5 py-1 border transition-colors ${colorClasses}`}
    >
      <span className={current === "FR" ? "font-semibold" : "opacity-60"}>FR</span>
      <span className="mx-1 opacity-40">/</span>
      <span className={current === "EN" ? "font-semibold" : "opacity-60"}>EN</span>
    </button>
  );
}
