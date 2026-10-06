import { Calendar, MapPin } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ExperienceCard } from "@/components/sections/ExperienceCard";
import { useDocumentMeta } from "@/lib/hooks/useDocumentMeta";
import { timelineExperiences } from "@/data/experiences";
import { publications } from "@/data/publications";
import { routeMeta, siteConfig } from "@/lib/site";
import { breadcrumbList } from "@/lib/structuredData";

const ExperiencePage = () => {
  useDocumentMeta({
    ...routeMeta("/experience"),
    path: "/experience",
    jsonLd: breadcrumbList("/experience"),
  });

  return (
    <PageShell>
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20">
        <Container narrow>
          <SectionHeader
            eyebrow="Experience"
            title="Career timeline."
            lede={`All ${timelineExperiences.length} roles, newest first. Analytics, product, research, and full-stack delivery — spanning Singapore and the wider region.`}
          />
          <p className="mt-4 text-sm text-primary">
            Open to full-time roles and freelance projects — based in {siteConfig.location}.
          </p>
        </Container>
      </section>

      <section className="relative pb-24">
        <Container>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {timelineExperiences.map((exp) => (
              <li key={exp.id} className="flex flex-col">
                <ExperienceCard item={exp} variant="compact" className="flex-1" />
                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 px-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {/* Grouped + nowrap so a long location wraps at the separator
                      instead of breaking mid-phrase ("APR 2026 –" / "PRESENT"). */}
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <Calendar size={11} />
                    {exp.period}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <MapPin size={11} />
                    {exp.location}
                  </span>
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        className="relative pb-24"
        aria-label="Research and publications"
      >
        <Container>
          <SectionHeader
            eyebrow="Research & publications"
            title="Research output."
            lede="Research in progress, kept separate from the role timeline above."
          />
          <ul className="mt-10 grid gap-4">
            {publications.map((p) => (
              <li key={p.id}>
                <article className="flex h-full flex-col gap-4 rounded-xl border border-border/60 bg-card/40 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-primary">
                      {p.status}
                    </span>
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {p.venue}
                    </span>
                  </div>
                  <h3 className="text-pretty text-lg font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="text-sm text-primary/90">{p.credit}</p>
                  <p className="max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {p.summary}
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {p.contributions.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.7rem] text-muted-foreground/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </PageShell>
  );
};

export default ExperiencePage;
