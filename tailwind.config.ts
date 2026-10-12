import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "hsl(var(--ink))",
        paper: "hsl(var(--paper))",
        surface: "hsl(var(--surface))",
        surface2: "hsl(var(--surface-2))",
        muted: "hsl(var(--muted))",
        line: "hsl(var(--line))",
        brand: "hsl(var(--brand))",
        brand2: "hsl(var(--brand-2))",
        accent: "hsl(var(--accent))",
        teal: "hsl(var(--teal))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 24px 70px -28px hsl(var(--brand) / 0.5)",
        card: "0 1px 2px hsl(var(--ink) / 0.04), 0 18px 45px -30px hsl(var(--ink) / 0.35)",
        ring: "0 0 0 1px hsl(var(--line))",
        "glass-lg": "0 40px 90px -40px hsl(var(--glass-shadow) / 0.65)",
      },
      borderRadius: { "4xl": "1.75rem", "5xl": "2.25rem" },
      backgroundImage: {
        "grid-light": "linear-gradient(hsl(var(--line)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--line)) 1px, transparent 1px)",
        "brand-gradient": "linear-gradient(135deg, hsl(var(--brand)) 0%, hsl(var(--brand-2)) 100%)",
        "aurora-gradient": "linear-gradient(100deg, hsl(var(--brand)) 0%, hsl(var(--brand-2)) 45%, hsl(var(--teal)) 10ֻǱ˞