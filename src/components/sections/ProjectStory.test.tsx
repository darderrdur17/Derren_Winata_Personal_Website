import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectStory } from "./ProjectStory";

const baseProps = {
  eyebrow: "Project 01 · Frontend",
  title: "Test Project",
  context: "A short context line.",
  problem: "The problem statement.",
  approach: "The approach taken.",
  outcomes: ["Outcome one", "Outcome two"],
  insight: "A useful insight.",
  tech: ["React", "TypeScript"],
};

describe("ProjectStory CTA label", () => {
  it("derives 'View source on GitHub' for a GitHub link", () => {
    render(<ProjectStory {...baseProps} href="https://github.com/darderrdur17/repo" />);
    const link = screen.getByRole("link", { name: /View source on GitHub/i });
    expect(link).toHaveAttribute("href", "https://github.com/darderrdur17/repo");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("derives 'Visit live site' for a non-GitHub link", () => {
    render(<ProjectStory {...baseProps} href="https://360cogni.com" />);
    expect(screen.getByRole("link", { name: /Visit live site/i })).toHaveAttribute(
      "href",
      "https://360cogni.com"
    );
  });

  it("honours an explicit ctaLabel override", () => {
    render(
      <ProjectStory {...baseProps} href="https://example.com" ctaLabel="Read the case study" />
    );
    expect(screen.getByRole("link", { name: /Read the case study/i })).toBeInTheDocument();
  });

  it("renders no CTA link when href is absent", () => {
    render(<ProjectStory {...baseProps} />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
