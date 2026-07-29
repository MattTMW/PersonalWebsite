import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Vitals } from "@/components/sections/Vitals";

/**
 * The home page is work only: who you are in three seconds, then straight into
 * the projects. The long-form bio lives on /about, so nobody has to scroll past
 * a personal essay to reach the evidence.
 *
 * Section rhythm lives here and nowhere else: ~7rem of air between sections on
 * mobile, ~10rem on desktop. That gap is roughly 8x the spacing used *inside* a
 * card, and that ratio is what makes the layout read as deliberate rather than
 * merely sparse. Change it here and the whole page re-tunes together.
 *
 * `Vitals` is the deliberate exception — it sits tight under the hero because
 * it's metadata belonging to the hero, not a section competing with the work.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Vitals />

      <div className="mt-28 space-y-28 sm:mt-40 sm:space-y-40">
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </div>
    </>
  );
}
