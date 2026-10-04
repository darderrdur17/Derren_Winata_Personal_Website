import { describe, it, expect, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCountUp } from "./useCountUp";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("useCountUp", () => {
  it("renders the formatted target immediately (pre-animation display)", () => {
    const { result } = renderHook(() => useCountUp({ target: 99, start: false }));
    expect(result.current).toBe("99");
  });

  it("applies prefix and suffix", () => {
    const { result } = renderHook(() =>
      useCountUp({ target: 42, start: false, prefix: "≈", suffix: "%" })
    );
    expect(result.current).toBe("≈42%");
  });

  it("snaps straight to the target when prefers-reduced-motion is set", () => {
    window.matchMedia = ((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;

    const { result } = renderHook(() => useCountUp({ target: 123, start: true, suffix: "+" }));
    expect(result.current).toBe("123+");
  });

  it("respects decimal places", () => {
    const { result } = renderHook(() =>
      useCountUp({ target: 3.14159, start: false, decimals: 2 })
    );
    expect(result.current).toBe("3.14");
  });
});
