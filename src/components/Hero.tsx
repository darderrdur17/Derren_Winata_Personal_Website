import { ArrowDown, Github, Linkedin, ArrowUpRight, Sparkles, FileText } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { SiteDirectory } from "@/components/SiteDirectory";

/**
 * Hero — the marquee moment of the homepage.
 *
 * Asymmetric: editorial copy on the left, an identity card on the right that
 * derives directly from real portfolio content. No typewriter, no rotating
 * role chip, no fake metrics. Calendar spec v3: drop parallax + animate-float
 * (both are per-frame costs), trim the 2×2 snapshot grid to one card.
 */
const Hero: React.FC = () => {
  return (
    <section
      aria-label="Introduction"
      className="relative isolate overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      {/* Subtle grid — static, no float, no parallax. */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center top, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center top, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="container mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* ----- LEFT: Editorial copy ----- */}
          <div className="flex flex-col gap-6">
            <p className="animate-reveal-down font-mono text-xs uppercase tracking-[0.22em] text-primary">
              <Sparkles size={11} className="mr-1.5 inline-block" />
              Data · AI · Product · Engineering
            </p>

            <h1 className="animate-reveal text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              I build systems that turn{" "}
              <span className="text-gradient">data into decisions.</span>
            </h1>

            <p className="animate-reveal delay-100 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm <span className="text-foreground">Derren Winata</span>, an NUS
              Data Science &amp; Analytics graduate (Class of 2026) who ships
              AI apps, data products, and full-stack software.
            </p>

            <p className="animate-reveal delay-200 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
              From a multilingual research tool, to a cognitive health platform
              live at 360cogni.com, to a reporting pipeline that ran 83%
              faster — I work across the full pipeline: research, data, AI,
              product, engineering.
            </p>

            <div className="animate-reveal delay-300 flex flex-wrap items-center gap-3">
              <a
                href="#selected-work"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-300 hover:opacity-95 hover:shadow-[var(--glow-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See selected work
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={siteConfig.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-border/70 bg-background/50 px-6 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <FileText size={14} />
                Resume (PDF)
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div className="animate-reveal delay-400 flex items-center gap-2">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full border border-border/60 p-2 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
              >
                <Github size={16} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-border/60 p-2 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
              >
                <Linkedin size={16} />
              </a>
              <span className="hairline ml-2 hidden h-px flex-1 sm:block" aria-hidden="true" />
              <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
                {siteConfig.location}
              </span>
            </div>
          </div>

          {/* ----- RIGHT: Identity composition (Calendar §1: ONE card, not 2×2) ----- */}
          <div className="animate-reveal delay-200 relative flex flex-col gap-4">
            <div className="surface-elevated relative overflow-hidden rounded-2xl">
              <div className="grid grid-cols-[140px_1fr] items-center gap-4 p-4 sm:grid-cols-[160px_1fr] sm:gap-5 sm:p-5">
                <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-primary/40">
                  <img
                    src="/images/profile-picture.jpeg"
                    alt="Portrait of Derren Winata"
                    loading="eager"
                    decoding="async"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-primary">
                    Now
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Open to full-time roles — {siteConfig.location}.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    NUS Data Science &amp; Analytics, Class of 2026 · open to
                    relocation
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1 text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="font-mono uppercase tracking-[0.18em]">
                Active · Singapore · UTC+8
              </span>
            </div>
          </div>
        </div>

        <SiteDirectory className="mt-14 sm:mt-16" />
      </div>

      <a
        href="#proof"
        aria-label="Scroll to proof"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary md:inline-flex"
      >
        Scroll
        <ArrowDown size={12} className="animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;