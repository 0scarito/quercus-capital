import { SidebarProvider } from "@/components/ui/sidebar";
import { QuercusSidebar } from "@/components/QuercusSidebar";
import { Outlet, Link } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="h-screen flex w-full overflow-hidden">
        <div className="sticky top-0 h-screen flex-shrink-0">
          <QuercusSidebar />
        </div>
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="border-t py-6 px-6">
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground tracking-wide">
                QUERCUS CAPITAL | 231 RUE SAINT-HONORÉ, 75001 PARIS | Tél +33 1 84 20 07 65
              </p>
              <p className="text-xs text-muted-foreground">
                RCS PARIS : 928 443 001 | Enregistré auprès de l'ORIAS sous le n°24004789 en qualité de CIF et COA.
              </p>
              <p className="text-xs text-muted-foreground">
                <Link to="/mentions-legales" className="underline hover:text-foreground">mentions légales</Link>
                {" — "}
                <Link to="/confidentialite" className="underline hover:text-foreground">confidentialité</Link>
                {" — "}
                <Link to="/charte-cookie" className="underline hover:text-foreground">charte cookie</Link>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
