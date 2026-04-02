"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceRecorder } from "@/components/capture/voice-recorder";
import { TextCapture } from "@/components/capture/text-capture";
import { InsightLibrary } from "@/components/capture/insight-library";
import { SlackImport } from "@/components/capture/slack-import";

export default function CapturePage() {
  return (
    <div className="min-h-screen bg-[#08080a]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[#e8e4df]">
            Insight Capture
          </h1>
          <p className="mt-1 text-sm text-[#9e9890]">
            Capture ideas from voice, text, Slack, and research. Link them to essays.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Left column: Voice + Text (stacked) */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <VoiceRecorder />
            <TextCapture />
          </div>

          {/* Right column: Insight Library */}
          <div className="lg:col-span-3">
            <InsightLibrary />
          </div>
        </div>

        {/* Slack import - expandable section */}
        <div className="mt-6">
          <SlackImport />
        </div>

        {/* Suggest essay button */}
        <div className="mt-8 flex justify-center">
          <Button size="lg" className="px-8 text-base font-semibold">
            <Sparkles className="mr-2 h-5 w-5" />
            Suggest essay from unused insights
          </Button>
        </div>
      </div>
    </div>
  );
}
