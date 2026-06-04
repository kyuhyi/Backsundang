import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // 골드 솔리드 — 주요 CTA
        default:
          "bg-gold text-ink hover:bg-gold-bright shadow-[0_8px_30px_-12px_rgba(201,162,75,0.7)] hover:shadow-[0_10px_40px_-10px_rgba(201,162,75,0.9)] hover:-translate-y-0.5",
        // 골드 아웃라인
        outline:
          "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5",
        // 고스트
        ghost: "text-cream hover:text-gold hover:bg-cream/5",
        // 링크
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
