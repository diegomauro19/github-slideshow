"use client";

import { useState, useCallback } from "react";
import { Mic, SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils/cn";

async function saveInsight(content: string) {
  // TODO: Replace with actual Supabase call
  // e.g. supabase.from("insights").insert({ content, created_at: new Date().toISOString() })
  console.log("[QuickCapture] Saved insight:", content);
}

export function QuickCapture({ sidebarCollapsed }: { sidebarCollapsed?: boolean }) {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || saving) return;

    setSaving(true);
    try {
      await saveInsight(trimmed);
      setValue("");
    } finally {
      setSaving(false);
    }
  }, [value, saving]);

  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 z-30 border-t border-surface-raised bg-surface-raised/80 backdrop-blur-sm transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-60"
      )}
    >
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-6 py-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-surface-raised bg-surface px-4 py-2.5 focus-within:border-amber/30">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Capture a quick insight..."
            className="flex-1 bg-transparent text-sm text-text placeholder:text-text-dim outline-none"
            disabled={saving}
          />
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || saving}
            className={cn(
              "rounded-md p-1.5 transition-colors",
              value.trim()
                ? "text-amber hover:text-amber-bright"
                : "text-text-dim"
            )}
            aria-label="Submit insight"
          >
            <SendHorizonal size={16} />
          </button>
        </div>
        <button
          className="rounded-lg border border-surface-raised bg-surface p-2.5 text-text-secondary transition-colors hover:border-amber/30 hover:text-amber"
          aria-label="Voice capture"
        >
          <Mic size={18} />
        </button>
      </div>
    </div>
  );
}
