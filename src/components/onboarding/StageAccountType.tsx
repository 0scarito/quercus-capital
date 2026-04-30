import { motion } from "framer-motion";
import { User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface StageAccountTypeProps {
  onNext: (type: "particulier" | "moral") => void;
}

export function StageAccountType({ onNext }: StageAccountTypeProps) {
  const { t } = useTranslation("onboarding");
  const [selected, setSelected] = useState<"particulier" | "moral" | null>(null);

  const cardClass = (active: boolean) =>
    `bg-white/40 backdrop-blur-[12px] border p-8 cursor-pointer transition-all ${
      active ? "border-primary shadow-[0_0_24px_hsl(173_50%_19%/0.2)]" : "border-white/20 hover:border-primary/40"
    }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 max-w-lg mx-auto"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif"><em>{t("accountType.title")}</em></h2>
        <p className="text-sm text-muted-foreground">{t("accountType.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelected("particulier")}
          className={cardClass(selected === "particulier")}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <User className="w-10 h-10 text-primary" />
            <div>
              <p className="font-medium">{t("accountType.individual")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("accountType.individualDesc")}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelected("moral")}
          className={cardClass(selected === "moral")}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <Building2 className="w-10 h-10 text-primary" />
            <div>
              <p className="font-medium">{t("accountType.corporate")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("accountType.corporateDesc")}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={selected ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selected && (
          <Button onClick={() => onNext(selected)} size="lg" className="btn-glow w-full">
            {t("accountType.next")}
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
