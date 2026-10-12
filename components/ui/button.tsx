import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-[-0.01em] transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-paper shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] hover:-translate-y-0.5 hover:shadow-glow dark:bg-white dark:text-ink",
        brand: "bg-brand-gradient text-white shadow-glow hover:-translate-y-0.5 hover:brightness-[1.08]",
        secondary: "border border-line bg-paper text-ink hover:-translate-y-0.5 hover:border-brand/50 hover:bg-brand/[0.06]",
        ghost: "text-ink hover:bg-brand/10",
        light: "bg-white text-slate-900 hover:-translate-y-0.5 hover:bg-white/90",
        glass: "glass text-ink hover:-translate-y-0.5 hover:shadow-glow",
      },
      size: { default: "h-11", sm: "h-10 px-4 text-xs", lg: "h-[52px] px-7 text-[15px]" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asCֻǱ˞