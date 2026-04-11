import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { YieldCards } from "@/components/landing/YieldCards";
import { YieldCalculator } from "@/components/landing/YieldCalculator";
import { LiveNumbers } from "@/components/landing/LiveNumbers";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { SpecsTable } from "@/components/landing/SpecsTable";
import { UseCases } from "@/components/landing/UseCases";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <div className="pt-16">
        <HeroSection />
        <div id="products">
          <YieldCards />
        </div>
        <div id="calculator">
          <YieldCalculator />
        </div>
        <LiveNumbers />
        <div id="partners">
          <PartnersSection />
        </div>
        <div id="specs">
          <SpecsTable />
        </div>
        <UseCases />
        <LandingFooter />
      </div>
    </div>
  );
}
