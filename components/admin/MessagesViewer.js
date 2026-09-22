"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function MessagesViewer() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    setMessages(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id, read) {
    await supabase.from("messages").update({ read }).eq("id", id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
  }

  async function remove(id) {
    if (!confirm("Delete this message?")) return;
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-ink">Messages</h2>
      {loading ? (
        <p className="mt-4 text-sm text-inkSoft">Loading…</p>
      ) : messages.length === 0 ? (
        <p className="mt-4 text-sm text-inkSoft">No messages yet.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-sm border p-4 ${
                m.read ? "border-ink/10 bg-white/30" : "border-marigold bg-marigold/10"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-ink">
                  <span className="font-medium">{m.name}</span>{" "}
                  <span className="text-inkSoft">
                    &lt;
                    <a href={`mailto:${m.email}`} className="text-teal hover:underline">
                      {m.email}
                    </a>
                    &gt;
                  </span>
                </p>
                <span className="text-xs text-inkSoft/70">
                  {new Date(m.created_at).toLocaleString()}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-line text-[15px] text-inkSoft">
                {m.message}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => markRead(m.id, !m.read)}
                  className="text-xs text-leaf-dark hover:underline"
                >
                  Mark as {m.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => remove(m.id)}
                  className="text-xs text-poppy hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
