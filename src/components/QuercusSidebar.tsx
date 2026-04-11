import {
  LayoutDashboard,
  Package,
  Settings,
  FileText,
  Plug,
  User,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import quercusLogo from "@/assets/quercus-logo.jpg";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNav = [
  { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboard },
  { title: "Produits", url: "/produits", icon: Package },
  { title: "Relevés", url: "/releves", icon: FileText },
  { title: "Paramètres de compte", url: "/parametres", icon: Settings },
  { title: "Intégrations", url: "/integrations", icon: Plug },
];

export function QuercusSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <div className="p-6 pb-2">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <img src={quercusLogo} alt="Quercus" className="h-8 w-auto brightness-0 invert" />
            <h1 className="text-xl font-serif tracking-widest text-sidebar-foreground">
              QUERCUS
            </h1>
          </div>
        ) : (
          <img src={quercusLogo} alt="Q" className="h-7 w-auto brightness-0 invert mx-auto" />
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground">
                  <User className="h-4 w-4 mr-3" />
                  {!collapsed && (
                    <>
                      <span className="text-sm flex-1">Jean Dupont</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres personnels
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
