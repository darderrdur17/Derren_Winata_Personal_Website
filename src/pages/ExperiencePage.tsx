import { Calendar, MapPin } from "lucide-react";
import PageShell from "@/components/PageShell";
import { timelineExperiences } from "@/data/experiences";
import { AVAILABILITY_LABEL } from "@/data/site";

const ExperiencePage = () => {
  return (
    <PageShell>
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 bg-secondary/20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto min-w-0">
            <p className="font-mono text-primary text-sm mb-3">Experience</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Career timeline
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-2">
              All {timelineExperiences.length} roles, newest first — analytics, product,
              research, and full-stack delivery.
            </p>
            <p className="text-sm text-primary mb-14">{AVAILABILITY_LABEL}</p>

            <div className="relative">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-border md:left-4" aria-hidden="true" />

              <ol className="space-y-8">
                {timelineExperiences.map((exp) => (
                  <li key={exp.id} className="relative pl-10 sm:pl-12 md:pl-14">
                    <span className="absolute left-1.5 top-2 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background md:left-2.5" />
                    <article className="glass-card rounded-xl p-4 sm:p-5 md:p-6 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                        <span className="px-2 py-0.5 bg-secondary rounded">{exp.type}</span>
                      </div>

                      <h2 className="text-base sm:text-lg font-semibold text-foreground break-words">{exp.role}</h2>
                      <p className="text-primary text-sm mt-0.5">{exp.company}</p>
                      <p className="text-xs font-mono text-primary/80 mt-2">{exp.highlight}</p>

                      <ul className="mt-4 space-y-3">
                        {exp.details.map((detail) => (
                          <li key={detail} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                            <span className="text-primary mt-1 flex-shrink-0">▹</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default ExperiencePage;
