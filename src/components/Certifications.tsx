import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LINKEDIN_URL } from "@/lib/links";
import { awards, certificationGroups } from "@/data/certifications";

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`flex items-center gap-4 mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">05.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Certifications</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className={`space-y-8 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {certificationGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-mono uppercase tracking-wider text-primary/80 mb-3">
                  {group.label}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((cert) => (
                    <div
                      key={cert.title}
                      className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 flex flex-col"
                    >
                      <h3 className="text-foreground font-medium text-sm leading-snug">{cert.title}</h3>
                      <p className="text-primary text-xs mt-1.5">{cert.issuer}</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Issued {cert.date}
                        {cert.expiry ? ` · Expires ${cert.expiry}` : ""}
                      </p>
                      {cert.credentialId && (
                        <p className="text-muted-foreground/70 text-xs mt-0.5 font-mono">
                          ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/50">
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
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-primary/80 mb-3">Awards</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {awards.map((award) => (
                  <div
                    key={award.title}
                    className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 flex items-center gap-4"
                  >
                    <span className="text-2xl">🥉</span>
                    <div>
                      <h3 className="text-foreground font-medium text-sm">{award.title}</h3>
                      <p className="text-muted-foreground text-xs mt-0.5">{award.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm"
            >
              View all credentials on LinkedIn
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
