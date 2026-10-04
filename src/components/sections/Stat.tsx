import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/hooks/useReveal";
import { useCountUp } from "@/lib/hooks/useCountUp";

/**
 * One stat tile. `value` may be a string (displayed verbatim) or a number
 * (counted up when the tile scrolls into view).
 *
 * Designed for the proof band: a small, deliberate 4-column row that earns
 * its space by being grounded in real portfolio numbers.
 */
export interface StatProps {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  detail?: ReactNode;
  className?: string;
}

export function Stat({
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
  detail,
  className,
}: StatProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.4 });

  const numericTarget = typeof value === "number" ? value : 0;
  const display = useCountUp({
    target: numericTarget,
    start: visible && typeof value === "number",
    prefix: typeof value === "number" ? prefix : undefined,
    suffix: typeof value === "number" ? suffix : undefined,
    decimals,
  });

  const shown = typeof value === "string" ? value : display;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative flex flex-col gap-1 rounded-xl border border-border/60 bg-card/40 p-5 transition-all duration-300",
        "hover:border-primary/40 hover:bg-card",
        visible ? "animate-reveal" : "opacity-0",
        className
      )}
    >
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-2xl font-semibold tabular-nums text-foreground sm:text-3xl">
        {shown}
      </span>
      {detail && (
        <span className="text-xs text-muted-foreground/80">{detail}</span>
      )}
    </div>
  );
}

/**
 * Horizontal proof band — drop-in for the homepage hero area.
 * Wraps a fixed set of Stat tiles in a 2/4-column responsive grid.
 */
export interface ProofBandProps {
  stats: Omit<StatProps, "className">[];
  className?: string;
}

export function ProofBand({ stats, className }: ProofBandProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
        className
      )}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            i === 1 && "delay-100",
            i === 2 && "delay-200",
            i === 3 && "delay-300"
          )}
        >
          <Stat {...s} />
        </div>
      ))}
    </div>
  );
}