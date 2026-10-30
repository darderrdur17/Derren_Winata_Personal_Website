import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/lib/site";
import { useReveal } from "@/lib/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * Contact panel for `/contact`.
 *
 * The page supplies the single <h1> and lede via `SectionHeader`, so this
 * component deliberately starts at the two-column grid — it used to render a
 * second "06. Get In Touch" header, which duplicated the page heading and
 * carried a section number that only made sense on the homepage.
 *
 * Reveal-on-scroll uses the shared `useReveal` hook rather than a local
 * IntersectionObserver so it short-circuits under `prefers-reduced-motion`
 * like every other section.
 */
interface ContactChannel {
  icon: React.ReactNode;
  label: string;
  value: string;
  /** Omitted for non-navigable rows (e.g. location). */
  href?: string;
}

const rowClass =
  "flex items-center gap-4 rounded-lg border p-4 transition-all duration-300";

const Contact = () => {
  const { ref, visible } = useReveal<HTMLElement>({ threshold: 0.05 });

  const contactLinks: ContactChannel[] = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      value: "/in/derren-winata",
      href: siteConfig.social.linkedin,
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      value: "@darderrdur17",
      href: siteConfig.social.github,
    },
    // Location is not a destination. It used to render as `href="#"`, which
    // scrolled the page to the top and appended a bare "#" to the URL.
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: siteConfig.location,
    },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto min-w-0 max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Left Side - Info */}
            <div
              className={cn(
                "lg:col-span-2",
                visible ? "animate-slide-in-left delay-100" : "opacity-0"
              )}
            >
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Let's work together
              </h2>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                I'm{" "}
                <span className="font-medium text-foreground">
                  available for full time roles and freelance projects
                </span>
                . Whether you're hiring, need help on a project, or just want to
                say hi — my inbox is always open.
              </p>

              {/* Contact Links */}
              <div className="space-y-4">
                {contactLinks.map((link) => {
                  const body = (
                    <>
                      <div className="text-muted-foreground transition-colors group-hover:text-primary">
                        {link.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {link.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {link.value}
                        </p>
                      </div>
                    </>
                  );

                  if (!link.href) {
                    return (
                      <div
                        key={link.label}
                        className={cn(
                          rowClass,
                          "group border-transparent bg-secondary/50"
                        )}
                      >
                        {body}
                      </div>
                    );
                  }

                  const external = link.href.startsWith("http");
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={cn(
                        rowClass,
                        "group border-transparent bg-secondary/50 hover:border-primary/30 hover:bg-secondary"
                      )}
                    >
                      {body}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Form */}
            <div
              className={cn(
                "lg:col-span-3",
                visible ? "animate-slide-in-right delay-200" : "opacity-0"
              )}
            >
              <div className="glass-card rounded-xl p-4 sm:p-6 md:p-8">
                <h2 className="mb-6 text-lg font-semibold text-foreground">
                  Send me a message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
