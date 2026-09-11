export interface Certification {
  title: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
  certificateUrl?: string;
  skills?: string[];
  insight?: string;
}

export const certificationGroups: { label: string; items: Certification[] }[] = [
  {
    label: "AI & LLM",
    items: [
      {
        title: "AI Fundamentals: Language and Vision in AI",
        issuer: "IBM",
        date: "Aug 2026",
        insight: "Covers how language and vision models are applied to real-world AI products.",
        skills: ["Real-world AI Applications", "Natural Language Querying", "Computer Vision"],
      },
      {
        title: "AI Fundamentals: Foundations for Understanding AI",
        issuer: "IBM",
        date: "Aug 2026",
        insight: "Core AI and machine learning concepts, including responsible use.",
        skills: ["AI Concepts", "Machine Learning Basics", "Responsible AI"],
      },
      {
        title: "Claude with the Anthropic API",
        issuer: "Anthropic",
        date: "Aug 2026",
        insight: "Building LLM features with the Anthropic API and prompt engineering.",
        skills: ["Anthropic API", "Prompt Engineering", "LLM Integration"],
      },
      {
        title: "Claude with Amazon Bedrock",
        issuer: "Anthropic",
        date: "Aug 2026",
        insight: "Deploying Claude through Amazon Bedrock for cloud AI workflows.",
        skills: ["Amazon Bedrock", "Claude", "Cloud AI Deployment"],
      },
      {
        title: "Claude Platform 101",
        issuer: "Anthropic",
        date: "Aug 2026",
        insight: "Platform basics for Claude workflows and agent tools.",
        skills: ["Claude Platform", "AI Workflows", "Agent Tools"],
      },
      {
        title: "AI Fluency: Framework & Foundations",
        issuer: "Anthropic",
        date: "Aug 2026",
        insight: "A framework for human-AI collaboration and practical AI fluency.",
        skills: ["AI Strategy", "Human-AI Collaboration", "AI Fluency"],
      },
      {
        title: "Introduction to Model Context Protocol",
        issuer: "Anthropic",
        date: "Aug 2026",
        insight: "How MCP connects models to tools and agent workflows.",
        skills: ["MCP", "Tool Integration", "AI Agents"],
      },
    ],
  },
  {
    label: "Data & Analytics",
    items: [
      {
        title: "Snowflake Data Engineering Professional Certificate",
        issuer: "Snowflake · Coursera",
        date: "Sep 11, 2026",
        credentialId: "4GUSO181FPT6",
        certificateUrl: "/certificates/snowflake-data-engineering-coursera.pdf",
        insight:
          "Three-course specialization on building modern data pipelines in Snowflake — ingestion, SQL and Python transformations, orchestration, DevOps, and observability.",
        skills: [
          "Snowflake",
          "ETL",
          "SQL",
          "Data Warehousing",
          "Data Pipelines",
          "Python",
          "DevOps",
          "RBAC",
        ],
      },
      {
        title: "ETL and Data Pipelines with Shell, Airflow and Kafka",
        issuer: "IBM · Coursera",
        date: "Sep 11, 2026",
        credentialId: "LBCATH579UE3",
        certificateUrl: "/certificates/etl-data-pipelines-coursera.pdf",
        insight:
          "Covers ETL and ELT workflows, batch vs concurrent execution, and building data pipelines with Bash, Python, Apache Airflow, and Kafka.",
        skills: [
          "ETL",
          "Apache Airflow",
          "Kafka",
          "Bash",
          "Data Pipelines",
          "Data Integration",
          "Data Warehousing",
          "Shell Scripting",
        ],
      },
      {
        title: "Google Data Analytics Professional Certificate",
        issuer: "Google · Coursera",
        date: "Aug 29, 2026",
        credentialId: "ZLCROBCFKI5Y",
        certificateUrl: "/certificates/google-data-analytics-coursera.pdf",
        insight:
          "Nine-course specialization covering how junior analysts clean, analyze, visualize, and communicate data with spreadsheets, SQL, Python, and Tableau.",
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
        insight: "Lakehouse fundamentals for data engineering and analytics on Databricks.",
        skills: ["Databricks", "Data Engineering", "Lakehouse"],
      },
      {
        title: "Google Analytics Certification",
        issuer: "Google",
        date: "Aug 2026",
        expiry: "Aug 2027",
        credentialId: "191811640",
        insight: "Web analytics, conversion tracking, and measurement in Google Analytics.",
        skills: ["Google Analytics", "Web Analytics", "Conversion Tracking"],
      },
      {
        title: "Data Analytics and Visualization Job Simulation",
        issuer: "Accenture · Forage",
        date: "Dec 2023",
        credentialId: "f7bFQEXKjmHAYeTfw",
        insight: "Forage simulation focused on analysis, visualization, and stakeholder storytelling.",
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
        insight:
          "Seven-course specialization on initiating, planning, and running both traditional and Agile projects, including Scrum artifacts, stakeholders, and delivery.",
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
  {
    label: "Finance",
    items: [
      {
        title: "Bloomberg Market Concepts (BMC)",
        issuer: "Bloomberg for Education",
        date: "Sep 4, 2026",
        credentialId: "ZZ5qT7Sw88B8C5cEaGkry2zR",
        certificateUrl: "/certificates/bloomberg-market-concepts.pdf",
        insight:
          "Self-paced Bloomberg for Education credential covering financial markets, economic indicators, currencies, fixed income, and equities.",
        skills: [
          "Financial Markets",
          "Fixed Income",
          "Equities",
          "Currencies",
          "Economic Indicators",
          "Bloomberg Terminal",
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

export interface CategoryHighlight {
  label: string;
  title: string;
  issuer: string;
  date: string;
  extraCount: number;
}

export const categoryHighlights: CategoryHighlight[] = certificationGroups.map((group) => {
  const featured =
    group.items.find((item) => item.certificateUrl) ??
    group.items[0];

  return {
    label: group.label,
    title:
      group.label === "AI & LLM"
        ? "IBM & Anthropic AI credentials"
        : featured.title,
    issuer:
      group.label === "AI & LLM"
        ? "IBM · Anthropic"
        : featured.issuer,
    date: featured.date,
    extraCount: group.items.length,
  };
});
