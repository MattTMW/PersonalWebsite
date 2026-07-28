"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "@/components/ui/icons";

/**
 * Both icons are always rendered; CSS picks one off the `.dark` class that
 * next-themes puts on <html> before first paint.
 *
 * This sidesteps the usual `mounted` state guard entirely — no hydration
 * mismatch, no cascading render, and the right icon is visible immediately
 * rather than after JS loads. The label stays static for the same reason;
 * `resolvedTheme` is only read inside the click handler, where it's reliable.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle color theme"
      className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors duration-200 [transition-timing-function:var(--ease-soft)] hover:bg-surface-2 hover:text-text"
    >
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </button>
  );
}
