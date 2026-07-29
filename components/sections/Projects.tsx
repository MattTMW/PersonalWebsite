import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import { projects, social } from "@/lib/content";

/**
 * Featured work runs full width; everything else drops into a two-up grid.
 * That difference in width is the only ranking signal — no "Featured" badges,
 * no reordering controls. Flip `featured` in content.ts to promote a project.
 */
export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <Section id="projects" index="01" label="Projects" title="Things I've built">
      <div className="space-y-4">
        {featured.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.06}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rest.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.06} className="h-full">
              <ProjectCard project={project} index={featured.length + index} />
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={0.12}>
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors duration-200 hover:text-accent-ink"
        >
          More on GitHub
          <ArrowUpRight className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  );
}
