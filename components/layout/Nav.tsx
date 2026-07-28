"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navItems, site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A floating pill nav rather than a full-width bar.
 *
 * Two behaviours do the work here:
 *  1. Scroll-spy highlights the section you're actually reading.
 *  2. The frosted background only materialises once you've scrolled past the
 *     hero — at the top of the page the nav floats on bare paper, which keeps
 *     the first impression as quiet as possible.
 */
export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // The band sits across the middle of the viewport, so a section becomes
    // "active" when it occupies the reader's actual focal area — not when its
    // top edge merely clips the bottom of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 [transition-timing-function:var(--ease-soft)]",
        scrolled ? "py-3" : "py-5",
      )}
    >
      {/* Scrim. Without it, text scrolling past the pill stays visible in the
          gap above it, which reads as a rendering glitch rather than a design. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+1.25rem)]",
          "bg-linear-to-b from-bg via-bg/85 to-transparent",
          "transition-opacity duration-300 [transition-timing-function:var(--ease-soft)]",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="mx-auto w-full max-w-3xl px-6">
        <div
          className={cn(
            "flex items-center justify-between gap-2 rounded-full transition-all duration-300",
            "[transition-timing-function:var(--ease-soft)]",
            scrolled
              ? "border border-border bg-bg/72 px-2 py-2 shadow-[0_1px_2px_rgb(17_17_17/0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-bg/72"
              : "border border-transparent px-2 py-2",
          )}
        >
          {/* Monogram — a compact home affordance that doesn't repeat the hero. */}
          {/* Hidden on mobile: it's decorative there, and the ~50px it costs is
              better spent on the section links. */}
          <a
            href="#top"
            aria-label={`${site.name} — back to top`}
            className="ml-1 hidden shrink-0 font-mono text-sm font-medium tracking-tight text-text transition-colors duration-200 hover:text-accent-ink sm:block"
          >
            {site.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
            <span className="text-accent-ink">.</span>
          </a>

          <nav aria-label="Section navigation" className="min-w-0 flex-1">
            {/* `justify-start` while the list overflows: with `justify-end`, the
                leading items overflow past the *start* edge, where no amount of
                scrolling can reach them. Above sm: everything fits, so ending
                alignment is safe and keeps the links right-aligned.
                The mask fades the right edge to hint that the row scrolls. */}
            <ul
              className={cn(
                "scrollbar-none flex items-center gap-0.5 overflow-x-auto",
                "justify-start sm:justify-end",
                "[mask-image:linear-gradient(to_right,#000_85%,transparent)] sm:[mask-image:none]",
              )}
            >
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="shrink-0">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-3 py-1.5 text-[0.8125rem] transition-colors duration-200",
                        "[transition-timing-function:var(--ease-soft)]",
                        isActive ? "text-text" : "text-muted hover:text-text",
                      )}
                    >
                      {/* The pill slides between items via a shared layoutId — the
                          one piece of motion on the page that isn't a fade. */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          aria-hidden
                          className="absolute inset-0 rounded-full bg-accent-soft"
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 380, damping: 32 }
                          }
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
