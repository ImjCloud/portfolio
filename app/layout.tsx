import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileQuickActions } from "@/components/mobile-quick-actions";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.shortName} | ${siteConfig.title}`, template: `%s | ${siteConfig.shortName}` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  keywords: ["Business Analyst", "Agile Delivery Specialist", "Product Analyst", "Project Manager", "SaaS", "Fintech", "UK"],
  openGraph: { type: "website", locale: "en_GB", url: "/", siteName: siteConfig.shortName, title: `${siteConfig.shortName} | ${siteConfig.title}`, description: siteConfig.description },
  twitter: { card: "summary_large_image", title: `${siteConfig.shortName} | ${siteConfig.title}`, description: siteConfig.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#080b17", colorScheme: "light dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siֻǱ˞