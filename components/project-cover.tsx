import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  category: string;
  className?: string;
};

/** Deterministic accent pick so the same category always renders the same cover. */
function pickPalette(category: string) {
  const palettes = [
    { a: "hsl(var(--brand))", b: "hsl(var(--brand-2))" },
    { a: "hsl(var(--brand-2))", b: "hsl(var(--teal))" },
    { a: "hsl(var(--teal))", b: "hsl(var(--brand))" },
    { a: "hsl(var(--accent))", b: "hsl(var(--brand-2))" },
  ];
  let hash = 0;
  for (const char of category) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return palettes[hash % palettes.length];
}

export function ProjectCover({ category, className }: ProjectCoverProps) {
  const { a, b } = pickPalette(category);
  const gradientId = `cover-${category.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;

  return (
    <div className={cn("relative isolate overflow-hidden rounded-[1.4rem] bg-surface", className)}>
      <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={a} stopOpacity="0.22" />
            <stop offset="100%" stopColor={b} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill={`url(#${gradientId})`} />
        {/* signature motif: layered process lines, echoing process-mapping / workflֻǱ˞