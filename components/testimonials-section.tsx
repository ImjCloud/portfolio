"use client";

import { useState } from "react";
import { TestimonialsList } from "@/components/testimonials-list";
import { TestimonialForm } from "@/components/testimonial-form";
import { Reveal } from "@/components/motion/reveal";

export function TestimonialsSection() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="grid gap-14">
      <Reveal>
        <TestimonialsList refreshKey={refreshKey} />
      </Reveal>
      <Reveal delay={0.08}>
        <div className="mx-auto w-full max-w-2xl">
          <p className="eyebrow">Add a recommendation</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-ink">Worked with me? I&apos;d welcome your recommendation.</h2>
          <p className="mt-3 text-sm leading-6 text-muted">Submissions are reviewed before publishing, so nothing appears here without approval.</p>
          <div className="mt-6"><TestimonialForm onSubmitted={() => setRefreshKey((key) => key + 1)} /></div>
        </div>
      </Reveal>
    </div>
  );
}
