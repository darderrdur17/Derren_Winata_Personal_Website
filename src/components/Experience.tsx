import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { experienceHighlights } from "@/data/experiences";

const Experience = () => {
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
    <section id="experience" ref={sectionRef} className="py-16 sm:py-20 bg-secondary/20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`flex items-center gap-3 sm:gap-4 mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">02.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Experience</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {experienceHighlights.map((highlight) => (
              <Link
                key={highlight.label}
                to="/experience"
                className="glass-card rounded-xl p-5 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 flex flex-col min-w-0"
                aria-label={`View ${highlight.label} experience`}
              >
                <p className="text-xs font-mono uppercase tracking-wider text-primary/80 mb-3">
                  {highlight.label}
                </p>
                <h3 className="text-foreground font-medium text-sm leading-snug break-words">
                  {highlight.title}
                </h3>
                <p className="text-primary text-xs mt-1.5 break-words">{highlight.company}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">
                  {highlight.summary}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-border/50">
                  <p className="text-muted-foreground text-xs">{highlight.period}</p>
                  <p className="text-muted-foreground/80 text-xs font-mono">
                    {highlight.extraCount} {highlight.extraCount === 1 ? "role" : "roles"}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            <Link
              to="/experience"
              className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm"
            >
              View full experience timeline
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
