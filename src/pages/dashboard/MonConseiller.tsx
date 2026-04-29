import { useState } from "react";
import { Mail, Phone, ShieldCheck, Send, Lock, Sparkles, ArrowDownToLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUserSubscriptions } from "@/hooks/useProducts";

export default function MonConseiller() {
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
      toast.success("Message envoyé à votre conseiller");
      setSubject("");
      setMessage("");
      setSending(false);
    }, 600);
  };

  if (!hasAdvisorAccess) {
    return (
      <div className="h-full overflow-auto p-6 max-w-4xl mx-auto w-full animate-fade-in space-y-6">
        <div>
          <h1 className="font-serif text-2xl"><em>Mon conseiller</em></h1>
          <p className="text-sm text-muted-foreground mt-1">
            Un service réservé à nos clients investissant 3 M€ ou plus.
          </p>
        </div>

        <div className="border rounded-sm bg-gradient-to-br from-primary/5 to-primary/10 p-10 text-center space-y-6">
          <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl"><em>Un conseiller dédié, rien que pour vous.</em></h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dès <span className="font-medium text-foreground">3 M€ investis</span>, un Conseiller en Gestion de Patrimoine vous accompagne personnellement :
              allocation sur-mesure, optimisation fiscale et suivi prioritaire par téléphone, e-mail ou rendez-vous.
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
              {totalWealth.toLocaleString("fr-FR")} € / 3 000 000 € — encore{" "}
              <span className="text-foreground font-medium">{remainingToUnlock.toLocaleString("fr-FR")} €</span> à investir
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild>
              <Link to="/produits"><ArrowDownToLine className="mr-2 h-4 w-4" />Investir maintenant</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            { icon: Sparkles, title: "Allocation sur-mesure", desc: "Une stratégie pensée pour votre situation patrimoniale globale." },
            { icon: ShieldCheck, title: "Suivi prioritaire", desc: "Réponse garantie sous 24h ouvrées par votre CGP dédié." },
            { icon: Phone, title: "Joignable directement", desc: "Téléphone, e-mail, rendez-vous physique ou visioconférence." },
          ].map((f) => (
            <div key={f.title} className="border rounded-sm bg-card p-5">
              <f.icon className="h-5 w-5 text-primary mb-3" />
              <p className="font-serif"><em>{f.title}</em></p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6 max-w-5xl mx-auto w-full animate-fade-in space-y-6">
      <div>
        <h1 className="font-serif text-2xl"><em>Mon conseiller</em></h1>
        <p className="text-sm text-muted-foreground mt-1">
          Votre Conseiller en Gestion de Patrimoine dédié, joignable par message, e-mail ou téléphone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="border rounded-sm p-6 bg-card space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xl font-serif">
              AB
            </div>
            <div>
              <p className="font-serif text-lg"><em>Alexandre Bernard</em></p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">CGP · Quercus Capital</p>
            </div>
          </div>

          <div className="border-t pt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>CIF ORIAS n° 24004789 · CGP — AMF</span>
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

          <p className="text-[11px] text-muted-foreground border-t pt-3">
            Disponible du lundi au vendredi, 9h–19h. Réponse garantie sous 24h ouvrées.
          </p>
        </div>

        <form onSubmit={handleSend} className="border rounded-sm p-6 bg-card space-y-4">
          <h2 className="font-serif text-lg"><em>Envoyer un message</em></h2>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs uppercase tracking-wider">Sujet</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Question sur mon allocation"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs uppercase tracking-wider">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              placeholder="Bonjour Alexandre, …"
              required
            />
          </div>
          <Button type="submit" disabled={sending} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            {sending ? "Envoi…" : "Envoyer le message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
