"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "flex h-9 w-full appearance-none rounded-md border border-[#2a2a2e] bg-[#111114] px-3 py-1 pr-8 text-sm text-[#e8e4df] shadow-sm shadow-black/10 transition-colors",
          "hover:border-[#3a3a3e]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a843]/50 focus-visible:border-[#d4a843]/40",
          "disabled:cursor-not-allowed disabled:opacity-40",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5e5a54]"
        width="12"
        height="12"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
});
Select.displayName = "Select";

const SelectOption = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, ...props }, ref) => (
  <option
    ref={ref}
    className={cn("bg-[#111114] text-[#e8e4df]", className)}
    {...props}
  />
));
SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
