/**
 * Structured-data builders for the JSON-LD injected at runtime by
 * `useDocumentMeta`. Kept separate so the markup logic is unit-testable
 * without rendering React.
 *
 * All builders return plain objects that are `JSON.stringify`-ed into a
 * `<script type="application/ld+json">` tag. Only verified, factual data is
 * used — never invented statistics.
 */

import { projects } from "@/data/projects";
import { siteConfig, siteRoutes } from "@/lib/site";

const origin = () => siteConfig.canonicalOrigin.replace(/\/$/, "");

/**
 * An `ItemList` of the curated projects, for the `/projects` route. Helps
 * search engines understand the collection as discrete, linkable items.
 */
export function projectsItemList() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected projects by Derren Winata",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.summary,
      url: p.href,
    })),
  };
}

/**
 * A `BreadcrumbList` for an inner route (everything except the home page).
 * Returns `null` for `/` and unknown paths so callers can skip injection.
 */
export function breadcrumbList(path: string) {
  if (path === "/" || !path) return null;

  const current = siteRoutes.find((r) => r.path === path);
  if (!current) return null;

  const home = siteRoutes[0];
  const trail = [home, current];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.label,
      item: `${origin()}${r.path}`,
    })),
  };
}
