"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nOrganisation: ${data.get("company") || "Not provided"}\n\nMessage:\n${data.get("message")}`);
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `Portfolio enquiry from ${data.get("name")}`);
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-4xl border border-line bg-paper p-6 shadow-card sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="mt-5"><Field label="Organisation (optional)" name="company" autoComplete="organization" /></div>
      <label className="mt-5 block text-sm font-semibold text-ink">Message
        <textarea name="message" required rows={6} placeholder="Tell me a little about the opportunity or challenge." className="mt-2 w-full resize-y rounded-2xl border border-line bg-surface px-4 py-3 text-base leading-6 text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20" />
      </label>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="brand" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 size={16} className="animate-spin-slow" /> : <Send size={16} />} Send enquiry
        </Button>
        {status === "sent" ? <p className="text-sm text-brand" role="status">{WEB3FORMS_KEY ? "Thanks, your message is on its way." : "Your email client should now be open with the message prepared."}</p> : null}
        {status === "error" ? <p className="text-sm text-red-600" role="status">Something went wrong. Please email {siteConfig.email} directly.</p> : null}
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", autoComplete, required = false }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-ink">{label}
      <input type={type} name={name} autoComplete={autoComplete} required={required} className="mt-2 h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20" />
    </label>
  );
}
