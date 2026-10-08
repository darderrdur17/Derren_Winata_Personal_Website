import { describe, it, expect } from "vitest";
import {
  approachFor,
  deepContentTitles,
  problemFor,
  APPROACH_FALLBACK,
  PROBLEM_FALLBACK,
} from "./projectDeepContent";
import { projects } from "@/data/projects";

describe("projectDeepContent", () => {
  it("covers every project title exactly — no orphans, no gaps", () => {
    // A rename in projects.ts without a matching rename here would silently
    // drop the page back to boilerplate; a stale key would leave dead copy.
    expect([...deepContentTitles].sort()).toEqual(
      projects.map((p) => p.title).sort()
    );
  });

  it("gives every project a real problem statement, not the fallback", () => {
    for (const p of projects) {
      const problem = problemFor(p.title);
      expect(problem).not.toBe(PROBLEM_FALLBACK);
      // Long enough to be an actual narrative, not a one-liner.
      expect(problem.length).toBeGreaterThan(80);
    }
  });

  it("gives every project a real approach, not the fallback", () => {
    for (const p of projects) {
      const approach = approachFor(p.title);
      expect(approach).not.toBe(APPROACH_FALLBACK);
      expect(approach.length).toBeGreaterThan(80);
    }
  });

  it("falls back safely for an unknown title", () => {
    expect(problemFor("A project that does not exist")).toBe(PROBLEM_FALLBACK);
    expect(approachFor("A project that does not exist")).toBe(APPROACH_FALLBACK);
  });
});
