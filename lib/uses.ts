/**
 * ============================================================================
 * USES + COLOPHON
 * ============================================================================
 * `uses` is the gear/tools list. Everything in it is a placeholder — swap in
 * what you actually reach for. An honest short list beats a padded long one.
 *
 * `colophon` documents how this site is built and is accurate as written; keep
 * it in sync if you change the stack, since being wrong here is worse than not
 * having the section at all.
 * ============================================================================
 */

export type UsesGroup = {
  group: string;
  /** Optional margin note shown beside the group on wide screens. */
  note?: string;
  items: { label: string; value: string; href?: string }[];
};

// TODO: replace with your real setup.
export const uses: UsesGroup[] = [
  {
    group: "Editor & terminal",
    note: "I keep the setup boring on purpose — anything I'd have to rebuild on a new machine at 2am isn't worth it.",
    items: [
      { label: "Editor", value: "VS Code" },
      { label: "Theme", value: "Default Dark Modern" },
      { label: "Terminal", value: "iTerm2" },
      { label: "Shell", value: "zsh" },
      { label: "Font", value: "Geist Mono", href: "https://vercel.com/font" },
    ],
  },
  {
    group: "Machine",
    items: [
      { label: "Laptop", value: "MacBook Air M2" },
      { label: "Display", value: "—" },
      { label: "Keyboard", value: "—" },
      { label: "Headphones", value: "—" },
    ],
  },
  {
    group: "Day to day",
    items: [
      { label: "Version control", value: "Git + GitHub", href: "https://github.com" },
      { label: "Containers", value: "Docker", href: "https://www.docker.com" },
      { label: "API client", value: "Postman" },
      { label: "Notes", value: "Obsidian", href: "https://obsidian.md" },
      { label: "Design", value: "Figma", href: "https://figma.com" },
    ],
  },
];

export type ColophonGroup = {
  group: string;
  note?: string;
  items: { label: string; value: string; href?: string }[];
};

export const colophon: ColophonGroup[] = [
  {
    group: "Built with",
    note: "Typeset in Geist for anything structural and Source Serif 4 for anything you actually read.",
    items: [
      { label: "Framework", value: "Next.js", href: "https://nextjs.org" },
      { label: "Language", value: "TypeScript", href: "https://www.typescriptlang.org" },
      { label: "Styling", value: "Tailwind CSS", href: "https://tailwindcss.com" },
      { label: "Animation", value: "Framer Motion", href: "https://motion.dev" },
      { label: "Sans", value: "Geist", href: "https://vercel.com/font" },
      {
        label: "Serif",
        value: "Source Serif 4",
        href: "https://fonts.google.com/specimen/Source+Serif+4",
      },
    ],
  },
  {
    group: "Infrastructure",
    items: [
      { label: "Hosting", value: "Vercel", href: "https://vercel.com" },
      { label: "Source", value: "GitHub", href: "https://github.com/MattTMW/PersonalWebsite" },
      { label: "Contact form", value: "Resend", href: "https://resend.com" },
      { label: "Social images", value: "Generated at build time" },
    ],
  },
];

/** Closing note for the page. */
export const colophonNote =
  "Every word on this site lives in a handful of TypeScript files, so updating it never means touching a component. The whole thing is open source if you want to see how it fits together.";
