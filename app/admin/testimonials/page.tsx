import type { Metadata } from "next";
import { AdminTestimonialsPanel } from "@/components/admin-testimonials-panel";

export const metadata: Metadata = { title: "Testimonial moderation", robots: { index: false, follow: false } };

export default function AdminTestimonialsPage() {
  return (
    <section className="container py-16">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink">Pending recommendations</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">Enter the admin secret configured in your deployment&apos;s environment variables to review and publish submissions.</p>
      <div className="mt-8"><AdminTestimonialsPanel /></div>
    </section>
  );
}
