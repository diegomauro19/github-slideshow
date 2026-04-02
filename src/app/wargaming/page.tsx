"use client";

import { useState } from "react";
import { Swords, Plus, X } from "lucide-react";
import { SessionSetup } from "@/components/wargaming/session-setup";
import { SessionList } from "@/components/wargaming/session-list";

export default function WargamingPage() {
  const [showSetup, setShowSetup] = useState(false);

  return (
    <div className="min-h-screen bg-bg px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Hero */}
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Swords className="h-5 w-5 text-amber" />
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-text">
                Wargaming Engine
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
              Stress-test your ideas against adversarial mental models. Configure
              actors, select analytical lenses, and run multi-round simulations
              to discover blind spots before they become liabilities.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowSetup(!showSetup)}
            className="inline-flex items-center gap-2 rounded-lg bg-amber px-4 py-2.5 text-sm font-bold text-bg transition-colors hover:bg-amber-bright"
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
            <h2 className="mb-6 text-base font-semibold text-text">
              Configure Wargame
            </h2>
            <SessionSetup />
          </div>
        )}

        {/* Session List */}
        <SessionList />
      </div>
    </div>
  );
}
