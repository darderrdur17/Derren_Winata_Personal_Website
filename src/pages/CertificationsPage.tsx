import { ArrowUpRight, Award } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { useDocumentMeta } from "@/lib/hooks/useDocumentMeta";
import { awards, certificationGroups } from "@/data/certifications";
import { routeMeta, siteConfig } from "@/lib/site";
import { breadcrumbList } from "@/lib/structuredData";

const CertificationsPage = () => {
  useDocumentMeta({
    ...routeMeta("/certifications"),
    path: "/certifications",
    jsonLd: breadcrumbList("/certifications"),
  });

  return (
    <PageShell>
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16">
        <Container>
          <SectionHeader
            eyebrow="Certifications"
            title="Credentials & awards."
            lede="17 credentials earned in the past 18 months across AI/LLM, Data & Analytics, Project Management, and Finance — grouped by category."
          />
        </Container>
      </section>

      <section className="relative pb-16">
        <Container>
          <div className="space-y-12">
            {certificationGroups.map((group) => (
              <div key={group.label}>
                <div className="flex items-baseline gap-3">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
                    {group.label}
                  </p>
                  <span className="hairline flex-1" aria-hidden="true" />
                  <span className="font-mono text-[0.7rem] text-muted-foreground">
                    {group.items.length} {group.items.length === 1 ? "credential" : "credentials"}
                  </span>
                </div>

                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {group.items.map((cert) => (
                    <li
                      key={cert.title}
                      className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-5 transition-[box-shadow,border-color] duration-300 hover-glow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-foreground">
                          {cert.title}
                        </h3>
                        {cert.certificateUrl && (
                          <a
                            href={cert.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                          >
                            View
                            <ArrowUpRight size={12} />
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-primary/90">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">
                        Issued {cert.date}
                        {cert.expiry ? ` · Expires ${cert.expiry}` : ""}
                      </p>
                      {cert.credentialId && (
                        <p className="font-mono text-[0.7rem] text-muted-foreground/70 break-all">
                          ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.insight && (
                        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                          {cert.insight}
                        </p>
                      )}
                      {cert.skills && cert.skills.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-1.5 border-t border-border/50 pt-3">
                          {cert.skills.map((skill) => (
                            <li
                              key={skill}
                              className="font-mono text-[0.7rem] text-muted-foreground"
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <div className="flex items-baseline gap-3">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
                  Awards
                </p>
                <span className="hairline flex-1" aria-hidden="true" />
              </div>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {awards.map((award) => (
                  <li
                    key={award.title}
                    className="flex items-start gap-4 rounded-xl border border-border/60 bg-card/40 p-5"
                  >
                    <Award className="text-primary flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{award.title}</p>
                      <p className="text-xs text-muted-foreground">{award.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative pb-24">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              All credentials on LinkedIn
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};

export default CertificationsPage;
