"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SubscriberMetrics } from "@/components/growth/subscriber-metrics";
import { EssayPerformance } from "@/components/growth/essay-performance";
import { ReferrerAnalysis } from "@/components/growth/referrer-analysis";
import { GrowthActions } from "@/components/growth/growth-actions";
import { CSuiteTracker } from "@/components/growth/csuite-tracker";

export default function GrowthPage() {
  const [csuiteOpen, setCsuiteOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green" />
          <h1 className="text-2xl font-bold text-text">Growth Dashboard</h1>
        </div>
        <p className="mt-1 text-sm text-text-dim">
          Track subscribers, essay performance, and growth initiatives.
        </p>
      </div>

      {/* Subscriber metrics - full width */}
      <SubscriberMetrics />

      {/* Two columns: essay performance + referrer analysis */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <EssayPerformance />
        </div>
        <div className="lg:col-span-2">
          <ReferrerAnalysis />
        </div>
      </div>

      {/* Growth actions */}
      <GrowthActions />

      {/* C-Suite tracker - collapsible */}
      <div>
        <button
          onClick={() => setCsuiteOpen(!csuiteOpen)}
          className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text"
        >
          {csuiteOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          C-Suite Target Tracker
        </button>
        {csuiteOpen && <CSuiteTracker />}
      </div>
    </div>
  );
}
