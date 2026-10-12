import { cn } from "@/lib/utils";

/**
 * Ambient animated aurora field. Pure CSS (transform + blur), no JS cost.
 * Sits behind hero-style sections; respects prefers-reduced-motion globally.
 */
export function AuroraBackground({ className, variant = "hero" }: { className?: string; variant?: "hero" | "subtle" }) {
  const scale = variant === "subtle" ? 0.6 : 1;
  return (
    <div className={cn("aurora-field", className)} aria-hidden="true">
      <div
        className="aurora-blob aurora-blob--a"
        style={{ width: 520 * scale, height: 520 * scale, left: "-8%", top: "-14%" }}
      />
      <div
        className="aurora-blob aurora-blob--b"
        style={{ width: 460 * scale, height: 460 * scale, right: "-10%", top: "-6%" }}
      />
      <div
        className="aurora-blob aurora-blob--c"
        style={{ width: 420 * scale, height: 420 * scale, left: "22%", bottom: "-22%" }}
      />
    </div>
  );
}
