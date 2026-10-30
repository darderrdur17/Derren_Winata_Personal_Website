import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !supportsFinePointer) {
      return;
    }

    const glowSize = 260;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let rafId = 0;

    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.12;
      currentY += dy * 0.12;
      glow.style.transform = `translate3d(${currentX - glowSize / 2}px, ${currentY - glowSize / 2}px, 0)`;

      // Settle and stop. Previously this rescheduled itself unconditionally,
      // which meant a permanent 60fps callback for as long as the page was
      // open — even with the pointer stationary. The loop now only runs while
      // there is distance left to cover.
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        rafId = 0;
        return;
      }
      rafId = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.style.opacity = "1";
      if (!rafId) rafId = window.requestAnimationFrame(animate);
    };

    const handleLeave = () => {
      glow.style.opacity = "0";
    };

    animate();
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
};

export default CursorGlow;
