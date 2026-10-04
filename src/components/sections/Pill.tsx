import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/hooks/useReveal";

/**
 * Pill-shaped capability label used for grouped cert categories and ad-hoc
 * metadata. Has a small mono-icon prefix and supports primary / muted variants.
 */
export interface PillProps {
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "muted";
  className?: string;
}

export function Pill({ label, icon: Icon, variant = "default", className }: PillProps) {
  const variants = {
    default:
      "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-foreground",
    primary:
      "border-primary/50 bg-primary/10 text-primary hover:border-primary",
    muted:
      "border-border/40 bg-background/40 text-muted-foreground/70 hover:border-border hover:text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] transition-colors duration-300",
        variants[variant],
        className
      )}
    >
      {Icon && <Icon size={11} />}
      {label}
    </span>
  );
}

/**
 * Cluster of group cards, each with a label, count, and a 1-line summary.
 * Designed for the homepage "experience at a glance" band.
 */
export interface ClusterCardProps {
  label: string;
  count: number;
  title: string;
  summary: string;
  icon?: LucideIcon;
  className?: string;
}

export function ClusterCard({
  label,
  count,
  title,
  summary,
  icon: Icon,
  className,
}: ClusterCardProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-5 transition-all duration-300 hover-glow",
        visible ? "animate-reveal" : "opacity-0",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary/80">
          {label}
        </p>
        <span className="font-mono text-xs text-muted-foreground">
          {count} {count === 1 ? "role" : "roles"}
        </span>
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
      {Icon && (
        <div className="mt-auto flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon size={14} />
        </div>
      )}
    </div>
  );
}