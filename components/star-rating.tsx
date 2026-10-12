"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRatingInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating out of 5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          onClick={() => onChange(star)}
          className="rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Star size={22} className={cn("transition", star <= value ? "fill-accent text-accent" : "text-line")} />
        </button>
      ))}
    </div>
  );
}

export function StarRatingDisplay({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={15} className={star <= value ? "fill-accent text-accent" : "text-line"} />
      ))}
    </div>
  );
}
