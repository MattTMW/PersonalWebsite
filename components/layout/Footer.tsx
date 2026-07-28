import { Github, Linkedin, Mail } from "@/components/ui/icons";
import { site, social } from "@/lib/content";

const links = [
  { label: "GitHub", href: social.github, Icon: Github },
  { label: "LinkedIn", href: social.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export function Footer() {
  return (
    <footer className="mt-28 border-t border-border py-10 sm:mt-40">
      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          {/* One small human detail at the very bottom — the reference does the
              same thing with its visitor counter. */}
          <p className="text-sm text-muted">
            Currently building{" "}
            <span className="text-text">{site.nowBuilding}</span>.
          </p>
        </div>

        <ul className="flex items-center gap-1">
          {links.map(({ label, href, Icon }) => {
            const isExternal = !href.startsWith("mailto:");
            return (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid size-9 place-items-center rounded-full text-muted transition-colors duration-200 [transition-timing-function:var(--ease-soft)] hover:bg-accent-soft hover:text-accent-ink"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-8 font-mono text-[0.6875rem] tracking-tight text-muted/70">
        Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}
