import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();

  if (loading || (session && profileLoading)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-sm tracking-widest uppercase">Chargement…</div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  // Force every authenticated user (including Google OAuth new sign-ups)
  // through the KYC / due-diligence flow before reaching the app.
  if (profile && !profile.onboarding_completed) {
    return <Navigate to="/open-account" replace />;
  }

  return <Outlet />;
}
