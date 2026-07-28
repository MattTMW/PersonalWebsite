import { cn } from "@/lib/utils";

/**
 * Technology chip. Monospace at a small size does two things at once: it signals
 * "this is a technical token, not prose", and it gives the layout a rhythm that
 * sans-serif tags don't. The soft-blue fill is one of the few places accent
 * color appears at rest.
 */
export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-2 px-2 py-1",
        "font-mono text-[0.6875rem] leading-none tracking-tight text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
