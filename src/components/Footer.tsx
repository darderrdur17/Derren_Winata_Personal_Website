import { Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr,1fr]">
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles size={14} className="text-primary" />
              Available for internships & part-time roles
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Quick Links</p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <a href="#about" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#experience" className="hover:text-primary transition-colors">
                Experience
              </a>
              <a href="#contact" className="hover:text-primary transition-colors">
                Contact
              </a>
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
            <a
              href="/Derren_Winata_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              Download Resume
            </a>
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
