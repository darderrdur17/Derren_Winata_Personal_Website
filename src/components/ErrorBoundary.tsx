import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "@/lib/site";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Last line of defence against a blank page. A runtime render error anywhere
 * in the tree is caught and replaced with a recoverable message instead of
 * taking the whole site down.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled render error:", error, info.componentStack);
  }

  /**
   * Clear the error flag so the tree can re-render. A full reload is not
   * required, and the boundary is also remounted on navigation (see
   * `RoutedErrorBoundary`), so a transient failure on one route no longer
   * strands the visitor on this screen.
   */
  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Something went wrong.
            </h1>
            <p className="mt-3 text-muted-foreground">
              The page hit an unexpected error. Try again — and if it keeps
              happening, reach me directly.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={this.handleRetry}
                className="btn-primary px-5 py-2.5 text-sm"
              >
                Try again
              </button>
              <Link
                to="/"
                onClick={this.handleRetry}
                className="text-sm font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                Back to home
              </Link>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Email me
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Remounts the boundary whenever the route changes, so an error caught on one
 * page cannot follow the visitor to the next one. `ErrorBoundary` is a class
 * with sticky state; a `key` is the cheapest way to reset it, and it must live
 * inside the router to read the location.
 */
export function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return <ErrorBoundary key={pathname}>{children}</ErrorBoundary>;
}

export default ErrorBoundary;
