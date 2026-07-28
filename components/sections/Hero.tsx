"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SpiderMan } from "@/components/easter-eggs/SpiderMan";
import { ArrowDown, ArrowRight, Mail } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/Button";
import { about, site } from "@/lib/content";

/**
 * The hero is the only part of the page without the section rail, and the only
 * place with large type and a background wash. That's deliberate: it reads as a
 * different kind of thing from everything below it, which is where the page's
 * compositional variety comes from.
 *
 * The parallax is 40px over a full viewport of scrolling — enough to feel like
 * depth, small enough that most people never consciously notice it.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const washY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const washOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const status = about.facts.find((fact) => fact.label === "Status")?.value;

  return (
    <section ref={ref} id="top" className="relative pt-12 pb-24 sm:pt-20 sm:pb-32">
      {/* Soft accent wash. Sits behind the type at very low opacity — it should
          register as "the paper is slightly warm here", not as a gradient. */}
      <motion.div
        aria-hidden
        style={prefersReducedMotion ? undefined : { y: washY, opacity: washOpacity }}
        className="pointer-events-none absolute -top-24 -right-32 -z-10 size-[34rem] rounded-full bg-[radial-gradient(circle,var(--accent-soft)_0%,transparent_68%)] opacity-70 blur-2xl dark:opacity-40"
      />

      {/* He hangs into the empty right-hand space — exactly the area the old
          centred layout was wasting. Hidden on the narrowest screens, where
          there's no spare room and he'd crowd the name. */}
      <SpiderMan className="top-0 right-2 hidden sm:block lg:right-16" threadLength={64} />

      <motion.div
        data-reveal
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {status && (
          <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[0.8125rem] text-muted">
            <span aria-hidden className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent-ink" />
            </span>
            {status}
          </p>
        )}

        <h1 className="text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
          {site.name}
        </h1>

        <p className="mt-5 text-xl text-muted sm:text-2xl">
          {site.role}
          <span aria-hidden className="mx-2.5 text-border">
            /
          </span>
          <span>{site.location}</span>
        </p>

        <p className="measure mt-8 text-pretty text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={site.resumeUrl} variant="primary" className="group">
            Resume
            <ArrowRight className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-0.5" />
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            <Mail className="size-4" />
            Get in touch
          </ButtonLink>
        </div>
      </motion.div>

      {/* Quiet wayfinding cue — it fades out the moment you start scrolling. */}
      <motion.a
        href="#about"
        style={prefersReducedMotion ? undefined : { opacity: washOpacity }}
        className="group mt-20 hidden items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-text sm:inline-flex"
      >
        <ArrowDown className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-y-0.5" />
        More about me
      </motion.a>
    </section>
  );
}
