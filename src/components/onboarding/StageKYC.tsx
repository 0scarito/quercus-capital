import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScanFace, CheckCircle, Loader2 } from "lucide-react";
import quercusLogo from "@/assets/quercus-logo.jpg";

interface StageKYCProps {
  onComplete: () => void;
}

export function StageKYC({ onComplete }: StageKYCProps) {
  const [phase, setPhase] = useState<"ready" | "verifying" | "done">("ready");

  const handleVerify = () => {
    setPhase("verifying");
    // Simulate KYC provider integration
    setTimeout(() => setPhase("done"), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-md mx-auto text-center"
    >
      {phase === "ready" && (
        <>
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <ScanFace className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-serif"><em>Vérification d'identité</em></h2>
            <p className="text-sm text-muted-foreground">
              Dernière étape : nous devons vérifier votre identité pour activer votre compte.
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-[12px] border border-white/20 p-6 space-y-3 text-left">
            <p className="text-sm font-medium">Vous aurez besoin de :</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" /> Pièce d'identité (CNI ou Passeport)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" /> Caméra pour un selfie de vérification
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" /> 2 minutes de votre temps
              </li>
            </ul>
          </div>

          <Button onClick={handleVerify} size="lg" className="btn-glow w-full">
            Vérifier mon identité
          </Button>
        </>
      )}

      {phase === "verifying" && (
        <div className="space-y-6 py-12">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Vérification en cours…</p>
        </div>
      )}

      {phase === "done" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="space-y-6 py-8"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <motion.img
              src={quercusLogo}
              alt="Quercus"
              className="w-24 h-24 object-contain"
              initial={{ filter: "grayscale(100%) brightness(1.5)", opacity: 0.3 }}
              animate={{ filter: "grayscale(0%) brightness(1)", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>

          <div className="space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.8 }}
            >
              <CheckCircle className="w-12 h-12 text-success mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-serif"><em>Félicitations !</em></h2>
            <p className="text-sm text-muted-foreground">
              Votre compte est en cours d'examen. Vous recevrez une confirmation par email sous 24 à 48 heures.
            </p>
          </div>

          <Button onClick={onComplete} size="lg" className="btn-glow w-full">
            Accéder à mon espace
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
