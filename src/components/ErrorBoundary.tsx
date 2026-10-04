import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
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

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Something went wrong.
            </h1>
            <p className="mt-3 text-muted-foreground">
              The page hit an unexpected error. Try reloading — and if it keeps
              happening, reach me directly.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link
                to="/"
                className="rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Back to home
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-medium text-primary underline underline-offset-2 hover:opacity-80"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
