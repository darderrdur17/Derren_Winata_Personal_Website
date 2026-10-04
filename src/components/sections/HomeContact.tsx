import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/sections/Container";
import { siteConfig } from "@/lib/site";

/**
 * 08 — Contact CTA. A short, decisive band that ends the homepage journey.
 * Single primary action, three secondary channels, availability signal.
 */
export function HomeContact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative py-24 sm:py-32"
    >
      <Container>
        <div className="surface-elevated relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16">
          <div
            className="absolute inset-0 -z-10 opacity-50"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 80% at 0% 0%, hsl(var(--primary) / 0.10) 0%, transparent 60%), radial-gradient(60% 80% at 100% 100%, hsl(var(--primary) / 0.07) 0%, transparent 60%)",
            }}
          />

          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary">
            08 · Let's build something useful
          </p>
          <h2 className="mt-3 max-w-3xl text-balance text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
            If you've got a problem that needs{" "}
            <span className="text-gradient">data, AI, or product thinking</span>,
            my inbox is open.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            I'm available for full-time roles and freelance projects — analytics,
            AI systems, full-stack product delivery, or research-grade tools.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-primary px-6 text-sm font-medium text-primary-foreground transition-all duration-300 hover:opacity-95 hover:shadow-[var(--glow-primary)]"
            >
              <Mail size={16} />
              {siteConfig.email}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={siteConfig.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-border/70 bg-background/50 px-6 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
            >
              <FileText size={16} />
              Resume (PDF)
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/50 text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}