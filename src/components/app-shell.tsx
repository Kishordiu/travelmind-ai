import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Compass,
  CalendarRange,
  Sparkles,
  Shield,
  Gem,
  BarChart3,
  Settings,
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  WifiOff,
} from "lucide-react";
import { Brand } from "./brand";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/planner", label: "Trip Planner", icon: CalendarRange },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles },
  { to: "/safety", label: "Safety", icon: Shield },
  { to: "/gems", label: "Hidden Gems", icon: Gem },
  { to: "/insights", label: "Insights", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-72 shrink-0 border-r border-border bg-sidebar/95 backdrop-blur-xl transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
          <Brand />
          <button
            className="lg:hidden p-2 rounded-md hover:bg-sidebar-accent"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="px-3 py-5 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-elegant"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
                }`}
              >
                {active && (
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-hero-gradient" aria-hidden />
                )}
                <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                <span>{item.label}</span>
                {item.label === "AI Assistant" && (
                  <Badge className="ml-auto bg-accent-gradient text-accent-foreground border-0 text-[10px] px-1.5 h-5">
                    NEW
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-3 right-3">
          <div className="rounded-2xl p-4 bg-hero-gradient text-white shadow-glow relative overflow-hidden">
            <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
            <p className="text-xs uppercase tracking-wider opacity-80">Pro plan</p>
            <p className="font-display font-semibold mt-1">Unlock unlimited AI trips</p>
            <Button size="sm" variant="secondary" className="mt-3 h-8 text-xs">
              Upgrade
            </Button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="h-full flex items-center gap-3 px-4 sm:px-6">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1 min-w-0 flex items-center gap-3">
              {title && (
                <h1 className="hidden md:block font-display font-semibold text-lg truncate">{title}</h1>
              )}
              <div className="ml-auto flex items-center gap-2 max-w-md w-full">
                <div className="relative flex-1 hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search destinations, trips, gems…"
                    className="pl-9 h-9 bg-muted/40 border-border"
                  />
                </div>
              </div>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex gap-1.5 text-xs">
              <WifiOff className="h-3 w-3" /> Offline ready
            </Badge>
            <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent" />
            </Button>
            <Avatar className="h-8 w-8 ring-2 ring-border">
              <AvatarFallback className="bg-hero-gradient text-white text-xs">AR</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
