import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Folder } from "lucide-react";
import { GITHUB_URL } from "@/lib/links";

interface Project {
  title: string;
  summary: string;
  tech: string[];
  href: string;
}

const projects: Project[] = [
  {
    title: "360 COGNI",
    summary: "Dementia & cognitive health platform with screening, brain training, and caregiver tools.",
    tech: ["React 19", "React Native", "Supabase"],
    href: "https://360cogni.com",
  },
  {
    title: "EQ-5D-5L TTO Research Tool",
    summary: "Health economics research platform with real-time utility calculations and AI co-pilot.",
    tech: ["React", "Node.js", "PostgreSQL"],
    href: "https://github.com/darderrdur17/EQ-5D-5L-TTO",
  },
  {
    title: "Bayesian Pair Trading",
    summary: "Walk-forward optimized S&P 500 pairs trading with Optuna and dual cointegration testing.",
    tech: ["Python", "Optuna", "Quant Finance"],
    href: "https://github.com/darderrdur17/Bayesian-Optimized-Pair-Trading--S-P-500-",
  },
  {
    title: "Pulse — Social Intelligence",
    summary: "Concurrent Go pipeline crawling HN & Reddit with Kafka streaming and user scoring.",
    tech: ["Go", "PostgreSQL", "Kafka"],
    href: "https://github.com/darderrdur17/pulse",
  },
  {
    title: "Sunnystep Strides",
    summary: "AI marketing automation dashboard with autonomous agents and predictive analytics.",
    tech: ["React 18", "Supabase", "Recharts"],
    href: GITHUB_URL,
  },
  {
    title: "Halal Food Landscape",
    summary: "MUIS data pipeline validating 2,695+ establishments with 99.72% address coverage.",
    tech: ["Python", "Pandas", "Selenium"],
    href: "https://github.com/darderrdur17/Halal_food_landscape",
  },
];

const Projects = () => {
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
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`flex items-center gap-4 mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">03.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-5 group hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                style={{ animationDelay: `${index * 75}ms` }}
                aria-label={`View project: ${project.title}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Folder className="text-primary" size={24} />
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>

                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-muted-foreground text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
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
  );
};

export default Projects;
