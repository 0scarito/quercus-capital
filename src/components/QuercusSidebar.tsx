import {
  LayoutDashboard,
  Package,
  FileText,
  Plug,
  ChevronRight,
  ChevronsUpDown,
  Settings,
  HelpCircle,
  Mail,
  LogOut,
  User,
  Check,
  PlusSquare,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

const mainNav = [
  { title: "Tableau de bord", url: "/dashboard", icon: LayoutDashboard },
  { title: "Produits", url: "/produits", icon: Package },
  { title: "Paramètres de compte", url: "/parametres", icon: Settings },
];

const secondaryNav = [
  { title: "Relevés", url: "/releves", icon: FileText },
  { title: "Intégrations", url: "/integrations", icon: Plug },
];

export function QuercusSidebar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();

  const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "Mon compte";
  const initials = ((profile?.first_name?.[0] ?? "") + (profile?.last_name?.[0] ?? "")).toUpperCase() || "Q";
  const accountTypeLabel =
    profile?.account_type === "moral" || profile?.account_type === "corporate"
      ? "Compte entreprise"
      : "Compte personnel";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isCorporate =
    profile?.account_type === "moral" || profile?.account_type === "corporate";

  return (
    <Sidebar collapsible="none" className="border-r">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <img src={quercusLogo} alt="Quercus" className="h-7 w-auto" />
          <span className="text-lg font-serif tracking-widest text-sidebar-foreground">QUERCUS</span>
        </div>
      </div>

      <div className="px-3 pb-3">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center justify-between px-2 py-2 rounded-sm hover:bg-sidebar-accent/60 transition-colors text-left">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-sidebar-foreground truncate">{fullName}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{accountTypeLabel}</p>
              </div>
              <ChevronsUpDown className="h-4 w-4 text-sidebar-foreground/50 flex-shrink-0" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="right" align="start" className="w-72 p-0">
            <div className="px-4 py-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{fullName}</p>
                <p className="text-xs text-muted-foreground truncate">{accountTypeLabel}</p>
              </div>
              <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
            </div>
            {!isCorporate && (
              <>
                <div className="h-px bg-border" />
                <button
                  onClick={() => navigate("/ouvrir-un-compte?type=corporate")}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left"
                >
                  <PlusSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Ouvrir un compte professionnel</span>
                </button>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <SidebarContent className="px-2">
        {/* Main nav */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      <>
                        <span className="text-sm flex-1">{item.title}</span>
                        {item.badge && (
                          <Badge variant="outline" className="h-5 px-1.5 text-[10px] font-medium border-primary/40 text-primary">
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
                      </>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="h-3" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink
                      to={item.url}
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium"
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                        <>
                          <span className="text-sm flex-1">{item.title}</span>
                        <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
                      </>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="px-2 pb-3 space-y-1">
        <div className="flex items-center gap-2.5 px-2 py-2 bg-sidebar-accent/40 rounded-sm">
          <div className="h-8 w-8 rounded-sm bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xs font-semibold flex-shrink-0">
            {initials}
          </div>
          <p className="text-xs text-sidebar-foreground truncate">{user?.email}</p>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-10 text-sidebar-foreground/80 hover:bg-sidebar-accent">
                  <User className="h-[18px] w-[18px]" />
                  <>
                    <span className="text-sm flex-1">Paramètres personnels</span>
                    <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
                  </>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/parametres")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Paramètres du compte
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="mailto:contact@quercus.capital">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Centre d'aide
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/contact")}>
                  <Mail className="mr-2 h-4 w-4" />
                  Nous contacter
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="h-10 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-destructive"
            >
              <LogOut className="h-[18px] w-[18px]" />
              <>
                <span className="text-sm flex-1">Se déconnecter</span>
                <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
              </>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
