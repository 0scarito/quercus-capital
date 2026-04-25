import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import LandingPage from "@/pages/LandingPage";
import ProductsPage from "@/pages/ProductsPage";
import VelvetPage from "@/pages/VelvetPage";
import TobamPage from "@/pages/TobamPage";
import SolutionsPage from "@/pages/SolutionsPage";
import SolutionDetailPage from "@/pages/SolutionDetailPage";
import SignIn from "@/pages/SignIn";
import OpenAccount from "@/pages/OpenAccount";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Statements from "@/pages/Statements";
import AccountSettings from "@/pages/AccountSettings";
import Integrations from "@/pages/Integrations";
import CompleteProfile from "@/pages/CompleteProfile";
import NotFound from "@/pages/NotFound";
import AboutPage from "@/pages/AboutPage";
import PressPage from "@/pages/PressPage";
import ContactPage from "@/pages/ContactPage";
import LegalPage from "@/pages/LegalPage";
import PrivacyPage from "@/pages/PrivacyPage";
import CookiePage from "@/pages/CookiePage";
import HelpCenter from "@/pages/HelpCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/velvet" element={<VelvetPage />} />
            <Route path="/products/tobam" element={<TobamPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:segment" element={<SolutionDetailPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/presse" element={<PressPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/mentions-legales" element={<LegalPage />} />
            <Route path="/confidentialite" element={<PrivacyPage />} />
            <Route path="/charte-cookie" element={<CookiePage />} />
            <Route path="/aide" element={<HelpCenter />} />
            <Route path="/aide/:slug" element={<HelpCenter />} />
            <Route path="/open-account" element={<OpenAccount />} />
            <Route path="/signin" element={<SignIn />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/complete-profile" element={<CompleteProfile />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/produits" element={<Products />} />
                <Route path="/releves" element={<Statements />} />
                <Route path="/parametres" element={<AccountSettings />} />
                <Route path="/integrations" element={<Integrations />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
