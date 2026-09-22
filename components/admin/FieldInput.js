"use client";

import ImageField from "./ImageField";

export default function FieldInput({ field, value, onChange }) {
  const { key, label, type = "text", options, folder } = field;

  if (type === "image") {
    return (
      <ImageField
        label={label}
        value={value}
        onChange={onChange}
        folder={folder || "uploads"}
      />
    );
  }

  if (type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-inkSoft">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-ink/30 text-leaf focus:ring-leaf"
        />
        {label}
      </label>
    );
  }

  if (type === "select") {
    return (
      <div>
        <label className="text-sm text-inkSoft">{label}</label>
        <select
          value={value || options[0]}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2 text-ink outline-none focus:border-leaf"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="text-sm text-inkSoft">{label}</label>
        <textarea
          rows={3}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2 text-ink outline-none focus:border-leaf"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="text-sm text-inkSoft">{label}</label>
      <input
        type={type === "number" ? "number" : "text"}
        value={value ?? ""}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
        className="mt-1 w-full rounded-sm border border-ink/20 bg-parchment px-3 py-2 text-ink outline-none focus:border-leaf"
      />
    </div>
  );
}
