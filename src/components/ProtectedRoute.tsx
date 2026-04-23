import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useIdleTimeout } from "@/hooks/useIdleTimeout";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const location = useLocation();
  useIdleTimeout();

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

  // Even after onboarding, if any required field is missing (legacy users,
  // partial sign-ups, deleted data), force them through CompleteProfile
  // before they can use the rest of the app.
  if (profile) {
    const requiredMissing =
      !profile.first_name?.trim() ||
      !profile.last_name?.trim() ||
      !profile.date_of_birth ||
      !profile.address?.trim() ||
      !profile.city?.trim() ||
      !profile.postal_code?.trim() ||
      !profile.country?.trim() ||
      !profile.tax_country?.trim() ||
      !profile.tax_id?.trim();

    if (requiredMissing && location.pathname !== "/complete-profile") {
      return <Navigate to="/complete-profile" replace />;
    }
  }

  return <Outlet />;
}
