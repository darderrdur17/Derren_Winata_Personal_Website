import { describe, it, expect } from "vitest";
import { siteConfig, siteRoutes, routeMeta } from "./site";

describe("routeMeta — SEO source of truth", () => {
  it("returns the matching route for every known path", () => {
    for (const route of siteRoutes) {
      expect(routeMeta(route.path)).toBe(route);
    }
  });

  it("falls back to the home route for unknown paths", () => {
    expect(routeMeta("/does-not-exist").path).toBe("/");
  });

  it("keeps titles at or under Google's ~60-char SERP limit", () => {
    for (const route of siteRoutes) {
      // Treated as a hard cap: ellipsised in search results beyond this.
      expect(route.title.length).toBeLessThanOrEqual(60);
    }
  });

  it("keeps descriptions at or under the ~155-char limit", () => {
    for (const route of siteRoutes) {
      expect(route.description.length).toBeLessThanOrEqual(155);
    }
  });

  it("exposes a durable, canonical contact email", () => {
    expect(siteConfig.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });

  it("points the résumé at the version built into public/", () => {
    expect(siteConfig.resumeHref).toBe("/Derren_Winata_Resume.pdf");
  });

  it("exposes non-empty OG image alt text for social shares", () => {
    expect(typeof siteConfig.ogImageAlt).toBe("string");
    expect(siteConfig.ogImageAlt.length).toBeGreaterThan(0);
  });
});
