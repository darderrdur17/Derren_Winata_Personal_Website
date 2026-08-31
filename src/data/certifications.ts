export interface Certification {
  title: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
  certificateUrl?: string;
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
        title: "Google Data Analytics Professional Certificate",
        issuer: "Google · Coursera",
        date: "Aug 29, 2026",
        credentialId: "ZLCROBCFKI5Y",
        certificateUrl: "/certificates/google-data-analytics-coursera.pdf",
        skills: [
          "Data Cleaning",
          "Data Analysis",
          "Data Visualization",
          "SQL",
          "Python",
          "Tableau",
          "Spreadsheets",
          "Data Storytelling",
        ],
      },
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
  {
    label: "Project Management",
    items: [
      {
        title: "Google Project Management Professional Certificate",
        issuer: "Google · Coursera",
        date: "Aug 31, 2026",
        credentialId: "UBNQ12MMPGA0",
        certificateUrl: "/certificates/google-project-management-coursera.pdf",
        skills: [
          "Project Planning",
          "Scope Management",
          "Agile Project Management",
          "Stakeholder Communications",
          "Team Leadership",
          "Change Management",
          "Project Life Cycle",
        ],
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
