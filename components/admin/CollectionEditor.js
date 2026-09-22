"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import FieldInput from "./FieldInput";

function emptyRow(fields) {
  const row = {};
  fields.forEach((f) => {
    row[f.key] = f.type === "boolean" ? false : f.type === "number" ? null : "";
  });
  return row;
}

export default function CollectionEditor({ table, title, fields, orderKey = "sort_order" }) {
  const [rows, setRows] = useState([]);
  const [draft, setDraft] = useState(emptyRow(fields));
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from(table)
      .select("*")
      .order(orderKey, { ascending: true });
    setRows(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  function updateRowField(id, key, value) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );
  }

  async function saveRow(row) {
    setSavingId(row.id);
    const { id, ...updates } = row;
    const { error } = await supabase.from(table).update(updates).eq("id", id);
    setSavingId(null);
    setMessage(error ? "Couldn't save that row." : "Saved.");
    setTimeout(() => setMessage(""), 2000);
  }

  async function deleteRow(id) {
    if (!confirm("Delete this entry? This can't be undone.")) return;
    await supabase.from(table).delete().eq("id", id);
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  async function addRow() {
    const { data, error } = await supabase
      .from(table)
      .insert(draft)
      .select()
      .single();
    if (!error && data) {
      setRows((prev) => [...prev, data]);
      setDraft(emptyRow(fields));
      setMessage("Added.");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage("Couldn't add that entry.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        {message && <span className="text-sm text-leaf-dark">{message}</span>}
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-inkSoft">Loading…</p>
      ) : (
        <div className="mt-6 space-y-6">
          {rows.map((row) => (
            <div
              key={row.id}
              className="rounded-sm border border-ink/15 bg-white/50 p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.type === "textarea" ? "sm:col-span-2" : ""}
                  >
                    <FieldInput
                      field={field}
                      value={row[field.key]}
                      onChange={(v) => updateRowField(row.id, field.key, v)}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => saveRow(row)}
                  disabled={savingId === row.id}
                  className="rounded-md bg-leaf px-4 py-2 text-sm font-medium text-parchment hover:bg-leaf-dark disabled:opacity-60"
                >
                  {savingId === row.id ? "Saving…" : "Save"}
                </button>
                <button
                  onClick={() => deleteRow(row.id)}
                  className="rounded-md border border-poppy/40 px-4 py-2 text-sm font-medium text-poppy hover:bg-poppy/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-sm border border-dashed border-leaf/50 bg-leaf/5 p-5">
        <h3 className="font-display text-lg text-ink">Add new</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.key}
              className={field.type === "textarea" ? "sm:col-span-2" : ""}
            >
              <FieldInput
                field={field}
                value={draft[field.key]}
                onChange={(v) => setDraft((d) => ({ ...d, [field.key]: v }))}
              />
            </div>
          ))}
        </div>
        <button
          onClick={addRow}
          className="mt-4 rounded-md bg-marigold px-4 py-2 text-sm font-medium text-ink hover:bg-marigold/80"
        >
          Add entry
        </button>
      </div>
    </div>
  );
}
