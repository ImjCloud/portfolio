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
            <a href={siteConfig.calendlyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 text-sm font-semiboֻǱ˞