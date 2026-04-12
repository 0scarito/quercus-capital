import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [25, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [-10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  return (
    <section ref={ref} className="py-20 px-6" style={{ perspective: "1200px" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          style={{ rotateX, rotateY, scale, opacity }}
          className="relative"
        >
          <div className="bg-white/40 backdrop-blur-[12px] border border-white/20 overflow-hidden shadow-2xl">
            {/* Scanline overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(173 50% 19% / 0.3) 2px, hsl(173 50% 19% / 0.3) 3px)",
              }}
            />
            {/* Glow */}
            <div className="absolute -inset-1 z-0 opacity-20 blur-xl bg-gradient-to-br from-[hsl(170,100%,16%)] to-[hsl(140,60%,85%)]" />
            {/* Placeholder dashboard screenshot */}
            <div className="relative z-[1] p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Portfolio Overview</p>
                  <p className="text-3xl font-serif font-semibold">€4 320 000</p>
                </div>
                <div className="flex gap-2">
                  {["EUR", "USD", "GBP"].map((c) => (
                    <span key={c} className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary">{c}</span>
                  ))}
                </div>
              </div>
              {/* Chart placeholder */}
              <div className="h-40 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 flex items-end justify-around px-4 pb-2">
                {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 92].map((h, i) => (
                  <div key={i} className="w-4 bg-primary/30 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              {/* Rows */}
              <div className="grid grid-cols-4 gap-4 text-sm">
                {[
                  { label: "Quercus Euro", value: "€2.1M", yield: "+2,20%" },
                  { label: "Quercus Dollar", value: "$1.8M", yield: "+4,00%" },
                  { label: "Quercus Pound", value: "£0.4M", yield: "+4,00%" },
                  { label: "Daily Interest", value: "€267", yield: "T+0" },
                ].map((r) => (
                  <div key={r.label} className="p-3 bg-white/30 border border-white/20 space-y-1">
                    <p className="text-xs text-muted-foreground">{r.label}</p>
                    <p className="font-mono font-medium">{r.value}</p>
                    <p className="text-xs text-success font-mono">{r.yield}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Floating animation via CSS */}
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              .dashboard-float { animation: dashboard-float 6s ease-in-out infinite; }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}
