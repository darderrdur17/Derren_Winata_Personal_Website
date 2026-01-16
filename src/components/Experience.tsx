import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  type: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "National University of Singapore",
    role: "Part-Time Undergraduate Student Researcher",
    period: "Sep 2025 - Present",
    location: "Singapore",
    description: [
      "Conducting research on data science methodologies and applications",
      "Contributing to academic publications and research projects",
      "Developing content for university website initiatives",
    ],
    type: "Part-time",
  },
  {
    company: "AI Singapore",
    role: "Quality Assurance Student Assistant",
    period: "Mar 2024 - Present",
    location: "Singapore (Remote)",
    description: [
      "Conducted rigorous data validation, ensuring reliability and accuracy of datasets used in product launches, reducing post-launch errors by 30%",
      "Cross-referenced data with external sources, enhancing data integrity and minimizing inconsistencies",
      "Provided recommendations that improved data quality, contributing to a smoother product development cycle",
    ],
    type: "Part-time",
  },
  {
    company: "Firsty.app",
    role: "Client Development Intern",
    period: "May 2025 - Jul 2025",
    location: "Singapore (Hybrid)",
    description: [
      "Designed and automated a LinkedIn lead generation tool, streamlining outreach and improving prospect engagement efficiency",
      "Conducted market analysis to identify 300+ APAC companies based on ICP criteria, strengthening strategic targeting",
      "Built and managed a LinkedIn SDR account, developing a client-focused sales funnel with cold outreach, prospecting, and pitching",
    ],
    type: "Internship",
  },
  {
    company: "Medisaya",
    role: "Software Developer",
    period: "Feb 2025 - Jun 2025",
    location: "Singapore (Hybrid)",
    description: [
      "Developed Python-based web scrapers to extract 50k+ data records, reducing manual data collection time by 70%",
      "Built and maintained scalable APIs using Django REST Framework for secure health data access",
      "Collaborated with AI/ML team to integrate voice-activated commands and advanced analytics",
      "Implemented robust data handling with focus on security and privacy of sensitive medical information",
    ],
    type: "Internship",
  },
  {
    company: "Marina Bay Sands",
    role: "eCommerce Analytics Implementation Intern",
    period: "May 2024 - Dec 2024",
    location: "Singapore (Hybrid)",
    description: [
      "Automated critical stakeholder report using Python and Power Automate, reducing preparation time by ~83%",
      "Led full rollout of new website Data Layer, improving overall data accuracy to 98%",
      "Configured and optimized tracking in Tealium IQ, increasing reliability of captured data by 20%",
      "Analyzed website traffic and marketing data, providing recommendations that lifted conversion rates by 15%",
      "Partnered with Performance Marketing team for A/B tests, achieving 10% improvement in campaign ROI",
    ],
    type: "Internship",
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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
    <section id="experience" ref={sectionRef} className="py-24 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className={`flex items-center gap-4 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">02.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Experience</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className={`grid lg:grid-cols-12 gap-8 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {/* Company Tabs - Vertical on desktop, horizontal scroll on mobile */}
            <div className="lg:col-span-3">
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1 border-b lg:border-b-0 lg:border-l border-border">
                {experiences.map((exp, index) => (
                  <button
                    key={exp.company}
                    onClick={() => setActiveIndex(index)}
                    className={`px-4 py-3 text-left whitespace-nowrap lg:whitespace-normal text-sm font-mono transition-all duration-300 border-b-2 lg:border-b-0 lg:border-l-2 -mb-px lg:mb-0 lg:-ml-px ${
                      activeIndex === index
                        ? "text-primary border-primary bg-primary/5"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {exp.company.split(" ").slice(0, 2).join(" ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Details */}
            <div className="lg:col-span-9">
              <div className="min-h-[400px]">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.company}
                    className={`transition-all duration-300 ${
                      activeIndex === index ? "block animate-fade-in-up" : "hidden"
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {exp.role}{" "}
                      <span className="text-primary">@ {exp.company}</span>
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium">
                        {exp.type}
                      </span>
                    </div>

                    <ul className="space-y-4">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground">
                          <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
