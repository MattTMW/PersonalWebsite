import { ArrowUpRight, Github } from "@/components/ui/icons";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Keeps the reference's two-part anatomy — a content block sitting above a
 * tinted caption strip that carries the actions — but swaps its logo artwork
 * for type. A student portfolio rarely has brand assets worth showing at that
 * size, and a placeholder image would read as unfinished.
 *
 * At rest the card is nearly invisible: hairline border, off-white fill. The
 * accent border and 2px lift only appear on hover, so a list of six cards reads
 * as a calm column rather than six competing boxes.
 */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { title, summary, description, tech, github, demo, meta } = project;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface",
        "transition-[border-color,box-shadow,transform] duration-300 [transition-timing-function:var(--ease-soft)]",
        "hover:-translate-y-0.5 hover:border-accent hover:shadow-card",
      )}
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span aria-hidden className="font-mono text-[0.6875rem] tracking-widest text-accent-ink">
            {String(index + 1).padStart(2, "0")}
          </span>
          {meta && <span className="label">{meta}</span>}
        </div>

        <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="mt-1.5 text-[0.9375rem] text-text/80">{summary}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-border bg-surface-2 px-6 py-4">
        <ul className="flex flex-wrap gap-1.5">
          {tech.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          {github && <CardLink href={github} label={`${title} source on GitHub`}>
            <Github className="size-3.5" />
            Code
          </CardLink>}
          {demo && <CardLink href={demo} label={`${title} live demo`}>
            Demo
            <ArrowUpRight className="size-3.5" />
          </CardLink>}
        </div>
      </div>
    </article>
  );
}

function CardLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.8125rem] font-medium text-muted",
        "transition-colors duration-200 [transition-timing-function:var(--ease-soft)]",
        "hover:bg-bg hover:text-accent-ink",
      )}
    >
      {children}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
