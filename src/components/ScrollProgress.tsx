import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent">
      <div
        className="h-full bg-gradient-primary transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect at the tip */}
      <div
        className="absolute top-0 h-full w-8 transition-all duration-100 ease-out"
        style={{
          left: `calc(${progress}% - 16px)`,
          background: "linear-gradient(90deg, transparent, hsl(174 72% 56% / 0.6), transparent)",
          filter: "blur(4px)",
          opacity: progress > 0 ? 1 : 0,
        }}
      />
    </div>
  );
};

export default ScrollProgress;
