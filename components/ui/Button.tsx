import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-200 " +
  "[transition-timing-function:var(--ease-soft)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Solid ink. One per screen — this is the single highest-priority action.
  primary:
    "bg-text text-bg hover:bg-text/88 shadow-[0_1px_2px_rgb(17_17_17/0.08)]",
  // Bordered. The accent only appears on hover, so the page stays quiet at rest.
  secondary:
    "border border-border bg-bg text-text hover:border-accent hover:bg-accent-soft",
  ghost: "text-muted hover:text-text hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

/**
 * Link styled as a button. External URLs get `target="_blank"` plus the
 * rel hardening, and an sr-only hint so screen reader users are warned about
 * the new tab (WCAG 3.2.5).
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps & ComponentProps<typeof Link>) {
  const isExternal = typeof href === "string" && /^(https?:|mailto:|\/.*\.pdf$)/.test(href);

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </Link>
  );
}
