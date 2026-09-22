"use client";

import { motion } from "framer-motion";

export default function Timeline({ entries }) {
  if (!entries?.length) return null;

  return (
    <section id="timeline" className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl text-ink"
        >
          Journey
        </motion.h2>

        <div className="relative mt-10 pl-8">
          <div className="absolute bottom-2 left-[7px] top-2 w-[2px] rounded bg-leaf/30" />
          <ul className="space-y-10">
            {entries.map((entry) => (
              <li key={entry.id} className="relative">
                <span className="absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-leaf bg-parchment">
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg text-ink">{entry.role}</h3>
                  <span className="text-sm text-teal">
                    {entry.organization}
                  </span>
                  <span className="text-sm text-inkSoft/70">
                    {entry.start_year}
                    {entry.end_year ? ` – ${entry.end_year}` : ""}
                  </span>
                </div>
                {entry.description && (
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-inkSoft">
                    {entry.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
