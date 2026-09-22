"use client";

import { motion } from "framer-motion";

export default function About({ profile, interests }) {
  return (
    <section id="about" className="border-t border-ink/10 bg-parchmentDim/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start"
        >
          <div className="mx-auto w-48 md:mx-0 md:w-full">
            <div className="torn-border relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-sm bg-white/60 md:max-w-none">
              {profile?.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photo_url}
                  alt={profile?.full_name || "Portrait"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-inkSoft/60">
                  Add a photo from the admin panel
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl text-ink">About</h2>
            <p className="mt-4 max-w-2xl whitespace-pre-line text-[17px] leading-relaxed text-inkSoft">
              {profile?.bio ||
                "Write a short bio from the admin panel — your background, what you study, and why it matters."}
            </p>

            {profile?.location && (
              <p className="mt-4 text-sm text-inkSoft/80">
                Based in {profile.location}
              </p>
            )}

            {interests?.length > 0 && (
              <div id="research" className="mt-6 flex flex-wrap gap-2 scroll-mt-24">
                {interests.map((interest) => (
                  <span
                    key={interest.id}
                    className="label-tag px-3 py-1 text-sm text-leaf-dark"
                  >
                    {interest.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
