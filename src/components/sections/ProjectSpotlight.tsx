import { ArrowUpRight, Search, Hammer, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/hooks/useReveal";

/**
 * A 2-column "spotlight" card for the homepage's featured project.
 *
 * Left: an image (or a coloured panel if no image), eyebrow + metric.
 * Right: title, summary, the three P-A-O columns, insight, and a tech row.
 *
 * This is *less* than a full ProjectStory (which is reserved for the
 * dedicated project page) but *more* than a ProjectCard — it gives the
 * recruiter a real taste of the project without overwhelming the homepage
 * rhythm.
 */
export interface ProjectSpotlightProps {
  title: string;
  company: string;
  href: string;
  metric: string;
  imageSrc?: string;
  imageAlt?: string;
  summary: string;
  problem: string;
  approach: string;
  outcomes: string[];
  insight: string;
  tech: string[];
  ctaLabel?: string;
  className?: string;
}

export function ProjectSpotlight({
  title,
  company,
  href,
  metric,
  imageSrc,
  imageAlt,
  summary,
  problem,
  approach,
  outcomes,
  insight,
  tech,
  ctaLabel = "Open case study",
  className,
}: ProjectSpotlightProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const external = href.startsWith("http");

  return (
    <div
      ref={ref}
      className={cn(
        "surface-elevated group grid gap-0 overflow-hidden rounded-2xl md:grid-cols-[5fr_7fr]",
        visible ? "animate-reveal" : "opacity-0",
        className
      )}
    >
      {/* ----- Visual panel ----- */}
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group relative flex h-48 overflow-hidden bg-muted/40 md:h-auto"
        aria-label={`${title} — ${ctaLabel}`}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover brightness-75 contrast-50 saturate-50 transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary/70">
              {company}
            </span>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/55 to-background/85"
          aria-hidden="true"
        />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/85">
            {company}
          </span>
          {metric && (
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-foreground/85">
              {metric}
            </span>
          )}
        </div>
      </a>

      {/* ----- Body ----- */}
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
            Featured
          </p>
          <span className="hairline flex-1" aria-hidden="true" />
          <ArrowUpRight
            size={16}
            className="text-muted-foreground transition-transform duration-300 group-hover:text-primary"
          />
        </div>

        <h3 className="text-balance text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="transition-colors hover:text-primary"
          >
            {title}
          </a>
        </h3>

        <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {summary}
        </p>

        <dl className="grid gap-3 sm:grid-cols-3">
          <PaoBlock icon={Search} label="Problem" body={problem} />
          <PaoBlock icon={Hammer} label="Approach" body={approach} />
          <PaoBlock
            icon={Sparkles}
            label="Outcome"
            body={outcomes.slice(0, 2).join(" · ")}
          />
        </dl>

        <blockquote className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4 text-sm leading-relaxed text-foreground/90">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
            Insight
          </span>
          <p className="mt-1.5">{insight}</p>
        </blockquote>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <ul className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <li
                key={t}
                className="font-mono text-[0.7rem] text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-1 font-mono text-sm text-primary hover:underline"
          >
            {ctaLabel}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

function PaoBlock({
  icon: Icon,
  label,
  body,
}: {
  icon: typeof Search;
  label: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
        <Icon size={11} />
        {label}
      </dt>
      <dd className="text-pretty text-xs leading-relaxed text-foreground/90 sm:text-sm">
        {body}
      </dd>
    </div>
  );
}