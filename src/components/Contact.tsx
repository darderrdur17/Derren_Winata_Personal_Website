import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactLinks = [
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: "derren.winata@u.nus.edu",
      href: "mailto:derren.winata@u.nus.edu",
    },
    {
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      value: "/in/derren-winata",
      href: "https://linkedin.com/in/derren-winata",
    },
    {
      icon: <Github size={20} />,
      label: "GitHub",
      value: "@darderrdur17",
      href: "https://github.com/darderrdur17",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: "Singapore",
      href: "#",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className={`flex items-center gap-4 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="font-mono text-primary">05.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Get In Touch</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Side - Info */}
            <div className={`lg:col-span-2 ${isVisible ? "animate-slide-in-left delay-100" : "opacity-0"}`}>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Let's work together
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm currently looking for new opportunities and my inbox is always open. 
                Whether you have a question, want to discuss a project, or just want to say hi, 
                I'll try my best to get back to you!
              </p>

              {/* Contact Links */}
              <div className="space-y-4">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="text-muted-foreground group-hover:text-primary transition-colors">
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">{link.label}</p>
                      <p className="text-muted-foreground text-xs">{link.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className={`lg:col-span-3 ${isVisible ? "animate-slide-in-right delay-200" : "opacity-0"}`}>
              <div className="glass-card rounded-xl p-6 md:p-8">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Send me a message
                </h3>
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
