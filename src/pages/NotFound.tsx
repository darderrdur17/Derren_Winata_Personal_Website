import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageShell>
      <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-24">
        <div className="surface-elevated relative max-w-xl overflow-hidden rounded-2xl p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
            Error 404
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-3 text-pretty text-muted-foreground">
            The page <code className="font-mono text-foreground">{location.pathname}</code>{" "}
            doesn't exist — or it never did.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex h-10 items-center rounded-full bg-gradient-primary px-5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:opacity-95 hover:shadow-[var(--glow-primary)]"
            >
              Back to home
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-10 items-center rounded-full border border-border/70 bg-background/50 px-5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
            >
              Report a broken link
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default NotFound;
