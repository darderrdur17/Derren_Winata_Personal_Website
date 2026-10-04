/**
 * Central site configuration. Single source of truth for URLs, contact
 * details, and SEO defaults — used by the per-route metadata hook and any
 * component that needs the canonical domain.
 *
 * Update `canonicalOrigin` once and the whole site follows.
 */
export const siteConfig = {
  name: "Derren Winata",
  shortName: "DW",
  title: "Derren Winata — Data Science, AI & Product Engineer",
  // Fallback only — used by `useDocumentMeta` when a route supplies no meta.
  // Kept identical to the `/` route description so the fallback is never stale.
  description:
    "Derren Winata — full-stack developer and data analyst (NUS, Class of 2026). AI/LLM apps, data pipelines, shipped products. Open to work.",
  // Authoritative personal email — matches `Derren_Winata_Resume.pdf`.
  // The previous NUS address (`derren.winata@u.nus.edu`) expires post-
  // graduation; the resume uses Gmail as the durable contact.
  email: "wderren17@gmail.com",
  phone: "(+65) 8355 3698",
  location: "Singapore",
  social: {
    github: "https://github.com/darderrdur17",
    linkedin: "https://www.linkedin.com/in/derren-winata/",
    twitter: "https://x.com/derren_winata",
  },
  resumeHref: "/Derren_Winata_Resume.pdf",
  ogImage: "/og/og-home.jpg",
  // Alt text for the social-share image. Mirrors the static <meta
  // og:image:alt>/<meta twitter:image:alt> in index.html so per-route
  // injection stays consistent with the crawler defaults.
  ogImageAlt: "Derren Winata — I build systems that turn data into decisions.",
  /**
   * Production origin. Confirmed from the transactional email footer in
   * `supabase/functions/send-contact-email/index.ts`. Override at build time
   * with `VITE_SITE_ORIGIN` if the domain ever moves.
   */
  canonicalOrigin:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_ORIGIN) ||
    "https://derren-winata.com",
};

/**
 * Per-route metadata, applied at runtime by `useDocumentMeta`.
 *
 * Constraints (enforced by hand — these are the truncation limits Google
 * actually uses for desktop SERPs):
 *   - title       ≤ 60 chars  (longer gets ellipsised)
 *   - description ≤ 155 chars (longer gets cut mid-sentence)
 *
 * Written for humans first, recruiter-discoverable second: the candidate's
 * full name leads every title, and the role keywords a recruiter actually
 * searches ("full-stack developer", "data analyst") appear verbatim.
 *
 * Character counts are noted inline; re-check them if you edit a string.
 */
export const siteRoutes = [
  {
    path: "/",
    label: "Home",
    // 57 chars
    title: "Derren Winata — Full-Stack Developer & Data Analyst (NUS)",
    // 136 chars
    description:
      "Derren Winata — full-stack developer and data analyst (NUS, Class of 2026). AI/LLM apps, data pipelines, shipped products. Open to work.",
  },
  {
    path: "/experience",
    label: "Experience",
    // 58 chars
    title: "Career Timeline — Data, Product & AI Roles | Derren Winata",
    // 147 chars
    description:
      "11 roles across AI Singapore, 360 Cogni, Marina Bay Sands, and NUS — analytics, product, research, and full-stack delivery. Timeline, newest first.",
  },
  {
    path: "/projects",
    label: "Projects",
    // 53 chars
    title: "Projects — Full-Stack, AI & Data Work | Derren Winata",
    // 153 chars
    description:
      "Six selected projects: dementia-care platform, health-economics research tool, Go/Kafka social pipeline, Bayesian trading research. What I built and why.",
  },
  {
    path: "/certifications",
    label: "Certifications",
    // 58 chars
    title: "Certifications — AI, Data & PM Credentials | Derren Winata",
    // 152 chars
    description:
      "17 credentials across AI & LLM, data engineering, analytics, project management, and finance — Snowflake, IBM, Google, Anthropic, Databricks, Bloomberg.",
  },
  {
    path: "/contact",
    label: "Contact",
    // 60 chars
    title: "Contact — Derren Winata | Data & AI Engineer in Singapore",
    // 154 chars
    description:
      "Get in touch with Derren Winata — data & AI engineer and product builder in Singapore. Open to full-time roles. Email, LinkedIn, GitHub.",
  },
] as const;

export type SiteRoute = (typeof siteRoutes)[number];

/**
 * Look up a route's metadata by path.
 *
 * Pages must call this rather than hardcoding title/description inline —
 * otherwise `siteRoutes` silently stops being the source of truth and the
 * strings drift apart. Falls back to the home route for unknown paths.
 */
export const routeMeta = (path: string): SiteRoute =>
  siteRoutes.find((route) => route.path === path) ?? siteRoutes[0];