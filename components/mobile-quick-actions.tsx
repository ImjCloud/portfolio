"use client";

import { Download, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";

/**
 * Fixed to the bottom of the viewport on small screens only, giving recruiters
 * one-tap access to the actions that matter most on mobile, without hunting
 * back through the page. Hidden entirely on larger screens, where the header
 * already covers this.
 */
export function MobileQuickActions() {
  const whatsappNumber = siteConfig.phone.replace(/[^\d]/g, "");

  const actions = [
    { icon: Phone, label: "Call", href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", href: `https://wa.me/${whatsappNumber}`, external: true },
    { icon: Download, label: "CV", href: "/downloads/resume.pdf", download: true },
  ];

  return (
    <nav
      aria-label="Quick contact actions"
      className="glass-strong fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1 rounded-2xl p-1.5 shadow-glass-lg sm:hidden print:hidden"
      style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
    >
      {actions.map(({ icon: Icon, label, href, external, download }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          download={download}
          className="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-ink transition active:scale-95 active:bg-brand/10"
        >ֻǱ˞