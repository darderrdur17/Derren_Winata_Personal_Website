import { ArrowUpRight, Folder } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProjectStory } from "@/components/sections/ProjectStory";
import { useDocumentMeta } from "@/lib/hooks/useDocumentMeta";
import { routeMeta } from "@/lib/site";
import { projects } from "@/data/projects";
import { categoryFromTech } from "@/lib/projectMeta";
import { projectsItemList } from "@/lib/structuredData";

const ProjectsPage = () => {
  useDocumentMeta({
    ...routeMeta("/projects"),
    path: "/projects",
    jsonLd: projectsItemList(),
  });

  return (
    <PageShell>
      <section className="relative pt-28 pb-8 sm:pt-36 sm:pb-12">
        <Container>
          <SectionHeader
            eyebrow="Projects"
            title="Selected work, in depth."
            lede="Each project below is the deep cut — problem, approach, and outcome. The homepage spotlight just shows the headline."
          />
        </Container>
      </section>

      <div className="pb-12">
        {projects.map((p, idx) => (
          <ProjectStory
            key={p.title}
            eyebrow={`Project ${String(idx + 1).padStart(2, "0")} · ${categoryFromTech(p.tech[0])}`}
            title={p.title}
            context={p.summary}
            problem={problemFor(p.title)}
            approach={approachFor(p.title)}
            outcomes={p.outcomes}
            insight={p.insight}
            tech={p.tech}
            href={p.href}
          />
        ))}
      </div>

      <section className="relative pb-24">
        <Container>
          <div className="surface-elevated flex flex-col items-center gap-3 rounded-2xl p-8 text-center sm:p-10">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
              More on GitHub
            </p>
            <p className="max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
              Smaller experiments, forks, and tooling live on GitHub. The
              repos below are the curated set; everything else is fair game.
            </p>
            <a
              href="https://github.com/darderrdur17"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline"
            >
              github.com/darderrdur17
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Container>
      </section>
    </PageShell>
  );
};

/**
 * Project-page deep content. The homepage only shows the spotlight version
 * (Problem → Approach → Outcome); here we expand to a fuller narrative per
 * project. Stays grounded in the real portfolio data — no fabrication.
 */
function problemFor(title: string): string {
  const map: Record<string, string> = {
    "360 Cogni":
      "Cognitive screening tools were either clinical-grade or generic consumer apps — nothing for families trying to act early. A real product needed to bridge assessment, brain training, and caregiver support without overwhelming the user.",
    "EQ-5D-5L TTO Research Tool":
      "Researchers running Time Trade-Off studies needed a multilingual, accessibility-compliant utility-calculation tool that worked in the browser — without sacrificing research-grade data integrity or GDPR-aligned data handling.",
    "Bayesian Pair Trading":
      "Most published pair-trading backtests overfit. The goal was to test whether Bayesian-optimised parameter search, walk-forward windows, and dual cointegration checks could produce signals that survived out-of-sample on S&P 500 pairs.",
    "Pulse — Social Intelligence":
      "Crawling Hacker News and Reddit at speed produces noise, not signal. The interesting question was: can you score users in near real time so the highest-value contributions surface first?",
    "Sunnystep Strides":
      "Marketing teams were spending hours a week on briefs and content calendars. The question was whether autonomous agents, scheduled runs, and a small prediction layer could compress that into a daily operating rhythm.",
    "Halal Food Landscape":
      "MUIS publishes data, but address coverage was patchy. The work was ingesting, cleaning, and validating every record so the dataset was actually usable for downstream analytics — not just a raw scrape.",
    "CommodityPlay.":
      "Commodity-trading careers are learned on the desk, but the guidance is scattered across PDFs, forums, and word of mouth. As the freelance developer on the technical team, my part was packaging it into a structured product — and gating it behind tiers that actually hold across web and mobile.",
    Trichella:
      "Scalp and hair-loss assessment usually means a clinic visit. The question was whether a single uploaded photo, paired with a vision model, could produce a report a user would trust and could hand to a specialist.",
    "StyleSense AI":
      "Wardrobe apps ask users to type everything in by hand, then ignore the context that actually decides an outfit — weather, place, and season. The goal was to make that context arrive for free.",
    "DDOG Earnings Tracker":
      "Pre-earnings estimates usually rest on paid alternative data. The question was how much signal sits in genuinely public sources — and whether any of it beats simply assuming last quarter repeats.",
    "S&P 500 Sector Analysis":
      "Five years of sector performance, six sectors, thirty names — and no clear answer to which sectors deserved capital in 2026. The work was turning raw price history into a defensible allocation view.",
    "UNR Website Redesign":
      "A university site has to serve applicants, current students, and staff at once, and unr.ac.id was doing it in one flat, monolingual layer. The prototype had to prove a structure could carry all three.",
  };
  return (
    map[title] ??
    "A real-world problem worth solving. The detail belongs to the project page; this is the home-page summary."
  );
}

function approachFor(title: string): string {
  const map: Record<string, string> = {
    "360 Cogni":
      "Defined scope across screening, brain training, and caregiver support. Spec'd UX flows, mapped integrations (GMS assessment, Supabase, Vercel, SendGrid), and shipped the live MVP at 360cogni.com.",
    "EQ-5D-5L TTO Research Tool":
      "Architected a full React/Node.js/PostgreSQL app with real-time utility calculations, an AI co-pilot for protocol guidance, and admin/interviewer dashboards. Hardened auth and accessibility for 4 languages.",
    "Bayesian Pair Trading":
      "Implemented walk-forward optimisation on S&P 500 pairs, used Optuna to search strategy parameters, and added dual cointegration checks so the surviving pairs had statistical reason to be there.",
    "Pulse — Social Intelligence":
      "Built a concurrent Go pipeline that crawls HN and Reddit, streams events through Kafka, and feeds a scoring service. Concurrency was the actual hard problem.",
    "Sunnystep Strides":
      "Connected React 18, Supabase, and an automation layer with autonomous agents. Schedulers delivered daily briefs and weekly performance views without manual prep.",
    "Halal Food Landscape":
      "Built an end-to-end Python/Pandas pipeline that scraped, cleaned, and validated 2,695+ establishments — 99.72% address coverage, 100% postal code coverage across 28 districts.",
    "CommodityPlay.":
      "I develop the Next.js 15 App Router app on Neon Postgres with Prisma and Auth.js v5, and the Stripe layer behind four monthly plans split across a Career and a Sales track. The same API backs an Expo React Native client, so members share one account across web and mobile.",
    Trichella:
      "Wired an image-upload flow to a GPT-4o analysis endpoint that returns an overall score, six diagnostic conditions, and six scalp metrics. Findings and recommendations render on screen and export to a formatted PDF via jsPDF.",
    "StyleSense AI":
      "Built a Next.js 16 app with per-user wardrobe storage in Postgres, AI garment detection via Gemini (OpenAI fallback), and Open-Meteo for live forecasts and historical weather. EXIF parsing plus reverse geocoding fills place and date on upload.",
    "DDOG Earnings Tracker":
      "Assembled 14 quarters of public signals — npm download counts, SEC XBRL company facts, and Wikimedia pageviews — then tested each with a lag-1 ridge model against a persistence baseline on a walk-forward window.",
    "S&P 500 Sector Analysis":
      "Pulled five years of prices into SQLite, computed risk-adjusted returns, seasonality, and correlation matrices in pandas and scikit-learn, then published the result as an interactive Tableau dashboard with a 2026 outlook.",
    "UNR Website Redesign":
      "Prototyped eight-plus pages in plain HTML/CSS/JS with no build step: bilingual content, a program filter, a testimonial slider, and a mobile drawer — all with scroll reveals that respect prefers-reduced-motion.",
  };
  return (
    map[title] ??
    "The approach is documented in the project repository and in the detail panel above."
  );
}

export default ProjectsPage;
