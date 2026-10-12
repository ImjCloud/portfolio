export const siteConfig = {
  name: "Oluwadamilola John Joseph",
  shortName: "Oluwadamilola Joseph",
  title: "Business Analyst & Agile Delivery Specialist",
  description:
    "Portfolio and CV of Oluwadamilola John Joseph, a Business Analyst and Agile Delivery Specialist delivering measurable outcomes across SaaS, fintech, HR-tech and operations.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://oluwadamilola-joseph.vercel.app",
  email: "jholuwadamilola@gmail.com",
  phone: "+234 706 470 6095",
  location: "Lagos, Nigeria",
  locationLong: "Lagos, Nigeria. Actively planning relocation to the UK",
  linkedin: "https://www.linkedin.com/in/oluwadamilola-joseph-578088b0",
  // Add a real Calendly (or similar) link here to show a "Book a call" option on /contact.
  calendlyUrl: "https://calendar.app.google/n7yt96xvFxCVWCx9A" as string,
  relocation: "Actively planning relocation to the UK",
  sponsorship: "Requires visa sponsorship",
};

export const navigation = [
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Work" },
  { href: "/skills/", label: "Skills" },
  { href: "/downloads/", label: "Downloads" },
  { href: "/contact/", label: "Contact" },
  { href: "/certifications/", label: "Certifications" },
  { href: "/testimonials/", label: "Testimonials" },
] as const;

export const stats = [
  { value: 3, suffix: "+", label: "Years delivering digital products" },
  { value: 30, suffix: "%", label: "FaֻǱ˞