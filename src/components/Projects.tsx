import { useEffect, useRef, useState } from "react";
import { ArrowRight, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

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
              <Link
                key={project.title}
                to="/projects"
                className="glass-card rounded-xl p-5 group hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                style={{ animationDelay: `${index * 75}ms` }}
                aria-label={`Read more about project: ${project.title}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Folder className="text-primary" size={24} />
                  <ArrowRight
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
                    <span key={tech} className="text-muted-foreground text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm"
            >
              View project insights
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
