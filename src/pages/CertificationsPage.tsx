import { ArrowUpRight, Award } from "lucide-react";
import PageShell from "@/components/PageShell";
import { awards, certificationGroups } from "@/data/certifications";
import { LINKEDIN_URL } from "@/lib/links";

const CertificationsPage = () => {
  return (
    <PageShell>
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto min-w-0">
            <p className="font-mono text-primary text-sm mb-3">Certifications</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 break-words">
              Credentials & awards
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mb-8 sm:mb-12 text-sm sm:text-base">
              Full details for every certificate and award, grouped by category.
            </p>

            <div className="space-y-10 sm:space-y-12">
              {certificationGroups.map((group) => (
                <div key={group.label} className="min-w-0">
                  <p className="text-xs font-mono uppercase tracking-wider text-primary/80 mb-4">
                    {group.label}
                  </p>
                  <div className="grid gap-4 sm:gap-5">
                    {group.items.map((cert) => (
                      <article key={cert.title} className="glass-card rounded-xl p-4 sm:p-6 md:p-7 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                          <div className="min-w-0">
                            <h2 className="text-base sm:text-lg font-semibold text-foreground break-words">
                              {cert.title}
                            </h2>
                            <p className="text-primary text-sm mt-1">{cert.issuer}</p>
                          </div>
                          {cert.certificateUrl && (
                            <a
                              href={cert.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-mono self-start"
                            >
                              View certificate
                              <ArrowUpRight size={14} />
                            </a>
                          )}
                        </div>

                        <p className="text-muted-foreground text-sm">
                          Issued {cert.date}
                          {cert.expiry ? ` · Expires ${cert.expiry}` : ""}
                        </p>
                        {cert.credentialId && (
                          <p className="text-muted-foreground/70 text-xs mt-1 font-mono break-all">
                            ID: {cert.credentialId}
                          </p>
                        )}
                        {cert.insight && (
                          <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                            {cert.insight}
                          </p>
                        )}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/50">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-primary/80 mb-4">Awards</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {awards.map((award) => (
                    <article
                      key={award.title}
                      className="glass-card rounded-xl p-4 sm:p-6 flex items-start sm:items-center gap-4"
                    >
                      <Award className="text-primary flex-shrink-0" size={22} />
                      <div className="min-w-0">
                        <h2 className="text-foreground font-medium text-sm break-words">{award.title}</h2>
                        <p className="text-muted-foreground text-xs mt-0.5">{award.detail}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-primary hover:underline font-mono text-sm"
              >
                View all credentials on LinkedIn
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default CertificationsPage;
