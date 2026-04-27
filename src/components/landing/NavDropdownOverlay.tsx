import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export function NavDropdownOverlay({ open, top }: { open: boolean; top: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (open) setMounted(true);
    else {
      const t = setTimeout(() => setMounted(false), 220);
      return () => clearTimeout(t);
    }
  }, [open]);
  if (!mounted) return null;
  return createPortal(
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        top: `${top}px`,
        background: "hsl(40 33% 95% / 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 40,
        pointerEvents: "none",
        opacity: open ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    />,
    document.body
  );
}
