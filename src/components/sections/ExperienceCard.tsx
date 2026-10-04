import type { ExperienceItem } from "@/data/experiences";
import { cn } from "@/lib/utils";

/**
 * One experience card. Used on the homepage category band AND on the
 * dedicated /experience timeline.
 *
 * The card surfaces company, role, period, the highlighted metric, and the
 * three most important detail bullets. Deeper detail lives on /experience.
 */
export interface ExperienceCardProps {
  item: ExperienceItem;
  variant?: "compact" | "rich";
  className?: string;
}

export function ExperienceCard({
  item,
  variant = "compact",
  className,
}: ExperienceCardProps) {
  const bullets = variant === "compact" ? item.details.slice(0, 2) : item.details;
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-5 transition-all duration-300 hover-glow",
        variant === "rich" && "p-6",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary/80">
            {item.period}
          </p>
          <h3 className="mt-1 text-base font-semibold text-foreground">
            {item.role}
          </h3>
          <p className="text-sm text-primary/90">{item.company}</p>
        </div>
        <span className="shrink-0 rounded-full border border-border/60 bg-background/60 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
          {item.type}
        </span>
      </div>

      <p className="font-mono text-xs text-primary">{item.highlight}</p>

      <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        {bullets.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.7rem] text-muted-foreground/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}