"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "animate-pulse rounded-md bg-[#18181c]",
      className
    )}
    {...props}
  />
));
Skeleton.displayName = "Skeleton";

export { Skeleton };
