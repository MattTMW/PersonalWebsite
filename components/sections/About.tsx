import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { about } from "@/lib/content";

/**
 * Prose capped at ~65 characters per line (max-w-xl at this size), which is the
 * readability sweet spot. The facts below are a real <dl> — hairline-separated
 * rows rather than a card, so the section stays flat and calm.
 */
export function About() {
  return (
    <Section id="about" index="01" label="About" title="A little context">
      <div className="measure space-y-5">
        {about.paragraphs.map((paragraph, index) => (
          <Reveal key={index} delay={index * 0.06}>
            <p className="text-[1.0625rem] leading-[1.75] text-muted">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {about.facts.map((fact) => (
            <div key={fact.label} className="bg-bg px-5 py-4">
              <dt className="label mb-2">{fact.label}</dt>
              <dd className="text-[0.9375rem] text-text">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
