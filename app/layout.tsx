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
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
    email: siteConfig.email,
    sameAs: [siteConfig.linkedin],
    knowsAbout: ["Business Analysis", "Agile Delivery", "Product Delivery", "Requirements Engineering", "Digital Transformation"],
  };
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body id="top">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-ink px-4 py-3 text-paper focus:not-sr-only">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <div aria-hidden="true" className="h-20 sm:hidden" />
        <MobileQuickActions />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </body>
    </html>
  );
}
