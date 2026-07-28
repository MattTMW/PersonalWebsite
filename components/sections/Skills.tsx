import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { coursework, skills } from "@/lib/content";

/**
 * Hairline-separated rows: category on the left, chips on the right. Skills
 * sections invite clutter — no proficiency bars or percentages here, since
 * "React 80%" communicates nothing a recruiter can act on and costs a lot of
 * visual weight.
 */
export function Skills() {
  return (
    <Section id="skills" label="04 / Skills" title="What I work with">
      <dl className="divide-y divide-border border-y border-border">
        {skills.map((group, index) => (
          <Reveal key={group.group} delay={index * 0.05}>
            <div className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="label pt-1">{group.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag className="px-2.5 py-1.5 text-xs">{item}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      {coursework.length > 0 && (
        <Reveal delay={0.1}>
          <div className="mt-8">
            <h3 className="label mb-3">Relevant coursework</h3>
            <p className="text-[0.9375rem] leading-relaxed text-muted">
              {coursework.join(" · ")}
            </p>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
