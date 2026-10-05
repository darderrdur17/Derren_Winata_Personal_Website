import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects — curated portfolio data", () => {
  it("keeps the flagship first — JSON-LD and the homepage spotlight key off it", () => {
    expect(projects[0].title).toBe("360 Cogni");
  });

  it("gives every project the full story shape", () => {
    for (const p of projects) {
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.summary.trim().length).toBeGreaterThan(0);
      expect(p.insight.trim().length).toBeGreaterThan(0);
      expect(p.outcomes.length).toBeGreaterThanOrEqual(3);
      expect(p.tech.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("links every project to a real, absolute URL", () => {
    for (const p of projects) {
      expect(p.href).toMatch(/^https:\/\/.+/);
    }
  });

  it("has unique titles — look-ups resolve projects by exact title", () => {
    const titles = projects.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
