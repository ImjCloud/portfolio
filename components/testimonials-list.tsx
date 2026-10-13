"use client";

import { useCallback, useEffect, useState } from "react";
import { Linkedin, Quote } from "lucide-react";
import { StarRatingDisplay } from "@/components/star-rating";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  linkedin_url: string | null;
  rating: number;
  recommendation: string;
  created_at: string;
};

type ApiResponse = { configured: boolean; testimonials: Testimonial[] };

export function TestimonialsList({ refreshKey }: { refreshKey?: number }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [data, setData] = useState<ApiResponse>({ configured: true, testimonials: [] });

  const load = useCallback(async () => {
    setState("loading");
    try {
      const response = await fetch("/api/testimonials/");
      const result = (await response.json()) as ApiResponse;
      setData(result);
      setState("ready");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  if (state === "loading") {
    return <div className="grid gap-5 sm:grid-cols-2">{[0, 1].map((key) => <div key={key} className="h-48 animate-pulse rounded-4xl border border-line bg-surface" />)}</div>;
  }

  if (state === "error") {
    return <p className="rounded-3xl border border-dashed border-line p-8 text-center text-sm text-muted">Recommendations could not be loaded right now. Please try again shortly.</p>;
  }

  if (!data.configured) {
    return (
      <div className="rounded-3xl border border-dashed border-brand/35 bg-brand/5 p-8 text-center text-sm leading-6 text-muted">
        The recommendation system is being connected. In the meantime, feel free to request references directly by email or LinkedIn.
      </div>
    );
  }

  if (data.testimonials.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line p-8 text-center text-sm leading-6 text-muted">
        No published recommendations yet. Submissions are reviewed before appearing here, be the first to add one below.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {data.testimonials.map((item) => (
        <article key={item.id} className="flex h-full flex-col rounded-4xl border border-line bg-paper p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-7">
          <Quote size={22} className="text-brand" />
          <StarRatingDisplay value={item.rating} />
          <p className="mt-4 flex-1 text-[15px] leading-7 text-ink">{item.recommendation}</p>
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <div>
              <p className="text-sm font-semibold text-ink">{item.name}</p>
              <p className="text-xs text-muted">{[item.role, item.company].filter(Boolean).join(", ")}</p>
            </div>
            {item.linkedin_url ? (
              <a href={item.linkedin_url} target="_blank" rel="noreferrer" aria-label={`${item.name} on LinkedIn`} className="text-muted transition hover:text-brand"><Linkedin size={18} /></a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
