/**
 * Motion preferences, in one place.
 *
 * The CSS layer already sets `scroll-behavior: auto !important` under
 * `prefers-reduced-motion` (index.css). That rule only governs *declarative*
 * scrolling — an explicit `behavior: "smooth"` passed from JS overrides it, so
 * every programmatic scroll has to consult the preference itself.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** `smooth` normally, `auto` for visitors who asked for less motion. */
export function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}
