import { useEffect, useState } from "react";
import { CountUp } from "@/components/landing/CountUp";
import { GlassCard } from "@/components/landing/GlassCard";

export function LiveNumbers() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const nextPayout = new Date(now);
  nextPayout.setUTCHours(23, 0, 0, 0);
  if (nextPayout <= now) nextPayout.setDate(nextPayout.getDate() + 1);
  const diff = nextPayout.getTime() - now.getTime();
  const hh = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          <em>Transparence en temps réel</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <GlassCard className="p-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Trésorerie totale</p>
            <p className="text-4xl font-serif font-semibold">
              €<CountUp end={1300} suffix=" M" />
            </p>
          </GlassCard>
          <GlassCard className="p-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Intérêts versés</p>
            <p className="text-4xl font-serif font-semibold">
              €<CountUp end={47.2} decimals={1} suffix=" M" />
            </p>
          </GlassCard>
          <GlassCard className="p-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Prochain versement</p>
            <p className="text-4xl font-serif font-semibold font-mono tracking-wider">{hh}:{mm}:{ss}</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
