import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/hooks/useReveal";

/**
 * Project card used on the homepage selected-work grid.
 *
 * Design rules:
 * - Title and tech are immediately scannable; the insight stays a one-liner.
 * - Hover reveals an arrow, subtle elevation, and an accent border.
 * - Visual + role chip on top, body below.
 *
 * Pure presentation: pulls data from props. No router coupling.
 */
export interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tech: string[];
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  metric?: string;
  className?: string;
}

export function ProjectCard({
  title,
  category,
  description,
  tech,
  href,
  imageSrc,
  imageAlt,
  metric,
  className,
}: ProjectCardProps) {
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  const external = href.startsWith("http");
  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${title} — ${category}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40",
        "transition-[box-shadow,border-color,background-color] duration-300 hover:border-primary/40 hover:bg-card",
        "hover-glow",
        visible ? "animate-reveal" : "opacity-0",
        className
      )}
    >
      <div className="relative h-36 overflow-hidden bg-muted/40">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary/80">
              {category}
            </span>
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
        {metric && (
          <span className="absolute bottom-3 left-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-foreground/90">
            {metric}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary/80">
            {category}
          </span>
          <ArrowUpRight
            className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            size={16}
          />
        </div>
        <h3 className="text-balance text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {tech.map((t) => (
            <li
              key={t}
              className="font-mono text-[0.7rem] text-muted-foreground/80"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </a>
  );
}