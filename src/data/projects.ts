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
    title: "CommodityPlay.",
    summary:
      "Freelance build for a commodity-trading career playbook — a Next.js 15 web app plus an Expo mobile client.",
    insight:
      "I joined as the freelance developer on the technical team, so the interesting problem was the gating: a free glossary, a Pro playbook, and Elite mentor access had to be enforced consistently across web and mobile, from one identity and one billing system.",
    outcomes: [
      "Develop the Next.js 15 App Router app on Neon Postgres with Prisma and Auth.js v5",
      "Modelled Starter / Pro / Elite tiers with Stripe one-time and subscription billing",
      "Extended the same API to an Expo React Native client with shared auth",
    ],
    tech: ["Next.js 15", "Prisma", "Stripe", "Expo"],
    href: "https://github.com/darderrdur17/commodityplay",
  },
  {
    title: "Trichella",
    summary:
      "AI scalp diagnostics — upload an image, get a scored trichology report with six conditions and a PDF export.",
    insight:
      "This is a diagnostic product, so trust is the design problem: every AI score has to arrive with the condition, the metric, and the recommendation that justified it — then leave the app as a clean, printable report.",
    outcomes: [
      "Built an image-to-report pipeline on GPT-4o returning a score, 6 conditions, and 6 metrics",
      "Generated clinical findings and personalised recommendations per scan",
      "Exported formatted PDF reports that match the on-screen results",
    ],
    tech: ["React", "GPT-4o", "jsPDF"],
    href: "https://github.com/darderrdur17/Trichella",
  },
  {
    title: "StyleSense AI",
    summary:
      "Context-aware wardrobe assistant that plans outfits from weather, location, and your own digital closet.",
    insight:
      "The best recommendation depends on data the user never enters — so the app quietly pulls historical weather for memories, live forecasts for trips, and EXIF geodata from photos, making context free.",
    outcomes: [
      "Built a Next.js 16 app with auth, a digital wardrobe, and per-user Postgres storage",
      "Added AI garment detection via Gemini, with an OpenAI fallback",
      "Pulled live forecasts and historical weather from Open-Meteo with EXIF/GPS geocoding",
    ],
    tech: ["Next.js 16", "Gemini", "Open-Meteo"],
    href: "https://github.com/darderrdur17/stylesense-app",
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
    href: "https://github.com/darderrdur17/Halal_food_landscape",
  },
];
