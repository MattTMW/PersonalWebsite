"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger siblings by passing an increasing delay, e.g. index * 0.06. */
  delay?: number;
  /** Distance in px the element rises from. Keep it small — this is a hint, not a slide. */
  y?: number;
  className?: string;
};

/**
 * The site's single animation primitive: a short rise + fade the first time an
 * element scrolls into view.
 *
 * Deliberately restrained — 16px and 500ms reads as "considered", while larger
 * distances or longer durations read as "template". `once: true` means the page
 * never re-animates on scroll-up, which is the main thing that makes scroll
 * animations feel cheap.
 *
 * When the OS requests reduced motion we render content statically rather than
 * animating a shorter distance — the accessible answer to "animate?" is "no".
 */
export function Reveal({ children, delay = 0, y = 16, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      // Hook for the <noscript> fallback in app/layout.tsx: the `initial` state
      // is server-rendered as an inline opacity:0, so without JS this content
      // would never become visible.
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
