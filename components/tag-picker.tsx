"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function TagPicker({ name, options, placeholder }: { name: string; options: string[]; placeholder?: string }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const suggestions = query
    ? options.filter((option) => option.toLowerCase().includes(query.toLowerCase()) && !selected.includes(option)).slice(0, 8)
    : [];

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    setSelected((current) => [...current, trimmed]);
    setQuery("");
  }

  function removeTag(tag: string) {
    setSelected((current) => current.filter((existing) => existing !== tag));
  }

  return (
    <div>
      <input type="hidden" name={name} value={selected.join(", ")} />
      {selected.length > 0 ? (
        <div className="mb-2 flex flex-wrap gap-2">
          {selected.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1.5 text-sm font-medium text-brand">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`} className="rounded-full transition hover:text-ink active:scale-90">
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      <div className="rֻǱ˞