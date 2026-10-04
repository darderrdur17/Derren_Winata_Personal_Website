import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Five capability clusters grouped into a single coherent grid.
 *
 * Each cluster is a domain-level grouping — Data & Analytics, AI &
 * Automation, Software Engineering, Product, Data Systems. Items inside
 * each cluster are flat tags so the eye scans quickly.
 *
 * Used on the homepage (compact) and on the /skills route (richer). The
 * featured version doesn't invent proficiency percentages; only real
 * technologies from the data files appear.
 */
export interface CapabilityGroup {
  label: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

export interface CapabilityGridProps {
  groups: CapabilityGroup[];
  className?: string;
}

export function CapabilityGrid({ groups, className }: CapabilityGridProps) {
  return (
    <ul
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {groups.map((group) => (
        <li
          key={group.label}
          className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-5 transition-all duration-300 hover-glow"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <group.icon size={16} />
            </span>
            <h3 className="text-base font-semibold text-foreground">{group.label}</h3>
          </div>
          <p className="text-xs text-muted-foreground">{group.description}</p>
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="font-mono text-[0.7rem] text-muted-foreground/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}