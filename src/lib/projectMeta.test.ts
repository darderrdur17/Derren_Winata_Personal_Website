import { describe, it, expect } from "vitest";
import { categoryFromTech } from "./projectMeta";
import { projects } from "@/data/projects";

describe("categoryFromTech", () => {
  it("maps the primary stacks used across the portfolio", () => {
    expect(categoryFromTech("Next.js")).toBe("Full-stack");
    expect(categoryFromTech("React")).toBe("Frontend");
    expect(categoryFromTech("Python")).toBe("Data · ML");
    expect(categoryFromTech("Go")).toBe("Backend");
  });

  it("normalises versioned labels instead of falling back", () => {
    expect(categoryFromTech("React 19")).toBe("Frontend");
    expect(categoryFromTech("Next.js 15")).toBe("Full-stack");
    expect(categoryFromTech("Python 3.12")).toBe("Data · ML");
  });

  it("falls back to a neutral label for unknown tech", () => {
    expect(categoryFromTech("COBOL")).toBe("Build");
  });

  it("classifies every project's lead technology without falling back", () => {
    for (const p of projects) {
      expect(categoryFromTech(p.tech[0])).not.toBe("Build");
    }
  });
});
