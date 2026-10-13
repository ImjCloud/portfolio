import type { Metadata } from "next";
import { AdminReferencesPanel } from "@/components/admin-references-panel";

export const metadata: Metadata = { title: "Reference letters", robots: { index: false, follow: false } };

export default function AdminReferencesPage() {
  return (
    <section className="container py-16">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-ink">Reference letters</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">Upload signed reference letters as PDFs. They appear on the public References page immediately, no separate approval step, since only you can reach this page.</p>
      <div className="mt-8"><AdminReferencesPanel /></div>
    </section>
  );
}
