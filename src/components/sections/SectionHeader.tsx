import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/hooks/useReveal";

/**
 * The shared section header. Three slots:
 *   - `eyebrow` (mono, accent) — short label like "01" or "Process"
 *   - `title` — primary heading
 *   - `lede` — optional muted subheading
 *
 * Renders a thin hairline to the trailing edge, with the eyebrow-number/title
 * pair pinned to the start. Use `<SectionHeader>` at the top of every section.
 */
export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  /**
   * Static by default (Calendar §3). Eight headers each sliding 24px turns the
   * page into one continuous animation instead of discrete beats. Opt in only
   * where the header is part of a set-piece (featured story, SignatureFlow).
   */
  reveal?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Heading = "h2",
  className,
  reveal = false,
}: SectionHeaderProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <header
      ref={reveal ? ref : undefined}
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        reveal && !visible && "opacity-0",
        reveal && visible && "animate-reveal",
        className
      )}
    >
      <div
        className={cn(
          "flex w-full items-center gap-3 sm:gap-4",
          align === "center" ? "justify-center" : ""
        )}
      >
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
        )}
        <Heading
          className={cn(
            "text-balance text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl",
            "leading-[1.1] tracking-tight"
          )}
        >
          {title}
        </Heading>
        <div className="hairline flex-1" aria-hidden="true" />
      </div>
      {lede && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base",
            align === "center" ? "mx-auto" : ""
          )}
        >
          {lede}
        </p>
      )}
    </header>
  );
}