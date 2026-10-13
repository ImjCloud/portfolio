"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarRatingInput } from "@/components/star-rating";

type Status = "idle" | "sending" | "sent" | "error";

export function TestimonialForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name"),
      role: data.get("role"),
      company: data.get("company"),
      linkedinUrl: data.get("linkedinUrl"),
      rating,
      recommendation: data.get("recommendation"),
      email: data.get("email"),
      honeypot: data.get("website"),
    };

    try {
      const response = await fetch("/api/testimonials/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
      setRating(5);
      onSubmitted?.();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-brand/25 bg-brand/5 p-8 text-center">
        <p className="text-lg font-semibold text-ink">Thank you.</p>
        <p className="mt-2 text-sm leading-6 text-muted">Your recommendation has been submitted for review and will appear here once approved.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-4xl border border-line bg-paper p-6 shadow-card sm:p-8">
      {/* Honeypot: hidden from real visitors via CSS, bots that auto-fill every field will trip it. */}
      <div className="hidden" aria-hidden="true">
        <label>Leave this field blank<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Role" name="role" placeholder="e.g. Product Manager" />
        <Field label="Company" name="company" placeholder="e.g. Pro-ICE Limited" />
        <Field label="LinkedIn URL (optional)" name="linkedinUrl" placeholder="https://linkedin.com/in/..." />
      </div>
      <div className="mt-5"><Field label="Email (optional, not published)" name="email" type="email" /></div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-ink">Rating</p>
        <div className="mt-2"><StarRatingInput value={rating} onChange={setRating} /></div>
      </div>

      <label className="mt-5 block text-sm font-semibold text-ink">Recommendation
        <textarea name="recommendation" required minLength={20} maxLength={2000} rows={5} placeholder="Share what it was like working together." className="mt-2 w-full resize-y rounded-2xl border border-line bg-surface px-4 py-3 text-base leading-6 text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20" />
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="brand" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 size={16} className="animate-spin-slow" /> : <Send size={16} />} Submit for review
        </Button>
        {errorMessage ? <p className="text-sm text-red-600" role="alert">{errorMessage}</p> : null}
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">Submissions are reviewed before publishing. Your email, if provided, is never shown publicly.</p>
    </form>
  );
}

function Field({ label, name, type = "text", placeholder, required = false }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-ink">{label}
      <input type={type} name={name} placeholder={placeholder} required={required} className="mt-2 h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20" />
    </label>
  );
}
