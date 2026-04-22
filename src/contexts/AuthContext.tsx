import * as React from "react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ensureUserWorkspace } from "@/lib/ensure-user-workspace";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [loading, setLoading] = useState(true);
  const previousUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setAuthResolved(true);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthResolved(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const currentUserId = session?.user?.id ?? null;

    if (previousUserIdRef.current !== currentUserId) {
      queryClient.clear();
      previousUserIdRef.current = currentUserId;
    }

    const bootstrapUserWorkspace = async () => {
      if (!authResolved) return;

      if (!session?.user) {
        if (!cancelled) setLoading(false);
        return;
      }

      if (!cancelled) setLoading(true);

      try {
        await ensureUserWorkspace(session.user);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void bootstrapUserWorkspace();

    return () => {
      cancelled = true;
    };
  }, [authResolved, queryClient, session?.user?.id]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
