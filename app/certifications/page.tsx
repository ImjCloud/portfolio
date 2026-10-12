import type { Metadata } from "next";
import { BadgeCheck, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { certifications } from "@/data/site";
import { DynamicContentList } from "@/components/dynamic-content-list";

export const metadata: Metadata = { title: "Certifications" };

export default function CertificationsPage() {
  return (
    <>
      <PageHero eyebrow="Certifications" title="Credentials that support a practical delivery practice." description="Hands-on agile and business-analysis credentials, plus BA credentials currently underway." />
      <section className="section container">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((item, index) => {
            const inProgress = item.status.toLowerCase() !== "completed";
            return (
              <article key={item.name} className="relative overflow-hidden rounded-4xl border border-line bg-paper p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-glow">
                <span className="absolute -right-4 -top-5 font-mono text-8xl font-semibold text-brand/[.07]">0{index + 1}</span>
                {inProgress ? <Clock size={24} className="text-accent" /> : <BadgeCheck size={24} className="text-brand" />}
                <p className={`mt-10 text-xs font-bold uppercase tracking-[0.13em] ${inProgress ? "text-accent" : "text-brand"}`}>{item.status}</p>
                <h2 clasֻǱ˞