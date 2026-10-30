import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape closes the menu and hands focus back to the control that opened it.
  // Without this the only way out was to click the toggle again, which is not
  // discoverable from the keyboard.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // The sheet covers the top of the page, so tapping the content underneath it
  // should dismiss it. Uses pointerdown rather than click so the menu closes
  // before whatever was tapped receives the event.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isMobileMenuOpen]);

  // A route change (including browser back/forward) should never leave the
  // sheet hanging open over the new page.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b-[3px] border-accent"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="text-xl font-bold text-gradient animate-fade-in-down flex-shrink-0"
          >
            DW
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-colors duration-300 link-underline text-sm font-medium opacity-0 animate-fade-in-down ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ animationDelay: `${(index + 1) * 100}ms`, animationFillMode: "forwards" }}
                >
                  {item.label}
                </Link>
              );
            })}
            <span
              className="opacity-0 animate-fade-in-down"
              style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
            >
              <ThemeToggle variant="icon" />
            </span>
          </div>

          <button
            ref={toggleRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-lg"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-1">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Theme
                </span>
                <ThemeToggle variant="labelled" className="w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
