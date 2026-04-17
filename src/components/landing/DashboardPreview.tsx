import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dashboardImg from "@/assets/dashboard-preview.jpg";

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [-120, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 0.92]);

  return (
    <section ref={ref} className="py-12 md:py-16 px-4 md:px-8 -mt-20 md:-mt-32 relative z-0">
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ y, scale, opacity }}
          className="relative"
        >
          <div className="relative overflow-hidden border border-border/40 shadow-2xl bg-card">
            <img
              src={dashboardImg}
              alt="Aperçu de la plateforme Quercus — tableau de bord investisseur"
              className="w-full h-auto block"
              loading="lazy"
              width={1920}
              height={1080}
            />
            {/* Subtle parchment tint to blend with the page */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
