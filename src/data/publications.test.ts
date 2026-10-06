import { describe, it, expect } from "vitest";
import { publications } from "./publications";

describe("publications — research output", () => {
  it("has the full citation shape for every entry", () => {
    for (const p of publications) {
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.credit.trim().length).toBeGreaterThan(0);
      expect(p.venue.trim().length).toBeGreaterThan(0);
      expect(p.status.trim().length).toBeGreaterThan(0);
      expect(p.contributions.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("describes collaborators by role, never by name", () => {
    // Guards the roles-only naming policy agreed with the author. If a real
    // citation is ever added, update this test deliberately — not by accident.
    for (const p of publications) {
      expect(p.credit).not.toMatch(/Dr\.|Dewi|Diah|Ade|Frances/i);
      expect(p.contributions.join(" ")).not.toMatch(/Dewi|Diah|Ade|Frances/i);
    }
  });

  it("states the paper's real status honestly", () => {
    // The Smart Digital Conference 2026 paper is still in preparation. It must
    // never be presented as accepted or published.
    const paper = publications.find((p) => p.venue.includes("Smart Digital"));
    expect(paper).toBeDefined();
    expect(paper?.status).toBe("In preparation");
  });
});
