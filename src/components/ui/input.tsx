"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-[#2a2a2e] bg-[#111114] px-3 py-1 text-sm text-[#e8e4df] shadow-sm shadow-black/10 transition-colors",
        "placeholder:text-[#5e5a54]",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#e8e4df]",
        "hover:border-[#3a3a3e]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843]/50 focus-visible:border-[#d4a843]/40",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
