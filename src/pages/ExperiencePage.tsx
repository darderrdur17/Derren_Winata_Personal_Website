import { Calendar, MapPin } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ExperienceCard } from "@/components/sections/ExperienceCard";
import { useDocumentMeta } from "@/lib/hooks/useDocumentMeta";
import { timelineExperiences } from "@/data/experiences";
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
              <li key={exp.id}>
                <ExperienceCard item={exp} variant="compact" />
                <p className="mt-2 flex items-center gap-2 px-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <Calendar size={11} />
                  {exp.period}
                  <span aria-hidden="true">·</span>
                  <MapPin size={11} />
                  {exp.location}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </PageShell>
  );
};

export default ExperiencePage;
