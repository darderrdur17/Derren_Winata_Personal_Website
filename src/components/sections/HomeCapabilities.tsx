import {
  BarChart3,
  Cpu,
  Database,
  FlaskConical,
  Layout,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/sections/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CapabilityGrid, type CapabilityGroup } from "@/components/sections/CapabilityGrid";
import { siteConfig } from "@/lib/site";

/**
 * 06 — Capabilities. Five cluster groupings built from the technologies that
 * actually appear in the portfolio. No invented proficiency percentages —
 * the grid is honest about what the data supports.
 */
const capabilities: CapabilityGroup[] = [
  {
    label: "Data & Analytics",
    description:
      "Pipelines, validation, dashboards, and decision-grade analysis.",
    icon: BarChart3,
    items: [
      "Python",
      "Pandas",
      "SQL",
      "PostgreSQL",
      "Tealium IQ",
      "Power Automate",
      "Data Layer",
    ],
  },
  {
    label: "AI & Automation",
    description:
      "LLM apps, agents, and AI workflows grounded in real product needs.",
    icon: Cpu,
    items: [
      "Anthropic Claude",
      "LangGraph",
      "Model Context Protocol",
      "RAG",
      "Prompt Engineering",
      "Snowflake GenAI",
      "Databricks",
    ],
  },
  {
    label: "Software Engineering",
    description:
      "Full-stack delivery across React, TypeScript, and Node services.",
    icon: Layout,
    items: [
      "React",
      "React 19",
      "Next.js",
      "TypeScript",
      "Node.js",
      "FastAPI",
      "Supabase",
    ],
  },
  {
    label: "Product",
    description:
      "Roadmaps, UX flows, experimentation, and stakeholder-ready delivery.",
    icon: Workflow,
    items: [
      "Product Roadmaps",
      "UX Flows",
      "A/B Testing",
      "Conversion Funnels",
      "Stakeholder Comms",
      "Agile",
      "SCRUM",
    ],
  },
  {
    label: "Data Systems",
    description:
      "Warehouses, ETL, and pipelines built for production, not demos.",
    icon: Database,
    items: [
      "Snowflake",
      "Apache Airflow",
      "Kafka",
      "ETL / ELT",
      "Data Warehousing",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    label: "Research & Evaluation",
    description:
      "Multilingual research tools, accessibility audits, study design.",
    icon: FlaskConical,
    items: [
      "Study Protocol Design",
      "WCAG 2.1 AA",
      "GDPR",
      "EQ-5D-5L TTO",
      "Cognitive Screening",
      "QA Validation",
      "1,000+ Records Audited",
    ],
  },
];

export function HomeCapabilities() {
  return (
    <section
      id="capabilities"
      aria-label="Capabilities"
      className="relative bg-secondary/30 py-20 sm:py-24"
    >
      <Container>
        <SectionHeader
          eyebrow="06"
          title="What I can run end-to-end."
          lede="Clustered by capability rather than by list. Each group draws on real project work — see the projects section for evidence."
        />

        <CapabilityGrid groups={capabilities} className="mt-10" />

        <p className="mt-8 max-w-2xl text-xs text-muted-foreground">
          Tools come and go; the underlying skill is the same — turn an open
          question into a shipped, measurable system. Reach out at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-primary hover:underline"
          >
            {siteConfig.email}
          </a>{" "}
          if you'd like a deeper walk-through.
        </p>
      </Container>
    </section>
  );
}