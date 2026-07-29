import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Sidenote, SidenoteAnchor } from "@/components/ui/Sidenote";
import { about, site, subPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role} based in ${site.location}.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: `About ${site.name}, ${site.role.toLowerCase()} based in ${site.location}.`,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-12 pb-8 sm:pt-20">
      <Reveal>
        <header className="measure">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            <span className="label">About</span>
          </div>

          <h1 className="text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.04em] sm:text-5xl">
            A little context
          </h1>
        </header>
      </Reveal>

      <div className="mt-12 space-y-6 sm:mt-14">
        {about.paragraphs.map((paragraph, index) => {
          const text = typeof paragraph === "string" ? paragraph : paragraph.text;
          const note = typeof paragraph === "string" ? undefined : paragraph.note;

          return (
            <Reveal key={index} delay={index * 0.06}>
              <SidenoteAnchor>
                <p className="prose-serif measure text-muted">{text}</p>
                {note && <Sidenote>{note}</Sidenote>}
              </SidenoteAnchor>
            </Reveal>
          );
        })}
      </div>

      {/* The personal pages live behind this page rather than in the main nav,
          so this is the only place they're discoverable. */}
      <section aria-labelledby="elsewhere-heading" className="mt-20 sm:mt-24">
        <Reveal>
          <h2 id="elsewhere-heading" className="label mb-5">
            Elsewhere on this site
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {subPages.map((page, index) => (
            <Reveal key={page.href} delay={index * 0.06} className="h-full">
              <Link
                href={page.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-[border-color,box-shadow,transform] duration-300 [transition-timing-function:var(--ease-soft)] hover:-translate-y-0.5 hover:border-accent hover:shadow-card"
              >
                <span className="flex items-center gap-1.5 text-[1.0625rem] font-semibold tracking-[-0.01em]">
                  {page.label}
                  <ArrowUpRight className="size-4 text-muted transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="mt-2 font-serif text-[0.9375rem] leading-[1.6] text-muted">
                  {page.blurb}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
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
