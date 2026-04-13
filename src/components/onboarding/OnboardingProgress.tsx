import { motion } from "framer-motion";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/30"
    >
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
}
