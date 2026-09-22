"use client";

import { useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#publications", label: "Publications" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ name }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-parchment/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg text-ink">
          {name || "Portfolio"}
        </a>

        <nav className="hidden gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-sm text-inkSoft transition-colors hover:text-leaf-dark"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-leaf transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`h-[2px] w-6 bg-ink transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-ink transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-ink transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-6 py-3 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2 text-sm text-inkSoft hover:bg-leaf/10 hover:text-leaf-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
