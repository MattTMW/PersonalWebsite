import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  /** Ordinal shown in the rail, e.g. "02". */
  index: string;
  /** Rail word, e.g. "Projects". */
  label: string;
  /** The visible section heading. */
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * The page's compositional spine: a sticky label rail on the left, content on
 * the right.
 *
 * The rail is what breaks the "one narrow column, six times" monotony — it
 * gives the eye a second horizontal anchor, and because it's sticky it tracks
 * you through a long section so you always know where you are.
 *
 * Below lg it collapses back to a horizontal eyebrow above the heading. On a
 * phone there's no room for a second column, and a cramped one reads worse
 * than none at all.
 *
 * The heading stays modest (text-2xl, not text-5xl) — in a minimalist layout
 * space establishes hierarchy, and oversized section headings would compete
 * with the hero and flatten the page.
 */
export function Section({ id, index, label, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-28 lg:grid lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-14",
        className,
      )}
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <div className="mb-3 flex items-center gap-3 lg:mb-0 lg:flex-col lg:items-start lg:gap-2.5">
            {/* One of the few places accent colour appears at rest. */}
            <span aria-hidden className="h-px w-6 bg-accent lg:w-8" />
            <p className="label flex items-center gap-2 lg:flex-col lg:items-start lg:gap-1.5">
              <span>{index}</span>
              <span aria-hidden className="lg:hidden">
                /
              </span>
              <span className="lg:text-text">{label}</span>
            </p>
          </div>
        </Reveal>
      </div>

      <div className="min-w-0">
        <Reveal>
          <h2
            id={`${id}-heading`}
            className="mb-10 text-2xl font-semibold tracking-[-0.02em] sm:mb-12 sm:text-[1.75rem]"
          >
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
