"use client";

import { useState } from "react";
import { uploadFile } from "../../lib/uploadFile";

export default function ImageField({ label, value, onChange, folder = "uploads" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file, folder);
      onChange(url);
    } catch (err) {
      setError("Upload failed. Try a smaller image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="text-sm text-inkSoft">{label}</label>
      <div className="mt-1 flex items-center gap-3">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="h-14 w-14 rounded-sm border border-ink/15 object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="text-sm text-inkSoft file:mr-3 file:rounded file:border-0 file:bg-leaf/15 file:px-3 file:py-1.5 file:text-leaf-dark"
        />
      </div>
      {uploading && <p className="mt-1 text-xs text-inkSoft">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-poppy">{error}</p>}
    </div>
  );
}
