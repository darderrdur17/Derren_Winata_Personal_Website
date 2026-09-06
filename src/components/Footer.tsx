import { Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AVAILABILITY_LABEL } from "@/data/site";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr,1fr] min-w-0">
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold text-foreground">Derren Winata</p>
              <p className="text-sm text-muted-foreground">
                Data Analytics · Software Development
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} className="text-primary" />
              Singapore
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Sparkles size={14} className="text-primary mt-0.5 flex-shrink-0" />
              <span>{AVAILABILITY_LABEL}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Quick Links</p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <Link to="/#about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/experience" className="hover:text-primary transition-colors">
                Experience
              </Link>
              <Link to="/projects" className="hover:text-primary transition-colors">
                Projects
              </Link>
              <Link to="/certifications" className="hover:text-primary transition-colors">
                Certifications
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-foreground">Connect</p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/darderrdur17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/derren-winata"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:derren.winata@u.nus.edu"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="text-muted-foreground text-sm font-mono">
            Designed & Built by Derren Winata
          </p>
          <p className="text-muted-foreground/60 text-xs">
            © {new Date().getFullYear()} Derren Winata. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
