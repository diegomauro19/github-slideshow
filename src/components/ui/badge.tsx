"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[#d4a843]/20 bg-[#d4a843]/10 text-[#d4a843]",
        secondary:
          "border-[#2a2a2e] bg-[#18181c] text-[#9e9890]",
        success:
          "border-[#6dbf7b]/20 bg-[#6dbf7b]/10 text-[#6dbf7b]",
        danger:
          "border-[#d47b7b]/20 bg-[#d47b7b]/10 text-[#d47b7b]",
        info:
          "border-[#7b9fd4]/20 bg-[#7b9fd4]/10 text-[#7b9fd4]",
        purple:
          "border-[#b39bd4]/20 bg-[#b39bd4]/10 text-[#b39bd4]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
