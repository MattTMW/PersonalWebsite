"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * next-themes writes the theme class onto <html> before paint via an inline
 * script, which is what prevents the white flash on a dark-mode reload.
 * `disableTransitionOnChange` stops every transitioned property on the page
 * from firing at once when the user flips the toggle.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
