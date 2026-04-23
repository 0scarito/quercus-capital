import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { StageWelcome } from "@/components/onboarding/StageWelcome";
import { StageEmailVerification } from "@/components/onboarding/StageEmailVerification";
import { Stage2FA } from "@/components/onboarding/Stage2FA";
import { StageAccountType } from "@/components/onboarding/StageAccountType";
import { StageIndividual } from "@/components/onboarding/StageIndividual";
import { StageCorporate } from "@/components/onboarding/StageCorporate";
import { StageKYC } from "@/components/onboarding/StageKYC";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import quercusLogo from "@/assets/quercus-logo.jpg";

type Stage = "welcome" | "email" | "2fa" | "type" | "individual" | "corporate" | "kyc";

const stageOrder: Stage[] = ["welcome", "email", "2fa", "type"];
// individual/corporate/kyc are branched

function getStepNumber(stage: Stage, accountType: "particulier" | "moral" | null): number {
  const base: Record<Stage, number> = {
    welcome: 1, email: 2, "2fa": 3, type: 4,
    individual: 5, corporate: 5, kyc: 6,
  };
  return base[stage] || 1;
}

const TOTAL_STEPS = 6;

export default function OpenAccount() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const { data: profile } = useProfile();
  const [stage, setStage] = useState<Stage>("welcome");
  const [accountType, setAccountType] = useState<"particulier" | "moral" | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (profile?.onboarding_completed) {
      navigate("/dashboard", { replace: true });
    }
  }, [profile?.onboarding_completed, navigate]);

  useEffect(() => {
    if (loading || !session?.user?.email) return;

    const params = new URLSearchParams(window.location.search);
    const callbackEmail = params.get("email");

    // Pre-fill the email from session so later steps have it, but DO NOT
    // auto-skip stages. An incomplete onboarding must always restart from
    // the beginning (welcome) so the user re-confirms every step.
    setEmail(callbackEmail ?? session.user.email);

    // Only auto-advance when arriving from an explicit email-verification
    // callback (?email=...), which means the email step is genuinely done.
    if (callbackEmail) {
      setStage((prev) => (prev === "welcome" || prev === "email" ? "2fa" : prev));
    }

    if (params.toString()) {
      window.history.replaceState({}, "", "/open-account");
    }
  }, [loading, session]);

  const stepNumber = getStepNumber(stage, accountType);

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <FloatingBlobs />
      <OnboardingProgress currentStep={stepNumber} totalSteps={TOTAL_STEPS} />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src={quercusLogo} alt="Quercus" className="h-8 w-auto" />
          <span className="text-lg font-serif tracking-widest">QUERCUS</span>
        </Link>
        <Link to="/signin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Déjà un compte ?
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {stage === "welcome" && (
              <StageWelcome key="welcome" onNext={() => setStage("email")} />
            )}

            {stage === "email" && (
              <StageEmailVerification
                key="email"
                defaultEmail={email}
                onNext={(data) => { setEmail(data.email); setStage("2fa"); }}
              />
            )}

            {stage === "2fa" && (
              <Stage2FA
                key="2fa"
                onNext={() => setStage("type")}
              />
            )}

            {stage === "type" && (
              <StageAccountType
                key="type"
                onNext={(type) => {
                  setAccountType(type);
                  setStage(type === "particulier" ? "individual" : "corporate");
                }}
              />
            )}

            {stage === "individual" && (
              <StageIndividual
                key="individual"
                onNext={() => setStage("kyc")}
                onBack={() => setStage("type")}
              />
            )}

            {stage === "corporate" && (
              <StageCorporate
                key="corporate"
                onNext={() => setStage("kyc")}
                onBack={() => setStage("type")}
              />
            )}

            {stage === "kyc" && (
              <StageKYC
                key="kyc"
                onComplete={() => navigate("/dashboard")}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
