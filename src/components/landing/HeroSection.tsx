import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight">
          <em>The Quest for Excellence<br />in Liquidity Management.</em>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Generate daily yield on your corporate treasury with institutional-grade security.
          Your funds, invested in sovereign-backed instruments, never sit on our balance sheet.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button size="lg" className="px-10 text-base">
            Open Account
          </Button>
          <Button size="lg" variant="outline" className="px-10 text-base">
            Book a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
