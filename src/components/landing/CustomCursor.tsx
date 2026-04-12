import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary/40 pointer-events-none z-[9999] mix-blend-darken"
      style={{
        transform: `translate(${pos.x - 16}px, ${pos.y - 16}px)`,
        transition: "transform 0.15s ease-out, opacity 0.2s",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
