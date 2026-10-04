/**
 * generate-sitemap.mjs
 *
 * Writes `public/sitemap.xml` with a per-URL `<lastmod>` derived from the
 * latest git commit (falls back to today's date when git is unavailable, e.g.
 * in a sandbox or shallow checkout).
 *
 * Route paths are extracted from `src/lib/site.ts` (the same `siteRoutes`
 * array that drives runtime SEO), so the sitemap can never silently drift
 * from the app's actual routes. Priority/changefreq live in the PRIORITY map
 * below — keep it in sync when a route is added.
 *
 * Run automatically via the `prebuild` npm script; also safe to run manually.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const SITE_TS = resolve(root, "src/lib/site.ts");
const OUT = resolve(root, "public/sitemap.xml");

const CANONICAL_ORIGIN =
  process.env.VITE_SITE_ORIGIN || process.env.SITE_ORIGIN || "https://derren-winata.com";

// Priority per route. Anything not listed defaults to 0.5.
const PRIORITY = {
  "/": 1.0,
  "/experience": 0.9,
  "/projects": 0.9,
  "/certifications": 0.7,
  "/contact": 0.7,
};
const CHANGEFREQ = "monthly";

function extractPaths() {
  const src = readFileSync(SITE_TS, "utf8");
  const paths = [];
  const re = /path:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) paths.push(m[1]);
  if (paths.length === 0) {
    throw new Error("Could not extract any route paths from src/lib/site.ts");
  }
  return paths;
}

function getLastmod() {
  try {
    const out = execSync("git log -1 --format=%cI", {
      cwd: root,
      timeout: 5000,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (/^\d{4}-\d{2}-\d{2}T/.test(out)) return out.slice(0, 10);
  } catch {
    // git unavailable / not a repo / shallow clone — fall back to today.
  }
  return new Date().toISOString().slice(0, 10);
}

function build() {
  const paths = extractPaths();
  const lastmod = getLastmod();
  const base = CANONICAL_ORIGIN.replace(/\/$/, "");

  const urls = paths
    .map((p) => {
      const priority = PRIORITY[p] ?? 0.5;
      const loc = `${base}${p}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${CHANGEFREQ}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  writeFileSync(OUT, xml, "utf8");
  console.log(
    `[generate-sitemap] wrote ${paths.length} URLs to public/sitemap.xml (lastmod ${lastmod})`
  );
}

build();
