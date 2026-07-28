import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { Memory } from "@/lib/memories";
import { cn } from "@/lib/utils";

function MemoryMeta({ memory }: { memory: Memory }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
      <time className="label">{memory.date}</time>
      {memory.tag && (
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.6875rem] tracking-tight text-accent-ink">
          {memory.tag}
        </span>
      )}
    </div>
  );
}

/**
 * One scrapbook entry.
 *
 * Entries *with* a photo get the full two-column treatment, alternating sides
 * down the page so the eye zig-zags instead of marching. The photo sits in a
 * frame with a ~1° tilt that straightens on hover — the one intentionally
 * imperfect gesture on the site, enough to feel pinned to a board without
 * tipping into skeuomorphic scrapbook clip-art.
 *
 * Entries *without* one get a journal-note treatment instead. Slotting them
 * into the same grid left half the row empty and pushed alternating entries up
 * against nothing, which read as a layout bug rather than a choice.
 */
export function MemoryEntry({ memory, index }: { memory: Memory; index: number }) {
  if (!memory.photo) {
    return (
      <Reveal delay={0.04}>
        <article
          id={memory.id}
          className="measure scroll-mt-28 border-l-2 border-accent pl-6 sm:pl-8"
        >
          <MemoryMeta memory={memory} />
          <h2 className="text-xl font-semibold tracking-[-0.02em]">{memory.title}</h2>
          <p className="mt-3 text-[1.0625rem] leading-[1.75] text-muted">{memory.story}</p>
        </article>
      </Reveal>
    );
  }

  const flipped = index % 2 === 1;

  return (
    <Reveal delay={0.04}>
      <article
        id={memory.id}
        className="grid scroll-mt-28 items-center gap-8 sm:gap-10 md:grid-cols-2"
      >
        <div className={cn("group relative", flipped && "md:order-2")}>
          <div
            className={cn(
              "overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-card",
              "transition-transform duration-500 [transition-timing-function:var(--ease-soft)]",
              flipped ? "-rotate-1" : "rotate-1",
              "group-hover:rotate-0",
            )}
          >
            <Image
              src={memory.photo}
              alt={memory.alt ?? ""}
              width={800}
              height={600}
              className="h-auto w-full rounded-lg object-cover"
              // Only the first entry is likely to be above the fold.
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 480px"
            />
          </div>
        </div>

        <div className={cn(flipped && "md:order-1")}>
          <MemoryMeta memory={memory} />
          <h2 className="text-xl font-semibold tracking-[-0.02em]">{memory.title}</h2>
          <p className="mt-3 text-[1.0625rem] leading-[1.75] text-muted">{memory.story}</p>
        </div>
      </article>
    </Reveal>
  );
}
