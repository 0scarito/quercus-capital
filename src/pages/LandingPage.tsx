import { LandingNav } from "@/components/landing/LandingNav";
import { AnnouncementBanner, useAnnouncementVisible } from "@/components/landing/AnnouncementBanner";
import { TrustBadgeStrip } from "@/components/landing/TrustBadgeStrip";
import { HeroSection } from "@/components/landing/HeroSection";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { YieldCards } from "@/components/landing/YieldCards";
import { YieldCalculator } from "@/components/landing/YieldCalculator";
import { LiveNumbers } from "@/components/landing/LiveNumbers";
import { PartnersSection } from "@/components/landing/PartnersSection";
import { TrustChain } from "@/components/landing/TrustChain";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { ClientSegmentsCards } from "@/components/landing/ClientSegmentsCards";
import { PressStrip } from "@/components/landing/PressStrip";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
  const bannerVisible = useAnnouncementVisible();
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <AnnouncementBanner />
      <LandingNav />
      <div style={{ paddingTop: bannerVisible ? "100px" : "64px" }} className="transition-[padding] duration-500 relative z-10">
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>
        <TrustBadgeStrip />
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
        <DashboardPreview />
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <div id="products">
            <YieldCards />
          </div>
        </ScrollReveal>
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <LiveNumbers />
        </ScrollReveal>
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <div id="calculator">
            <YieldCalculator />
          </div>
        </ScrollReveal>
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <SecuritySection />
        </ScrollReveal>
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <TrustChain />
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <div id="partners">
            <PartnersSection />
          </div>
        </ScrollReveal>
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <LandingFaq />
        </ScrollReveal>
        <Separator className="max-w-7xl mx-auto opacity-60" />
        <ScrollReveal>
          <PressStrip />
        </ScrollReveal>
        <LandingFooter />
      </div>
    </div>
  );
}
