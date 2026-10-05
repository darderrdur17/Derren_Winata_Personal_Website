import { describe, it, expect } from "vitest";
import { siteConfig, siteRoutes, routeMeta, navItems } from "./site";

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

describe("navItems — navigation directory source of truth", () => {
  it("derives one entry per route, in siteRoutes order", () => {
    expect(navItems.map((n) => n.href)).toEqual(siteRoutes.map((r) => r.path));
  });

  it("gives every destination a non-empty label and blurb", () => {
    for (const item of navItems) {
      expect(item.label.trim().length).toBeGreaterThan(0);
      expect(item.blurb.trim().length).toBeGreaterThan(0);
    }
  });

  it("uses clean internal paths — no dead in-page anchors, no duplicates", () => {
    const hrefs = navItems.map((n) => n.href);
    for (const href of hrefs) {
      expect(href.startsWith("/")).toBe(true);
      expect(href).not.toContain("#");
    }
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("covers exactly the routes the router serves", () => {
    // Must stay in step with the <Route> list in src/App.tsx.
    const routed = ["/", "/experience", "/projects", "/certifications", "/contact"];
    expect([...navItems.map((n) => n.href)].sort()).toEqual([...routed].sort());
  });
});
