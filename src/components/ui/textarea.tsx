"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-[#2a2a2e] bg-[#111114] px-3 py-2 text-sm text-[#e8e4df] shadow-sm shadow-black/10 transition-colors",
        "placeholder:text-[#5e5a54]",
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
Textarea.displayName = "Textarea";

export { Textarea };
