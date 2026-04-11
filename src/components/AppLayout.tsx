import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QuercusSidebar } from "@/components/QuercusSidebar";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <QuercusSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b px-6">
            <SidebarTrigger />
          </header>
          <main className="flex-1 overflow-auto">
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
                <a href="#" className="underline hover:text-foreground">mentions légales</a>
                {" — "}
                <a href="#" className="underline hover:text-foreground">confidentialité</a>
                {" — "}
                <a href="#" className="underline hover:text-foreground">charte cookie</a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
