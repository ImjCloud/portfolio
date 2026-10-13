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

      <div className="relative">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === ",") {
              event.preventDefault();
              addTag(query);
            }
          }}
          placeholder={placeholder}
          className="h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {suggestions.length > 0 ? (
          <div className="absolute inset-x-0 top-[calc(100%+4px)] z-10 max-h-56 overflow-y-auto rounded-2xl border border-line bg-paper p-1.5 shadow-glass-lg">
            {suggestions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => addTag(option)}
                className={cn("block w-full rounded-xl px-3 py-2 text-left text-sm text-ink transition active:scale-[0.99]", "hover:bg-brand/10")}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <p className="mt-1.5 text-xs text-muted">Pick from the list, or type your own and press Enter.</p>
    </div>
  );
}
