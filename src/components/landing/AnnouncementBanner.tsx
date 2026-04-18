import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";

const STORAGE_KEY = "quercus_banner_dismissed_v1";

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setVisible(localStorage.getItem(STORAGE_KEY) !== "1");
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground">
      <div className="px-6 md:px-10 h-9 flex items-center justify-between gap-4 text-xs">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-80" />
          <span className="tracking-wide">
            Quercus Capital — Plateforme désormais ouverte aux <em className="font-serif">holdings</em> et <em className="font-serif">family offices</em>.
          </span>
        </div>
        <button
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, "1");
            setVisible(false);
            window.dispatchEvent(new Event("quercus:banner-dismissed"));
          }}
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Fermer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function useAnnouncementVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setVisible(localStorage.getItem(STORAGE_KEY) !== "1");
    update();
    window.addEventListener("storage", update);
    window.addEventListener("quercus:banner-dismissed", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("quercus:banner-dismissed", update);
    };
  }, []);
  return visible;
}
