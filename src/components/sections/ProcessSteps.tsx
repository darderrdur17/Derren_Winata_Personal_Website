import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/hooks/useReveal";

/**
 * A phase tile in the "How I think" 5-step process section.
 * Used both on the homepage (compact) and the standalone /process page (rich).
 */
export interface ProcessStep {
  index: string;
  title: string;
  body: string;
  icon: LucideIcon;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  variant?: "compact" | "rich";
  className?: string;
}

export function ProcessSteps({ steps, variant = "compact", className }: ProcessStepsProps) {
  return (
    <ol
      className={cn(
        "grid gap-4",
        variant === "compact"
          ? "sm:grid-cols-2 lg:grid-cols-5"
          : "md:grid-cols-2 lg:grid-cols-5",
        className
      )}
    >
      {steps.map((step) => (
        <StepTile key={step.index} step={step} variant={variant} />
      ))}
    </ol>
  );
}

function StepTile({
  step,
  variant,
}: {
  step: ProcessStep;
  variant: "compact" | "rich";
}) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  const Icon = step.icon;
  return (
    <li
      ref={ref}
      className={cn(
        "relative flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-card/40 p-5 transition-all duration-300 hover-glow",
        visible ? "animate-reveal" : "opacity-0",
        variant === "rich" && "p-6"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
          {step.index}
        </span>
        <span className="hairline flex-1" aria-hidden="true" />
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={18} />
      </div>
      <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {step.body}
      </p>
    </li>
  );
}