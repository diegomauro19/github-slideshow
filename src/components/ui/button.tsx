"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#d4a843] text-[#08080a] hover:bg-[#c49a3a] active:bg-[#b88f32] shadow-sm shadow-[#d4a843]/10",
        secondary:
          "bg-[#18181c] text-[#e8e4df] border border-[#2a2a2e] hover:bg-[#222226] hover:border-[#3a3a3e] active:bg-[#2a2a2e]",
        ghost:
          "text-[#9e9890] hover:text-[#e8e4df] hover:bg-[#18181c] active:bg-[#111114]",
        destructive:
          "bg-[#d47b7b]/10 text-[#d47b7b] border border-[#d47b7b]/20 hover:bg-[#d47b7b]/20 hover:border-[#d47b7b]/30 active:bg-[#d47b7b]/25",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        default: "h-9 px-4 py-2",
        lg: "h-11 px-6 text-base rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
