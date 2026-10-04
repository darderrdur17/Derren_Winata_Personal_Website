import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ExperienceCard } from "@/components/sections/ExperienceCard";
import { featuredExperiences } from "@/data/experiences";
import { siteConfig } from "@/lib/site";

/**
 * 04 — Experience. Atlas-curated highlight reel:
 *   - Three featured experiences on top (AI Singapore, 360 Cogni, MBS).
 *
 * Designed so a recruiter sees breadth and depth in one screen, with a link
 * to the full timeline for context.
 */
export function HomeExperience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="relative py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          eyebrow="04"
          title="Experience across the pipeline."
          lede="The three roles most representative of the work — analytics, product, and full-stack delivery. Full timeline on /experience."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredExperiences.map((exp) => (
            <ExperienceCard key={exp.id} item={exp} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <a
            href={siteConfig.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
          >
            Resume (PDF)
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
          <Link
            to="/experience"
            className="group inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary"
          >
            Full timeline
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