import { ArrowUpRight, Folder } from "lucide-react";
import PageShell from "@/components/PageShell";
import { projects } from "@/data/projects";
import { GITHUB_URL } from "@/lib/links";

const ProjectsPage = () => {
  return (
    <PageShell>
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto min-w-0">
            <p className="font-mono text-primary text-sm mb-3">Projects</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Selected work
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8 sm:mb-12 text-sm sm:text-base">
              Deeper notes on what I built, why it mattered, and what shipped.
              Each card includes the problem, outcomes, and stack.
            </p>

            <div className="grid gap-6">
              {projects.map((project) => (
                <article key={project.title} className="glass-card rounded-xl p-4 sm:p-6 md:p-8 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <Folder className="text-primary flex-shrink-0 mt-0.5" size={22} />
                      <h2 className="text-lg sm:text-xl font-semibold text-foreground break-words">{project.title}</h2>
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-mono flex-shrink-0"
                    >
                      View
                      <ArrowUpRight size={14} />
                    </a>
                  </div>

                  <p className="text-foreground/90 text-sm leading-relaxed mb-3">{project.summary}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.insight}</p>

                  <ul className="space-y-2 mb-5">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="text-primary mt-1 flex-shrink-0">▹</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm"
              >
                View all projects on GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ProjectsPage;
