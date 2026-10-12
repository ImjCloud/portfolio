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

  if (!data.ֻǱ˞