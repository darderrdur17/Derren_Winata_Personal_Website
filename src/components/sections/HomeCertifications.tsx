import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { categoryHighlights } from "@/data/certifications";

/**
 * 07 — Certifications snapshot. Category-level view of the 17 credentials;
 * full detail lives at /certifications.
 */
export function HomeCertifications() {
  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="relative bg-secondary/30 py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          eyebrow="07"
          title="Continuous, deliberate learning."
          lede="17 credentials across AI/LLM, Data & Analytics, Project Management, and Finance — all earned in the past 18 months."
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categoryHighlights.map((c) => (
            <li
              key={c.label}
              className="flex flex-col gap-2 rounded-xl border border-border/60 bg-card/40 p-5 transition-all duration-300 hover-glow"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary/80">
                {c.label}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {c.title}
              </p>
              <p className="text-xs text-muted-foreground">{c.issuer}</p>
              <p className="mt-auto pt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/80">
                {c.extraCount} {c.extraCount === 1 ? "credential" : "credentials"}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            to="/certifications"
            className="group inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
          >
            View credentials and downloads
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}