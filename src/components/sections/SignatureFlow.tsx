import { useRef, useState } from "react";
import {
  ArrowRight,
  Search,
  Database,
  Cpu,
  Package,
  Wrench,
  BarChart3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/hooks/useReveal";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";

/**
 * The signature interaction: a 6-step flow that visualises Derren's
 * multidisciplinary process from research to impact.
 *
 * Research → Data → AI → Product → Engineering → Impact
 *
 * Each stage is grounded in ONE real artifact from the portfolio (Calendar
 * §6.1) — six abstract sentences would read as filler immediately after the
 * concrete Experience section above.
 *
 * Interaction (Calendar §6.2):
 *  - Click or keyboard-focus only. No hover activation — sweeping the cursor
 *    across the row used to flip the panel six times.
 *  - Arrow-key navigation with roving tabindex (ArrowLeft/Right, Home/End).
 *  - No aria-live: it announced every step change as an interruption.
 */
interface SignatureStep {
  index: string;
  label: string;
  icon: LucideIcon;
  description: string;
  /** One concrete, verifiable artifact that grounds this stage in real work. */
  artifact: string;
}

const signatureSteps: SignatureStep[] = [
  {
    index: "01",
    label: "Research",
    icon: Search,
    description:
      "Frame the user problem, validate assumptions, and define the question worth answering.",
    artifact:
      "EQ-5D-5L TTO — designed a Time Trade-Off study protocol across 4 languages with WCAG 2.1 AA and GDPR-aligned data handling.",
  },
  {
    index: "02",
    label: "Data",
    icon: Database,
    description:
      "Acquire, clean, and model the data until it actually reflects the system we're studying.",
    artifact:
      "MUIS halal landscape — 2,695+ establishments validated to 99.72% address coverage across 28 postal districts.",
  },
  {
    index: "03",
    label: "AI",
    icon: Cpu,
    description:
      "Apply the smallest model that solves the problem — LLM, agent, or classical ML when it fits.",
    artifact:
      "Sunnystep — a Node.js + Claude pipeline producing daily briefs, monthly calendars, and weekly performance views on a schedule.",
  },
  {
    index: "04",
    label: "Product",
    icon: Package,
    description:
      "Wrap the intelligence in a product flow that people can actually find, trust, and use.",
    artifact:
      "360 Cogni — scoped and shipped the screening + caregiver MVP at 360cogni.com for 1,000+ target users.",
  },
  {
    index: "05",
    label: "Engineering",
    icon: Wrench,
    description:
      "Ship the full stack — APIs, auth, observability, performance — until it survives real users.",
    artifact:
      "Pulse — a concurrent Go crawler streaming Hacker News + Reddit through Kafka into a user-scoring service.",
  },
  {
    index: "06",
    label: "Impact",
    icon: BarChart3,
    description:
      "Measure the outcome, fold the lessons back in, and decide what to build next.",
    artifact:
      "Marina Bay Sands — automated a stakeholder report 83% faster and lifted Data Layer accuracy to 98%.",
  },
];

export function SignatureFlow() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useReveal<HTMLDivElement>();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeStep = signatureSteps[active];

  /** Roving-tabindex keyboard navigation for the tablist. */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLOListElement>) => {
    const last = signatureSteps.length - 1;
    let next = active;

    switch (event.key) {
      case "ArrowRight":
        next = active === last ? 0 : active + 1;
        break;
      case "ArrowLeft":
        next = active === 0 ? last : active - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="how-i-think"
      aria-label="How Derren approaches work"
      className="relative py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          eyebrow="05 · How I think"
          title="From research to impact, in one pipeline."
          lede="Every project I take on moves through the same six stages. Different tools, different scale — the same discipline."
        />

        <div
          ref={ref}
          className={cn(
            "mt-12",
            visible ? "animate-reveal" : "opacity-0"
          )}
        >
          <ol
            className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:items-stretch sm:gap-0 sm:overflow-x-auto"
            role="tablist"
            aria-label="Pipeline stages"
            onKeyDown={handleKeyDown}
          >
            {signatureSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === active;
              return (
                <li
                  key={step.index}
                  className={cn(
                    "relative flex flex-1 items-stretch",
                    idx < signatureSteps.length - 1 &&
                      "sm:after:absolute sm:after:right-0 sm:after:top-1/2 sm:after:h-px sm:after:w-4 sm:after:-translate-y-1/2 sm:after:bg-gradient-to-r sm:after:from-primary/40 sm:after:to-primary/0 sm:after:content-['']"
                  )}
                >
                  <button
                    ref={(node) => {
                      tabRefs.current[idx] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`signature-panel-${step.index}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(idx)}
                    onFocus={() => setActive(idx)}
                    className={cn(
                      "group relative flex w-full flex-col items-center justify-center gap-2 rounded-xl border px-3 py-4 text-center transition-all duration-300 sm:rounded-none sm:border-x-0 sm:border-t-0 sm:border-b sm:px-3 sm:py-4",
                      isActive
                        ? "border-primary/60 bg-card text-foreground shadow-[var(--glow-primary)]"
                        : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    )}
                  >
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary/80">
                      {step.index}
                    </span>
                    <Icon
                      size={18}
                      className={cn(
                        "transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                      )}
                    />
                    <span className="text-sm font-medium">{step.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            role="tabpanel"
            id={`signature-panel-${activeStep.index}`}
            tabIndex={0}
            className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-5 sm:p-6"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {activeStep.index} · {activeStep.label}
              </span>
              <span className="hairline flex-1" aria-hidden="true" />
            </div>
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-foreground sm:text-lg">
              {activeStep.description}
            </p>
            <p className="mt-3 flex gap-2 text-sm leading-relaxed text-muted-foreground">
              <ArrowRight
                size={14}
                className="mt-1 flex-shrink-0 text-primary"
              />
              <span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary/80">
                  In practice ·{" "}
                </span>
                {activeStep.artifact}
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}