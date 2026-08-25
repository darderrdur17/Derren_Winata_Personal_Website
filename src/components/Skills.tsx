import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award } from "lucide-react";
import { LINKEDIN_URL } from "@/lib/links";

const highlightSkills = [
  "Python",
  "TypeScript",
  "React 19",
  "Next.js",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "Supabase",
  "LangGraph",
  "Anthropic Claude",
  "Model Context Protocol",
  "Databricks",
  "Google Analytics",
  "Tailwind CSS",
  "AI/LLM Applications",
  "Product Strategy",
];

interface Certification {
  title: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
  skills?: string[];
}

const certificationGroups: { label: string; items: Certification[] }[] = [
  {
    label: "AI & LLM",
    items: [
      {
        title: "AI Fundamentals: Language and Vision in AI",
        issuer: "IBM",
        date: "Aug 2026",
        skills: ["Real-world AI Applications", "Natural Language Querying", "Computer Vision"],
      },
      {
        title: "AI Fundamentals: Foundations for Understanding AI",
        issuer: "IBM",
        date: "Aug 2026",
        skills: ["AI Concepts", "Machine Learning Basics", "Responsible AI"],
      },
      {
        title: "Claude with the Anthropic API",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["Anthropic API", "Prompt Engineering", "LLM Integration"],
      },
      {
        title: "Claude with Amazon Bedrock",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["Amazon Bedrock", "Claude", "Cloud AI Deployment"],
      },
      {
        title: "Claude Platform 101",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["Claude Platform", "AI Workflows", "Agent Tools"],
      },
      {
        title: "AI Fluency: Framework & Foundations",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["AI Strategy", "Human-AI Collaboration", "AI Fluency"],
      },
      {
        title: "Introduction to Model Context Protocol",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["MCP", "Tool Integration", "AI Agents"],
      },
    ],
  },
  {
    label: "Data & Analytics",
    items: [
      {
        title: "Databricks Fundamentals Accreditation",
        issuer: "Databricks",
        date: "Aug 2026",
        skills: ["Databricks", "Data Engineering", "Lakehouse"],
      },
      {
        title: "Google Analytics Certification",
        issuer: "Google",
        date: "Aug 2026",
        expiry: "Aug 2027",
        credentialId: "191811640",
        skills: ["Google Analytics", "Web Analytics", "Conversion Tracking"],
      },
      {
        title: "Data Analytics and Visualization Job Simulation",
        issuer: "Accenture · Forage",
        date: "Dec 2023",
        credentialId: "f7bFQEXKjmHAYeTfw",
        skills: ["Data Visualization", "Storytelling", "Strategy", "Public Speaking"],
      },
    ],
  },
];

const awards = [
  {
    title: "Bronze Award — Mathematical Olympiads",
    detail: "Thailand IMO & GBA Olympiad • 2021–2022",
  },
];

const Skills = () => {
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
    <section id="skills" ref={sectionRef} className="py-20 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`flex items-center gap-4 mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">04.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Skills & Expertise</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div
            className={`glass-card rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 ${
              isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
            }`}
          >
            <p className="text-sm text-muted-foreground mb-5">
              Core technologies and domains I work with across full-stack development, data, and AI.
            </p>
            <div className="flex flex-wrap gap-2">
              {highlightSkills.map((skill, index) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-secondary rounded-lg text-muted-foreground text-sm hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={`mt-10 ${isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Award className="text-primary" size={20} />
              Licenses & Certifications
            </h3>

            <div className="space-y-8">
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
                        <h4 className="text-foreground font-medium text-sm leading-snug">
                          {cert.title}
                        </h4>
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
            </div>

            {awards.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-mono uppercase tracking-wider text-primary/80 mb-3">
                  Awards
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {awards.map((award) => (
                    <div
                      key={award.title}
                      className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 flex items-center gap-4"
                    >
                      <span className="text-2xl">🥉</span>
                      <div>
                        <h4 className="text-foreground font-medium text-sm">{award.title}</h4>
                        <p className="text-muted-foreground text-xs mt-0.5">{award.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

export default Skills;
