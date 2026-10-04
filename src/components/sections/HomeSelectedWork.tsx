import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectSpotlight } from "@/components/sections/ProjectSpotlight";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";

/**
 * 03 — Selected Work.
 *
 * One ProjectSpotlight (the strongest story: 360 Cogni), then a small grid
 * of ProjectCards for the rest. The deep "Problem → Approach → Outcome →
 * Insight" storytelling lives on /projects so the homepage rhythm stays
 * scannable.
 *
 * Atlas-curated ranking (by impact + storytelling value):
 *   1. 360 Cogni            (spotlight — product + research + UX)
 *   2. EQ-5D-5L TTO          (multi-lingual research tool)
 *   3. Pulse                 (high-throughput Go + Kafka)
 *   4. Bayesian Pair Trading (quant research rigour)
 *   5. Halal Food Landscape  (data engineering at 99.72% coverage)
 */
export function HomeSelectedWork() {
  const spotlight = projects.find((p) => p.title === "360 Cogni")!;
  const rest = [
    projects.find((p) => p.title === "EQ-5D-5L TTO Research Tool")!,
    projects.find((p) => p.title === "Pulse — Social Intelligence")!,
    projects.find((p) => p.title === "Bayesian Pair Trading")!,
    projects.find((p) => p.title === "Halal Food Landscape")!,
  ];

  return (
    <section
      id="selected-work"
      aria-label="Selected work"
      className="relative scroll-mt-24 py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          eyebrow="02 · Selected work"
          title="Proof of work, not a checklist."
          lede="The strongest projects from the past two years. Each one lives somewhere — open source, in production, or both."
        />

        <div className="mt-12">
          <ProjectSpotlight
            title={spotlight.title}
            company="360 Cogni"
            href={spotlight.href}
            metric="Live · 1,000+ target users"
            imageSrc="/images/360cogni.jpeg"
            imageAlt="360 Cogni cognitive health platform"
            summary={spotlight.summary}
            problem="Cognitive screening tools were either clinical or generic — nothing for families trying to act early."
            approach="Defined scope across screening, brain training, and caregiver tools. Shipped the MVP at 360cogni.com with 5+ UX flows."
            outcomes={spotlight.outcomes}
            insight={spotlight.insight}
            tech={spotlight.tech}
            ctaLabel="Open 360cogni.com"
          />
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((p) => (
            <li key={p.title}>
              <ProjectCard
                title={p.title}
                category={categoryFromTech(p.tech[0])}
                description={p.summary}
                tech={p.tech}
                href={p.href}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
          >
            Read the full case studies
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary"
          >
            {siteConfig.social.github.replace("https://", "")}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}

function categoryFromTech(tech: string): string {
  const map: Record<string, string> = {
    React: "Frontend",
    "React Native": "Mobile",
    "Node.js": "Backend",
    Python: "Data · ML",
    Go: "Backend",
    "Next.js": "Full-stack",
  };
  return map[tech] ?? "Build";
}