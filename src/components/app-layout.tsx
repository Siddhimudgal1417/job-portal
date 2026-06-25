import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sparkles, LayoutDashboard, Briefcase, FileText, FileSearch, Wrench, ClipboardList,
  Activity, Brain, MessageSquare, Users, Building2, Moon, Sun, Menu, X
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/ats", label: "ATS Analyzer", icon: FileSearch },
  { to: "/resume", label: "Resume Builder", icon: FileText },
  { to: "/tracker", label: "Application Tracker", icon: ClipboardList },
  { to: "/failure-analyzer", label: "Failure Analyzer", icon: Brain },
  { to: "/interview", label: "Mock Interview", icon: MessageSquare },
  { to: "/referrals", label: "Referrals", icon: Users },
  { to: "/employer", label: "Employer", icon: Building2 },
] as const;

export function Logo({ size = "default" }: { size?: "default" | "sm" }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={cn(
        "relative grid place-items-center rounded-xl gradient-primary-bg shadow-glow",
        size === "sm" ? "h-8 w-8" : "h-9 w-9"
      )}>
        <Sparkles className={cn("text-primary-foreground", size === "sm" ? "h-4 w-4" : "h-5 w-5")} />
      </div>
      <span className={cn("font-display font-bold tracking-tight", size === "sm" ? "text-lg" : "text-xl")}>
        Job<span className="text-gradient-primary">Connect</span>
      </span>
    </Link>
  );
}

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="grid place-items-center h-9 w-9 rounded-lg glass hover:bg-accent/10 transition-colors"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });

  return (
    <div className="min-h-screen gradient-mesh-bg">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar transition-transform lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
          <Logo />
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {nav.map(item => {
            const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "gradient-primary-bg text-primary-foreground shadow-soft"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-3 right-3">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold">Pro Tip</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Run the Failure Analyzer weekly to spot patterns in rejections.
            </p>
          </div>
        </div>
      </aside>

      {/* Topbar */}
      <header className="lg:pl-64 sticky top-0 z-30 h-16 glass-strong border-b border-border flex items-center justify-between px-4 sm:px-6">
        <button onClick={() => setOpen(true)} className="lg:hidden grid place-items-center h-9 w-9 rounded-lg glass">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden lg:block text-sm text-muted-foreground">
          Welcome back, <span className="font-semibold text-foreground">Aarav</span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <div className="h-9 w-9 rounded-full gradient-accent-bg grid place-items-center text-sm font-bold text-white">
            AG
          </div>
        </div>
      </header>

      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden" />}
    </div>
  );
}
