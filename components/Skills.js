"use client";

import { motion } from "framer-motion";

export default function Skills({ skills }) {
  if (!skills?.length) return null;

  const grouped = skills.reduce((acc, skill) => {
    const key = skill.category || "General";
    acc[key] = acc[key] || [];
    acc[key].push(skill);
    return acc;
  }, {});

  const palette = ["bg-leaf/12 text-leaf-dark", "bg-marigold/25 text-ink", "bg-teal/12 text-teal"];

  return (
    <section className="border-t border-ink/10 bg-parchmentDim/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl text-ink"
        >
          Skills &amp; methods
        </motion.h2>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([category, items], idx) => (
            <div key={category}>
              <h3 className="font-display text-lg italic text-leaf-dark">
                {category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.id}
                    className={`rounded px-3 py-1 text-sm ${palette[idx % palette.length]}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
