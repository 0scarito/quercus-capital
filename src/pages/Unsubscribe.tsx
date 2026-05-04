import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { FloatingBlobs } from "@/components/landing/FloatingBlobs";
import quercusLogo from "@/assets/quercus-logo.jpg";

type Status = "loading" | "valid" | "already" | "invalid" | "confirming" | "success" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (cancelled) return;
        if (res.ok && data.valid) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        if (!cancelled) setStatus("invalid");
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setStatus("confirming");
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    if (error) { setStatus("error"); return; }
    if (data?.success) setStatus("success");
    else if (data?.reason === "already_unsubscribed") setStatus("already");
    else setStatus("error");
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <FloatingBlobs />
      <header className="relative z-10 px-6 py-5">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src={quercusLogo} alt="Quercus" className="h-8 w-auto" />
          <span className="text-lg font-serif tracking-widest">QUERCUS</span>
        </Link>
      </header>
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/40 backdrop-blur-[12px] border border-white/20 p-8 text-center space-y-5"
        >
          {status === "loading" && (
            <>
              <Loader2 className="w-7 h-7 animate-spin text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground tracking-widest uppercase">Vérification du lien…</p>
            </>
          )}

          {status === "valid" && (
            <>
              <h1 className="text-2xl font-serif"><em>Confirmer le désabonnement</em></h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Vous ne recevrez plus aucun email d'information de notre part.
                Les emails strictement nécessaires à votre compte (sécurité,
                conformité) continueront d'être envoyés.
              </p>
              <Button onClick={confirm} size="lg" className="btn-glow w-full">
                Confirmer mon désabonnement
              </Button>
            </>
          )}

          {status === "confirming" && (
            <>
              <Loader2 className="w-7 h-7 animate-spin text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Désabonnement en cours…</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
              <h1 className="text-2xl font-serif"><em>Désabonnement confirmé</em></h1>
              <p className="text-sm text-muted-foreground">
                Votre adresse a bien été retirée de nos communications.
              </p>
              <Link to="/" className="inline-block text-sm text-primary underline">Retour au site</Link>
            </>
          )}

          {status === "already" && (
            <>
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
              <h1 className="text-2xl font-serif"><em>Déjà désabonné</em></h1>
              <p className="text-sm text-muted-foreground">
                Cette adresse est déjà retirée de nos communications.
              </p>
              <Link to="/" className="inline-block text-sm text-primary underline">Retour au site</Link>
            </>
          )}

          {(status === "invalid" || status === "error") && (
            <>
              <AlertCircle className="w-10 h-10 text-destructive mx-auto" />
              <h1 className="text-2xl font-serif"><em>Lien invalide</em></h1>
              <p className="text-sm text-muted-foreground">
                Ce lien de désabonnement n'est pas valide ou a expiré.
                Contactez-nous si le problème persiste.
              </p>
              <Link to="/contact" className="inline-block text-sm text-primary underline">Nous contacter</Link>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}