import { ArrowUpRight } from "lucide-react";

const featuredProjects = [
  {
    title: "Automated Stakeholder Reporting",
    description:
      "Built an RPA-powered reporting workflow that reduced manual reporting time from 60 minutes to 10.",
    metric: "83% faster reporting",
    image: "/images/marina-bay-sands-logo.jpeg",
    imageAlt: "Marina Bay Sands logo",
    href: "#experience",
    tags: ["Python", "Power Automate", "Analytics"],
  },
  {
    title: "Healthcare Data Extraction",
    description:
      "Delivered scalable data pipelines that captured 50k+ medical records while cutting collection time by 70%.",
    metric: "50k+ records processed",
    image: "/images/medisaya-logo.jpeg",
    imageAlt: "Medisaya logo",
    href: "#experience",
    tags: ["Python", "Django", "Automation"],
  },
  {
    title: "LinkedIn Lead Engine",
    description:
      "Designed a lead generation engine and ICP mapping workflow across 300+ APAC companies.",
    metric: "300+ companies mapped",
    image: "/images/firsty-app-logo.jpeg",
    imageAlt: "Firsty app logo",
    href: "#experience",
    tags: ["Automation", "Growth", "CRM"],
  },
];

const FeaturedProjects = () => {
  return (
    <section aria-label="Featured projects" className="py-16 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-primary">Featured</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Case Studies With Impact
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => {
              const isExternal = project.href.startsWith("http");
              return (
                <article
                  key={project.title}
                  className="glass-card rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover-glow"
                >
                  <div className="relative h-44 bg-muted/40">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-primary/80 font-mono">
                      {project.metric}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2 py-1 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-primary font-mono hover:underline"
                      aria-label={`View case study: ${project.title}`}
                    >
                      View case study <ArrowUpRight size={14} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
