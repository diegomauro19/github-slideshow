"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Swords, Plus, X } from "lucide-react";
import { SessionList } from "@/components/wargaming/session-list";
import { SessionSetup } from "@/components/wargaming/session-setup";

function WargamingContent() {
  const searchParams = useSearchParams();
  const [showSetup, setShowSetup] = useState(
    searchParams.get("new") === "true"
  );

  return (
    <div className="min-h-screen bg-bg px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 font-serif text-2xl font-semibold text-text">
              <Swords className="h-6 w-6 text-amber" />
              Wargaming Engine
            </h1>
            <p className="mt-1 max-w-xl text-sm text-text-secondary">
              Stress-test your theses through multi-actor adversarial
              simulations. Assign mental models, launch rounds, and surface
              blind spots before you publish.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSetup(!showSetup)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              showSetup
                ? "bg-surface border border-[#1e1e22] text-text-secondary hover:text-text"
                : "bg-amber/10 text-amber hover:bg-amber/20"
            )}
          >
            {showSetup ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                New Wargame
              </>
            )}
          </button>
        </div>

        {/* Setup Form */}
        {showSetup && (
          <div className="rounded-xl border border-amber/20 bg-surface p-6">
            <SessionSetup />
          </div>
        )}

        {/* Session List */}
        <SessionList />
      </div>
    </div>
  );
}

export default function WargamingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" />}>
      <WargamingContent />
    </Suspense>
  );
}
