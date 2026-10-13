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
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/45">Explore</p>
            <div className="mt-4 grid gap-2.5">
              {navigation.slice(0, 4).map((item) => <Link key={item.href} href={item.href} className="text-sm text-paper/75 transition hover:text-white">{item.label}</Link>)}
              {secondaryLinks.map((item) => <Link key={item.href} href={item.href} className="text-sm text-paper/75 transition hover:text-white">{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/45">Connect</p>
            <div className="mt-4 grid gap-3">
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-paper/75 transition hover:text-white"><Linkedin size={15} /> LinkedIn</a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm text-paper/75 transition hover:text-white"><Mail size={15} /> Email</a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-paper/75 transition hover:text-white"><MessageCircle size={15} /> WhatsApp</a>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/45">Availability</p>
            <p className="mt-4 text-sm leading-6 text-paper/75">Open to UK remote and hybrid business analysis, product delivery and transformation roles.</p>
          </div>
        </div>
      </div>
      <div className="container relative flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Oluwadamilola John Joseph. Built for thoughtful delivery.</p>
        <a href="#top" className="transition hover:text-white">Back to top ↑</a>
      </div>
    </footer>
  );
}
