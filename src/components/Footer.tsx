import { Github, Linkedin, Mail, MapPin, Sparkles, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { AVAILABILITY_LABEL } from "@/data/site";
import { siteConfig } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="container mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        {/* Row 1 — Brand + Resume (asymmetric: brand left, primary action right) */}
        <div className="flex flex-col gap-6 border-b border-border/40 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div>
              <p className="text-lg font-semibold text-foreground">{siteConfig.name}</p>
              <p className="text-sm text-muted-foreground">
                Data &amp; AI · Product · Full-stack
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={13} className="text-primary" />
              Singapore
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Sparkles size={13} className="mt-0.5 flex-shrink-0 text-primary" />
              <span>{AVAILABILITY_LABEL}</span>
            </div>
          </div>
          <a
            href={siteConfig.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/[0.06] px-4 py-2 font-mono text-sm text-primary transition-all duration-300 hover:border-primary hover:bg-primary/[0.1] hover:shadow-[var(--glow-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <FileText size={14} />
            Resume (PDF)
          </a>
        </div>

        {/* Row 2 — Page links + social (equal, muted) */}
        <div className="flex flex-col gap-6 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/experience" className="transition-colors hover:text-foreground">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/projects" className="transition-colors hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="transition-colors hover:text-foreground">
                  Certifications
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <ul className="flex items-center gap-4 text-muted-foreground">
            <li>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-foreground"
              >
                <Github size={18} />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-foreground"
              >
                <Linkedin size={18} />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="transition-colors hover:text-foreground"
              >
                <Mail size={18} />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            Designed &amp; built by {siteConfig.name}
          </p>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;