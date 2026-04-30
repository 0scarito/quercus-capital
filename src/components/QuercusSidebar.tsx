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
  UserCog,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function QuercusSidebar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();
  const { t } = useTranslation("dashboard");

  const mainNav = [
    { title: t("sidebar.dashboard"), url: "/dashboard", icon: LayoutDashboard },
    { title: t("sidebar.investments"), url: "/produits", icon: Package },
    { title: t("sidebar.advisor"), url: "/dashboard/conseiller", icon: UserCog },
    { title: t("sidebar.settings"), url: "/parametres", icon: Settings },
  ];

  const secondaryNav = [
    { title: t("sidebar.statements"), url: "/releves", icon: FileText },
    { title: t("sidebar.integrations"), url: "/integrations", icon: Plug },
  ];

  const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || t("sidebar.myAccount");
  const initials = ((profile?.first_name?.[0] ?? "") + (profile?.last_name?.[0] ?? "")).toUpperCase() || "Q";
  const accountTypeLabel =
    profile?.account_type === "moral" || profile?.account_type === "corporate"
      ? t("sidebar.corporateAccount")
      : t("sidebar.personalAccount");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const isCorporate =
    profile?.account_type === "moral" || profile?.account_type === "corporate";

  return (
    <Sidebar collapsible="none" className="border-r h-screen">
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
                  onClick={() => navigate("/open-account?type=corporate")}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left"
                >
                  <PlusSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{t("sidebar.openCorporate")}</span>
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

        <div className="px-2 py-1 flex justify-end">
          <LanguageSwitcher />
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-10 text-sidebar-foreground/80 hover:bg-sidebar-accent">
                  <User className="h-[18px] w-[18px]" />
                  <>
                    <span className="text-sm flex-1">{t("sidebar.personalSettings")}</span>
                    <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
                  </>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/parametres")}>
                  <Settings className="mr-2 h-4 w-4" />
                  {t("sidebar.accountSettings")}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    type="button"
                    onClick={() => navigate("/aide")}
                    className="w-full flex items-center"
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    {t("sidebar.helpCenter")}
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/contact")}>
                  <Mail className="mr-2 h-4 w-4" />
                  {t("sidebar.contactUs")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("sidebar.signOut")}
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
                <span className="text-sm flex-1">{t("sidebar.signOut")}</span>
                <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
              </>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
