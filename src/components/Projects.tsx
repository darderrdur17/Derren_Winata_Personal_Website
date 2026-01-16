import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

const featuredProjects: Project[] = [
  {
    title: "360Cogni - Dementia Support Platform",
    description:
      "A comprehensive dementia support platform (MindBridge MVP) designed to assist caregivers and patients with personalized support tools, activity tracking, and cognitive exercises.",
    tech: ["TypeScript", "React", "Tailwind CSS", "AI Integration"],
    github: "https://github.com/darderrdur17/360Cogni",
    featured: true,
  },
  {
    title: "EQ-5D-5L TTO Research Tool",
    description:
      "A Time Trade-Off (TTO) research tool for health economics studies, enabling researchers to gather quality-adjusted life year (QALY) data for health state valuations.",
    tech: ["TypeScript", "React", "Data Analytics"],
    github: "https://github.com/darderrdur17/EQ-5D-5L-TTO",
    featured: true,
  },
  {
    title: "Bassline - Nightlife Navigator",
    description:
      "A nightlife discovery platform for San Francisco featuring interactive maps, search, and curated venue categories.",
    tech: ["TypeScript", "React", "Leaflet"],
    github: "https://github.com/darderrdur17/nightlife-navigator",
    featured: true,
  },
];

const otherProjects: Project[] = [
  {
    title: "IEEE-CIS Fraud Detection",
    description: "Machine learning model for detecting fraudulent transactions using advanced classification techniques.",
    tech: ["Python", "Jupyter", "ML"],
    github: "https://github.com/darderrdur17/IEEE-CIS-Fraud-Detection",
  },
  {
    title: "8K-Fillings",
    description: "Python-based tool for processing and analyzing 8-K SEC filings data.",
    tech: ["Python", "Data Processing"],
    github: "https://github.com/darderrdur17/8K-Fillings",
  },
  {
    title: "FinChatAdvisor",
    description: "AI-powered financial advisor chatbot providing personalized investment guidance.",
    tech: ["JavaScript", "AI", "Finance"],
    github: "https://github.com/darderrdur17/FinChatAdvisor",
  },
  {
    title: "SmartCart",
    description: "Intelligent shopping cart application with recommendation engine and price tracking.",
    tech: ["JavaScript", "React", "E-commerce"],
    github: "https://github.com/darderrdur17/SmartCart",
  },
  {
    title: "CodeMentor",
    description: "Peer learning platform for matching mentors and mentees with guided learning paths.",
    tech: ["React", "TypeScript", "UI/UX"],
    github: "https://github.com/darderrdur17/CodeMentor",
  },
  {
    title: "Halal Food Landscape",
    description: "Data exploration project mapping halal dining options and regional trends.",
    tech: ["Python", "Data Analytics", "Visualization"],
    github: "https://github.com/darderrdur17/Halal_food_landscape",
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`flex items-center gap-4 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">03.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Featured Projects */}
          <div className="space-y-24 mb-24">
            {featuredProjects.map((project, index) => (
              <div
                key={project.title}
                className={`grid md:grid-cols-12 gap-4 items-center ${
                  index % 2 === 1 ? "md:text-right" : ""
                } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div
                  className={`md:col-span-7 ${
                    index % 2 === 1 ? "md:col-start-6" : ""
                  }`}
                >
                  <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group">
                    <p className="font-mono text-primary text-sm mb-2">
                      Featured Project
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className={`flex flex-wrap gap-2 mb-6 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className={`flex gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="GitHub Repository"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects Header */}
          <h3 className={`text-xl font-semibold text-center text-foreground mb-8 ${isVisible ? "animate-fade-in-up delay-500" : "opacity-0"}`}>
            Other Noteworthy Projects
          </h3>

          {/* Other Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherProjects.map((project, index) => (
              <div
                key={project.title}
                className={`glass-card rounded-xl p-6 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 group ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 6) * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Folder className="text-primary" size={32} />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-muted-foreground text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* View More Link */}
          <div className={`text-center mt-12 ${isVisible ? "animate-fade-in-up delay-600" : "opacity-0"}`}>
            <a
              href="https://github.com/darderrdur17"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm"
            >
              View More on GitHub
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
