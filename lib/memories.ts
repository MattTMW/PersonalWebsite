/**
 * ============================================================================
 * MEMORIES — the scrapbook page's content
 * ============================================================================
 * Newest first. To add a memory:
 *
 *   1. Drop the image in `public/memories/` (e.g. `public/memories/tahoe.jpg`)
 *   2. Add an object below with `photo: "/memories/tahoe.jpg"`
 *
 * `photo` is optional. Entries without one render as a text-only note, so you
 * can write something down before you've found the right picture for it.
 *
 * Keep `story` conversational — this page is the one place on the site that
 * isn't writing for a recruiter.
 * ============================================================================
 */

export type Memory = {
  /** Stable id, used as the React key and the anchor target. */
  id: string;
  /** Free-form display date — "March 2026", "Summer '25", whatever fits. */
  date: string;
  title: string;
  /** The story. A few sentences is plenty; this isn't a blog post. */
  story: string;
  /** Path under /public, e.g. "/memories/first-hackathon.jpg" */
  photo?: string;
  /** Describe what's in the photo for screen readers. Required when photo is set. */
  alt?: string;
  /** Optional short category, shown as a chip. */
  tag?: string;
};

// TODO: these three are placeholders showing the shape — replace with your own.
export const memories: Memory[] = [
  {
    id: "irvinehacks-2026",
    date: "January 2026",
    title: "36 hours, one working demo",
    story:
      "We had a pose-estimation pipeline that worked perfectly on my laptop and nowhere else. At 4am someone suggested we stop debugging and just rebuild the video path from scratch — it worked on the first try. I've never been so tired or so happy to see a skeleton overlay line up with a squat.",
    tag: "Hackathon",
    // Uncomment once you've added the file to public/memories/:
    // photo: "/memories/irvinehacks.jpg",
    // alt: "Our team at the IrvineHacks demo table",
  },
  {
    id: "first-crawler",
    date: "Fall 2025",
    title: "The night I got politely rate-limited by my own university",
    story:
      "My crawler was hitting UCI's servers far too fast and I found out the hard way. Rewriting it to respect crawl delays taught me more about being a good citizen on someone else's infrastructure than any lecture did.",
    tag: "Learning the hard way",
  },
  {
    id: "why-i-build",
    date: "Ongoing",
    title: "Why I keep doing this",
    story:
      "The moment something I wrote does a thing that's actually useful to a person who isn't me — that's the whole reason. Everything else is in service of getting back to that feeling.",
  },
];
