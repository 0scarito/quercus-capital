import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Statements() {
  const { t } = useTranslation("dashboard");
  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold"><em>{t("statements.title")}</em></h1>
        <p className="text-sm text-muted-foreground mt-2">
          {t("statements.subtitle")}
        </p>
      </div>

      <div className="border rounded-sm">
        <div className="p-12 text-center space-y-4">
          <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto" />
          <p className="text-muted-foreground text-sm">
            {t("statements.empty")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("statements.emptyHint")}
          </p>
        </div>
      </div>
    </div>
  );
}
