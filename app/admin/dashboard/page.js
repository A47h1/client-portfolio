"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "../../../lib/useRequireAuth";
import { supabase } from "../../../lib/supabaseClient";
import ProfileEditor from "../../../components/admin/ProfileEditor";
import CollectionEditor from "../../../components/admin/CollectionEditor";
import MessagesViewer from "../../../components/admin/MessagesViewer";

const TABS = [
  { key: "profile", label: "Profile" },
  { key: "research_interests", label: "Research interests" },
  { key: "publications", label: "Publications" },
  { key: "projects", label: "Projects" },
  { key: "timeline_entries", label: "Journey" },
  { key: "skills", label: "Skills" },
  { key: "messages", label: "Messages" },
];

const COLLECTION_CONFIG = {
  research_interests: {
    title: "Research interests",
    table: "research_interests",
    fields: [
      { key: "label", label: "Interest" },
      { key: "sort_order", label: "Order", type: "number" },
    ],
  },
  publications: {
    title: "Publications",
    table: "publications",
    fields: [
      { key: "title", label: "Title" },
      { key: "authors", label: "Authors" },
      { key: "journal", label: "Journal / venue" },
      { key: "year", label: "Year", type: "number" },
      { key: "link", label: "Link" },
      { key: "featured", label: "Featured", type: "boolean" },
      { key: "sort_order", label: "Order", type: "number" },
    ],
  },
  projects: {
    title: "Projects",
    table: "projects",
    fields: [
      { key: "title", label: "Title" },
      { key: "summary", label: "Short summary", type: "textarea" },
      { key: "description", label: "Full description", type: "textarea" },
      { key: "image_url", label: "Image", type: "image", folder: "projects" },
      { key: "category", label: "Category" },
      { key: "year", label: "Year", type: "number" },
      { key: "link", label: "Link" },
      { key: "sort_order", label: "Order", type: "number" },
    ],
  },
  timeline_entries: {
    title: "Journey (experience & education)",
    table: "timeline_entries",
    fields: [
      { key: "entry_type", label: "Type", type: "select", options: ["work", "education"] },
      { key: "role", label: "Role / degree" },
      { key: "organization", label: "Organization" },
      { key: "start_year", label: "Start year" },
      { key: "end_year", label: "End year (blank if current)" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "sort_order", label: "Order", type: "number" },
    ],
  },
  skills: {
    title: "Skills",
    table: "skills",
    fields: [
      { key: "name", label: "Skill" },
      { key: "category", label: "Category" },
      { key: "sort_order", label: "Order", type: "number" },
    ],
  },
};

export default function Dashboard() {
  const session = useRequireAuth();
  const router = useRouter();
  const [tab, setTab] = useState("profile");

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin");
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-inkSoft">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment">
      <header className="border-b border-ink/10 bg-white/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-display text-xl text-ink">Admin panel</p>
            <p className="text-xs text-inkSoft/70">
              Changes save instantly and appear on the live site right away.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noreferrer" className="text-sm text-teal hover:underline">
              View site
            </a>
            <button onClick={handleLogout} className="text-sm text-poppy hover:underline">
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8 md:grid md:grid-cols-[200px_1fr] md:gap-8">
        <nav className="mb-6 flex flex-wrap gap-2 md:mb-0 md:flex-col">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                tab === t.key
                  ? "bg-leaf text-parchment"
                  : "text-inkSoft hover:bg-leaf/10 hover:text-leaf-dark"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <main className="pb-16">
          {tab === "profile" && <ProfileEditor />}
          {tab === "messages" && <MessagesViewer />}
          {COLLECTION_CONFIG[tab] && (
            <CollectionEditor
              table={COLLECTION_CONFIG[tab].table}
              title={COLLECTION_CONFIG[tab].title}
              fields={COLLECTION_CONFIG[tab].fields}
            />
          )}
        </main>
      </div>
    </div>
  );
}
