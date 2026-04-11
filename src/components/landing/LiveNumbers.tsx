import { useEffect, useState } from "react";

export function LiveNumbers() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Next payout at midnight CET
  const nextPayout = new Date(now);
  nextPayout.setUTCHours(23, 0, 0, 0); // ~midnight CET
  if (nextPayout <= now) nextPayout.setDate(nextPayout.getDate() + 1);
  const diff = nextPayout.getTime() - now.getTime();
  const hh = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          <em>Real-Time Transparency</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary-foreground/10">
          <div className="bg-primary p-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Total Treasury on Platform</p>
            <p className="text-4xl font-serif font-semibold">€1,3 Mrd</p>
          </div>
          <div className="bg-primary p-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Total Interest Paid</p>
            <p className="text-4xl font-serif font-semibold">€47,2 M</p>
          </div>
          <div className="bg-primary p-10 text-center space-y-2">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Next Interest Payout</p>
            <p className="text-4xl font-serif font-semibold font-mono tracking-wider">{hh}:{mm}:{ss}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
