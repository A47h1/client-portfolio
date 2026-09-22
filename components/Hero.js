"use client";

import { motion } from "framer-motion";
import VineAnimation from "./VineAnimation";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero({ profile }) {
  const name = profile?.full_name || "Dr. Jane Researcher";
  const title = profile?.title || "Agricultural & Plant Biology Researcher";
  const tagline =
    profile?.tagline || "Studying how crops adapt so farms can too.";

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pb-24 md:pt-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="font-display text-lg italic text-leaf-dark">
            {title}
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-5xl md:text-6xl"
          >
            {name}
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-md text-lg text-inkSoft">
            {tagline}
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#research"
              className="rounded-md bg-leaf px-5 py-3 text-sm font-medium text-parchment transition-colors hover:bg-leaf-dark"
            >
              See the research
            </a>
            {profile?.cv_url && (
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-leaf hover:text-leaf-dark"
              >
                Download CV
              </a>
            )}
          </motion.div>
        </motion.div>

        <div className="flex justify-center md:justify-end">
          <VineAnimation />
        </div>
      </div>
    </section>
  );
}
