"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Send,
  CheckSquare,
  Square,
  BookOpen,
  Briefcase,
  AtSign,
  Image,
  Users,
  MessageSquare,
  Mail,
} from "lucide-react";

interface DistributionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  status: "ready" | "pending" | "draft";
}

const PULL_QUOTES = [
  "You are never truly distracted — you are always attending to something.",
  "The question isn't 'how do I focus better?' but 'what environment am I building for my awareness to inhabit?'",
];

const LINKEDIN_PREVIEW = `Most productivity advice fails because it treats attention like a resource.

But attention isn't a resource. It's an architecture.

Here's the shift that changed how I work (and think):

[Thread continues...]`;

const X_THREAD_PREVIEW = `1/ The productivity industry built a cathedral on quicksand.

Every hack presupposes a question it never asks: what are you paying attention to, and why?

A thread on the architecture of attention 🧵`;

const SOCIAL_TEASER =
  "New essay: why your calendar is a monument to someone else's urgency — and what to do about it.";

export function PublishTab() {
  const [scheduleDate, setScheduleDate] = useState("2026-04-07");
  const [scheduleTime, setScheduleTime] = useState("08:00");
  const [distribution, setDistribution] = useState<DistributionItem[]>([
    {
      id: "substack",
      label: "Publish to Substack",
      icon: <BookOpen className="h-3.5 w-3.5" />,
      checked: true,
      status: "ready",
    },
    {
      id: "calendar",
      label: "Create calendar event",
      icon: <Calendar className="h-3.5 w-3.5" />,
      checked: true,
      status: "ready",
    },
    {
      id: "instagram",
      label: "Generate Instagram card",
      icon: <Image className="h-3.5 w-3.5" />,
      checked: true,
      status: "draft",
    },
    {
      id: "linkedin",
      label: "Post to LinkedIn",
      icon: <Briefcase className="h-3.5 w-3.5" />,
      checked: true,
      status: "ready",
    },
    {
      id: "x",
      label: "Post X thread",
      icon: <AtSign className="h-3.5 w-3.5" />,
      checked: true,
      status: "ready",
    },
    {
      id: "beta",
      label: "Send to beta readers",
      icon: <Users className="h-3.5 w-3.5" />,
      checked: false,
      status: "pending",
    },
    {
      id: "slack",
      label: "Slack notification",
      icon: <MessageSquare className="h-3.5 w-3.5" />,
      checked: true,
      status: "ready",
    },
  ]);

  const toggleItem = (id: string) => {
    setDistribution((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedCount = distribution.filter((d) => d.checked).length;

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div>
        <h3 className="text-sm font-medium text-[#9e9890] mb-3">Preview</h3>
        <Card className="p-6">
          <h2 className="text-xl font-bold text-[#e8e4df] mb-1">
            The Architecture of Attention
          </h2>
          <p className="text-sm text-[#9e9890] mb-4">
            Why your calendar is a monument to someone else&apos;s urgency
          </p>
          <div className="space-y-3">
            {PULL_QUOTES.map((quote, i) => (
              <div
                key={i}
                className="border-l-2 border-[#d4a843]/40 pl-4 py-1"
              >
                <p className="text-sm text-[#e8e4df]/80 italic">
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Distribution Assets */}
      <div>
        <h3 className="text-sm font-medium text-[#9e9890] mb-3">
          Distribution Assets
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-3.5 w-3.5 text-[#7b9fd4]" />
              <span className="text-xs font-medium text-[#9e9890]">
                LinkedIn Post
              </span>
            </div>
            <p className="text-[11px] text-[#5e5a54] leading-relaxed whitespace-pre-line line-clamp-4">
              {LINKEDIN_PREVIEW}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AtSign className="h-3.5 w-3.5 text-[#7b9fd4]" />
              <span className="text-xs font-medium text-[#9e9890]">
                X Thread
              </span>
            </div>
            <p className="text-[11px] text-[#5e5a54] leading-relaxed whitespace-pre-line line-clamp-4">
              {X_THREAD_PREVIEW}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-3.5 w-3.5 text-[#b39bd4]" />
              <span className="text-xs font-medium text-[#9e9890]">
                Social Teaser
              </span>
            </div>
            <p className="text-[11px] text-[#5e5a54] leading-relaxed line-clamp-4">
              {SOCIAL_TEASER}
            </p>
          </Card>
        </div>
      </div>

      {/* Schedule Picker */}
      <div>
        <h3 className="text-sm font-medium text-[#9e9890] mb-3 flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          Schedule
        </h3>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={scheduleDate}
            onChange={(e) => setScheduleDate(e.target.value)}
            className="h-9 rounded-md border border-[#2a2a2e] bg-[#111114] px-3 text-sm text-[#e8e4df] focus:outline-none focus:ring-2 focus:ring-[#d4a843]/50"
          />
          <input
            type="time"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            className="h-9 rounded-md border border-[#2a2a2e] bg-[#111114] px-3 text-sm text-[#e8e4df] focus:outline-none focus:ring-2 focus:ring-[#d4a843]/50"
          />
          <span className="text-xs text-[#5e5a54]">COT (UTC-5)</span>
        </div>
      </div>

      {/* Distribution Checklist */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[#9e9890]">
            Distribution Checklist
          </h3>
          <span className="text-xs text-[#5e5a54]">
            {checkedCount}/{distribution.length} enabled
          </span>
        </div>
        <div className="space-y-1">
          {distribution.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="flex items-center gap-3 w-full text-left p-2.5 rounded-md hover:bg-[#18181c] transition-colors"
            >
              {item.checked ? (
                <CheckSquare className="h-4 w-4 text-[#6dbf7b] flex-shrink-0" />
              ) : (
                <Square className="h-4 w-4 text-[#5e5a54] flex-shrink-0" />
              )}
              <span className="text-[#5e5a54]">{item.icon}</span>
              <span
                className={cn(
                  "text-sm flex-1",
                  item.checked ? "text-[#e8e4df]" : "text-[#5e5a54]"
                )}
              >
                {item.label}
              </span>
              <Badge
                variant={
                  item.status === "ready"
                    ? "success"
                    : item.status === "draft"
                      ? "default"
                      : "secondary"
                }
                className="text-[10px]"
              >
                {item.status}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule All Button */}
      <div className="pt-2">
        <Button size="lg" className="w-full text-base font-semibold">
          <Send className="h-5 w-5" />
          Schedule All
        </Button>
      </div>
    </div>
  );
}
