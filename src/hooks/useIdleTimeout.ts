import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const IDLE_LIMIT_MS = 15 * 60 * 1000; // 15 minutes
const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "wheel",
] as const;
const STORAGE_KEY = "quercus.lastActivity";

/**
 * Signs the user out after IDLE_LIMIT_MS of inactivity and redirects
 * to /signin?expired=1. Activity is tracked across tabs via localStorage.
 */
export function useIdleTimeout() {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) return;

    let timer: number | undefined;

    const expire = async () => {
      try {
        await supabase.auth.signOut();
      } finally {
        localStorage.removeItem(STORAGE_KEY);
        navigate("/signin?expired=1", { replace: true });
      }
    };

    const scheduleFromStored = () => {
      const stored = Number(localStorage.getItem(STORAGE_KEY) ?? Date.now());
      const elapsed = Date.now() - stored;
      const remaining = IDLE_LIMIT_MS - elapsed;
      window.clearTimeout(timer);
      if (remaining <= 0) {
        void expire();
        return;
      }
      timer = window.setTimeout(() => void expire(), remaining);
    };

    const recordActivity = () => {
      if (document.visibilityState === "hidden") return;
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      scheduleFromStored();
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) scheduleFromStored();
    };

    // Initialize: only reset the timestamp if none is set yet, so a reload
    // does not extend an already-idle session indefinitely.
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    }
    scheduleFromStored();

    ACTIVITY_EVENTS.forEach((evt) =>
      window.addEventListener(evt, recordActivity, { passive: true })
    );
    window.addEventListener("storage", onStorage);

    return () => {
      window.clearTimeout(timer);
      ACTIVITY_EVENTS.forEach((evt) =>
        window.removeEventListener(evt, recordActivity)
      );
      window.removeEventListener("storage", onStorage);
    };
  }, [session, navigate]);
}
