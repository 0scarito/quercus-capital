import { useState } from "react";
import { Mail, Phone, ShieldCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function MonConseiller() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

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
