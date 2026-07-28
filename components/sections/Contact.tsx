import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight, Github, Linkedin, Mail } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { site, social } from "@/lib/content";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "GitHub", value: "@MattTMW", href: social.github, Icon: Github },
  { label: "LinkedIn", value: "in/matthewtruong", href: social.linkedin, Icon: Linkedin },
];

/**
 * Direct links come before the form. Most people who reach the bottom of a
 * portfolio want an email address, not a text box — the form is for the ones
 * who prefer it, not the only way through.
 */
export function Contact() {
  return (
    <Section id="contact" index="05" label="Contact" title="Let's talk">
      <Reveal>
        <p className="measure mb-10 text-[1.0625rem] leading-relaxed text-muted">
          I&apos;m looking for software engineering internships, and I&apos;m always up for
          talking about a project you think is interesting. My inbox is genuinely open.
        </p>
      </Reveal>

      <Reveal delay={0.06}>
        <ul className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {channels.map(({ label, value, href, Icon }) => {
            const isExternal = !href.startsWith("mailto:");
            return (
              <li key={label} className="bg-bg">
                <a
                  href={href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col gap-2 px-5 py-4 transition-colors duration-200 [transition-timing-function:var(--ease-soft)] hover:bg-accent-soft"
                >
                  <span className="label flex items-center gap-2">
                    <Icon className="size-3.5" />
                    {label}
                  </span>
                  <span className="flex items-center gap-1 text-[0.9375rem] break-all text-text">
                    {value}
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted transition-transform duration-300 [transition-timing-function:var(--ease-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  {isExternal && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <Reveal delay={0.12}>
        <ContactForm />
      </Reveal>
    </Section>
  );
}
