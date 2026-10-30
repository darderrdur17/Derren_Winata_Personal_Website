import { GITHUB_URL } from "@/lib/links";

export interface Project {
  title: string;
  summary: string;
  insight: string;
  outcomes: string[];
  tech: string[];
  href: string;
}

/**
 * Curated project set — the single source of truth for the homepage
 * "Selected work" grid, the /projects case-study page, and the JSON-LD
 * ItemList. Ordered product → research → engineering so the page reads as a
 * narrative rather than a changelog.
 *
 * Invariants (guarded by `projects.test.ts`):
 *   - The flagship (360 Cogni) stays at index 0 — the homepage spotlight and
 *     `structuredData.test.ts` both key off `projects[0]`.
 *   - Titles are unique — the homepage grid and the ProjectsPage deep-content
 *     look-ups resolve projects by exact title.
 */
/**
 * Homepage curation — the spotlight plus the four grid cards.
 *
 * The homepage is an editorial edit, not a slice of `projects`: it leads with
 * the newest live builds and then the strongest analytics work, so a visitor
 * sees current work rather than a changelog. Keeping the titles here (rather
 * than inline in the component) lets `projects.test.ts` assert that every pick
 * still resolves — the grid looks them up by exact title and non-null asserts,
 * so a rename or removal would otherwise throw at render time.
 */
export const homeSpotlightTitle = "360 Cogni";

export const homeGridTitles = [
  "ApexIQ",
  "TennisIQ",
  "ViralIQ",
  "DDOG Earnings Tracker",
] as const;

export const projects: Project[] = [
  {
    title: "360 Cogni",
    summary:
      "Dementia & cognitive health platform with screening, brain training, and caregiver tools.",
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
    title: "ApexIQ",
    summary:
      "Formula 1 telemetry analytics and race forecasting, with measured telemetry and model output kept visibly apart.",
    insight:
      "The hard part wasn't the forecast, it was information leakage: you choose how much of a race weekend the model is allowed to know, and the on-screen filters never touch the model's numbers — so a predicted finishing order can't be misread as a recorded lap.",
    outcomes: [
      "Built Predict, Results, and Teams views over one F1 season dataset",
      "Added stage-aware forecasts so a model only sees the part of the weekend it is allowed to",
      "Shipped a zero-framework ES-module frontend on ECharts over a containerised API",
    ],
    tech: ["JavaScript", "ECharts", "Docker"],
    href: "https://apexiq-theta.vercel.app",
  },
  {
    title: "TennisIQ",
    summary:
      "Tennis match-prediction app trained on ATP and WTA history, with per-tour models, Elo ratings, and published backtests.",
    insight:
      "The two tours are not one problem, so nothing is pooled: each tour gets its own model, ratings, and backtest, and accuracy is only ever quoted on seasons the model never trained on — measured against a coin flip rather than against itself.",
    outcomes: [
      "Trained separate ATP and WTA models on 124,000+ matches and 4,700+ tournaments",
      "Held 64.7% winner accuracy on unseen seasons — 14.7 points over a coin flip",
      "Added Elo ratings, player comparison, and a live tracker of hit rate and Brier score",
    ],
    tech: ["React", "Recharts", "Gradient Boosting"],
    href: "https://tennisiq-self.vercel.app",
  },
  {
    title: "ViralIQ",
    summary:
      "TikTok virality scoring from pre-publication metadata only — calibrated probabilities, SHAP explanations, and an evaluation that says what the model can't do.",
    insight:
      "Virality models usually train on engagement and then predict engagement. ViralIQ only sees what exists before a video is posted — caption, hashtags, duration, sound history — so the honest question was how much of a hit is knowable in advance. The answer is a ranking signal, not a prophecy, and the site is built to say so.",
    outcomes: [
      "Beat random by 2.18× on held-out data (PR-AUC 0.0318 vs 0.0146, ROC-AUC 0.742)",
      "Nulled 34.72% of October labels whose stats predate publication rather than imputing them",
      "Reported both the PR-AUC champion and the model that actually wins at the cutoff",
    ],
    tech: ["Python", "FastAPI", "CatBoost"],
    // The repo is private, so this points at the live demo rather than a
    // GitHub URL that would 404 for every visitor.
    href: "https://vercel-mu-ochre-19.vercel.app",
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
    title: "DDOG Earnings Tracker",
    summary:
      "Public-data pre-earnings nowcast for Datadog — npm, SEC XBRL, and Wikimedia signals benchmarked against persistence.",
    insight:
      "Alternative data is easy to over-claim, so the whole point was honesty: every signal had to beat a dumb persistence baseline on a walk-forward window, or it didn't make the call.",
    outcomes: [
      "Correlated npm RUM downloads with revenue YoY (r = 0.86) across 14 quarters",
      "Benchmarked a lag-1 ridge model (2.6pp RMSE) against persistence (2.1pp) — and reported it straight",
      "Shipped a Vite dashboard, a scored write-up, and a 10-slide deck",
    ],
    tech: ["Python", "scikit-learn", "SQLite"],
    href: "https://github.com/darderrdur17/ddog-earnings-tracker",
  },
  {
    title: "S&P 500 Sector Analysis",
    summary:
      "Five-year risk-and-return study of 30 S&P 500 stocks across six sectors, ending in a 2026 sector outlook.",
    insight:
      "The deliverable wasn't a model, it was a decision: which sectors to overweight, neutral, or underweight in 2026 — with every chart traceable back to a risk-adjusted number rather than a hunch.",
    outcomes: [
      "Analysed 30 stocks across 6 sectors over Jan 2020 – Dec 2025",
      "Quantified risk-adjusted returns, seasonality, and intra- vs cross-sector correlation",
      "Published an interactive Tableau dashboard with a 2026 outlook",
    ],
    tech: ["Python", "pandas", "Tableau"],
    href: "https://github.com/darderrdur17/sp500-sector-analysis",
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
    title: "UNR Website Redesign",
    summary:
      "Bilingual Indonesian/English campus-site prototype for Universitas Ngurah Rai, built from a positioning audit and technical spec.",
    insight:
      "A university site serves applicants, current students, and staff at once — so the prototype had to prove one navigation could carry all three, with motion that still respects reduced-motion.",
    outcomes: [
      "Prototyped 8+ pages: homepage, faculties, news, admissions, portal, and contact",
      "Built bilingual content, program filters, and a testimonial slider in plain HTML/CSS/JS",
      "Kept it zero-build and accessible, honouring prefers-reduced-motion",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/darderrdur17/unr-website",
  },
  {
    title: "Halal Food Landscape",
    summary:
      "Singapore halal registry (MUIS) data pipeline validating 2,695+ establishments with 99.72% address coverage.",
    insight:
      "I focused on coverage and trust: ingest MUIS (Singapore's halal registry) listings, validate addresses, and produce a landscape dataset that is actually usable for analysis rather than a raw scrape.",
    outcomes: [
      "Processed 2,695+ establishments from MUIS source data",
      "Reached 99.72% address coverage through validation",
      "Used Python, Pandas, and Selenium for collection and cleanup",
    ],
    tech: ["Python", "Pandas", "Selenium"],
    // The Halal pipeline has no public repo yet, so this points at the profile
    // rather than a 404. Swap in the repo URL once it is published.
    href: GITHUB_URL,
  },
];
