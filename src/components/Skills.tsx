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
  "Anthropic Claude",
  "Model Context Protocol",
  "Databricks",
  "Google Analytics",
  "Tailwind CSS",
  "AI/LLM Applications",
  "Product Strategy",
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

          <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
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
