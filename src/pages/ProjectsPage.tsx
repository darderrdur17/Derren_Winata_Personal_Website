import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProjectStory } from "@/components/sections/ProjectStory";
import { useDocumentMeta } from "@/lib/hooks/useDocumentMeta";
import { routeMeta } from "@/lib/site";
import { projects } from "@/data/projects";
import { categoryFromTech } from "@/lib/projectMeta";
import { approachFor, problemFor } from "@/lib/projectDeepContent";
import { projectsItemList } from "@/lib/structuredData";

/**
 * The case-study page. Per-project narrative copy (problem / approach) lives in
 * `@/lib/projectDeepContent` rather than inline here, so it sits beside the
 * other project data and can be covered by a test.
 */
const ProjectsPage = () => {
  useDocumentMeta({
    ...routeMeta("/projects"),
    path: "/projects",
    jsonLd: projectsItemList(),
  });

  return (
    <PageShell>
      <section className="relative pt-28 pb-8 sm:pt-36 sm:pb-12">
        <Container>
          <SectionHeader
            eyebrow="Projects"
            title="Selected work, in depth."
            lede="Each project below is the deep cut — problem, approach, and outcome. The homepage spotlight just shows the headline."
          />
        </Container>
      </section>

      <div className="pb-12">
        {projects.map((p, idx) => (
          <ProjectStory
            key={p.title}
            eyebrow={`Project ${String(idx + 1).padStart(2, "0")} · ${categoryFromTech(p.tech[0])}`}
            title={p.title}
            context={p.summary}
            problem={problemFor(p.title)}
            approach={approachFor(p.title)}
            outcomes={p.outcomes}
            insight={p.insight}
            tech={p.tech}
            href={p.href}
          />
        ))}
      </div>

      <section className="relative pb-24">
        <Container>
          <div className="surface-elevated flex flex-col items-center gap-3 rounded-2xl p-8 text-center sm:p-10">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
              More on GitHub
            </p>
            <p className="max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
              Smaller experiments, forks, and tooling live on GitHub. The
              repos below are the curated set; everything else is fair game.
            </p>
            <a
              href="https://github.com/darderrdur17"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
            >
              github.com/darderrdur17
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};

export default ProjectsPage;
