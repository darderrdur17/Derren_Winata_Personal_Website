import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Three-way colour-scheme control: Light / Dark / System.
 *
 * A two-state toggle is the wrong shape here. `next-themes` stores the
 * *preference*, not the resolved colour, and "system" is a preference in its
 * own right — a binary button would overwrite it with a concrete choice the
 * first time it was pressed, and the visitor could never get back to following
 * their OS. So every state is addressable, and "System" stays selected until
 * they deliberately pick something else.
 *
 * Note this reads `theme`, not `resolvedTheme`: the latter collapses "system"
 * into whatever the OS currently says, which would make the System option
 * unrepresentable.
 */

const OPTIONS = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

type ThemeValue = (typeof OPTIONS)[number]["value"];

export interface ThemeToggleProps {
  /**
   * `icon` is the compact navbar control. `labelled` fills its container with
   * a text label per option, for the mobile menu where there is room.
   */
  variant?: "icon" | "labelled";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  // The stored preference is only readable on the client, so nothing is
  // highlighted until after mount. Rendering a guess here would flash the
  // wrong option selected on first paint.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const active: ThemeValue | undefined = mounted
    ? ((theme as ThemeValue | undefined) ?? "system")
    : undefined;

  // A stored value we don't recognise (hand-edited, or written by an older
  // build) leaves <html> carrying a class no stylesheet defines. next-themes
  // only ever removes classes it knows about, so the stray one has to be
  // cleared by hand before falling back to the documented default.
  useEffect(() => {
    if (!mounted) return;
    if (theme && !OPTIONS.some((option) => option.value === theme)) {
      document.documentElement.classList.remove(theme);
      setTheme("system");
    }
  }, [mounted, theme, setTheme]);

  return (
    <div
      role="group"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-border/60 bg-background/60 p-0.5",
        className
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            aria-label={variant === "icon" ? label : undefined}
            title={variant === "icon" ? label : undefined}
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 rounded-[4px] font-medium transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              variant === "icon" ? "h-7 w-7" : "h-9 flex-1 px-3 text-xs",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon size={variant === "icon" ? 15 : 16} aria-hidden="true" />
            {variant === "labelled" && <span>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}
