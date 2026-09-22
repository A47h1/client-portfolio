"use client";

import { motion } from "framer-motion";

export default function Publications({ publications }) {
  if (!publications?.length) return null;

  return (
    <section id="publications" className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl text-ink"
        >
          Publications
        </motion.h2>

        <ol className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
          {publications.map((pub) => (
            <li key={pub.id} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="shrink-0 rounded bg-leaf/10 px-2 py-1 font-display text-sm text-leaf-dark sm:w-16 sm:text-center">
                {pub.year || "—"}
              </span>
              <div className="flex-1">
                <p className="text-[17px] leading-snug text-ink">
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-leaf/40 decoration-2 underline-offset-4 transition-colors hover:text-leaf-dark"
                    >
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                  {pub.featured && (
                    <span className="ml-2 rounded-full bg-marigold/30 px-2 py-0.5 text-xs text-ink">
                      Featured
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-inkSoft">
                  {pub.authors}
                  {pub.journal ? ` — ${pub.journal}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
