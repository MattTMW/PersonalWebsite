import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type LeaderRowProps = {
  /** Left-hand term. */
  label: string;
  /** Right-hand value. */
  value: ReactNode;
  /** Makes the value a link. External links get an arrow and a new tab. */
  href?: string;
  className?: string;
};

/**
 * `label ·········· value` — the table-of-contents convention that makes a flat
 * list read like a printed index.
 *
 * The dotted rule is its own flex item rather than a background or an
 * underline, so it absorbs exactly the space the two labels leave and stays
 * correct at any width or font size.
 */
export function LeaderRow({ label, value, href, className }: LeaderRowProps) {
  const isExternal = Boolean(href && !href.startsWith("/") && !href.startsWith("#"));

  return (
    <div className={cn("flex items-baseline gap-3 py-1.5", className)}>
      <span className="font-serif text-[1.0625rem] text-text">{label}</span>

      <span aria-hidden className="leader-rule" />

      {href ? (
        <a
          href={href}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group inline-flex shrink-0 items-center gap-1 font-serif text-[1.0625rem] text-muted transition-colors duration-200 hover:text-accent-ink"
        >
          {value}
          {isExternal && (
            <>
              <ArrowUpRight className="size-3.5 transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </>
          )}
        </a>
      ) : (
        <span className="shrink-0 font-serif text-[1.0625rem] text-muted">{value}</span>
      )}
    </div>
  );
}
