import { useParams, Navigate } from "react-router-dom";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { SegmentHero } from "@/components/solutions/SegmentHero";
import { ComparisonTable } from "@/components/solutions/ComparisonTable";
import { IntegrationRoadmap } from "@/components/solutions/IntegrationRoadmap";
import { SecurityBlock } from "@/components/solutions/SecurityBlock";
import { FaqAccordion } from "@/components/solutions/FaqAccordion";
import { getSegmentBySlug } from "@/components/solutions/segmentData";

export default function SolutionDetailPage() {
  const { segment } = useParams<{ segment: string }>();
  const data = segment ? getSegmentBySlug(segment) : undefined;

  if (!data) return <Navigate to="/solutions" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <FloatingBlobs />
      <LandingNav variant="solutions" currentSlug={data.slug} />
      <div className="pt-16 relative z-10">
        <SegmentHero current={data} />
        <ComparisonTable segment={data} />
        <IntegrationRoadmap />
        <SecurityBlock />
        <FaqAccordion />
        <LandingFooter />
      </div>
    </div>
  );
}
