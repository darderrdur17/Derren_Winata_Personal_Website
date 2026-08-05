import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
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
  "Tailwind CSS",
  "Docker",
  "Pandas",
  "Quantitative Finance",
  "AI/LLM Applications",
  "Product Strategy",
  "Marketing Automation",
];

const certifications = [
  {
    icon: "🏅",
    title: "Accenture Data Analytics and Visualization",
    detail: "Forage • Dec 2023",
  },
  {
    icon: "🥉",
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

          <div
            className={`grid sm:grid-cols-2 gap-4 mt-6 ${isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}
          >
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 flex items-center gap-4"
              >
                <span className="text-2xl">{cert.icon}</span>
                <div>
                  <h4 className="text-foreground font-medium text-sm">{cert.title}</h4>
                  <p className="text-muted-foreground text-xs mt-0.5">{cert.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm"
            >
              View full skills profile on LinkedIn
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
