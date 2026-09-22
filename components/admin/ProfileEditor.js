"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import FieldInput from "./FieldInput";

const FIELDS = [
  { key: "full_name", label: "Full name" },
  { key: "title", label: "Title / role" },
  { key: "tagline", label: "Hero tagline" },
  { key: "bio", label: "Bio", type: "textarea" },
  { key: "location", label: "Location" },
  { key: "email", label: "Email" },
  { key: "photo_url", label: "Photo", type: "image", folder: "profile" },
  { key: "cv_url", label: "CV (PDF)", type: "image", folder: "cv" },
  { key: "linkedin_url", label: "LinkedIn URL" },
  { key: "google_scholar_url", label: "Google Scholar URL" },
  { key: "github_url", label: "GitHub URL" },
  { key: "twitter_url", label: "X / Twitter URL" },
];

export default function ProfileEditor() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase
      .from("profile")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => setProfile(data));
  }, []);

  async function handleSave() {
    setSaving(true);
    const { id, ...updates } = profile;
    const { error } = await supabase.from("profile").update(updates).eq("id", 1);
    setSaving(false);
    setMessage(error ? "Couldn't save." : "Saved.");
    setTimeout(() => setMessage(""), 2000);
  }

  if (!profile) return <p className="text-sm text-inkSoft">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-ink">Profile</h2>
        {message && <span className="text-sm text-leaf-dark">{message}</span>}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div
            key={field.key}
            className={field.type === "textarea" ? "sm:col-span-2" : ""}
          >
            <FieldInput
              field={field}
              value={profile[field.key]}
              onChange={(v) => setProfile((p) => ({ ...p, [field.key]: v }))}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 rounded-md bg-leaf px-5 py-3 text-sm font-medium text-parchment hover:bg-leaf-dark disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save profile"}
      </button>
    </div>
  );
}
