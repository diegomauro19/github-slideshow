"use client";

import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/capture": "Capture",
  "/research": "Research",
  "/essays": "Essays",
  "/wargaming": "Wargaming",
  "/calendar": "Calendar",
  "/growth": "Growth",
  "/settings": "Settings",
};

function resolveTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  // Match first segment for nested routes
  const base = "/" + pathname.split("/").filter(Boolean)[0];
  return pageTitles[base] ?? "Lumen";
}

export function TopBar() {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-surface-raised px-6">
      <h1 className="font-serif text-xl font-medium text-text">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button
          className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-raised hover:text-text"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {/* Avatar placeholder */}
        <button
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-surface-raised text-text-secondary transition-colors hover:text-text"
          )}
          aria-label="User menu"
        >
          <User size={16} />
        </button>
      </div>
    </header>
  );
}
