import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { LINKEDIN_URL } from "@/lib/links";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  summary: string;
  highlight: string;
  tags: string[];
  featured?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    id: "aisg-programme",
    company: "AI Singapore",
    role: "Programme & Partnerships Assistant",
    period: "Mar 2026 – Jul 2026",
    type: "Part-time",
    summary: "Shipped AI for Good website, NSWS automation platform, and ASEAN Youth Challenge judging portal.",
    highlight: "3 platforms delivered",
    tags: ["Next.js", "FastAPI", "LangGraph"],
    featured: true,
  },
  {
    id: "360cogni",
    company: "360 Cogni",
    role: "Product Manager Intern",
    period: "Jan 2026 – Jul 2026",
    type: "Internship",
    summary: "Defined MVP roadmap, UX flows, and integrations for a cognitive health platform at 360cogni.com.",
    highlight: "1,000+ target users",
    tags: ["Product Strategy", "Supabase", "Vercel"],
    featured: true,
  },
  {
    id: "mbs",
    company: "Marina Bay Sands",
    role: "eCommerce Analytics Intern",
    period: "May 2024 – Dec 2024",
    type: "Internship",
    summary: "Automated reporting (83% faster), led Data Layer rollout to 98% accuracy, and optimized Tealium IQ tracking.",
    highlight: "83% faster reporting",
    tags: ["Python", "Tealium IQ", "Power Automate"],
    featured: true,
  },
  {
    id: "sunnystep",
    company: "Sunnystep",
    role: "AI Agent Intern",
    period: "Mar 2026 – Apr 2026",
    type: "Internship",
    summary: "Built Node.js marketing intelligence pipeline with Claude, automating briefs and content calendars.",
    highlight: "Daily AI briefs",
    tags: ["Node.js", "Claude", "Automation"],
  },
  {
    id: "nus-researcher",
    company: "National University of Singapore",
    role: "Student Researcher",
    period: "Nov 2025 – Feb 2026",
    type: "Part-time",
    summary: "Full-stack EQ-5D-5L TTO research platform with GDPR compliance and WCAG 2.1 AA accessibility.",
    highlight: "4 languages supported",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "aisg-qa",
    company: "AI Singapore",
    role: "Quality Assurance Assistant",
    period: "Mar 2024 – Jul 2026",
    type: "Part-time",
    summary: "Validated 1,000+ data files against official sources, cutting post-launch errors by 30%.",
    highlight: "30% fewer errors",
    tags: ["Data Validation", "QA", "Analytics"],
  },
];

const featuredExperiences = experiences.filter((exp) => exp.featured);
const otherExperiences = experiences.filter((exp) => !exp.featured);

const ExperienceCard = ({
  exp,
  index,
  featured = false,
}: {
  exp: ExperienceItem;
  index: number;
  featured?: boolean;
}) => (
  <a
    href={LINKEDIN_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`glass-card rounded-xl p-5 group hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 flex flex-col ${
      featured ? "border-primary/30 ring-1 ring-primary/10" : ""
    }`}
    style={{ animationDelay: `${index * 75}ms` }}
    aria-label={`View ${exp.role} at ${exp.company} on LinkedIn`}
  >
    <div className="flex items-start justify-between gap-2 mb-3">
      <span className="text-xs font-mono text-primary/80 uppercase tracking-wider">
        {featured ? "Featured · " : ""}
        {exp.highlight}
      </span>
      <ArrowUpRight
        size={16}
        className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
      />
    </div>

    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
      {exp.role}
    </h3>
    <p className="text-sm text-primary mt-0.5">{exp.company}</p>

    <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">{exp.summary}</p>

    <div className="flex flex-wrap gap-1.5 mt-4">
      {exp.tags.map((tag) => (
        <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-mono">
          {tag}
        </span>
      ))}
    </div>

    <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/50 text-xs text-muted-foreground">
      <span className="flex items-center gap-1">
        <Calendar size={12} />
        {exp.period}
      </span>
      <span className="px-2 py-0.5 bg-secondary rounded text-xs">{exp.type}</span>
    </div>
  </a>
);

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
    <section id="experience" ref={sectionRef} className="py-20 bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`flex items-center gap-4 mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">02.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Experience</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className={`grid lg:grid-cols-3 gap-4 mb-8 ${isVisible ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            {featuredExperiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} featured />
            ))}
          </div>

          {otherExperiences.length > 0 && (
            <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ${isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
              {otherExperiences.map((exp, index) => (
                <ExperienceCard key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          )}

          <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm"
            >
              View full experience on LinkedIn
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
