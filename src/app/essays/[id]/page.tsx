"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EssayStatusTracker } from "@/components/essays/essay-status-tracker";
import { SeedTab } from "@/components/essays/seed-tab";
import { DraftTab } from "@/components/essays/draft-tab";
import { ReviewTab } from "@/components/essays/review-tab";
import { WargameTab } from "@/components/essays/wargame-tab";
import { PublishTab } from "@/components/essays/publish-tab";
import { AnalyticsTab } from "@/components/essays/analytics-tab";
import {
  ArrowLeft,
  Pencil,
  Sprout,
  FileEdit,
  CheckCircle,
  Swords,
  Send,
  BarChart3,
} from "lucide-react";

const MOCK_ESSAY = {
  id: "essay-3",
  number: 41,
  title: "Dissolving the Productivity Myth",
  type: "essay" as const,
  currentStage: "draft" as const,
  stages: [
    { key: "seed" as const, label: "Seed", completedAt: "Mar 20, 10:14am" },
    { key: "draft" as const, label: "Draft", completedAt: undefined },
    { key: "review" as const, label: "Review", completedAt: undefined },
    { key: "approved" as const, label: "Approved", completedAt: undefined },
    { key: "scheduled" as const, label: "Scheduled", completedAt: undefined },
    { key: "published" as const, label: "Published", completedAt: undefined },
  ],
};

export default function EssayWorkspacePage() {
  const [title, setTitle] = useState(MOCK_ESSAY.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <div className="min-h-screen bg-[#08080a] flex">
      {/* Left Sidebar */}
      <aside className="w-[220px] flex-shrink-0 border-r border-[#1e1e22] bg-[#111114]/50 p-5">
        <button
          onClick={() => (window.location.href = "/essays")}
          className="flex items-center gap-1.5 text-xs text-[#5e5a54] hover:text-[#9e9890] transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Pipeline
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-medium text-[#5e5a54] uppercase tracking-wider">
            Progress
          </span>
        </div>

        <EssayStatusTracker
          currentStage={MOCK_ESSAY.currentStage}
          stages={MOCK_ESSAY.stages}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <span className="text-sm font-mono text-[#5e5a54] mt-1.5">
              #{MOCK_ESSAY.number}
            </span>
            <div>
              {isEditingTitle ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setIsEditingTitle(false);
                  }}
                  autoFocus
                  className="text-2xl font-bold text-[#e8e4df] bg-transparent border-b border-[#d4a843]/40 outline-none pb-0.5 w-full tracking-tight"
                />
              ) : (
                <h1
                  onClick={() => setIsEditingTitle(true)}
                  className="text-2xl font-bold text-[#e8e4df] cursor-text hover:text-[#d4a843] transition-colors tracking-tight"
                >
                  {title}
                </h1>
              )}
              <div className="flex items-center gap-2 mt-1.5">
                <Badge variant="default" className="text-[10px]">
                  {MOCK_ESSAY.type}
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  {MOCK_ESSAY.currentStage}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsEditingTitle(true)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="draft">
          <TabsList className="mb-6">
            <TabsTrigger value="seed">
              <Sprout className="h-3.5 w-3.5 mr-1.5" />
              Seed
            </TabsTrigger>
            <TabsTrigger value="draft">
              <FileEdit className="h-3.5 w-3.5 mr-1.5" />
              Draft
            </TabsTrigger>
            <TabsTrigger value="review">
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              Review
            </TabsTrigger>
            <TabsTrigger value="wargame">
              <Swords className="h-3.5 w-3.5 mr-1.5" />
              Wargame
            </TabsTrigger>
            <TabsTrigger value="publish">
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Publish
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="seed">
            <SeedTab />
          </TabsContent>
          <TabsContent value="draft">
            <DraftTab />
          </TabsContent>
          <TabsContent value="review">
            <ReviewTab />
          </TabsContent>
          <TabsContent value="wargame">
            <WargameTab />
          </TabsContent>
          <TabsContent value="publish">
            <PublishTab />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
