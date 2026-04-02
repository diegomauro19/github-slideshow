"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mic,
  Search,
  FileText,
  Swords,
  Calendar,
  TrendingUp,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Capture", icon: Mic, href: "/capture" },
  { label: "Research", icon: Search, href: "/research" },
  { label: "Essays", icon: FileText, href: "/essays" },
  { label: "Wargaming", icon: Swords, href: "/wargaming" },
  { label: "Calendar", icon: Calendar, href: "/calendar" },
  { label: "Growth", icon: TrendingUp, href: "/growth" },
  { label: "Settings", icon: Settings, href: "/settings" },
] as const;

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-surface-raised bg-surface transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          {collapsed ? (
            <span className="font-serif text-2xl font-semibold text-amber drop-shadow-[0_0_8px_rgba(212,168,67,0.3)]">
              L
            </span>
          ) : (
            <span className="font-serif text-2xl font-semibold tracking-[0.2em] text-amber drop-shadow-[0_0_8px_rgba(212,168,67,0.3)]">
              LUMEN
            </span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="text-text-secondary transition-colors hover:text-text"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-2">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href as any}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-amber-dim text-amber"
                  : "text-text-secondary hover:bg-surface-raised hover:text-text",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon
                size={20}
                className={cn(
                  "shrink-0",
                  isActive
                    ? "text-amber"
                    : "text-text-secondary group-hover:text-text"
                )}
              />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom label */}
      <div
        className={cn(
          "border-t border-surface-raised px-4 py-4",
          collapsed ? "text-center" : ""
        )}
      >
        {collapsed ? (
          <span className="font-mono text-[10px] text-text-dim">OE</span>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
            OODA Engine
          </span>
        )}
      </div>
    </aside>
  );
}
