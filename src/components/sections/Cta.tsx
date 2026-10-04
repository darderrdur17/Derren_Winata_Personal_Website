import { cn } from "@/lib/utils";

/**
 * Primary CTA button. Two variants (`primary`, `ghost`) and three sizes.
 *
 * Always renders an anchor when `href` is supplied, otherwise a button. Adds
 * an arrow-on-hover microinteraction so the action feels directional.
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  external?: undefined;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

export type CtaProps = (AnchorProps | ButtonProps) & {
  variant?: "primary" | "ghost";
  size?: "md" | "lg";
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants = {
  primary:
    "bg-gradient-primary text-primary-foreground hover:opacity-95 hover:shadow-[var(--glow-primary)]",
  ghost:
    "border border-border/70 bg-background/50 text-foreground hover:border-primary/60 hover:text-primary",
};

const sizes = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-sm sm:text-base",
};

export function Cta({
  variant = "primary",
  size = "md",
  className,
  showArrow = false,
  children,
  ...rest
}: CtaProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorRest } = rest as AnchorProps;
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
        {...anchorRest}
      >
        {children}
        {showArrow && (
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        )}
      </a>
    );
  }

  const buttonRest = rest as ButtonProps;
  return (
    <button className={cls} {...buttonRest}>
      {children}
      {showArrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </button>
  );
}