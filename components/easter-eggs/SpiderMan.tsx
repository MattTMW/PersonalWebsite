"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn pixel sprite: Spider-Man hanging upside down by a web.
 *
 * Upside down puts the mask at the bottom of the sprite, where it's largest and
 * most legible — at 12px wide the eyes are the only thing that makes him
 * recognisable, so they get the clearest pixels.
 *
 *   . transparent   r suit red   b suit blue   w eye white   k web line
 */
const SPRITE = [
  // The mask gets more than half the sprite. At ~26px tall a full body turns to
  // mud — the big white eyes are the only feature that actually says
  // "Spider-Man" at this size, so everything else is kept subordinate to them.
  // Feet start apart with the thread between them; closing that gap at both
  // ends would make it an enclosed hole that reads as a rendering defect.
  "....b.b....", // feet on the thread
  "....b.b....",
  "....bbb....", // legs
  "...bbbbb...", // hips
  "...rrrrr...", // torso
  "..rrrrrrr..", // shoulders
  ".rrrrrrrrr.", // mask begins
  "rrrrrrrrrrr",
  "rwwwrrrwwwr", // eyes — upside down, so they sit low in the sprite
  "rwwwrrrwwwr",
  ".rrwwrwwrr.", // eyes taper toward the brow
  ".rrrrrrrrr.",
  "..rrrrrrr..",
  "...rrrrr...", // crown
] as const;

const PALETTE: Record<string, string> = {
  r: "#D62828",
  b: "#1D3F94",
  w: "#F8FAFC",
};

const COLS = 11;
const ROWS = SPRITE.length;

function Sprite({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${COLS} ${ROWS}`}
      aria-hidden
      className={className}
      // Keeps pixel edges hard at any scale instead of smoothing them.
      style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
    >
      {SPRITE.flatMap((row, y) =>
        row.split("").map((char, x) =>
          PALETTE[char] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[char]} />
          ) : null,
        ),
      )}
    </svg>
  );
}

/**
 * Plays a short synthesised "thwip".
 *
 * Generated with the Web Audio API rather than shipping an mp3: no network
 * request, no bundle weight, and nothing to license. Only ever fires from a
 * click, so it can't trip browser autoplay policies or startle anyone.
 */
function useThwip() {
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback(() => {
    try {
      // Created lazily inside the gesture — constructing it earlier would leave
      // a suspended context sitting around on every page load.
      ctxRef.current ??= new AudioContext();
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Fast downward sweep reads as a web line paying out.
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.16);

      // Quiet on purpose — this is a garnish, not an alert.
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.06, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Audio is decoration. If the context can't be created, stay silent.
    }
  }, []);
}

type SpiderManProps = {
  className?: string;
  /** Length of the web thread above him, in px. */
  threadLength?: number;
};

/**
 * The easter egg itself: he hangs from a thread with a slow idle sway, and
 * clicking him fires a swing across the viewport plus a thwip.
 *
 * Everything is gated on `prefers-reduced-motion` — under it he simply hangs
 * still and a click does nothing but the sound, which is the honest reading of
 * "I don't want movement".
 */
export function SpiderMan({ className, threadLength = 56 }: SpiderManProps) {
  const prefersReducedMotion = useReducedMotion();
  const [swinging, setSwinging] = useState(false);
  const [discovered, setDiscovered] = useState(false);
  const thwip = useThwip();

  const handleClick = () => {
    thwip();
    setDiscovered(true);
    if (prefersReducedMotion || swinging) return;
    setSwinging(true);
  };

  return (
    <div className={cn("pointer-events-none absolute select-none", className)}>
      {/* Thread. Drawn as a plain div so its height is trivially configurable. */}
      <div
        aria-hidden
        className="mx-auto w-px bg-linear-to-b from-transparent to-border"
        style={{ height: threadLength }}
      />

      <motion.button
        type="button"
        onClick={handleClick}
        aria-label={
          discovered
            ? "Spider-Man easter egg — swing again"
            : "Spider-Man easter egg — click him"
        }
        title="thwip"
        className={cn(
          "pointer-events-auto -mt-px block cursor-pointer border-0 bg-transparent p-1",
          "origin-top transition-opacity",
          // Faint at rest so he reads as a detail, not a mascot. Full opacity
          // on hover/focus rewards the person who actually noticed him.
          "opacity-45 hover:opacity-100 focus-visible:opacity-100",
        )}
        style={{ transformOrigin: "top center" }}
        animate={
          swinging
            ? { x: [0, 190, -150, 0], rotate: [0, 22, -18, 0], y: [0, 34, 18, 0] }
            : prefersReducedMotion
              ? { rotate: 0 }
              : { rotate: [-5, 5, -5] }
        }
        transition={
          swinging
            ? { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
            : prefersReducedMotion
              ? { duration: 0 }
              : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
        onAnimationComplete={() => setSwinging(false)}
      >
        <Sprite className="h-auto w-6 sm:w-7" />
      </motion.button>
    </div>
  );
}
