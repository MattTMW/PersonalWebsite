import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { LeaderRow } from "@/components/ui/LeaderRow";
import { Sidenote, SidenoteAnchor } from "@/components/ui/Sidenote";
import { site } from "@/lib/content";
import { colophon, colophonNote, uses, type UsesGroup } from "@/lib/uses";

export const metadata: Metadata = {
  title: "Uses",
  description: `The tools ${site.name} works with, and how this site is built.`,
  alternates: { canonical: "/uses" },
  openGraph: {
    title: `Uses — ${site.name}`,
    description: "Tools, machine, and how this site is built.",
    url: "/uses",
  },
};

function Group({ group, delay }: { group: UsesGroup; delay: number }) {
  return (
    <Reveal delay={delay}>
      <SidenoteAnchor className="mb-10">
        <h3 className="label mb-3">{group.group}</h3>

        {/* No row dividers: the leader dots already separate the rows, and
            running both gives every row two horizontal rules. */}
        <div className="measure">
          {group.items.map((item) => (
            <LeaderRow key={item.label} label={item.label} value={item.value} href={item.href} />
          ))}
        </div>

        {group.note && <Sidenote>{group.note}</Sidenote>}
      </SidenoteAnchor>
    </Reveal>
  );
}

export default function UsesPage() {
  return (
    <div className="pt-12 pb-8 sm:pt-20">
      <Reveal>
        <header className="measure">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            <span className="label">Setup</span>
          </div>

          <h1 className="text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl">
            Uses
          </h1>

          <p className="prose-serif mt-6 text-muted">
            The tools I actually reach for, and — at the bottom — how this site itself is put
            together.
          </p>
        </header>
      </Reveal>

      <section aria-labelledby="tools-heading" className="mt-16 sm:mt-20">
        <Reveal>
          <h2
            id="tools-heading"
            className="mb-8 text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]"
          >
            Tools
          </h2>
        </Reveal>

        {uses.map((group, index) => (
          <Group key={group.group} group={group} delay={index * 0.05} />
        ))}
      </section>

      <section aria-labelledby="colophon-heading" className="mt-20 sm:mt-24">
        <Reveal>
          <h2
            id="colophon-heading"
            className="mb-8 text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]"
          >
            Colophon
          </h2>
        </Reveal>

        {colophon.map((group, index) => (
          <Group key={group.group} group={group} delay={index * 0.05} />
        ))}

        <Reveal delay={0.1}>
          <p className="prose-serif measure mt-2 text-muted">{colophonNote}</p>
        </Reveal>
      </section>

      <Reveal>
        <div className="mt-24 border-t border-border pt-10">
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
