import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    { label: "Years of Experience", value: "2+" },
    { label: "Projects Completed", value: "30+" },
    { label: "Companies Worked With", value: "5" },
    { label: "Technologies Mastered", value: "15+" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`flex items-center gap-4 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">01.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">About Me</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* About Text */}
            <div className={`lg:col-span-3 space-y-6 ${isVisible ? "animate-slide-in-left delay-200" : "opacity-0"}`}>
              <p className="text-muted-foreground leading-relaxed">
                I'm a Data Science and Analytics student at the{" "}
                <span className="text-primary">National University of Singapore</span>,
                passionate about leveraging data to drive impactful business decisions.
                My journey in tech started with a curiosity for how numbers tell stories,
                and it has evolved into expertise across data analytics, software development,
                and business intelligence.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Currently, I work as a{" "}
                <span className="text-primary">Quality Assurance Student Assistant</span> at
                AI Singapore and contribute as a{" "}
                <span className="text-primary">Student Researcher</span> at NUS. Previously,
                I've had the privilege of working at industry leaders like{" "}
                <span className="text-primary">Marina Bay Sands</span> and innovative startups
                like <span className="text-primary">Medisaya</span> and{" "}
                <span className="text-primary">Firsty.app</span>.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Beyond the technical realm, I'm actively involved in student organizations,
                having served as General Secretary of NUS Buddhist Society and Outreach
                Co-Director at NUSSU commIT. I believe in creating technology that serves
                people and communities.
              </p>

              <div className="pt-4">
                <p className="text-foreground font-medium mb-4">
                  Technologies I've been working with:
                </p>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["Python", "React", "Django", "SQL", "Tableau", "Tealium IQ", "R", "Java", "Power Automate"].map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-2 text-muted-foreground text-sm"
                    >
                      <span className="text-primary">▹</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stats Grid */}
            <div className={`lg:col-span-2 ${isVisible ? "animate-slide-in-right delay-300" : "opacity-0"}`}>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={item.label}
                    className="glass-card rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                      {item.value}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Education Card */}
              <div className="glass-card rounded-xl p-6 mt-4 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">
                      National University of Singapore
                    </h3>
                    <p className="text-primary text-sm">
                      B.Sc. Data Science & Analytics
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Aug 2022 - Present
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

export default About;
