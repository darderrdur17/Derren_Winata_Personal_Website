import { useEffect, useState, useRef } from "react";

/**
 * Animate a numeric value from 0 to `target` when `start` becomes true.
 * Supports an optional suffix (e.g. "+", "%", "k+") and decimals.
 *
 * Uses requestAnimationFrame with ease-out cubic — feels snappy on scroll,
 * finishes in ~1.2s. Respects prefers-reduced-motion by snapping to target.
 */
export interface CountUpOptions {
  target: number;
  start: boolean;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCountUp({
  target,
  start,
  duration = 1400,
  decimals = 0,
  prefix = "",
  suffix = "",
}: CountUpOptions): string {
  const [display, setDisplay] = useState(() => formatValue(target, decimals, prefix, suffix));
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(formatValue(target, decimals, prefix, suffix));
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - t0;
      const progress = Math.min(1, elapsed / duration);
      const value = target * ease(progress);
      setDisplay(formatValue(value, decimals, prefix, suffix));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration, decimals, prefix, suffix]);

  return display;
}

function formatValue(value: number, decimals: number, prefix: string, suffix: string): string {
  const rounded = decimals === 0 ? Math.round(value) : Number(value.toFixed(decimals));
  return `${prefix}${rounded.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`;
}