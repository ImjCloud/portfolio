import type { Metadata } from "next";
import { AdminContentPanel } from "@/components/admin-content-panel";

export const metadata: Metadata = { title: "Upload content", robots: { index: false, follow: false } };

export default function AdminContentPage() {
  return (
    <section className="container py-16">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink">Upload content</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
        Add a certificate, skill, or piece of work experience, with a name, description, tools used, and an optional document or picture.
        It appears on the matching public page immediately, no approval step, since only you can reach this page.
      </p>
      <div className="mt-8"><AdminContentPanel /></div>
    </section>
  );
}
