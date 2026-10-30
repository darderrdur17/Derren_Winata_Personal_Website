import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ErrorBoundary, { RoutedErrorBoundary } from "./ErrorBoundary";

/**
 * React prints every caught error to `console.error`, which would bury the
 * test output. The behaviour under test is the recovery path, not the logging.
 */
let consoleError: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  shouldThrow = true;
});

afterEach(() => {
  consoleError.mockRestore();
});

/** Mutable so the retry test can make the same component succeed on re-render. */
let shouldThrow = true;

function Flaky() {
  if (shouldThrow) throw new Error("deliberate render failure");
  return <p>Recovered content</p>;
}

function AlwaysBoom(): JSX.Element {
  throw new Error("deliberate render failure");
}

function GoTo({ to, label }: { to: string; label: string }) {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate(to)}>
      {label}
    </button>
  );
}

describe("ErrorBoundary", () => {
  it("catches a render error and shows a recoverable screen", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <AlwaysBoom />
        </ErrorBoundary>
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Something went wrong.",
    );
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:"),
    );
  });

  it("recovers in place when 'Try again' is pressed and the fault clears", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Flaky />
        </ErrorBoundary>
      </MemoryRouter>,
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();

    shouldThrow = false;
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    // The retry must actually remount the subtree, not just hide the message.
    expect(screen.getByText("Recovered content")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong.")).not.toBeInTheDocument();
  });

  it("does not strand the visitor: 'Back to home' navigates and clears the error", () => {
    render(
      <MemoryRouter initialEntries={["/boom"]}>
        <RoutedErrorBoundary>
          <Routes>
            <Route path="/boom" element={<AlwaysBoom />} />
            <Route path="/" element={<p>Home page</p>} />
          </Routes>
        </RoutedErrorBoundary>
      </MemoryRouter>,
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "Back to home" }));

    // Previously the link changed the URL but the error screen stayed put.
    expect(screen.getByText("Home page")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong.")).not.toBeInTheDocument();
  });

  it("remounts on any route change, so one page's error cannot follow the visitor", () => {
    render(
      <MemoryRouter initialEntries={["/boom"]}>
        <GoTo to="/ok" label="go to ok" />
        <RoutedErrorBoundary>
          <Routes>
            <Route path="/boom" element={<AlwaysBoom />} />
            <Route path="/ok" element={<p>OK page</p>} />
          </Routes>
        </RoutedErrorBoundary>
      </MemoryRouter>,
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "go to ok" }));

    expect(screen.getByText("OK page")).toBeInTheDocument();
    expect(screen.queryByText("Something went wrong.")).not.toBeInTheDocument();
  });
});
