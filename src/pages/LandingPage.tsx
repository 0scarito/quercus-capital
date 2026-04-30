import { LandingNav } from "@/components/landing/LandingNav";
import { AnnouncementBanner, useAnnouncementVisible } from "@/components/landing/AnnouncementBanner";
import { TrustBadgeStrip } from "@/components/landing/TrustBadgeStrip";
import { HeroSection } from "@/components/landing/HeroSection";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { YieldCards } from "@/components/landing/YieldCards";
import { YieldCalculator } from "@/components/landing/YieldCalculator";
import { LiveNumbers } from "@/components/landing/LiveNumbers";
import { ForEveryoneSection } from "@/components/landing/ForEveryoneSection";
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
import { SectionRule } from "@/components/landing/SectionRule";
import { SectionEyebrow } from "@/components/landing/SectionEyebrow";
import { HeroAmbientField } from "@/components/landing/HeroAmbientField";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const bannerVisible = useAnnouncementVisible();
  const { t } = useTranslation("landing");
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <AnnouncementBanner />
      <LandingNav />
      <div style={{ paddingTop: bannerVisible ? "100px" : "64px" }} className="transition-[padding] duration-500 relative z-10">
        <div className="relative">
          <div className="absolute inset-0 -z-10 h-[120%]">
            <HeroAmbientField />
          </div>
          <ScrollReveal variant="fade-up">
            <HeroSection />
          </ScrollReveal>
        </div>
        <TrustBadgeStrip />
        <SectionRule />
        <ScrollReveal variant="mask-up">
          <SectionEyebrow number={1} label={t("sectionEyebrows.method")} />
          <HowItWorks />
        </ScrollReveal>
        <DashboardPreview />
        <SectionRule />
        <ScrollReveal variant="fade-up">
          <SectionEyebrow number={2} label={t("sectionEyebrows.products")} />
          <div id="products">
            <YieldCards />
          </div>
        </ScrollReveal>
        <SectionRule />
        <ScrollReveal variant="scale-in">
          <SectionEyebrow number={3} label={t("sectionEyebrows.live")} />
          <LiveNumbers />
        </ScrollReveal>
        <SectionRule />
        <ScrollReveal variant="fade-left">
          <SectionEyebrow number={4} label={t("sectionEyebrows.calculator")} />
          <div id="calculator">
            <YieldCalculator />
          </div>
        </ScrollReveal>
        <SectionRule />
        <ScrollReveal variant="fade-right">
          <SectionEyebrow number={5} label={t("sectionEyebrows.audience")} />
          <ForEveryoneSection />
        </ScrollReveal>
        <SectionRule />
        <ScrollReveal variant="mask-up">
          <SectionEyebrow number={6} label={t("sectionEyebrows.security")} />
          <SecuritySection />
        </ScrollReveal>
        <SectionRule />
        <TrustChain />
        <SectionRule />
        <ScrollReveal variant="fade-up">
          <SectionEyebrow number={7} label={t("sectionEyebrows.partners")} />
          <div id="partners">
            <PartnersSection />
          </div>
        </ScrollReveal>
        <SectionRule />
        <ScrollReveal variant="fade-left">
          <SectionEyebrow number={8} label={t("sectionEyebrows.voices")} />
          <Testimonials />
        </ScrollReveal>
        <SectionRule />
        <ScrollReveal variant="fade-right">
          <SectionEyebrow number={9} label={t("sectionEyebrows.questions")} />
          <LandingFaq />
        </ScrollReveal>
        <SectionRule />
        <ScrollReveal variant="fade-up">
          <SectionEyebrow number={10} label={t("sectionEyebrows.press")} />
          <PressStrip />
        </ScrollReveal>
        <LandingFooter />
      </div>
    </div>
  );
}
