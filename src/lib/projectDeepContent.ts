/**
 * Deep narrative copy for the /projects case-study page.
 *
 * The homepage only shows the spotlight version (Problem → Approach →
 * Outcome); /projects expands each project to a fuller story. That expansion
 * is keyed by the project's exact `title`, which makes it a silent failure
 * mode: add a project to `projects.ts` and, without a matching entry here, the
 * page renders generic boilerplate instead of the real narrative.
 *
 * `projectDeepContent.test.ts` closes that hole by asserting every project
 * resolves to real copy rather than the fallback.
 *
 * Stays grounded in the real portfolio data — no fabrication.
 */

const PROBLEM_BY_TITLE: Record<string, string> = {
  "360 Cogni":
    "Cognitive screening tools were either clinical-grade or generic consumer apps — nothing for families trying to act early. A real product needed to bridge assessment, brain training, and caregiver support without overwhelming the user.",
  ApexIQ:
    "F1 telemetry is published in bulk, but it arrives as raw lap data with no sense of what is measured and what is inferred. Race forecasts are usually presented as if they were observations. The problem was an explorer where a predicted finishing order can never be mistaken for a recorded lap — and where you control how much of a race weekend the forecast is allowed to know.",
  TennisIQ:
    "Tennis prediction write-ups tend to quote a single accuracy figure for both tours, often tuned and scored on the same seasons. The question was whether per-tour models, genuinely held-out seasons, and an honest baseline could beat guessing — and stay honest once the numbers were published.",
  ViralIQ:
    "Virality is the most over-claimed target in social analytics: models train on engagement that only exists after a video has been seen, then present the result as a forecast. The problem was to predict from pre-publication metadata alone — caption, hashtags, duration, format, timing, language, country, commercial flags, sound history — and to be explicit about the ceiling that imposes.",
  "EQ-5D-5L TTO Research Tool":
    "Researchers running Time Trade-Off studies needed a multilingual, accessibility-compliant utility-calculation tool that worked in the browser — without sacrificing research-grade data integrity or GDPR-aligned data handling.",
  "DDOG Earnings Tracker":
    "Pre-earnings estimates usually rest on paid alternative data. The question was how much signal sits in genuinely public sources — and whether any of it beats simply assuming last quarter repeats.",
  "S&P 500 Sector Analysis":
    "Five years of sector performance, six sectors, thirty names — and no clear answer to which sectors deserved capital in 2026. The work was turning raw price history into a defensible allocation view.",
  "Bayesian Pair Trading":
    "Most published pair-trading backtests overfit. The goal was to test whether Bayesian-optimised parameter search, walk-forward windows, and dual cointegration checks could produce signals that survived out-of-sample on S&P 500 pairs.",
  "Pulse — Social Intelligence":
    "Crawling Hacker News and Reddit at speed produces noise, not signal. The interesting question was: can you score users in near real time so the highest-value contributions surface first?",
  "Sunnystep Strides":
    "Marketing teams were spending hours a week on briefs and content calendars. The question was whether autonomous agents, scheduled runs, and a small prediction layer could compress that into a daily operating rhythm.",
  "UNR Website Redesign":
    "A university site has to serve applicants, current students, and staff at once, and unr.ac.id was doing it in one flat, monolingual layer. The prototype had to prove a structure could carry all three.",
  "Halal Food Landscape":
    "MUIS publishes data, but address coverage was patchy. The work was ingesting, cleaning, and validating every record so the dataset was actually usable for downstream analytics — not just a raw scrape.",
};

const APPROACH_BY_TITLE: Record<string, string> = {
  "360 Cogni":
    "Defined scope across screening, brain training, and caregiver support. Spec'd UX flows, mapped integrations (GMS assessment, Supabase, Vercel, SendGrid), and shipped the live MVP at 360cogni.com.",
  ApexIQ:
    "Built a zero-framework ES-module frontend on ECharts with three views: Predict (season timeline, forecasts, title odds), Results (every round with classification and standings), and Teams (constructor points progression). Forecast stages gate what data the model receives, while the visible filters are deliberately view-only. Data comes from a containerised API, so the static deployment degrades to a clearly-labelled snapshot instead of pretending to be live.",
  TennisIQ:
    "Built per-tour pipelines over 27 ATP and 21 WTA seasons, then scored every candidate — logistic regression, gradient boosting, raw Elo, and a constant baseline — on held-out seasons only. Gradient boosting held 64.7% on both tours against a 50% coin flip, and the Elo ratings, player comparison, and live hit-rate/Brier tracker ship alongside the backtests rather than after them.",
  ViralIQ:
    "Built a DuckDB and Polars pipeline over 148 monthly Parquet files (460.48 GB) from a 5.6B-video TikTok dataset, trained logistic regression, LightGBM, and CatBoost on 300,000 September rows, and scored 199,998 October rows the models never saw. Labels whose engagement stats predate publication are emitted as NULL rather than estimated, and the API returns a selection note explaining that logistic regression wins on PR-AUC while CatBoost wins at the decision cutoff.",
  "EQ-5D-5L TTO Research Tool":
    "Architected a full React/Node.js/PostgreSQL app with real-time utility calculations, an AI co-pilot for protocol guidance, and admin/interviewer dashboards. Hardened auth and accessibility for 4 languages.",
  "DDOG Earnings Tracker":
    "Assembled 14 quarters of public signals — npm download counts, SEC XBRL company facts, and Wikimedia pageviews — then tested each with a lag-1 ridge model against a persistence baseline on a walk-forward window.",
  "S&P 500 Sector Analysis":
    "Pulled five years of prices into SQLite, computed risk-adjusted returns, seasonality, and correlation matrices in pandas and scikit-learn, then published the result as an interactive Tableau dashboard with a 2026 outlook.",
  "Bayesian Pair Trading":
    "Implemented walk-forward optimisation on S&P 500 pairs, used Optuna to search strategy parameters, and added dual cointegration checks so the surviving pairs had statistical reason to be there.",
  "Pulse — Social Intelligence":
    "Built a concurrent Go pipeline that crawls HN and Reddit, streams events through Kafka, and feeds a scoring service. Concurrency was the actual hard problem.",
  "Sunnystep Strides":
    "Connected React 18, Supabase, and an automation layer with autonomous agents. Schedulers delivered daily briefs and weekly performance views without manual prep.",
  "UNR Website Redesign":
    "Prototyped eight-plus pages in plain HTML/CSS/JS with no build step: bilingual content, a program filter, a testimonial slider, and a mobile drawer — all with scroll reveals that respect prefers-reduced-motion.",
  "Halal Food Landscape":
    "Built an end-to-end Python/Pandas pipeline that scraped, cleaned, and validated 2,695+ establishments — 99.72% address coverage, 100% postal code coverage across 28 districts.",
};

/** Shown only if a project title has no entry above. Guarded by the test. */
export const PROBLEM_FALLBACK =
  "A real-world problem worth solving. The detail belongs to the project page; this is the home-page summary.";

export const APPROACH_FALLBACK =
  "The approach is documented in the project repository and in the detail panel above.";

/**
 * Every title that has bespoke copy. The test asserts this set matches the
 * project titles exactly — so a rename or a new project can't quietly leave
 * orphaned copy behind or fall through to boilerplate.
 */
export const deepContentTitles = [
  ...new Set([
    ...Object.keys(PROBLEM_BY_TITLE),
    ...Object.keys(APPROACH_BY_TITLE),
  ]),
];

export const problemFor = (title: string): string =>
  PROBLEM_BY_TITLE[title] ?? PROBLEM_FALLBACK;

export const approachFor = (title: string): string =>
  APPROACH_BY_TITLE[title] ?? APPROACH_FALLBACK;
