import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

/**
 * The whole site is one page. Section rhythm lives here and nowhere else:
 * ~7rem of air between sections on mobile, ~10rem on desktop.
 *
 * That gap is roughly 8x the spacing used *inside* a card, and that ratio is
 * what makes the layout read as deliberate rather than merely sparse. Change it
 * here and the entire page re-tunes together.
 */
export default function Home() {
  return (
    <div className="space-y-28 sm:space-y-40">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
}
