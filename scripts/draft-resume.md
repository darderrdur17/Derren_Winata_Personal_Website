# Derren Winata — Résumé content draft

> Generated from portfolio data on 2026-10-04. Verify every line against the source files and your own memory before publishing.
>
> Sources: `src/data/experiences.ts`, `src/data/certifications.ts`, `src/data/projects.ts`, `src/components/Hero.tsx`, `src/lib/site.ts`.
> Nothing in this draft is invented. Where a fact is **not** present in those files, it is marked `[VERIFY]` rather than filled in.
> Spelling is normalised to British/Singapore convention (analysed, personalised) regardless of the source files' US spellings.
> Phone, LinkedIn and GitHub URLs are deliberately omitted — add your own to the template.

---

## Header

**Derren Winata**
Data · AI · Product · Engineering
Singapore · wderren17@gmail.com

NUS Data Science & Analytics, Class of 2026. Ships AI apps, data products, and full-stack software. Open to full-time roles; open to relocation.

---

## Education

**National University of Singapore** — Singapore
B.Sc. Data Science & Analytics · Class of 2026

`[VERIFY]` Start and end months: the current portfolio data files carry only "Class of 2026". Your previous résumé PDF stated "Aug '22 – Present". Confirm and render as e.g. *Aug 2022 – Aug 2026* before publishing.

---

## Experience

Eleven roles, newest first. Bullets are taken verbatim from `experiences.ts` except where marked. Two roles had more than three source bullets and were condensed — see the notes.

### AI Singapore — Programme & Partnerships Assistant
*Mar 2026 – Jul 2026 · Singapore · Part-time*

- Built and deployed the AI for Good website (Next.js, TypeScript, Tailwind CSS) covering impact stats, SDG alignment, and ASEAN partnership footprint.
- Developed the NSWS automation platform (an internal operations tool) using FastAPI, PostgreSQL, Celery, ChromaDB, and LangGraph for AI-assisted operations, briefs, compliance reminders, and reporting agents.
- Built the AI Ready ASEAN Youth Challenge 2026 Judging Portal (Next.js, Supabase) with judge assignments, weighted scoring, dashboards, CSV export, and audit logs.

### 360 Cogni — Product Manager Intern
*Jan 2026 – Jul 2026 · Singapore · Internship*

- Defined MVP scope and roadmap across cognitive screening, personalised results, and brain training resources for 1,000+ users.
- Designed 5+ key flows (onboarding, demographics, assessment, results, resources) with mobile-first UX across iOS, Android, and desktop.
- Tracked conversion funnels and folded 20+ user-testing improvements into the shipped MVP at 360cogni.com.

> Condensed from 4 source bullets. Dropped: "Specified integrations (GMS assessment API, Supabase, Vercel, SendGrid), database schema, and Edge Functions for email automation." Restore it if the template has room — it carries the most technical detail.

### AI Singapore — Quality Assurance Assistant
*Mar 2024 – Jul 2026 · Singapore (Remote) · Part-time*

- Validated datasets used in product launches, reducing post-launch errors by 30%.
- Cross-referenced 1,000+ data files against official government and third-party sources.
- Documented and escalated quality issues with recommendations that sped up QA sign-off.

### Sunnystep — AI Agent Intern
*Mar 2026 – Apr 2026 · Singapore · Internship*

- Built a Node.js marketing intelligence pipeline with Anthropic Claude for daily briefs, monthly calendars, and weekly performance views.
- Automated delivery via scheduler so stakeholders received structured updates without manual prep.
- Produced social production guides aligned to live assortments and campaign plans.

### National University of Singapore — Full-Stack Web Developer, Educational Jigsaw Game
*Dec 2025 – Mar 2026 · Singapore · Part-time*

- Built lobby, shareable sessions, Game Master controls, two-phase puzzles, timers, points, and post-round results.
- Shipped a polished responsive UI with animations and accessibility-minded patterns.
- Delivered touch/drag puzzle play on mobile and used Supabase for real-time updates and leaderboards.

### National University of Singapore — Student Researcher
*Nov 2025 – Feb 2026 · Singapore · Part-time*

- Architected a React/TypeScript and Node.js/Express app for EQ-5D-5L Classic TTO health economics research.
- Built real-time utility calculations, Admin/Interviewer dashboards, and an AI co-pilot for protocol guidance.
- Implemented GDPR-aligned auth and encryption, plus WCAG 2.1 AA support in English, Spanish, Chinese, and Indonesian.

### National University of Singapore — Web & Mobile Development Intern
*Sep 2025 – Nov 2025 · Singapore · Part-time*

- Developed a full-stack web and mobile app for cognitive health screening in DSFP, a national cognitive-health screening programme.
- Designed multi-domain assessments, brain training games, and progress analytics with automated scoring.
- Added accessibility, English/Chinese/Malay support, and a caregiver management view with analytics.

### National University of Singapore — Data Engineering Research Assistant
*Sep 2025 – Oct 2025 · Singapore · Part-time*

- Built an end-to-end pipeline scraping, cleaning, and validating 2,695+ halal-certified establishments from MUIS, Singapore's Islamic religious authority.
- Reached 99.72% address coverage and 100% postal code coverage across 28 postal districts.
- Shipped 30+ Python scripts, quality reports, and reproducible Makefile workflows.

### Firsty.app — Client Development Intern
*May 2025 – Jul 2025 · Singapore (Hybrid) · Internship*

- Designed and automated a LinkedIn outreach workflow for prospect filtering and message sequencing.
- Identified 300+ APAC companies based on ICP criteria to sharpen targeting.
- Built and ran a LinkedIn SDR motion covering cold outreach, prospecting, and pitching.

### Medisaya — Software Developer
*Feb 2025 – Jun 2025 · Singapore (Hybrid) · Internship*

- Developed Python scrapers that extracted 50k+ records and cut manual collection time by 70%.
- Built and maintained Django REST APIs for secure health data access.
- Worked with the AI/ML team on voice-activated commands and privacy-first medical data handling.

### Marina Bay Sands — eCommerce Analytics Intern
*May 2024 – Dec 2024 · Singapore (Hybrid) · Internship*

- Automated a critical stakeholder report with Python and Power Automate, reducing preparation time by ~83%.
- Led the website Data Layer rollout, improving overall data accuracy to 98%.
- Analysed traffic and marketing data with recommendations that lifted conversion rates by 15%, and partnered with Performance Marketing on A/B tests that improved campaign ROI by 10%.

> Condensed from 5 source bullets into 3 by merging the conversion-rate and A/B-test points. Dropped: "Configured and optimised Tealium IQ tracking, increasing reliability of captured data by 20%." Consider restoring it if you drop the Tealium mention from your skills line.

---

## Selected Projects

Six projects, order and content from `projects.ts`. Links omitted by design — add your own in the template.

**360 Cogni** — *React 19, React Native, Supabase*
Dementia and cognitive health platform with screening, brain training, and caregiver tools. Defined MVP scope, aligned UX flows and integrations around a 1,000+ user target, and shipped a live product at 360cogni.com.

**EQ-5D-5L TTO Research Tool** — *React, Node.js, PostgreSQL*
Health economics research platform with real-time utility calculations and an AI co-pilot. Built full-stack study flows and designed for GDPR handling and WCAG 2.1 AA across 4 languages.

**Bayesian Pair Trading** — *Python, Optuna, Quant Finance*
Walk-forward optimised S&P 500 pairs trading with dual cointegration testing. Implemented walk-forward optimisation and used Optuna to search strategy parameters systematically.

**Pulse — Social Intelligence** — *Go, PostgreSQL, Kafka*
Concurrent Go pipeline crawling Hacker News and Reddit, streaming events through Kafka for downstream scoring, with user scoring so signal could be ranked rather than just collected.

**Sunnystep Strides** — *React 18, Supabase, Recharts*
AI marketing automation dashboard. Built the dashboard on React 18 and Supabase, connected autonomous agents to briefing and calendar workflows, and visualised predictive analytics with Recharts.

**Halal Food Landscape** — *Python, Pandas, Selenium*
Singapore halal registry (MUIS) data pipeline. Processed 2,695+ establishments and reached 99.72% address coverage through validation.

---

## Skills

Compiled only from `experiences.ts` tags, `projects.ts` tech, and `certifications.ts` skills. Nothing added that isn't evidenced somewhere above.

- **Languages:** Python, TypeScript, SQL, Go, Bash/Shell scripting
- **Frontend:** React 19, React Native, Next.js, Expo, Tailwind CSS, Recharts
- **Backend & APIs:** Node.js, Express, FastAPI, Django REST Framework, Supabase, Vercel, Edge Functions
- **Data & Pipelines:** PostgreSQL, Snowflake, Databricks, ChromaDB, Pandas, Apache Airflow, Kafka, Celery, ETL/ELT, data warehousing, database administration, RBAC
- **AI & LLM:** LangGraph, Anthropic Claude, Amazon Bedrock, Model Context Protocol (MCP), RAG, prompt engineering, tool calling, agent monitoring
- **Analytics & Measurement:** Tealium IQ, Google Analytics, Tableau, Power Automate, Selenium, Optuna, A/B testing, conversion funnels, KPI optimisation
- **Product:** MVP scoping, roadmap definition, UX flows, user testing, stakeholder reporting
- **Accessibility & Compliance:** WCAG 2.1 AA, GDPR-aligned auth and encryption
- **Practices:** Reproducible Makefile workflows, quality reporting, code review, QA sign-off

---

## Certifications

One line each, grouped exactly as in `certificationGroups`. Credential IDs included where the source has them — useful if a recruiter wants to verify.

### AI & LLM
- Snowflake Generative AI Professional Certificate — Snowflake · Coursera — Sep 12, 2026 (ID M5ZEUB06DKRU)
- AI Fundamentals: Language and Vision in AI — IBM — Aug 2026
- AI Fundamentals: Foundations for Understanding AI — IBM — Aug 2026
- Claude with the Anthropic API — Anthropic — Aug 2026
- Claude with Amazon Bedrock — Anthropic — Aug 2026
- Claude Platform 101 — Anthropic — Aug 2026
- AI Fluency: Framework & Foundations — Anthropic — Aug 2026
- Introduction to Model Context Protocol — Anthropic — Aug 2026

### Data & Analytics
- IBM Relational Database Administrator with GenAI Professional Certificate — IBM · Coursera — Sep 14, 2026 (ID IGHUSCNY8XUT)
- Snowflake Data Engineering Professional Certificate — Snowflake · Coursera — Sep 11, 2026 (ID 4GUSO181FPT6)
- ETL and Data Pipelines with Shell, Airflow and Kafka — IBM · Coursera — Sep 11, 2026 (ID LBCATH579UE3)
- Google Data Analytics Professional Certificate — Google · Coursera — Aug 29, 2026 (ID ZLCROBCFKI5Y)
- Databricks Fundamentals Accreditation — Databricks — Aug 2026
- Google Analytics Certification — Google — Aug 2026 (expires Aug 2027, ID 191811640)
- Data Analytics and Visualization Job Simulation — Accenture · Forage — Dec 2023

### Project Management
- Google Project Management Professional Certificate — Google · Coursera — Aug 31, 2026 (ID UBNQ12MMPGA0)

### Finance
- Bloomberg Market Concepts (BMC) — Bloomberg for Education — Sep 4, 2026

---

## Awards

- Bronze Award — Mathematical Olympiads. Thailand IMO & GBA Olympiad • 2021–2022

---

## Notes before you render the PDF

1. **Two facts need your confirmation:** the education start/end months (`[VERIFY]` above), and whether you want the two condensed bullets restored for 360 Cogni and Marina Bay Sands.
2. **The old PDF is materially out of date.** It lists only Firsty.app, Medisaya and Marina Bay Sands and reads "Aug '22 – Present". This draft adds AI Singapore (both roles), 360 Cogni, four NUS roles and Sunnystep — roughly two years of work that the current PDF omits entirely.
3. **Keep it to one page if you can.** With 11 roles, 6 projects and 17 certifications, the natural cut is: drop the Selected Projects section (all six already appear inside Experience) and keep certifications to the five with credential IDs, listing the rest as "additional credentials available on request". That gets you to one page without losing anything a recruiter actually checks.
4. **Consider leading with the summary line**, not the education block. A Singapore recruiter reads role first; the degree is a filter they apply afterwards.
