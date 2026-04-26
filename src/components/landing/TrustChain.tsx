import { useTranslation } from "react-i18next";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { ShieldCheck, Lock, FileText } from "lucide-react";

export function TrustChain() {
  const { t } = useTranslation("landing");
  const blocks = [
    { Icon: ShieldCheck, title: t("trustChain.block1Title"), body: t("trustChain.block1Body") },
    { Icon: Lock, title: t("trustChain.block2Title"), body: t("trustChain.block2Body") },
    { Icon: FileText, title: t("trustChain.block3Title"), body: t("trustChain.block3Body") },
  ];

  return (
    <section className="py-20 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold">
              <em>{t("trustChain.title")}</em>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">{t("trustChain.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {blocks.map(({ Icon, title, body }, i) => (
            <div key={i} className="bg-background p-7 md:p-9 flex flex-col">
              <div className="h-12 w-12 border border-border flex items-center justify-center mb-6">
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-xl font-serif italic mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
