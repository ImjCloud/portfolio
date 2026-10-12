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
      setRֻǱ˞