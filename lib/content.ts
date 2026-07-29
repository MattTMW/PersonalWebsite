/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH
 * ============================================================================
 * Every piece of copy on the site lives here. To update the portfolio you
 * should never need to open a component file.
 *
 *   Add a project    -> append an object to `projects`
 *   Add a job/role   -> append an object to `experience`
 *   Add a skill      -> append a string to the right group in `skills`
 *
 * Entries marked TODO are placeholders — swap them for your real details.
 * ============================================================================
 */

export const site = {
  name: "Matthew Truong",
  role: "Software Developer",
  /** Used for <title>, OG tags and JSON-LD. Update before you deploy. */
  url: "https://matthewtruong.dev", // TODO: your real domain
  location: "Irvine, California",
  email: "mtruong0008@gmail.com",
  /** Put your PDF at /public/resume.pdf, or point this at a hosted link. */
  resumeUrl: "/resume.pdf",
  /** One sentence. This is the most important line on the site. */
  tagline:
    "I build software that turns messy real-world problems into tools people actually reach for — currently focused on applied AI and developer infrastructure.",
  /** Shown in the footer as a small human detail. */
  nowBuilding: "an AI movement-analysis coach",
} as const;

export const social = {
  github: "https://github.com/MattTMW",
  linkedin: "https://linkedin.com/in/matthewtruong", // TODO: your real handle
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation — order here drives both the nav pills and the scroll-spy.       */
/* -------------------------------------------------------------------------- */

/**
 * Home-page sections. The home page is deliberately work-only — a recruiter
 * lands on projects, not on preamble.
 */
export const navItems = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Standalone routes shown in the nav after the section links.
 *
 * Only About is promoted here — it's the word people hunt for. Memories and
 * Uses are reachable from the About page instead of competing for nav space;
 * anyone curious enough to open About is exactly who'd enjoy them.
 */
export const pages = [{ href: "/about", label: "About" }] as const;

/** Personal pages, linked from /about rather than the main nav. */
export const subPages = [
  {
    href: "/memories",
    label: "Memories",
    blurb: "Photos and the stories behind them — the parts that don't fit on a resume.",
  },
  {
    href: "/uses",
    label: "Uses",
    blurb: "The tools I actually reach for, and how this site is put together.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* About                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * A paragraph is either plain text, or text with a margin note that appears
 * beside it on wide screens (and stacks beneath it on narrow ones).
 */
export type AboutParagraph = string | { text: string; note?: string };

export const about: {
  paragraphs: AboutParagraph[];
  facts: { label: string; value: string }[];
} = {
  /** Each entry renders as its own paragraph. Two or three is the sweet spot. */
  paragraphs: [
    {
      text: "I'm a computer science student at UC Irvine. Most of what I know I learned by shipping — building search engines that had to crawl real websites, CTF platforms that had to survive real students, and hackathon projects that had to work on stage.",
      note: "Shipping to real users is a much stricter teacher than a grade is.",
    },
    "I care about the unglamorous parts: the API that stays fast under load, the error message that tells you what to actually do, the codebase a teammate can pick up without a meeting. I'm drawn to applied AI and developer tooling, where those details compound.",
    "Right now I'm looking for a software engineering internship where I can work alongside people who are better than me.",
  ],
  /** Small facts rendered as a definition list beside the bio. */
  facts: [
    { label: "Education", value: "B.S. Computer Science, UC Irvine" },
    { label: "Focus", value: "Applied AI, backend systems, developer tools" },
    { label: "Based in", value: "Irvine, California" },
    { label: "Status", value: "Open to Summer 2027 internships" }, // TODO
  ],
};

/* -------------------------------------------------------------------------- */
/* Projects                                                                    */
/* -------------------------------------------------------------------------- */

export type Project = {
  title: string;
  /** One line. What it does, for whom. Not how it was built. */
  summary: string;
  /** Two or three sentences of detail, shown under the summary. */
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  /** Optional context line — hackathon, coursework, client, etc. */
  meta?: string;
  /** Pins the project to the top and gives it a wider card. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Redwings AI",
    summary: "Injury-prevention coaching from a single phone video.",
    description:
      "Upload a clip of a lift or a sprint and get back biomechanical feedback in plain English. A FastAPI service runs MediaPipe pose estimation frame by frame, derives joint angles, left/right symmetry and velocity, then hands those metrics to an LLM that writes coaching notes against the athlete's profile.",
    tech: ["Python", "FastAPI", "MediaPipe", "OpenAI", "React", "Docker"],
    github: "https://github.com/MattTMW/redwings-ai",
    meta: "IrvineHacks 2026",
    featured: true,
  },
  {
    title: "CodeSafe",
    summary: "A capture-the-flag platform for teaching secure coding.",
    description:
      "A fork of the pwn.college DOJO adapted for an intro security curriculum. Each challenge runs in an isolated, per-student Docker workspace reachable over SSH, with nginx routing and a CTFd plugin layer for the course-specific scoring and progress views.",
    tech: ["Docker", "Python", "CTFd", "nginx", "Linux"],
    github: "https://github.com/MattTMW/codesafe",
    featured: true,
  },
  {
    title: "UCI Course Search",
    summary: "A search engine over 50k+ crawled university pages.",
    description:
      "A polite multithreaded crawler feeds an inverted index built with TF-IDF scoring, supporting both ranked and boolean retrieval. Query latency stays under 300ms by keeping term postings on disk and seeking to byte offsets rather than loading the index into memory.",
    tech: ["Python", "TF-IDF", "Information Retrieval", "Multithreading"],
    github: "https://github.com/MattTMW/StudyVersionCrawler",
  },
  {
    title: "Patient Health Nexus",
    summary: "A predictive neural network for patient risk triage.",
    description:
      "An end-to-end pipeline that cleans heterogeneous clinical records, engineers features, and trains a classifier to flag high-risk patients — packaged behind a small API so the model is usable rather than just accurate on a notebook.",
    tech: ["Python", "PyTorch", "pandas", "scikit-learn"],
    github: "https://github.com/MattTMW/PNN-Patient-Health-Nexus",
  },
];

/* -------------------------------------------------------------------------- */
/* Experience — newest first. `current: true` gives the node a live accent.     */
/* -------------------------------------------------------------------------- */

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  /** Two or three bullets. Lead with impact, then the mechanism. */
  points: string[];
  tech?: string[];
  current?: boolean;
};

// TODO: replace these with your real roles.
export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    org: "Company Name",
    period: "Jun 2026 — Sep 2026",
    points: [
      "Shipped a feature used by N thousand users, cutting some metric by X%.",
      "Rebuilt a service path that had been the top source of on-call pages.",
      "Wrote the integration tests the team had been meaning to write for a year.",
    ],
    tech: ["TypeScript", "React", "PostgreSQL", "AWS"],
    current: true,
  },
  {
    role: "Undergraduate Research Assistant",
    org: "UC Irvine",
    period: "Jan 2026 — Jun 2026",
    points: [
      "Built the data pipeline behind an ongoing study, processing N records nightly.",
      "Automated an analysis step that previously took a researcher a full day each week.",
    ],
    tech: ["Python", "pandas", "PostgreSQL"],
  },
  {
    role: "Technical Lead",
    org: "Student Organization",
    period: "Sep 2025 — Present",
    points: [
      "Lead a team of N students building and maintaining the org's web presence.",
      "Run weekly code reviews and onboard new members onto the codebase.",
    ],
    tech: ["Next.js", "TypeScript", "Vercel"],
  },
];

/* -------------------------------------------------------------------------- */
/* Skills                                                                      */
/* -------------------------------------------------------------------------- */

export const skills = [
  {
    group: "Languages",
    items: ["TypeScript", "Python", "Java", "C", "SQL", "Go"],
  },
  {
    group: "Frameworks",
    items: ["React", "Next.js", "FastAPI", "Node.js", "Tailwind CSS", "PyTorch"],
  },
  {
    group: "Tools",
    items: ["Git", "Docker", "Linux", "pytest", "Vite", "Figma"],
  },
  {
    group: "Cloud & Data",
    items: ["AWS", "Vercel", "PostgreSQL", "Redis", "GitHub Actions"],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Coursework — optional. Set to [] to hide the block entirely.                 */
/* -------------------------------------------------------------------------- */

export const coursework: string[] = [
  "Data Structures & Algorithms",
  "Information Retrieval",
  "Computer Networks",
  "Operating Systems",
  "Machine Learning",
  "Databases",
];
