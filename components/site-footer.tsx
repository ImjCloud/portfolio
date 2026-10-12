import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail, MessageCircle } from "lucide-react";
import { navigation, siteConfig } from "@/data/site";

const secondaryLinks = [
  { href: "/resume/", label: "Resume" },
  { href: "/certifications/", label: "Certifications" },
  { href: "/testimonials/", label: "Testimonials" },
  { href: "/references/", label: "References" },
];

export function SiteFooter() {
  const whatsappNumber = siteConfig.phone.replace(/[^\d]/g, "");
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink text-paper">
      <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand/25 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-teal/20 blur-[100px]" />
      <div className="container relative grid gap-12 py-16 md:grid-cols-[1.25fr_1fr] md:py-24">
        <div>
          <p className="eyebrow text-accent">Availability open</p>
          <p className="mt-5 max-w-md text-3xl font-semibold leading-[1.1] tracking-[-0.03em]">Let&apos;s make delivery feel certain.</p>
          <a href={`mailto:${siteConfig.email}`} className="mt-6 inline-flex items-center gap-2 text-paper/70 transition hover:text-white">
            {siteConfig.email} <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] font-sֻǱ˞