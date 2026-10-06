import { describe, it, expect } from "vitest";
import {
  experiences,
  featuredExperiences,
  timelineExperiences,
} from "./experiences";

describe("experiences — career timeline data", () => {
  it("gives every role the full card shape", () => {
    for (const e of experiences) {
      expect(e.id.trim().length).toBeGreaterThan(0);
      expect(e.company.trim().length).toBeGreaterThan(0);
      expect(e.role.trim().length).toBeGreaterThan(0);
      expect(e.period.trim().length).toBeGreaterThan(0);
      expect(e.highlight.trim().length).toBeGreaterThan(0);
      expect(e.tags.length).toBeGreaterThanOrEqual(3);
      expect(e.details.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("gives every role an insight so the timeline reads as a narrative", () => {
    for (const e of experiences) {
      // Long enough to be a real takeaway, not a restated highlight.
      expect(e.insight?.trim().length ?? 0).toBeGreaterThan(40);
    }
  });

  it("uses unique ids — the cards key off them", () => {
    const ids = experiences.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("sorts the timeline newest-first by end date", () => {
    const ends = timelineExperiences.map((e) => e.endDate);
    expect([...ends].sort((a, b) => b.localeCompare(a))).toEqual(ends);
  });

  it("keeps exactly three featured roles — the homepage band copy says three", () => {
    // HomeExperience renders these in a lg:grid-cols-3 grid and its lede reads
    // "The three roles most representative of the work". A fourth would break
    // both the layout and that sentence.
    expect(featuredExperiences.length).toBe(3);
  });
});
