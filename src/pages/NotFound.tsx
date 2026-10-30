import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import { useDocumentMeta } from "@/lib/hooks/useDocumentMeta";

const NotFound = () => {
  const location = useLocation();

  // A catch-all route is still served as HTTP 200 by the SPA host, so the
  // head is the only thing that tells a crawler this URL is dead: `noindex`
  // plus no canonical. Without this the page inherits the homepage's title,
  // canonical and `index,follow` — a soft 404 competing with "/".
  useDocumentMeta({
    title: "Page not found — Derren Winata",
    description:
      "That page doesn't exist. Head back to the portfolio home page or get in touch directly.",
    path: location.pathname,
    noindex: true,
  });

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
              className="btn-primary h-10 px-5 text-sm transition-all duration-300"
            >
              Back to home
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-10 items-center rounded-md border border-border/70 bg-background/50 px-5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
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
