import { Code2, Cpu, Sparkles, Users } from "lucide-react";

const stats = [
  {
    label: "Projects Delivered",
    value: "30+",
    icon: Code2,
  },
  {
    label: "Years of Experience",
    value: "2+",
    icon: Sparkles,
  },
  {
    label: "Industry Partners",
    value: "5",
    icon: Users,
  },
  {
    label: "Tech Stack Depth",
    value: "15+",
    icon: Cpu,
  },
];

const FeaturedStats = () => {
  return (
    <section aria-label="Featured stats" className="relative -mt-12 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-2xl border border-border/60 p-6 md:p-8 shadow-lg">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group flex items-center gap-4 rounded-xl border border-border/50 bg-background/60 p-4 transition-all duration-300 hover-glow"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={22} />
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedStats;
