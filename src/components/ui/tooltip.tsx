"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface TooltipProps {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactElement;
  className?: string;
  delayMs?: number;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, side = "top", children, className, delayMs = 300 }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    const show = () => {
      timeoutRef.current = setTimeout(() => setVisible(true), delayMs);
    };

    const hide = () => {
      clearTimeout(timeoutRef.current);
      setVisible(false);
    };

    React.useEffect(() => {
      return () => clearTimeout(timeoutRef.current);
    }, []);

    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
      <div
        ref={ref}
        className="relative inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
        {visible && (
          <div
            role="tooltip"
            className={cn(
              "absolute z-50 whitespace-nowrap rounded-md border border-[#1e1e22] bg-[#18181c] px-3 py-1.5 text-xs text-[#e8e4df] shadow-md shadow-black/30",
              "animate-in fade-in-0",
              positionClasses[side],
              className
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";

export { Tooltip };
