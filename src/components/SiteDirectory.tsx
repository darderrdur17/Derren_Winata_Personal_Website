import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Site directory — a clear, at-a-glance index of every top-level page.
 *
 * Rendered inside the hero ("headline") so a first-time visitor sees the whole
 * site structure immediately instead of hunting for the navbar. It is fully
 * data-driven: the list comes from `navItems` (derived from `siteRoutes`), so
 * adding a page is a single entry in `site.ts` and this directory, the navbar,
 * the footer, and the sitemap all update together — nothing to keep in sync by
 * hand.
 *
 * Accessibility: a real <nav> landmark with an ordered list of links, so it is
 * reachable by screen-reader navigation and scales cleanly to any number of
 * destinations (the grid wraps; it never overflows).
 */
export function SiteDirectory({ className }: { className?: string }) {
  return (
    <nav aria-label="Site directory" className={cn("w-full", className)}>
      <p className="mb-3 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
        Directory
        <span className="hairline flex-1" aria-hidden="true" />
      </p>

      <ul className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/50 sm:grid-cols-2 lg:grid-cols-5">
        {navItems.map((item) => (
          <li key={item.href} className="bg-background">
            <Link
              to={item.href}
              className="group flex h-full flex-col gap-1.5 p-4 transition-colors duration-300 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {item.label}
                </span>
                <ArrowUpRight
                  size={15}
                  className="flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {item.blurb}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SiteDirectory;
