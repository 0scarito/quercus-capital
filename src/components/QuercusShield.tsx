import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield } from "lucide-react";

interface QuercusShieldProps {
  size?: number;
  className?: string;
}

/**
 * 3D-orienting shield logo. Stays fixed in place but rotates on rotateX/rotateY
 * to face the cursor. Subtle (max ~18°), spring-smoothed.
 */
export function QuercusShield({ size = 64, className = "" }: QuercusShieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sy = useSpring(ry, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sx, (v) => `${v}deg`);
  const rotateY = useTransform(sy, (v) => `${v}deg`);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (window.innerWidth / 2);
    const dy = (e.clientY - cy) / (window.innerHeight / 2);
    ry.set(Math.max(-18, Math.min(18, dx * 18)));
    rx.set(Math.max(-18, Math.min(18, -dy * 18)));
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ perspective: 800 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 bg-primary"
          style={{ transform: "translateZ(-20px)" }}
        />
        <div
          className="relative flex items-center justify-center rounded-sm bg-gradient-to-br from-primary to-primary/70 shadow-lg"
          style={{ width: size, height: size }}
        >
          <Shield className="text-primary-foreground" style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.5} />
        </div>
      </motion.div>
    </div>
  );
}
