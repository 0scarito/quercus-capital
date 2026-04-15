import { motion } from "framer-motion";
import { ShieldCheck, FileText, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import quercusLogo from "@/assets/quercus-logo.jpg";
interface StageWelcomeProps {
  onNext: () => void;
}

const steps = [
  { icon: ShieldCheck, label: "Compte sécurisé", desc: "Email & authentification 2FA" },
  { icon: FileText, label: "Informations", desc: "Identité & documents légaux" },
  { icon: ScanFace, label: "Vérification", desc: "Scan de votre pièce d'identité" },
];

export function StageWelcome({ onNext }: StageWelcomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-10 text-center"
    >
      <div className="space-y-3">
        <h1 className="text-3xl font-serif">
          <em>Bienvenue chez Quercus</em>
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Créez votre compte en quelques minutes. Voici les trois étapes qui vous attendent.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            className="bg-white/40 backdrop-blur-[12px] border border-white/20 p-6 flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="font-medium text-sm">{s.label}</span>
            <span className="text-xs text-muted-foreground">{s.desc}</span>
          </motion.div>
        ))}
      </div>

      <Button onClick={onNext} size="lg" className="btn-glow w-full max-w-sm mx-auto">
        Démarrer la création de compte
      </Button>
    </motion.div>
  );
}
