import { useEffect, useRef, useState } from "react";
import { Code, Database, BarChart3, Wrench, Globe } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <Code className="text-primary" size={24} />,
    skills: ["Python", "Java", "R", "SQL", "HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Data Analytics",
    icon: <BarChart3 className="text-primary" size={24} />,
    skills: ["Data Collection & Processing", "A/B Testing", "KPI Optimization", "Statistical Analysis", "Data Visualization"],
  },
  {
    title: "Frameworks & Libraries",
    icon: <Database className="text-primary" size={24} />,
    skills: ["React", "Django REST Framework", "BeautifulSoup", "Selenium", "Pandas", "NumPy"],
  },
  {
    title: "Tools & Technologies",
    icon: <Wrench className="text-primary" size={24} />,
    skills: ["Tealium IQ", "Tableau", "Power Automate", "Excel", "Git", "Web Scraping"],
  },
  {
    title: "Languages",
    icon: <Globe className="text-primary" size={24} />,
    skills: ["English (Native)", "Bahasa Indonesia (Native)", "Chinese (Limited Working)", "Hokkien (Native)"],
  },
];

const Skills = () => {
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
    <section id="skills" ref={sectionRef} className="py-24 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`flex items-center gap-4 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">04.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Skills & Expertise</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className={`glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-secondary rounded-lg text-muted-foreground text-sm hover:bg-primary/10 hover:text-primary transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className={`mt-16 ${isVisible ? "animate-fade-in-up delay-500" : "opacity-0"}`}>
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Certifications & Awards
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏅</span>
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium">
                      Accenture Data Analytics and Visualization
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Forage • Dec 2023
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Skills: Storytelling, Strategy, Data Analytics
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass-card rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🥉</span>
                  </div>
                  <div>
                    <h4 className="text-foreground font-medium">
                      Bronze Award - Mathematical Olympiads
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      GBA & Thailand IMO • 2021-2022
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      Heat Round Awards in Regional Olympiads
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
