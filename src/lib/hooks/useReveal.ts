import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Reveal-on-scroll hook using IntersectionObserver. Mounts invisible, becomes
 * visible once the element intersects the viewport (default 12% visible).
 *
 * Returns a ref to attach to the element and a boolean. The host decides how
 * to animate (`animate-reveal` class, etc.) once `visible` flips true.
 *
 * Respects prefers-reduced-motion: short-circuits to `true` so the element is
 * never trapped in an opacity:0 state for users who don't want motion.
 */
export interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
): { ref: RefObject<T>; visible: boolean } {
  const { threshold = 0.12, rootMargin = "0px 0px -8% 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}