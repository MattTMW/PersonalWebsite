import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A margin note that sits beside the paragraph it belongs to.
 *
 * Prose is capped at `measure` (38rem) inside a content column that runs closer
 * to 800px, so there is already a ~200px gutter sitting empty to the right —
 * this puts it to work rather than adding new structure.
 *
 * Below `xl` it can't escape (there's no room), so it stacks under the
 * paragraph as an indented note instead of being hidden. A sidenote that
 * disappears on small screens is a sidenote whose content didn't matter.
 *
 * Usage — the wrapper must be `relative` for the absolute positioning to anchor:
 *
 *   <SidenoteAnchor>
 *     <p className="prose-serif">…</p>
 *     <Sidenote>Worth knowing.</Sidenote>
 *   </SidenoteAnchor>
 */
export function Sidenote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        // Stacked default for narrow screens.
        "mt-3 border-l border-border pl-4 font-serif text-[0.9375rem] leading-[1.6] text-muted",
        // Escapes into the gutter at the same breakpoint the rail appears, so
        // the editorial layout arrives all at once rather than in two stages.
        // Geometry at lg: content column 808px, prose 608px, so the note starts
        // at 608+24=632 and is 168 wide — landing exactly on the column edge.
        "lg:absolute lg:top-0 lg:left-[calc(38rem+1.5rem)] lg:mt-0 lg:w-[10.5rem]",
        "lg:border-l-0 lg:pl-0",
        className,
      )}
    >
      {children}
    </aside>
  );
}

/** Positioning context for any `Sidenote` inside it. */
export function SidenoteAnchor({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("relative", className)}>{children}</div>;
}
