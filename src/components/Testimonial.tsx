import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

interface Recommendation {
  quote: string;
  name: string;
  role: string;
  company: string;
  date: string;
}

const recommendations: Recommendation[] = [
  {
    quote:
      "Derren proved to be more than just a capable developer — he was a problem-solver who managed startup ambiguity with intentionality and domain awareness beyond a typical technical lead. He actively seeks critiques and treats every piece of feedback as a tool for refinement. He doesn't just deliver code — he delivers growth and insight.",
    name: "Sasagu Otsuki",
    role: "Co-founder & CTO",
    company: "360Cogni",
    date: "March 2026",
  },
  {
    quote:
      "Derren is a quick learner with a sharp ability to grasp objectives and deliver focused, high-quality results. What truly sets him apart is his versatility and entrepreneurial mindset — he doesn't just execute tasks but thinks critically about how his work fits into the bigger picture across the business value chain.",
    name: "Peter SS Tan",
    role: "Distinguished Senior Fellow (NUS) · Co-Founder",
    company: "360Cogni",
    date: "February 2026",
  },
  {
    quote:
      "Derren led a key RPA initiative that reduced a manual report from one hour to just ten minutes, while staying collaborative and open to feedback.",
    name: "Kevin Cayaba",
    role: "Senior Digital Analytics Implementation Specialist",
    company: "Marina Bay Sands",
    date: "2024",
  },
];

const Testimonial = () => {
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
    <section id="recommendations" ref={sectionRef} aria-label="Recommendations" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`flex items-center gap-4 mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">Recommendations</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What People Say</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <article
                key={rec.name}
                className={`glass-card rounded-2xl p-6 md:p-7 border border-border/60 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0 mb-4">
                  <Quote size={18} />
                </div>

                <blockquote className="text-sm md:text-base text-foreground leading-relaxed flex-1">
                  “{rec.quote}”
                </blockquote>

                <footer className="mt-5 pt-4 border-t border-border/50">
                  <cite className="not-italic">
                    <div className="text-sm font-semibold text-foreground">{rec.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {rec.role} · {rec.company}
                    </div>
                    <div className="text-xs text-primary/70 font-mono mt-1">{rec.date}</div>
                  </cite>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
