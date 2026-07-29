import type { Metadata } from "next";
import Link from "next/link";
import { MemoryEntry } from "@/components/memories/MemoryEntry";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { memories } from "@/lib/memories";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Memories",
  description: `Photos and the stories behind them — a scrapbook by ${site.name}.`,
  alternates: { canonical: "/memories" },
  openGraph: {
    title: `Memories — ${site.name}`,
    description: "Photos and the stories behind them.",
    url: "/memories",
  },
};

export default function MemoriesPage() {
  return (
    <div className="pt-12 pb-8 sm:pt-20">
      <Reveal>
        <header className="measure">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            <span className="label">Scrapbook</span>
          </div>

          <h1 className="text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl">
            Memories
          </h1>

          <p className="prose-serif mt-6 text-muted">
            The parts that don&apos;t fit on a resume. Photos, half-finished projects, and the
            nights that taught me the most — kept here mostly so I don&apos;t forget them.
          </p>
        </header>
      </Reveal>

      {memories.length > 0 ? (
        <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
          {memories.map((memory, index) => (
            <MemoryEntry key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-muted">Nothing here yet — check back soon.</p>
      )}

      <Reveal>
        <div className="mt-28 border-t border-border pt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-200 hover:text-accent-ink"
          >
            <ArrowRight className="size-4 rotate-180 transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:-translate-x-0.5" />
            Back to the portfolio
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
