import { MetricsBar } from "@/components/dashboard/metrics-bar";
import { PipelineKanban } from "@/components/dashboard/pipeline-kanban";
import { IntelligenceFeed } from "@/components/dashboard/intelligence-feed";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { MiniAnalytics } from "@/components/dashboard/mini-analytics";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-6 font-serif text-2xl font-semibold text-text">
          Command Center
        </h1>

        <div className="flex flex-col gap-4">
          {/* Top: Metrics Bar */}
          <MetricsBar />

          {/* Pipeline Kanban */}
          <PipelineKanban />

          {/* Two-column: Intelligence Feed + Activity Timeline */}
          <div className="grid gap-4 lg:grid-cols-2">
            <IntelligenceFeed />
            <ActivityTimeline />
          </div>

          {/* Bottom: Mini Analytics */}
          <MiniAnalytics />
        </div>
      </div>
    </div>
  );
}
