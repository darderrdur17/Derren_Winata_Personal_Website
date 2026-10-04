import { describe, it, expect } from "vitest";
import { deriveCtaLabel } from "./cta";

describe("deriveCtaLabel", () => {
  it("labels GitHub links as source", () => {
    expect(deriveCtaLabel("https://github.com/darderrdur17/repo")).toBe("View source on GitHub");
    expect(deriveCtaLabel("https://www.github.com/foo/bar")).toBe("View source on GitHub");
  });

  it("is case-insensitive for the github host", () => {
    expect(deriveCtaLabel("https://GITHUB.com/x/y")).toBe("View source on GitHub");
  });

  it("labels non-GitHub links as live site", () => {
    expect(deriveCtaLabel("https://360cogni.com")).toBe("Visit live site");
    expect(deriveCtaLabel("http://example.com/page")).toBe("Visit live site");
  });
});
