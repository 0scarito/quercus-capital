import { ShieldCheck, Landmark, FileCheck2, Scale } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TrustBadgeStrip() {
  const { t } = useTranslation("landing");
  const items = [
    { icon: Landmark, label: t("trust.custody") },
    { icon: FileCheck2, label: t("trust.audit") },
    { icon: Scale, label: t("trust.regulator") },
    { icon: ShieldCheck, label: t("trust.segregation") },
  ];
  return (
    <section className="px-4 md:px-8 -mt-2 md:-mt-4 relative z-10">
      <div className="max-w-[1500px] mx-auto bg-white/40 backdrop-blur-[12px] border border-white/30 px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 text-xs md:text-[13px] text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-primary shrink-0" />
              <span className="leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
