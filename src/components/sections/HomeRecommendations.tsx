import { Quote } from "lucide-react";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { recommendations } from "@/data/recommendations";

/**
 * Real, named recommendations surfaced from the homepage. Three named voices —
 * the 360 Cogni CTO, an NUS Distinguished Senior Fellow, and a Marina Bay
 * Sands analytics lead. These are *attributable* — no fabrication.
 */
export function HomeRecommendations() {
  return (
    <section
      id="recommendations"
      aria-label="Recommendations"
      className="relative py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          eyebrow="03 · People speak"
          title="What collaborators say."
          lede="Three named recommendations from founders, faculty, and analytics leads who shipped alongside me."
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {recommendations.map((r, i) => (
            <li
              key={r.id}
              className={`flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-6 transition-[box-shadow,border-color,background-color] duration-300 hover-glow ${
                i === 0
                  ? "animate-reveal"
                  : i === 1
                    ? "animate-reveal delay-100"
                    : "animate-reveal delay-200"
              }`}
            >
              <Quote size={20} className="text-primary" aria-hidden="true" />
              <blockquote className="flex-1 text-pretty text-sm text-foreground/90 sm:text-base">
                <p className="leading-relaxed">“{r.quote}”</p>
              </blockquote>
              <footer className="border-t border-border/50 pt-4">
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">
                  {r.role} · {r.company}
                </p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary/70">
                  {r.date}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}