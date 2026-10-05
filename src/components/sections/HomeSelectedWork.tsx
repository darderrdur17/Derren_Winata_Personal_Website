import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectSpotlight } from "@/components/sections/ProjectSpotlight";
import { projects } from "@/data/projects";
import { categoryFromTech } from "@/lib/projectMeta";
import { siteConfig } from "@/lib/site";

/**
 * 02 — Selected Work.
 *
 * One ProjectSpotlight (the strongest story: 360 Cogni), then a small grid
 * of ProjectCards for the rest. The deep "Problem → Approach → Outcome →
 * Insight" storytelling lives on /projects so the homepage rhythm stays
 * scannable.
 *
 * The grid leads with the most recent builds (2026) so the homepage reflects
 * current work; the full curated set — including the earlier research and
 * engineering projects — lives on /projects.
 */
export function HomeSelectedWork() {
  const spotlight = projects.find((p) => p.title === "360 Cogni")!;
  const rest = [
    projects.find((p) => p.title === "CommodityPlay.")!,
    projects.find((p) => p.title === "Trichella")!,
    projects.find((p) => p.title === "DDOG Earnings Tracker")!,
    projects.find((p) => p.title === "StyleSense AI")!,
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
