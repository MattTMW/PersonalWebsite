import { Reveal } from "@/components/motion/Reveal";
import { about } from "@/lib/content";

/**
 * A compact "at a glance" strip sitting between the hero and the work.
 *
 * The long-form bio lives on /about, but two of these facts — the school and
 * the availability — are top-three information for anyone screening a student
 * portfolio. Making a recruiter click through for them is the wrong trade, so
 * the story moves and the facts stay.
 *
 * Deliberately flat: hairline dividers, no card, no heading. It should read as
 * metadata attached to the hero, not as a section competing with Projects.
 */
export function Vitals() {
  return (
    <Reveal>
      <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-6 lg:grid-cols-4">
        {about.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="label mb-2">{fact.label}</dt>
            <dd className="text-[0.9375rem] leading-snug text-text">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
