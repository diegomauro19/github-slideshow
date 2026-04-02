"use client";

import * as React from "react";
import { ResearchLauncher } from "@/components/research/research-launcher";
import { ResearchResults } from "@/components/research/research-results";
import { ResearchHistory } from "@/components/research/research-history";
import { FlaskConical, Telescope } from "lucide-react";

export default function ResearchPage() {
  const [hasResults] = React.useState(true);

  return (
    <div className="min-h-screen bg-[#08080a]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d4a843]/10">
            <FlaskConical className="h-5 w-5 text-[#d4a843]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#e8e4df]">
              Research Station
            </h1>
            <p className="text-sm text-[#9e9890]">
              Launch deep research sessions and collect findings for your essays
            </p>
          </div>
        </div>

        {/* Research launcher - full width */}
        <div className="mb-8">
          <ResearchLauncher />
        </div>

        {/* Results area */}
        {hasResults ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
            {/* Left: Research results */}
            <div className="min-w-0">
              <ResearchResults />
            </div>

            {/* Right: Research history sidebar */}
            <aside className="min-w-0">
              <ResearchHistory />
            </aside>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-lg border border-[#1e1e22] bg-[#111114] px-6 py-20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#18181c]">
              <Telescope className="h-8 w-8 text-[#9e9890]/50" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#e8e4df]">
              Launch your first research session
            </h3>
            <p className="max-w-sm text-center text-sm leading-relaxed text-[#9e9890]">
              Enter a question above and select a research type to begin.
              Findings will appear here organized by category with confidence
              scores and source links.
            </p>
            <div className="mt-6 flex items-center gap-6 text-xs text-[#9e9890]/40">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#6dbf7b]/30" />
                Key Findings
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#7b9fd4]/30" />
                Data Points
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#d47b7b]/30" />
                Counter-Arguments
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#d4a843]/30" />
                Synthesis
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
