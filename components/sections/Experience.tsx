import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { experience } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A hairline spine with a node per role. The only entry that gets accent colour
 * is the current one — which makes "what are they doing right now" answerable
 * at a glance, without a badge.
 *
 * Semantically an ordered list: the sequence carries meaning, and screen readers
 * announce the position and count for free.
 */
export function Experience() {
  return (
    <Section id="experience" index="02" label="Experience" title="Where I've worked">
      <ol className="relative border-l border-border">
        {experience.map((item, index) => (
          <li key={`${item.org}-${item.role}`} className="relative pb-12 pl-7 last:pb-0 sm:pl-9">
            {/* Node. The current role gets a soft halo ring. */}
            <span
              aria-hidden
              className={cn(
                "absolute top-1.5 -left-[4.5px] size-2 rounded-full",
                item.current
                  ? "bg-accent-ink ring-4 ring-accent-soft"
                  : "bg-border ring-4 ring-bg",
              )}
            />

            <Reveal delay={index * 0.06}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em]">
                  {item.role}
                </h3>
                <span className="label shrink-0">{item.period}</span>
              </div>

              <p className="mt-1 text-[0.9375rem] text-accent-ink">{item.org}</p>

              <ul className="mt-4 space-y-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 text-[0.9375rem] leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="absolute top-[0.6875rem] left-0 h-px w-2 bg-border"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              {item.tech && item.tech.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.tech.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
