import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { YieldCards } from "@/components/landing/YieldCards";
import { YieldCalculator } from "@/components/landing/YieldCalculator";
import { LiveNumbers } from "@/components/landing/LiveNumbers";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { SpecsTable } from "@/components/landing/SpecsTable";
import { UseCases } from "@/components/landing/UseCases";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <div className="pt-16">
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
        <ScrollReveal>
          <div id="products">
            <YieldCards />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div id="calculator">
            <YieldCalculator />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <LiveNumbers />
        </ScrollReveal>
        <ScrollReveal>
          <div id="partners">
            <PartnersSection />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div id="specs">
            <SpecsTable />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <UseCases />
        </ScrollReveal>
        <LandingFooter />
      </div>
    </div>
  );
}
