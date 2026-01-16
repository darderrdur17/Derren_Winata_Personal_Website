import { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme ?? theme;
  const isDark = currentTheme === "dark";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-xl font-bold text-gradient animate-fade-in-down"
          >
            DW
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline text-sm font-medium opacity-0 animate-fade-in-down"
                style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: 'forwards' }}
              >
                {item.name}
              </a>
            ))}
            <a
              href="/Derren_Winata_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity duration-300 opacity-0 animate-fade-in-down"
              style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
            >
              Resume
            </a>
            <button
              type="button"
              aria-label="Toggle theme"
              title="Toggle theme"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-full border border-border/60 bg-background/60 text-foreground hover:bg-muted/40 transition-colors duration-300 opacity-0 animate-fade-in-down"
              style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}
            >
              {mounted ? (
                isDark ? <Sun size={18} /> : <Moon size={18} />
              ) : (
                <span className="inline-block h-4 w-4" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-lg"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/Derren_Winata_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-center font-medium"
              >
                Resume
              </a>
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="flex items-center justify-between px-4 py-2 rounded-lg border border-border/60 bg-background/80 text-sm font-medium"
              >
                <span className="text-muted-foreground">Theme</span>
                {mounted ? (
                  isDark ? <Sun size={18} /> : <Moon size={18} />
                ) : (
                  <span className="inline-block h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
