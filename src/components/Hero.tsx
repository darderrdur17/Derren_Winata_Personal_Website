import { useEffect, useRef, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const roles = ["Data Analyst", "Software Developer", "Problem Solver"];

const Hero = () => {
  const [displayedRole, setDisplayedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const parallaxRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting && displayedRole === currentRole) {
      const pauseId = window.setTimeout(() => setIsDeleting(true), 1400);
      return () => window.clearTimeout(pauseId);
    }

    if (isDeleting && displayedRole === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const nextLength = isDeleting
      ? displayedRole.length - 1
      : displayedRole.length + 1;
    const nextRole = currentRole.slice(0, nextLength);
    const speed = isDeleting ? 45 : 90;

    const timeoutId = window.setTimeout(() => {
      setDisplayedRole(nextRole);
    }, speed);

    return () => window.clearTimeout(timeoutId);
  }, [displayedRole, isDeleting, roleIndex]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const speeds = [0.06, 0.1, 0.04];
    let rafId = 0;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      parallaxRefs.current.forEach((node, index) => {
        if (!node) return;
        const offset = scrollY * (speeds[index] ?? 0.05);
        node.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      rafId = 0;
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          ref={(node) => {
            parallaxRefs.current[0] = node;
          }}
          className="absolute top-1/4 -left-32"
        >
          <div className="w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        </div>
        <div
          ref={(node) => {
            parallaxRefs.current[1] = node;
          }}
          className="absolute bottom-1/4 -right-32"
        >
          <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float delay-500" />
        </div>
        <div
          ref={(node) => {
            parallaxRefs.current[2] = node;
          }}
          className="absolute top-1/2 left-1/2"
        >
          <div className="w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid items-center gap-12 lg:grid-cols-[280px,1fr]">
            <div className="flex justify-center lg:justify-start opacity-0 animate-fade-in-up">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute -inset-4 rounded-full bg-primary/20 blur-3xl opacity-70" />
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1 bg-gradient-primary glow-primary">
                  <img
                    src="/images/profile-picture.jpeg"
                    alt="Portrait of Derren Winata"
                    loading="eager"
                    decoding="async"
                    className="h-full w-full rounded-full object-cover bg-card"
                  />
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              {/* Greeting */}
              <p className="font-mono text-primary text-sm md:text-base mb-6 opacity-0 animate-fade-in-up">
                Hi, my name is
              </p>

              {/* Name */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 opacity-0 animate-fade-in-up delay-100">
                <span className="text-foreground">Derren </span>
                <span className="text-gradient">Winata</span>
              </h1>

              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto lg:mx-0 mb-4 opacity-0 animate-fade-in-up delay-150">
                I turn complex data into clear, growth‑ready insights that help teams ship smarter.
              </p>

              {/* Title */}
              <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6 opacity-0 animate-fade-in-up delay-200">
                <span className="text-muted-foreground">I'm a </span>
                <span className="text-primary font-mono" aria-live="polite" aria-atomic="true">
                  {displayedRole}
                </span>
                <span className="ml-1 inline-block h-6 w-[2px] bg-primary align-middle animate-caret" aria-hidden="true" />
              </h2>

              {/* Description */}
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed opacity-0 animate-fade-in-up delay-300">
                I'm a passionate data enthusiast at the{" "}
                <span className="text-primary">National University of Singapore</span>,
                specializing in transforming complex data into actionable insights.
                Currently focused on eCommerce analytics, software development, and AI integration.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12 opacity-0 animate-fade-in-up delay-400">
                <a
                  href="#projects"
                  className="px-8 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 glow-primary hover-glow"
                  aria-label="View case studies"
                >
                  View Case Studies
                </a>
                <a
                  href="/Derren_Winata_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-all duration-300 hover-glow"
                  aria-label="Download resume (PDF)"
                >
                  Download Resume
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-6 opacity-0 animate-fade-in-up delay-500">
                <a
                  href="https://github.com/darderrdur17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/derren-winata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:derren.winata@u.nus.edu"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:scale-110 transform"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up delay-600 z-20 pointer-events-auto">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-full bg-background/40 backdrop-blur border border-border/60"
        >
          <span className="text-xs font-mono">Scroll Down</span>
          <ArrowDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
