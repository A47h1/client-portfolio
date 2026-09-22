"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

const SOCIAL_FIELDS = [
  { key: "email", label: "Email", prefix: "mailto:" },
  { key: "linkedin_url", label: "LinkedIn" },
  { key: "google_scholar_url", label: "Google Scholar" },
  { key: "github_url", label: "GitHub" },
  { key: "twitter_url", label: "X / Twitter" },
];

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("messages").insert({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 md:grid-cols-2"
        >
          <div>
            <h2 className="font-display text-3xl text-ink">Get in touch</h2>
            <p className="mt-3 max-w-sm text-inkSoft">
              Collaboration inquiries, speaking requests, or questions about the
              research — reach out directly or send a note.
            </p>

            <ul className="mt-6 space-y-2">
              {SOCIAL_FIELDS.map(({ key, label, prefix }) =>
                profile?.[key] ? (
                  <li key={key}>
                    <a
                      href={prefix ? `${prefix}${profile[key]}` : profile[key]}
                      target={prefix ? undefined : "_blank"}
                      rel="noreferrer"
                      className="text-sm text-teal underline decoration-teal/30 underline-offset-4 hover:text-leaf-dark"
                    >
                      {label}: {profile[key]}
                    </a>
                  </li>
                ) : null
              )}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-inkSoft">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2 text-ink outline-none focus:border-leaf"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-inkSoft">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2 text-ink outline-none focus:border-leaf"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-inkSoft">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2 text-ink outline-none focus:border-leaf"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-md bg-poppy px-5 py-3 text-sm font-medium text-parchment transition-colors hover:bg-poppy/90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-leaf-dark">
                Message sent. Thank you — you'll hear back soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-poppy">
                Something went wrong. Please try again in a moment.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
