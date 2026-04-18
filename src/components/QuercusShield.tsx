import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import shieldImg from "@/assets/quercus-shield.png";

interface QuercusShieldProps {
  size?: number;
  className?: string;
}

/**
 * Imposing 3D padlock shield with periodic shine sweep.
 * Uses real rendered shield asset, tilts toward cursor.
 */
export function QuercusShield({ size = 280, className = "" }: QuercusShieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 80, damping: 20 });
  const sy = useSpring(ry, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(sx, (v) => `${v}deg`);
  const rotateY = useTransform(sy, (v) => `${v}deg`);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (window.innerWidth / 2);
    const dy = (e.clientY - cy) / (window.innerHeight / 2);
    ry.set(Math.max(-10, Math.min(10, dx * 10)));
    rx.set(Math.max(-8, Math.min(8, -dy * 8)));
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
      style={{ perspective: 1400, minHeight: size * 1.25 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ambient outer glow */}
        <div
          className="absolute rounded-full blur-3xl bg-primary/25 animate-pulse"
          style={{
            width: size * 1.6,
            height: size * 1.6,
            left: -size * 0.3,
            top: -size * 0.3,
            transform: "translateZ(-80px)",
          }}
        />

        {/* Soft floor shadow */}
        <div
          className="absolute rounded-[50%] bg-primary/30 blur-2xl"
          style={{
            width: size * 0.9,
            height: size * 0.12,
            left: size * 0.05,
            top: size * 1.05,
            transform: "translateZ(-40px)",
          }}
        />

        {/* Slow rotating dashed halo */}
        <motion.div
          className="absolute rounded-full border border-dashed border-primary/25"
          style={{
            width: size * 1.2,
            height: size * 1.2,
            left: -size * 0.1,
            top: -size * 0.1,
            transform: "translateZ(-20px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Subtle counter-rotating ring */}
        <motion.div
          className="absolute rounded-full border border-primary/15"
          style={{
            width: size * 1.4,
            height: size * 1.4,
            left: -size * 0.2,
            top: -size * 0.2,
            transform: "translateZ(-30px)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />

        {/* Shield image with shine mask */}
        <div
          className="relative"
          style={{
            width: size,
            height: size * 1.2,
            filter: "drop-shadow(0 30px 50px hsl(var(--primary) / 0.35)) drop-shadow(0 10px 20px hsl(var(--primary) / 0.2))",
          }}
        >
          {/* Subtle floating motion */}
          <motion.div
            className="relative w-full h-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={shieldImg}
              alt="Quercus security shield"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />

            {/* Shine sweep — masked to shield silhouette */}
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-screen"
              style={{
                WebkitMaskImage: `url(${shieldImg})`,
                maskImage: `url(${shieldImg})`,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 46%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.15) 54%, transparent 65%)",
                backgroundSize: "250% 100%",
              }}
              animate={{ backgroundPositionX: ["180%", "-80%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatDelay: 4.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
