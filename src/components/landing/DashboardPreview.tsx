import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, ChevronDown, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * A faithful, non-interactive mock of the real investor dashboard.
 * No overlay text — the image IS the dashboard.
 * Smooth parallax: rises and settles as the user scrolls into it.
 */
export function DashboardPreview() {
  const { t } = useTranslation("landing");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Cinematic "approach" — starts far away (small + low + tilted), travels toward viewer.
  // Eased ranges so motion feels weighted and silky, never abrupt.
  const y = useTransform(scrollYProgress, [0, 0.55, 0.75], [320, 40, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55, 0.8], [0.55, 0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.4], [0, 0.4, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.55, 0.8], [22, 6, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.35, 0.6], [10, 3, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} className="pt-32 pb-24 md:pt-48 md:pb-32 px-4 md:px-8 relative z-0">
      <div className="max-w-7xl mx-auto" style={{ perspective: "1600px" }}>
        <motion.div
          style={{ y, scale, opacity, rotateX, transformStyle: "preserve-3d" }}
          className="relative will-change-transform"
        >
          {/* Browser chrome frame */}
          <div className="relative overflow-hidden border border-border/50 shadow-2xl bg-card rounded-sm">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-muted/30">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-[10px] font-mono text-muted-foreground tracking-widest">
                  app.quercus-capital.com / dashboard
                </span>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="bg-background p-6 md:p-8 space-y-6">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <button className="flex items-center gap-2.5 px-3 py-2 border border-border/60 bg-card rounded-sm">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{t("dashboardPreview.mainAccount")}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 border border-border/60 rounded-sm text-sm">
                    <ArrowUpFromLine className="h-3.5 w-3.5" /> {t("dashboardPreview.withdraw")}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-sm text-sm">
                    <ArrowDownToLine className="h-3.5 w-3.5" /> {t("dashboardPreview.deposit")}
                  </div>
                </div>
              </div>

              {/* Balance card */}
              <div className="border border-border/60 rounded-sm p-6 bg-card">
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                      {t("dashboardPreview.totalBalance")}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight">
                      <span className="font-mono">2 480 312,57</span>{" "}
                      <span className="text-primary text-2xl">EUR</span>
                    </h2>
                    <div className="flex items-center gap-1.5 text-success mt-3">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span className="text-sm font-mono font-medium">3,42 %</span>
                      <span className="text-xs text-muted-foreground">{t("dashboardPreview.weightedYield")}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                      {t("dashboardPreview.interestGenerated")}
                    </p>
                    <p className="text-xl md:text-2xl font-serif font-semibold text-success">
                      <span className="font-mono">+18 247,93</span> EUR
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">{t("dashboardPreview.sinceJan")}</p>
                  </div>
                </div>
              </div>

              {/* Product cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border/60 rounded-sm p-5 bg-card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("dashboardPreview.fundType1")}</p>
                      <p className="font-serif text-lg italic">Velvet</p>
                    </div>
                    <span className="text-[10px] font-mono text-success border border-success/30 px-1.5 py-0.5 rounded-sm">
                      {t("dashboardPreview.active")}
                    </span>
                  </div>
                  <p className="font-mono text-xl font-semibold">1 850 000,00 €</p>
                  <div className="flex items-center justify-between mt-3 text-xs">
                    <span className="text-muted-foreground">{t("dashboardPreview.yield")}</span>
                    <span className="font-mono text-success">€STR + 0,30 %</span>
                  </div>
                </div>

                <div className="border border-border/60 rounded-sm p-5 bg-card">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("dashboardPreview.fundType2")}</p>
                      <p className="font-serif text-lg italic">TOBAM Crypto Liquidity</p>
                    </div>
                    <span className="text-[10px] font-mono text-success border border-success/30 px-1.5 py-0.5 rounded-sm">
                      {t("dashboardPreview.active")}
                    </span>
                  </div>
                  <p className="font-mono text-xl font-semibold">630 312,57 €</p>
                  <div className="flex items-center justify-between mt-3 text-xs">
                    <span className="text-muted-foreground">{t("dashboardPreview.targetYield")}</span>
                    <span className="font-mono text-success">~7–8 % p.a.</span>
                  </div>
                </div>
              </div>

              {/* Mini sparkline strip */}
              <div className="border border-border/60 rounded-sm p-5 bg-card">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t("dashboardPreview.performance30d")}
                  </p>
                  <span className="text-xs font-mono text-success">+0,28 %</span>
                </div>
                <svg viewBox="0 0 600 80" className="w-full h-16" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dashSpark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,60 L40,55 L80,58 L120,48 L160,50 L200,42 L240,45 L280,38 L320,40 L360,32 L400,35 L440,28 L480,30 L520,22 L560,25 L600,18 L600,80 L0,80 Z"
                    fill="url(#dashSpark)"
                  />
                  <path
                    d="M0,60 L40,55 L80,58 L120,48 L160,50 L200,42 L240,45 L280,38 L320,40 L360,32 L400,35 L440,28 L480,30 L520,22 L560,25 L600,18"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Soft ambient glow under the frame */}
          <div className="absolute -inset-x-12 -bottom-8 h-32 bg-primary/10 blur-3xl rounded-full pointer-events-none -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
