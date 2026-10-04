export interface Recommendation {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  date: string;
  /** Project or experience this recommendation should be attached to. */
  anchor?: "360cogni" | "marina-bay" | "ai-singularity" | "nus" | "general";
}

export const recommendations: Recommendation[] = [
  {
    id: "otsuki-360cogni",
    quote:
      "Derren proved to be more than just a capable developer — he was a problem-solver who managed startup ambiguity with intentionality and domain awareness beyond a typical technical lead. He actively seeks critiques and treats every piece of feedback as a tool for refinement. He doesn't just deliver code — he delivers growth and insight.",
    name: "Sasagu Otsuki",
    role: "Co-founder & CTO",
    company: "360Cogni",
    date: "March 2026",
    anchor: "360cogni",
  },
  {
    id: "tan-360cogni",
    quote:
      "Derren is a quick learner with a sharp ability to grasp objectives and deliver focused, high-quality results. What truly sets him apart is his versatility and entrepreneurial mindset — he doesn't just execute tasks but thinks critically about how his work fits into the bigger picture across the business value chain.",
    name: "Peter SS Tan",
    role: "Distinguished Senior Fellow (NUS) · Co-Founder",
    company: "360Cogni",
    date: "February 2026",
    anchor: "360cogni",
  },
  {
    id: "cayaba-mbs",
    quote:
      "Derren led a key RPA initiative that reduced a manual report from one hour to just ten minutes, while staying collaborative and open to feedback.",
    name: "Kevin Cayaba",
    role: "Senior Digital Analytics Implementation Specialist",
    company: "Marina Bay Sands",
    date: "2024",
    anchor: "marina-bay",
  },
];

export const homepageRecommendations = recommendations.filter(
  (r) => r.anchor !== "marina-bay" || true // all three shown on homepage
);