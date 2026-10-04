/**
 * Shown while a lazily-loaded route chunk is in flight.
 *
 * Deliberately minimal: no layout shift, no spinner dependency, and the
 * global `prefers-reduced-motion` rule in index.css neutralises the pulse
 * for users who ask for less motion.
 */
const RouteFallback = () => (
  <div
    className="flex min-h-[60vh] items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <span className="sr-only">Loading page…</span>
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
      <span
        className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  </div>
);

export default RouteFallback;
