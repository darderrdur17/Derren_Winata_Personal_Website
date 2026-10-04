import type { LucideIcon } from "lucide-react";
import { Search, Hammer, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/hooks/useReveal";
import { deriveCtaLabel } from "@/lib/cta";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";

/**
 * "Problem → Approach → Outcome" project story block.
 *
 * Used for the homepage hero/featured-work area AND any individual project
 * breakout on the dedicated /projects page. Three columns, each driven by
 * data, each labelled.
 *
 * The `outcomes` array powers a short bullet list under the outcome column;
 * `tech` is shown as a footer strip so the stack stays connected to the work.
 */
export interface ProjectStoryProps {
  eyebrow: string;
  title: string;
  context: string;
  problem: string;
  approach: string;
  outcomes: string[];
  insight: string;
  tech: string[];
  href?: string;
  ctaLabel?: string;
  className?: string;
}

interface ColumnProps {
  icon: LucideIcon;
  label: string;
  body: string;
  className?: string;
}

function Column({ icon: Icon, label, body, className }: ColumnProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
        <Icon size={14} className="text-primary" />
        {label}
      </div>
      <p className="text-pretty text-sm leading-relaxed text-foreground/90 sm:text-base">
        {body}
      </p>
    </div>
  );
}

export function ProjectStory({
  eyebrow,
  title,
  context,
  problem,
  approach,
  outcomes,
  insight,
  tech,
  href,
  ctaLabel,
  className,
}: ProjectStoryProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      aria-label={`Project story — ${title}`}
      className={cn("relative py-20 sm:py-24", className)}
    >
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          lede={context}
        />

        <div
          ref={ref}
          className={cn(
            "mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8",
            visible ? "animate-reveal" : "opacity-0"
          )}
        >
          <Column icon={Search} label="Problem" body={problem} />
          <Column icon={Hammer} label="Approach" body={approach} />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
              <Sparkles size={14} className="text-primary" />
              Outcome
            </div>
            <ul className="space-y-2">
              {outcomes.map((o, i) => (
                <li
                  key={o}
                  className="flex gap-2 text-sm leading-relaxed text-foreground/90 sm:text-base"
                >
                  <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-primary/[0.06] p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-sm text-primary">
            ★
          </div>
          <div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
              Insight
            </p>
            <p className="mt-2 max-w-3xl text-pretty text-base leading-relaxed text-foreground sm:text-lg">
              {insight}
            </p>
          </div>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2 text-[0.7rem] text-muted-foreground">
          {tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-border/60 bg-card/40 px-2.5 py-1 font-mono"
            >
              {t}
            </li>
          ))}
        </ul>

        {href && (() => {
          const derived = deriveCtaLabel(href);
          return (
            <div className="mt-6">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
              >
                {ctaLabel ?? derived}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          );
        })()}
      </Container>
    </section>
  );
}