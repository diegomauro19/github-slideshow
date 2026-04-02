"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { QuickCapture } from "@/components/layout/quick-capture";
import { cn } from "@/lib/utils/cn";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          collapsed ? "ml-16" : "ml-60"
        )}
      >
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      </div>

      <QuickCapture sidebarCollapsed={collapsed} />
    </>
  );
}
