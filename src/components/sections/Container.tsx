import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centred, max-width-constrained container used by every section.
 *
 * Standardises horizontal padding and prevents the long "container px-6"
 * boilerplate scattered across the old components.
 */
export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  narrow?: boolean;
  children: ReactNode;
}

export function Container({
  as,
  narrow,
  className,
  children,
  ...rest
}: ContainerProps) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        narrow ? "max-w-3xl" : "max-w-6xl",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}