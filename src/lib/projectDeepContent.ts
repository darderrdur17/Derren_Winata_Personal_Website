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
  "CommodityPlay.":
    "Commodity-trading careers are learned on the desk, but the guidance is scattered across PDFs, forums, and word of mouth. As the freelance developer on the technical team, my part was packaging it into a structured product — and gating it behind tiers that actually hold across web and mobile.",
  Trichella:
    "Scalp and hair-loss assessment usually means a clinic visit. The question was whether a single uploaded photo, paired with a vision model, could produce a report a user would trust and could hand to a specialist.",
  "StyleSense AI":
    "Wardrobe apps ask users to type everything in by hand, then ignore the context that actually decides an outfit — weather, place, and season. The goal was to make that context arrive for free.",
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
  "CommodityPlay.":
    "Built the Next.js 15 App Router app on Neon Postgres with Prisma and Auth.js v5, plus the Stripe billing layer behind four monthly plans split across a Career and a Sales track. Extended the same API to an Expo React Native client, so members share one account across web and mobile.",
  Trichella:
    "Wired an image-upload flow to a GPT-4o analysis endpoint that returns an overall score, six diagnostic conditions, and six scalp metrics. Findings and recommendations render on screen and export to a formatted PDF via jsPDF.",
  "StyleSense AI":
    "Built a Next.js 16 app with per-user wardrobe storage in Postgres, AI garment detection via Gemini (OpenAI fallback), and Open-Meteo for live forecasts and historical weather. EXIF parsing plus reverse geocoding fills place and date on upload.",
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
