"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-auto",
      "[scrollbar-width:thin]",
      "[scrollbar-color:#2a2a2e_transparent]",
      "[&::-webkit-scrollbar]:w-1.5",
      "[&::-webkit-scrollbar]:h-1.5",
      "[&::-webkit-scrollbar-track]:bg-transparent",
      "[&::-webkit-scrollbar-thumb]:rounded-full",
      "[&::-webkit-scrollbar-thumb]:bg-[#2a2a2e]",
      "[&::-webkit-scrollbar-thumb:hover]:bg-[#3a3a3e]",
      "[&::-webkit-scrollbar-corner]:bg-transparent",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
