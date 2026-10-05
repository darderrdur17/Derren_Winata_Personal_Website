/**
 * Shared project-presentation helpers.
 *
 * `categoryFromTech` maps a project's lead technology to the short category
 * label shown on homepage cards and the /projects case-study eyebrows. It
 * lives here rather than being duplicated per component so the two surfaces
 * can never disagree about what a project *is*.
 */

const CATEGORY_BY_TECH: Record<string, string> = {
  React: "Frontend",
  "React Native": "Mobile",
  "Next.js": "Full-stack",
  TypeScript: "Frontend",
  JavaScript: "Frontend",
  HTML: "Frontend",
  CSS: "Frontend",
  "Node.js": "Backend",
  Go: "Backend",
  Python: "Data · ML",
  SQL: "Data · ML",
  SQLite: "Data · ML",
  "Jupyter Notebook": "Data · ML",
  "scikit-learn": "Data · ML",
  pandas: "Data · ML",
  Tableau: "Data · ML",
};

/**
 * Resolve a category label for a project's primary technology.
 *
 * Versioned labels ("React 19", "Next.js 15") are normalised to their base
 * name before lookup — otherwise the leading project silently falls back to
 * the generic label the moment a major version is appended.
 */
export function categoryFromTech(tech: string): string {
  const direct = CATEGORY_BY_TECH[tech];
  if (direct) return direct;

  const base = tech.replace(/\s*v?\d+(\.\d+)*$/i, "").trim();
  return CATEGORY_BY_TECH[base] ?? "Build";
}
