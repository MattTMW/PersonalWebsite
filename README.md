# Personal portfolio

A minimalist single-page portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
```

---

## Customising the site

**Everything you need to edit lives in [`lib/content.ts`](lib/content.ts).** You should not need to open a component file to change what the site says.

| To change… | Edit |
|---|---|
| Name, role, tagline, email, domain | `site` |
| GitHub / LinkedIn links | `social` |
| Bio paragraphs and the fact table | `about` |
| Projects | `projects` — append an object |
| Experience timeline | `experience` — newest first |
| Skills | `skills` — append to a group's `items` |
| Coursework | `coursework` — set to `[]` to hide the block |
| Nav links and their order | `navItems` |
| Extra pages in the nav | `pages` |

Memories live in their own file, [`lib/memories.ts`](lib/memories.ts).

Entries marked `TODO` are placeholders — the experience section in particular is scaffolding, not real history.

### Adding a project

```ts
{
  title: "Project name",
  summary: "One line: what it does, for whom.",
  description: "Two or three sentences of detail.",
  tech: ["TypeScript", "Postgres"],
  github: "https://github.com/...",
  demo: "https://...",        // optional — button is omitted if absent
  meta: "Hackathon 2026",     // optional context line
  featured: true,             // full-width card; others go in a 2-up grid
}
```

### Before you deploy

1. Set `site.url` to your real domain — it drives canonical URLs, the sitemap, OG tags and JSON-LD.
2. Replace `social.linkedin` with your real handle.
3. Drop your CV at `public/resume.pdf` (or point `site.resumeUrl` at a hosted file).
4. Fill in the real `experience` entries.

### Adding a memory

The `/memories` page is a scrapbook: photos with the story behind them.

1. Drop the image in `public/memories/`
2. Add an entry to `memories` in [`lib/memories.ts`](lib/memories.ts):

```ts
{
  id: "tahoe-2026",
  date: "March 2026",
  title: "Short, specific title",
  story: "A few sentences. This page isn't writing for a recruiter.",
  photo: "/memories/tahoe.jpg",   // optional
  alt: "Describe what's in the photo",  // required when photo is set
  tag: "Travel",                  // optional chip
}
```

`photo` is optional by design. Entries with one get the alternating two-column
treatment; entries without one render as a journal note, so you can write
something down before you've found the right picture for it.

---

## Contact form

The form works with no configuration: the API route replies `not_configured` and the client falls back to opening the visitor's mail client with the message prefilled.

To have messages delivered instead, copy `.env.example` to `.env.local` and fill in [Resend](https://resend.com) credentials:

```bash
cp .env.example .env.local
```

The route calls Resend's REST API with `fetch`, so there's no SDK dependency. It validates server-side, rejects oversized input, drops honeypot submissions silently, and rate-limits to 5 messages per hour per IP.

> The rate limiter is in-process — it resets on cold starts and isn't shared across regions. It raises the cost of casual abuse but is not real infrastructure. If the endpoint ever gets targeted, put a durable limiter (Vercel KV, Upstash) in front of it.

---

## Design notes

- **Colour is rare on purpose.** The blue appears in four roles only — focus rings, the active nav pill, links/hover states, and timeline nodes. Everything else is paper, ink and gray. Saturating a minimal layout is what makes it read as amateur.
- **Space carries the hierarchy.** Section gaps are ~8x the spacing inside a card. That ratio is set in one place, [`app/page.tsx`](app/page.tsx).
- **The layout is an editorial rail, not one centred column.** Above `lg`, each section puts its label in a sticky left column with content to the right. One narrow column repeated six times reads as a template no matter how well it's set; the rail gives the eye a second anchor and tracks your position as you scroll. Below `lg` it folds back to a horizontal eyebrow.
- **Prose and cards get different widths.** Body text is capped at the `measure` utility (~38rem, roughly 65 characters). Cards, tables and the gallery break out to the full content column — they have no reason to inherit a constraint that exists for reading.
- **One animation primitive.** [`Reveal`](components/motion/Reveal.tsx) — a 16px rise and fade, `once: true`. Reused everywhere so the page feels like one document.
- **Dark mode is designed, not inverted.** The accent is brightened and desaturated for dark so it stays legible.

## The Spider-Man easter egg

[`components/easter-eggs/SpiderMan.tsx`](components/easter-eggs/SpiderMan.tsx) hangs a pixel-art sprite from a web in the hero's right-hand space. Click him for a swing and a thwip.

- The sprite is an inline SVG built from a character-map string — no image asset, crisp at any scale, and editable by rewriting the rows.
- The mask takes more than half the sprite. At ~26px a full body turns to mud; the big white eyes are the only feature that reads as Spider-Man at that size.
- He sits at 45% opacity, full opacity on hover/focus. He should be something you notice, not a mascot.
- The thwip is synthesised with the Web Audio API — no mp3 to ship or license — and only ever fires from a click.
- Hidden below `sm`, and both the sway and the swing are disabled under `prefers-reduced-motion`.

To remove him entirely, delete the `<SpiderMan />` line from [`components/sections/Hero.tsx`](components/sections/Hero.tsx).

## Accessibility

Verified in-browser rather than assumed:

- All text passes WCAG AA in both themes. Tightest pair is tag chips on card fill at **4.56:1** (AA needs 4.5) — if you restyle `Tag`, re-check that one.
- `prefers-reduced-motion` disables reveals, parallax, smooth scroll and the nav pill spring.
- A `<noscript>` rule forces revealed content visible — without it, Framer Motion's server-rendered `opacity: 0` would leave the page blank below the hero when JS fails.
- Skip link, visible focus rings, real landmarks, `aria-current` on the active nav item, and "opens in a new tab" hints on external links.
- Nav touch targets are 32px tall (WCAG 2.5.8 requires 24).

## Deploying

Push to GitHub and import the repo on [Vercel](https://vercel.com) — no configuration needed. Add the Resend environment variables in the project settings if you want form delivery.

> **Note:** this folder currently has no `.git` of its own, so it belongs to the repo rooted at your home directory — which has no root `.gitignore` and contains `.ssh/`, `.claude.json` and shell history. Give the portfolio its own repo before pushing anything.
