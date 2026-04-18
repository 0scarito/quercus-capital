import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield } from "lucide-react";

interface QuercusShieldProps {
  size?: number;
  className?: string;
}

/**
 * Imposing 3D-orienting shield logo with periodic shine sweep.
 * Centered in its container, rotates subtly toward cursor.
 */
export function QuercusShield({ size = 64, className = "" }: QuercusShieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sy = useSpring(ry, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sx, (v) => `${v}deg`);
  const rotateY = useTransform(sy, (v) => `${v}deg`);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (window.innerWidth / 2);
    const dy = (e.clientY - cy) / (window.innerHeight / 2);
    ry.set(Math.max(-15, Math.min(15, dx * 15)));
    rx.set(Math.max(-15, Math.min(15, -dy * 15)));
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
      className={`flex items-center justify-center w-full ${className}`}
      style={{ perspective: 1200, minHeight: size * 1.6 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Outer ambient glow */}
        <div
          className="absolute rounded-full blur-3xl bg-primary/30 animate-pulse"
          style={{
            width: size * 1.8,
            height: size * 1.8,
            left: -size * 0.4,
            top: -size * 0.4,
            transform: "translateZ(-60px)",
          }}
        />

        {/* Mid halo ring */}
        <div
          className="absolute rounded-full border border-primary/20"
          style={{
            width: size * 1.35,
            height: size * 1.35,
            left: -size * 0.175,
            top: -size * 0.175,
            transform: "translateZ(-30px)",
          }}
        />

        {/* Rotating outer ring (slow) */}
        <motion.div
          className="absolute rounded-full border border-dashed border-primary/30"
          style={{
            width: size * 1.15,
            height: size * 1.15,
            left: -size * 0.075,
            top: -size * 0.075,
            transform: "translateZ(-10px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Shield body */}
        <div
          className="relative flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/60 shadow-2xl overflow-hidden"
          style={{
            width: size,
            height: size,
            boxShadow:
              "0 25px 60px -15px hsl(var(--primary) / 0.5), 0 0 0 1px hsl(var(--primary) / 0.3), inset 0 1px 0 hsl(var(--primary-foreground) / 0.2)",
          }}
        >
          {/* Inner gradient highlight */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, hsl(var(--primary-foreground) / 0.25), transparent 60%)",
            }}
          />

          {/* Periodic shine sweep — every ~6s */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, hsl(var(--primary-foreground) / 0.55) 48%, hsl(var(--primary-foreground) / 0.8) 50%, hsl(var(--primary-foreground) / 0.55) 52%, transparent 70%)",
              backgroundSize: "250% 100%",
            }}
            animate={{ backgroundPositionX: ["150%", "-150%"] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
          />

          <Shield
            className="relative text-primary-foreground drop-shadow-lg"
            style={{ width: size * 0.5, height: size * 0.5 }}
            strokeWidth={1.5}
          />
        </div>
      </motion.div>
    </div>
  );
}
