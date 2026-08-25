export interface Certification {
  title: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
  skills?: string[];
}

export const certificationGroups: { label: string; items: Certification[] }[] = [
  {
    label: "AI & LLM",
    items: [
      {
        title: "AI Fundamentals: Language and Vision in AI",
        issuer: "IBM",
        date: "Aug 2026",
        skills: ["Real-world AI Applications", "Natural Language Querying", "Computer Vision"],
      },
      {
        title: "AI Fundamentals: Foundations for Understanding AI",
        issuer: "IBM",
        date: "Aug 2026",
        skills: ["AI Concepts", "Machine Learning Basics", "Responsible AI"],
      },
      {
        title: "Claude with the Anthropic API",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["Anthropic API", "Prompt Engineering", "LLM Integration"],
      },
      {
        title: "Claude with Amazon Bedrock",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["Amazon Bedrock", "Claude", "Cloud AI Deployment"],
      },
      {
        title: "Claude Platform 101",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["Claude Platform", "AI Workflows", "Agent Tools"],
      },
      {
        title: "AI Fluency: Framework & Foundations",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["AI Strategy", "Human-AI Collaboration", "AI Fluency"],
      },
      {
        title: "Introduction to Model Context Protocol",
        issuer: "Anthropic",
        date: "Aug 2026",
        skills: ["MCP", "Tool Integration", "AI Agents"],
      },
    ],
  },
  {
    label: "Data & Analytics",
    items: [
      {
        title: "Databricks Fundamentals Accreditation",
        issuer: "Databricks",
        date: "Aug 2026",
        skills: ["Databricks", "Data Engineering", "Lakehouse"],
      },
      {
        title: "Google Analytics Certification",
        issuer: "Google",
        date: "Aug 2026",
        expiry: "Aug 2027",
        credentialId: "191811640",
        skills: ["Google Analytics", "Web Analytics", "Conversion Tracking"],
      },
      {
        title: "Data Analytics and Visualization Job Simulation",
        issuer: "Accenture · Forage",
        date: "Dec 2023",
        credentialId: "f7bFQEXKjmHAYeTfw",
        skills: ["Data Visualization", "Storytelling", "Strategy", "Public Speaking"],
      },
    ],
  },
];

export const awards = [
  {
    title: "Bronze Award — Mathematical Olympiads",
    detail: "Thailand IMO & GBA Olympiad • 2021–2022",
  },
];
