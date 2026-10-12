import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TestimonialsSection } from "@/components/testimonials-section";

export const metadata: Metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Recommendations from people I've worked with."
        description="Every recommendation below was submitted directly and reviewed before publishing. Nothing here is invented."
      />
      <section className="section container">
        <TestimonialsSection />
      </section>
    </>
  );
}
