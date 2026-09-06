export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  location: string;
  type: string;
  summary: string;
  highlight: string;
  tags: string[];
  details: string[];
  featured?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    id: "aisg-programme",
    company: "AI Singapore",
    role: "Programme & Partnerships Assistant",
    period: "Mar 2026 – Jul 2026",
    startDate: "2026-03",
    endDate: "2026-07",
    location: "Singapore",
    type: "Part-time",
    summary: "Shipped AI for Good website, NSWS automation platform, and ASEAN Youth Challenge judging portal.",
    highlight: "3 platforms delivered",
    tags: ["Next.js", "FastAPI", "LangGraph"],
    featured: true,
    details: [
      "Built and deployed the AI for Good website (Next.js, TypeScript, Tailwind CSS) covering impact stats, SDG alignment, and ASEAN partnership footprint.",
      "Developed the NSWS Automation Platform (FastAPI, PostgreSQL, Celery, ChromaDB, LangGraph) for AI-assisted operations, briefs, compliance reminders, and reporting agents.",
      "Built the AI Ready ASEAN Youth Challenge 2026 Judging Portal (Next.js, Supabase) with judge assignments, weighted scoring, dashboards, CSV export, and audit logs.",
    ],
  },
  {
    id: "360cogni",
    company: "360 Cogni",
    role: "Product Manager Intern",
    period: "Jan 2026 – Jul 2026",
    startDate: "2026-01",
    endDate: "2026-07",
    location: "Singapore",
    type: "Internship",
    summary: "Defined MVP roadmap, UX flows, and integrations for a cognitive health platform at 360cogni.com.",
    highlight: "1,000+ target users",
    tags: ["Product Strategy", "Supabase", "Vercel"],
    featured: true,
    details: [
      "Defined MVP scope and roadmap across cognitive screening, personalized results, and brain training resources for 1,000+ users.",
      "Designed 5+ key flows (onboarding, demographics, assessment, results, resources) with mobile-first UX across iOS, Android, and desktop.",
      "Specified integrations (GMS assessment API, Supabase, Vercel, SendGrid), database schema, and Edge Functions for email automation.",
      "Tracked conversion funnels and folded 20+ user-testing improvements into the shipped MVP at 360cogni.com.",
    ],
  },
  {
    id: "sunnystep",
    company: "Sunnystep",
    role: "AI Agent Intern",
    period: "Mar 2026 – Apr 2026",
    startDate: "2026-03",
    endDate: "2026-04",
    location: "Singapore",
    type: "Internship",
    summary: "Built Node.js marketing intelligence pipeline with Claude, automating briefs and content calendars.",
    highlight: "Daily AI briefs",
    tags: ["Node.js", "Claude", "Automation"],
    details: [
      "Built a Node.js marketing intelligence pipeline with Anthropic Claude for daily briefs, monthly calendars, and weekly performance views.",
      "Automated delivery via scheduler so stakeholders received structured updates without manual prep.",
      "Produced social production guides aligned to live assortments and campaign plans.",
    ],
  },
  {
    id: "nus-jigsaw",
    company: "National University of Singapore",
    role: "Full-Stack Web Developer — Educational Jigsaw Game",
    period: "Dec 2025 – Mar 2026",
    startDate: "2025-12",
    endDate: "2026-03",
    location: "Singapore",
    type: "Part-time",
    summary: "Real-time educational jigsaw game with Game Master controls, scoring, and mobile-first play.",
    highlight: "Live multiplayer sessions",
    tags: ["React", "TypeScript", "Supabase"],
    details: [
      "Built lobby, shareable sessions, Game Master controls, two-phase puzzles, timers, points, and post-round results.",
      "Shipped a polished responsive UI with animations and accessibility-minded patterns.",
      "Delivered touch/drag puzzle play on mobile and used Supabase for real-time updates and leaderboards.",
    ],
  },
  {
    id: "nus-researcher",
    company: "National University of Singapore",
    role: "Student Researcher",
    period: "Nov 2025 – Feb 2026",
    startDate: "2025-11",
    endDate: "2026-02",
    location: "Singapore",
    type: "Part-time",
    summary: "Full-stack EQ-5D-5L TTO research platform with GDPR compliance and WCAG 2.1 AA accessibility.",
    highlight: "4 languages supported",
    tags: ["React", "Node.js", "PostgreSQL"],
    details: [
      "Architected a React/TypeScript and Node.js/Express app for EQ-5D-5L Classic TTO health economics research.",
      "Built real-time utility calculations, Admin/Interviewer dashboards, and an AI co-pilot for protocol guidance.",
      "Implemented GDPR-aligned auth and encryption, plus WCAG 2.1 AA support in English, Spanish, Chinese, and Indonesian.",
    ],
  },
  {
    id: "nus-web-mobile",
    company: "National University of Singapore",
    role: "Web & Mobile Development Intern",
    period: "Sep 2025 – Nov 2025",
    startDate: "2025-09",
    endDate: "2025-11",
    location: "Singapore",
    type: "Part-time",
    summary: "Cognitive health screening app for seniors and caregivers with web and React Native clients.",
    highlight: "Dual-platform DSFP app",
    tags: ["React 19", "React Native", "Expo"],
    details: [
      "Developed a full-stack web and mobile app for cognitive health screening in the DSFP programme.",
      "Designed multi-domain assessments, brain training games, and progress analytics with automated scoring.",
      "Added accessibility, English/Chinese/Malay support, and a caregiver management view with analytics.",
    ],
  },
  {
    id: "nus-data-eng",
    company: "National University of Singapore",
    role: "Data Engineering Research Assistant",
    period: "Sep 2025 – Oct 2025",
    startDate: "2025-09",
    endDate: "2025-10",
    location: "Singapore",
    type: "Part-time",
    summary: "MUIS data pipeline validating 2,695+ establishments with 99.72% address coverage.",
    highlight: "99.72% address coverage",
    tags: ["Python", "Pandas", "Data Pipelines"],
    details: [
      "Built an end-to-end pipeline scraping, cleaning, and validating 2,695+ MUIS halal-certified establishments.",
      "Reached 99.72% address coverage and 100% postal code coverage across 28 postal districts.",
      "Shipped 30+ Python scripts, quality reports, and reproducible Makefile workflows.",
    ],
  },
  {
    id: "firsty",
    company: "Firsty.app",
    role: "Client Development Intern",
    period: "May 2025 – Jul 2025",
    startDate: "2025-05",
    endDate: "2025-07",
    location: "Singapore · Hybrid",
    type: "Internship",
    summary: "Automated LinkedIn lead generation and mapped 300+ APAC companies against ICP criteria.",
    highlight: "300+ APAC companies",
    tags: ["Lead Generation", "Market Analysis", "SDR"],
    details: [
      "Designed and automated a LinkedIn outreach workflow for prospect filtering and message sequencing.",
      "Identified 300+ APAC companies based on ICP criteria to sharpen targeting.",
      "Built and ran a LinkedIn SDR motion covering cold outreach, prospecting, and pitching.",
    ],
  },
  {
    id: "medisaya",
    company: "Medisaya",
    role: "Software Developer",
    period: "Feb 2025 – Jun 2025",
    startDate: "2025-02",
    endDate: "2025-06",
    location: "Singapore · Hybrid",
    type: "Internship",
    summary: "Shipped Python scrapers for 50k+ records and Django APIs for secure health data access.",
    highlight: "70% less manual collection",
    tags: ["Python", "Django", "APIs"],
    details: [
      "Developed Python scrapers that extracted 50k+ records and cut manual collection time by 70%.",
      "Built and maintained Django REST APIs for secure health data access.",
      "Worked with the AI/ML team on voice-activated commands and privacy-first medical data handling.",
    ],
  },
  {
    id: "mbs",
    company: "Marina Bay Sands",
    role: "eCommerce Analytics Intern",
    period: "May 2024 – Dec 2024",
    startDate: "2024-05",
    endDate: "2024-12",
    location: "Singapore · Hybrid",
    type: "Internship",
    summary: "Automated reporting (83% faster), led Data Layer rollout to 98% accuracy, and optimized Tealium IQ tracking.",
    highlight: "83% faster reporting",
    tags: ["Python", "Tealium IQ", "Power Automate"],
    featured: true,
    details: [
      "Automated a critical stakeholder report with Python and Power Automate, reducing preparation time by ~83%.",
      "Led the website Data Layer rollout, improving overall data accuracy to 98%.",
      "Configured and optimized Tealium IQ tracking, increasing reliability of captured data by 20%.",
      "Analyzed traffic and marketing data, with recommendations that lifted conversion rates by 15%.",
      "Partnered with Performance Marketing on A/B tests that improved campaign ROI by 10%.",
    ],
  },
  {
    id: "aisg-qa",
    company: "AI Singapore",
    role: "Quality Assurance Assistant",
    period: "Mar 2024 – Jul 2026",
    startDate: "2024-03",
    endDate: "2026-07",
    location: "Singapore · Remote",
    type: "Part-time",
    summary: "Validated 1,000+ data files against official sources, cutting post-launch errors by 30%.",
    highlight: "30% fewer errors",
    tags: ["Data Validation", "QA", "Analytics"],
    details: [
      "Validated datasets used in product launches, reducing post-launch errors by 30%.",
      "Cross-referenced 1,000+ data files against official government and third-party sources.",
      "Documented and escalated quality issues with recommendations that sped up QA sign-off.",
    ],
  },
];

export const featuredExperiences = experiences.filter((exp) => exp.featured);
export const otherExperiences = experiences.filter((exp) => !exp.featured);

export const timelineExperiences = [...experiences].sort((a, b) => {
  if (a.endDate !== b.endDate) return b.endDate.localeCompare(a.endDate);
  return b.startDate.localeCompare(a.startDate);
});

export interface ExperienceHighlight {
  label: string;
  company: string;
  title: string;
  summary: string;
  period: string;
  extraCount: number;
}

export const experienceHighlights: ExperienceHighlight[] = [
  {
    label: "AI & Platforms",
    company: "AI Singapore",
    title: "Programme & Partnerships Assistant",
    summary: "Shipped 3 platforms and ran ongoing QA across product launches.",
    period: "Mar 2024 – Jul 2026",
    extraCount: 2,
  },
  {
    label: "Product",
    company: "360 Cogni",
    title: "Product Manager Intern",
    summary: "Defined MVP roadmap, UX flows, and integrations for a cognitive health platform.",
    period: "Jan 2026 – Jul 2026",
    extraCount: 1,
  },
  {
    label: "Research & Education",
    company: "National University of Singapore",
    title: "Research and product engineering",
    summary: "EQ-5D-5L research tool, DSFP health app, educational jigsaw game, and MUIS data pipeline.",
    period: "Sep 2025 – Mar 2026",
    extraCount: 4,
  },
  {
    label: "Analytics",
    company: "Marina Bay Sands",
    title: "eCommerce Analytics Intern",
    summary: "Automated reporting, Data Layer rollout, and Tealium IQ tracking.",
    period: "May 2024 – Dec 2024",
    extraCount: 1,
  },
  {
    label: "Startups",
    company: "Sunnystep · Medisaya · Firsty.app",
    title: "AI, software, and client development",
    summary: "Marketing agents, health-data APIs, and APAC lead generation.",
    period: "Feb 2025 – Apr 2026",
    extraCount: 3,
  },
];
