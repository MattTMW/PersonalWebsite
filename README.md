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
- **One animation primitive.** [`Reveal`](components/motion/Reveal.tsx) — a 16px rise and fade, `once: true`. Reused everywhere so the page feels like one document.
- **Dark mode is designed, not inverted.** The accent is brightened and desaturated for dark so it stays legible.

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
