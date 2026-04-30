import { useState } from "react";
import { Mail, Phone, ShieldCheck, Send, Lock, Sparkles, ArrowDownToLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUserSubscriptions } from "@/hooks/useProducts";
import { useTranslation, Trans } from "react-i18next";

export default function MonConseiller() {
  const { t, i18n } = useTranslation("dashboard");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { data: subscriptions } = useUserSubscriptions();
  const totalWealth = (subscriptions ?? []).reduce((acc, s) => acc + Number(s.amount), 0);
  const ADVISOR_THRESHOLD = 3_000_000;
  const hasAdvisorAccess = totalWealth >= ADVISOR_THRESHOLD;
  const remainingToUnlock = Math.max(0, ADVISOR_THRESHOLD - totalWealth);
  const progress = Math.min(100, (totalWealth / ADVISOR_THRESHOLD) * 100);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success(t("advisor.form.sent"));
      setSubject("");
      setMessage("");
      setSending(false);
    }, 600);
  };

  const locale = i18n.language === "en" ? "en-US" : "fr-FR";
  const fmt = (n: number) => n.toLocaleString(locale);
  const perks = (t("advisor.perks", { returnObjects: true }) as Array<{ title: string; desc: string }>) || [];
  const perkIcons = [Sparkles, ShieldCheck, Phone];

  if (!hasAdvisorAccess) {
    return (
      <div className="h-full overflow-auto p-6 max-w-4xl mx-auto w-full animate-fade-in space-y-6">
        <div>
          <h1 className="font-serif text-2xl"><em>{t("advisor.title")}</em></h1>
          <p className="text-sm text-muted-foreground mt-1">{t("advisor.lockedSubtitle")}</p>
        </div>

        <div className="border rounded-sm bg-gradient-to-br from-primary/5 to-primary/10 p-10 text-center space-y-6">
          <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl"><em>{t("advisor.lockedHero")}</em></h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <Trans i18nKey="advisor.lockedDesc" t={t} components={[<span className="font-medium text-foreground" />]} />
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <div className="h-2 bg-muted/60 rounded-sm overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              <Trans
                i18nKey="advisor.progress"
                t={t}
                values={{ wealth: `${fmt(totalWealth)} €`, remaining: `${fmt(remainingToUnlock)} €` }}
                components={[<span className="text-foreground font-medium" />]}
              />
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild>
              <Link to="/produits"><ArrowDownToLine className="mr-2 h-4 w-4" />{t("advisor.investNow")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">{t("advisor.contactUs")}</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {perks.map((f, i) => {
            const Icon = perkIcons[i] ?? Sparkles;
            return (
              <div key={f.title} className="border rounded-sm bg-card p-5">
                <Icon className="h-5 w-5 text-primary mb-3" />
                <p className="font-serif"><em>{f.title}</em></p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6 max-w-5xl mx-auto w-full animate-fade-in space-y-6">
      <div>
        <h1 className="font-serif text-2xl"><em>{t("advisor.title")}</em></h1>
        <p className="text-sm text-muted-foreground mt-1">{t("advisor.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="border rounded-sm p-6 bg-card space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xl font-serif">
              AB
            </div>
            <div>
              <p className="font-serif text-lg"><em>Alexandre Bernard</em></p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{t("advisor.advisorRole")}</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>{t("advisor.credentials")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href="mailto:conseiller@quercus-capital.fr" className="hover:underline">
                conseiller@quercus-capital.fr
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href="tel:+33180000000" className="hover:underline">+33 1 80 00 00 00</a>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground border-t pt-3">{t("advisor.availability")}</p>
        </div>

        <form onSubmit={handleSend} className="border rounded-sm p-6 bg-card space-y-4">
          <h2 className="font-serif text-lg"><em>{t("advisor.form.title")}</em></h2>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs uppercase tracking-wider">{t("advisor.form.subject")}</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t("advisor.form.subjectPlaceholder")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs uppercase tracking-wider">{t("advisor.form.message")}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              placeholder={t("advisor.form.messagePlaceholder")}
              required
            />
          </div>
          <Button type="submit" disabled={sending} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            {sending ? t("advisor.form.sending") : t("advisor.form.send")}
          </Button>
        </form>
      </div>
    </div>
  );
}
