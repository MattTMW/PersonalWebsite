import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  /** Tiny monospace eyebrow, e.g. "02 / Projects". */
  label: string;
  /** The visible section heading. */
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Every section shares this header treatment, which is what makes the page feel
 * like one document rather than six stacked templates.
 *
 * The heading is intentionally modest (text-2xl, not text-5xl). In a minimalist
 * layout, *space* establishes hierarchy — oversized section headings would
 * compete with the hero and flatten the page.
 */
export function Section({ id, label, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-28", className)}
    >
      <Reveal>
        <div className="mb-3 flex items-center gap-3">
          {/* One of the four places accent color appears at rest. */}
          <span aria-hidden className="h-px w-6 bg-accent" />
          <span className="label">{label}</span>
        </div>
        <h2
          id={`${id}-heading`}
          className="mb-10 text-2xl font-semibold tracking-[-0.02em] sm:mb-12 sm:text-[1.75rem]"
        >
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
