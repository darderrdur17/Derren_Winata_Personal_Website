import { LineChart, Rocket, Search } from "lucide-react";

const steps = [
  {
    title: "Discover",
    description:
      "Clarify goals, align on KPIs, and map the data sources that power the story.",
    icon: Search,
  },
  {
    title: "Build",
    description:
      "Prototype models, automate pipelines, and translate signals into product insights.",
    icon: LineChart,
  },
  {
    title: "Deliver",
    description:
      "Ship dashboards, recommendations, and next steps that stakeholders can act on.",
    icon: Rocket,
  },
];

const Process = () => {
  return (
    <section id="process" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-primary">Process</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Discover → Build → Deliver
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="glass-card rounded-2xl p-6 border border-border/60 hover-glow transition-all duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
