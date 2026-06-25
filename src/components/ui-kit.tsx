import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 animate-fade-up">
      <div className="min-w-0">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("glass rounded-2xl p-6 shadow-card", className)}>
      {children}
    </div>
  );
}

export function Stat({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: string; accent?: "indigo" | "emerald" | "navy" | "warning" }) {
  const accents = {
    indigo: "from-primary/20 to-primary/0 text-primary",
    emerald: "from-accent/20 to-accent/0 text-accent",
    navy: "from-secondary to-secondary/0 text-secondary-foreground",
    warning: "from-warning/20 to-warning/0 text-warning",
  } as const;
  return (
    <Card className="relative overflow-hidden">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 pointer-events-none", accents[accent ?? "indigo"])} />
      <div className="relative">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
        <div className="mt-2 text-3xl font-bold font-display">{value}</div>
        {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
      </div>
    </Card>
  );
}

export function Badge({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "success" | "warning" | "destructive" | "indigo" | "outline" }) {
  const styles = {
    default: "bg-muted text-muted-foreground",
    success: "bg-accent/15 text-accent",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/15 text-destructive",
    indigo: "bg-primary/15 text-primary",
    outline: "border border-border text-foreground",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", styles[variant])}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, color = "indigo" }: { value: number; color?: "indigo" | "emerald" | "warning" | "destructive" }) {
  const bg = {
    indigo: "gradient-primary-bg",
    emerald: "gradient-emerald-bg",
    warning: "bg-warning",
    destructive: "bg-destructive",
  } as const;
  return (
    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
      <div className={cn("h-full rounded-full transition-all", bg[color])} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function ScoreRing({ value, size = 120, label }: { value: number; size?: number; label?: string }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="currentColor" strokeWidth={stroke} fill="none" className="text-muted" />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke}
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
          stroke="url(#ringGradient)"
        />
        <defs>
          <linearGradient id="ringGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.52 0.21 268)" />
            <stop offset="100%" stopColor="oklch(0.7 0.17 158)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-bold font-display">{value}</div>
          {label && <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>}
        </div>
      </div>
    </div>
  );
}

export function GradientButton({ children, onClick, variant = "primary", className, type = "button" }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "accent" | "ghost" | "outline"; className?: string; type?: "button" | "submit" }) {
  const variants = {
    primary: "gradient-primary-bg text-primary-foreground shadow-glow hover:opacity-95",
    accent: "gradient-accent-bg text-white shadow-glow hover:opacity-95",
    ghost: "bg-transparent text-foreground hover:bg-muted",
    outline: "border border-border bg-card hover:bg-muted",
  } as const;
  return (
    <button type={type} onClick={onClick} className={cn(
      "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]",
      variants[variant], className
    )}>
      {children}
    </button>
  );
}
