import { ArrowUpRight } from "lucide-react";
import { LINKEDIN_URL } from "@/lib/links";

interface FeaturedItem {
  company: string;
  title: string;
  description: string;
  metric: string;
  image?: string;
  imageAlt: string;
  href: string;
  tags: string[];
  logo?: boolean;
}

const featuredProjects: FeaturedItem[] = [
  {
    company: "AI Singapore",
    title: "Programme & Platform Development",
    description:
      "Built AI for Good website, NSWS automation platform, and ASEAN Youth Challenge judging portal — full-stack delivery across Next.js, FastAPI, and LangGraph.",
    metric: "3 platforms shipped",
    image: "/images/ai-singapore-logo.png",
    imageAlt: "AI Singapore logo",
    href: LINKEDIN_URL,
    tags: ["Next.js", "FastAPI", "LangGraph"],
    logo: true,
  },
  {
    company: "360 Cogni",
    title: "Cognitive Health Platform MVP",
    description:
      "Product-managed dementia support platform with screening, brain training, and caregiver tools — live at 360cogni.com, scaling to 1,000+ users.",
    metric: "1,000+ target users",
    image: "/images/360cogni-logo.png",
    imageAlt: "360 Cogni logo",
    href: "https://360cogni.com",
    tags: ["React 19", "Supabase", "Product"],
    logo: true,
  },
  {
    company: "Marina Bay Sands",
    title: "eCommerce Analytics Implementation",
    description:
      "Automated stakeholder reporting (83% faster), led Data Layer rollout to 98% accuracy, and optimized Tealium IQ tracking with A/B test-driven ROI gains.",
    metric: "83% faster reporting",
    image: "/images/marina-bay-sands-logo.jpeg",
    imageAlt: "Marina Bay Sands logo",
    href: LINKEDIN_URL,
    tags: ["Python", "Tealium IQ", "Analytics"],
    logo: true,
  },
];

const FeaturedProjects = () => {
  return (
    <section aria-label="Featured projects" className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-primary">Featured</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Featured Experience
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => {
              const isExternal = project.href.startsWith("http");
              return (
                <a
                  key={project.company}
                  href={project.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="glass-card rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover-glow group block"
                  aria-label={`View ${project.company} case study`}
                >
                  <div className={`relative h-32 ${project.logo ? "bg-white" : "bg-muted/40"}`}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className={
                          project.logo
                            ? "h-full w-full object-contain p-4"
                            : "h-full w-full object-cover"
                        }
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
                      {project.company}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-[0.2em] text-primary/80 font-mono">
                        {project.metric}
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
