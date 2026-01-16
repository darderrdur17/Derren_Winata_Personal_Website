import { Quote } from "lucide-react";

const Testimonial = () => {
  return (
    <section aria-label="Recommendation" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-10 border border-border/60 hover-glow">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Quote size={20} />
              </div>
              <div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  “Derren led a key RPA initiative that reduced a manual report from
                  one hour to just ten minutes, while staying collaborative and open
                  to feedback.”
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  Kevin Cayaba · Senior Digital Analytics Implementation Specialist ·
                  Marina Bay Sands
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
