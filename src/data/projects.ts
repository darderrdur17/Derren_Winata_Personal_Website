import { GITHUB_URL } from "@/lib/links";

export interface Project {
  title: string;
  summary: string;
  insight: string;
  outcomes: string[];
  tech: string[];
  href: string;
}

export const projects: Project[] = [
  {
    title: "360 COGNI",
    summary: "Dementia & cognitive health platform with screening, brain training, and caregiver tools.",
    insight:
      "I helped shape the product from problem to MVP: who the platform serves, which workflows matter first, and how screening, training, and caregiver support fit together in one experience.",
    outcomes: [
      "Defined MVP scope for screening, brain training, and caregiver tools",
      "Aligned UX flows and integrations around a 1,000+ user target",
      "Shipped a live product at 360cogni.com",
    ],
    tech: ["React 19", "React Native", "Supabase"],
    href: "https://360cogni.com",
  },
  {
    title: "EQ-5D-5L TTO Research Tool",
    summary: "Health economics research platform with real-time utility calculations and AI co-pilot.",
    insight:
      "The goal was a research-grade Time Trade-Off tool that researchers could actually run: accessible, multilingual, and careful with health data while still calculating utilities in real time.",
    outcomes: [
      "Built full-stack study flows with React, Node.js, and PostgreSQL",
      "Added real-time utility calculations and an AI co-pilot for researchers",
      "Designed for GDPR handling and WCAG 2.1 AA across 4 languages",
    ],
    tech: ["React", "Node.js", "PostgreSQL"],
    href: "https://github.com/darderrdur17/EQ-5D-5L-TTO",
  },
  {
    title: "Bayesian Pair Trading",
    summary: "Walk-forward optimized S&P 500 pairs trading with Optuna and dual cointegration testing.",
    insight:
      "I treated pair selection as a research problem, not a one-off backtest: walk-forward optimization, dual cointegration checks, and Bayesian search so signals had to survive out-of-sample windows.",
    outcomes: [
      "Implemented walk-forward optimization on S&P 500 pairs",
      "Used Optuna to search strategy parameters systematically",
      "Added dual cointegration testing to reduce fragile pair selection",
    ],
    tech: ["Python", "Optuna", "Quant Finance"],
    href: "https://github.com/darderrdur17/Bayesian-Optimized-Pair-Trading--S-P-500-",
  },
  {
    title: "Pulse — Social Intelligence",
    summary: "Concurrent Go pipeline crawling HN & Reddit with Kafka streaming and user scoring.",
    insight:
      "Pulse is a high-throughput social listening pipeline. The interesting part is concurrency: crawl, stream, and score users without turning noisy forums into a bottleneck.",
    outcomes: [
      "Crawled Hacker News and Reddit with a concurrent Go pipeline",
      "Streamed events through Kafka for downstream scoring",
      "Built user scoring so signal could be ranked, not just collected",
    ],
    tech: ["Go", "PostgreSQL", "Kafka"],
    href: "https://github.com/darderrdur17/pulse",
  },
  {
    title: "Sunnystep Strides",
    summary: "AI marketing automation dashboard with autonomous agents and predictive analytics.",
    insight:
      "This dashboard turns marketing research into a daily operating system: agents draft briefs, the UI surfaces predictions, and the team can act without rebuilding the workflow each week.",
    outcomes: [
      "Built an automation dashboard on React 18 and Supabase",
      "Connected autonomous agents to briefing and calendar workflows",
      "Visualized predictive analytics with Recharts",
    ],
    tech: ["React 18", "Supabase", "Recharts"],
    href: GITHUB_URL,
  },
  {
    title: "Halal Food Landscape",
    summary: "MUIS data pipeline validating 2,695+ establishments with 99.72% address coverage.",
    insight:
      "I focused on coverage and trust: ingest MUIS listings, validate addresses, and produce a landscape dataset that is actually usable for analysis rather than a raw scrape.",
    outcomes: [
      "Processed 2,695+ establishments from MUIS source data",
      "Reached 99.72% address coverage through validation",
      "Used Python, Pandas, and Selenium for collection and cleanup",
    ],
    tech: ["Python", "Pandas", "Selenium"],
    href: "https://github.com/darderrdur17/Halal_food_landscape",
  },
];
