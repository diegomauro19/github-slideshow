"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "default" | "lg";
}

const sizeClasses = {
  sm: "h-7 w-7 text-xs",
  default: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "default", ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);
    const showFallback = !src || imgError;

    const initials = React.useMemo(() => {
      if (fallback) return fallback;
      if (!alt) return "?";
      return alt
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }, [alt, fallback]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#2a2a2e] bg-[#18181c]",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showFallback ? (
          <span className="font-medium text-[#9e9890] select-none">
            {initials}
          </span>
        ) : (
          <img
            src={src}
            alt={alt || ""}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
