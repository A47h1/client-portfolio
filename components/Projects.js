"use client";

import { motion } from "framer-motion";

export default function Projects({ projects }) {
  if (!projects?.length) return null;

  return (
    <section id="projects" className="border-t border-ink/10 bg-parchmentDim/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl text-ink"
        >
          Research projects
        </motion.h2>

        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link || undefined}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noreferrer" : undefined}
              className="specimen-corner torn-border group block rounded-sm bg-parchment p-5 transition-transform duration-300 hover:-translate-y-1"
              data-tag={project.year || project.category || "field notes"}
            >
              {project.image_url && (
                <div className="mb-4 aspect-[16/10] w-full overflow-hidden rounded-sm bg-white/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <h3 className="font-display text-xl text-ink">{project.title}</h3>
              {project.category && (
                <p className="mt-1 text-sm text-teal">{project.category}</p>
              )}
              <p className="mt-2 text-[15px] leading-relaxed text-inkSoft">
                {project.summary}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
