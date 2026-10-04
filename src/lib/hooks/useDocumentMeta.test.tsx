import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { useDocumentMeta } from "./useDocumentMeta";

afterEach(() => {
  cleanup();
  document.getElementById("route-jsonld")?.remove();
});

function Harness({ jsonLd, imageAlt }: { jsonLd?: unknown; imageAlt?: string }) {
  useDocumentMeta({
    title: "Test Title",
    description: "Test description for the meta hook.",
    path: "/projects",
    imageAlt,
    jsonLd,
  });
  return null;
}

describe("useDocumentMeta", () => {
  it("injects og:image:alt and twitter:image:alt", () => {
    render(<Harness imageAlt="Alt text for the share image" />);
    expect(
      document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content")
    ).toBe("Alt text for the share image");
    expect(
      document.querySelector('meta[name="twitter:image:alt"]')?.getAttribute("content")
    ).toBe("Alt text for the share image");
  });

  it("injects a route-level JSON-LD script and removes it on unmount", () => {
    const { unmount } = render(<Harness jsonLd={{ "@type": "ItemList", name: "x" }} />);
    const script = document.getElementById("route-jsonld");
    expect(script).not.toBeNull();
    expect(script?.textContent).toContain('"@type":"ItemList"');

    unmount();
    expect(document.getElementById("route-jsonld")).toBeNull();
  });

  it("falls back to the site default alt when none is supplied", () => {
    render(<Harness />);
    const alt = document
      .querySelector('meta[property="og:image:alt"]')
      ?.getAttribute("content");
    expect(alt).toMatch(/turn data into decisions/i);
  });
});
