import type { Metadata } from "next";
import { CalendarCheck, Globe2, Linkedin, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

const whatsappNumber = siteConfig.phone.replace(/[^\d]/g, "");

const channels = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Message directly", href: `https://wa.me/${whatsappNumber}` },
  { icon: Linkedin, label: "LinkedIn", value: "Connect professionally", href: siteConfig.linkedin },
  { icon: MapPin, label: "Location", value: siteConfig.locationLong, href: null },
];

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="The best conversations begin with a real challenge." description="If you're looking for an analyst or delivery partner who brings structure, empathy and follow-through, I'd be glad to hear from you.">
        {siteConfig.calendlyUrl ? (
          <div className="mt-7">
            <a href={siteConfig.calendlyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"><CalendarCheck size={17} /> Book a call directly</a>
          </div>
        ) : null}
      </PageHero>
      <section className="section container">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <aside>
            <p className="eyebrow">Ways to connect</p>
            <div className="mt-6 grid gap-4">
              {channels.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand"><Icon size={20} /></span>
                    <span><span className="block text-sm font-semibold text-ink">{label}</span><span className="mt-1 block text-sm leading-6 text-muted">{value}</span></span>
                  </>
                );
                return href ? (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="flex items-start gap-4 rounded-3xl border border-line bg-paper p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow">
                    {inner}
                  </a>
                ) : (
                  <div key={label} className="flex items-start gap-4 rounded-3xl border border-line bg-paper p-5 shadow-card">{inner}</div>
                );
              })}
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-3xl border border-brand/20 bg-brand/5 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-brand"><CalendarCheck size={17} /> Availability</p>
                <p className="mt-2 text-sm leading-6 text-muted">Open to UK remote and hybrid roles, with a two-week notice period.</p>
              </div>
              <div className="rounded-3xl border border-line bg-paper p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink"><Globe2 size={17} /> Relocation</p>
                <p className="mt-2 text-sm leading-6 text-muted">{siteConfig.relocation}</p>
              </div>
              <div className="rounded-3xl border border-line bg-paper p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink"><ShieldCheck size={17} /> Visa sponsorship</p>
                <p className="mt-2 text-sm leading-6 text-muted">{siteConfig.sponsorship}</p>
              </div>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
