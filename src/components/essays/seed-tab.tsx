"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Plus,
  FlaskConical,
  MessageSquare,
  Mail,
  Lightbulb,
  BookOpen,
  X,
} from "lucide-react";

interface LinkedInsight {
  id: string;
  title: string;
  source: string;
  date: string;
}

interface LinkedResearch {
  id: string;
  title: string;
  questionCount: number;
  date: string;
}

const MOCK_INSIGHTS: LinkedInsight[] = [
  {
    id: "ins-1",
    title: "Attention is the new currency, but most people are bankrupt",
    source: "Morning journal",
    date: "Mar 26",
  },
  {
    id: "ins-2",
    title: "Cal Newport's time-block planning misses the creative dimension",
    source: "Book note",
    date: "Mar 24",
  },
  {
    id: "ins-3",
    title: "The paradox of structured spontaneity in deep work",
    source: "Slack capture",
    date: "Mar 22",
  },
];

const MOCK_RESEARCH: LinkedResearch[] = [
  {
    id: "res-1",
    title: "Attention Economy Deep Dive",
    questionCount: 12,
    date: "Mar 27",
  },
];

export function SeedTab() {
  const [seedContent, setSeedContent] = useState(
    "The architecture of attention isn't about productivity tools or time management hacks. It's about understanding that how we direct our awareness shapes the very reality we inhabit.\n\nKey threads:\n- Attention as construction, not consumption\n- The dissolution of the distraction/focus binary\n- Building attentional infrastructure vs. building habits\n- Why most productivity advice fails at the ontological level"
  );
  const [insights] = useState<LinkedInsight[]>(MOCK_INSIGHTS);
  const [research] = useState<LinkedResearch[]>(MOCK_RESEARCH);

  return (
    <div className="space-y-6">
      {/* Raw Seed Content */}
      <div>
        <label className="text-sm font-medium text-[#9e9890] mb-2 block">
          Raw Seed
        </label>
        <Textarea
          value={seedContent}
          onChange={(e) => setSeedContent(e.target.value)}
          className="min-h-[200px] font-mono text-sm leading-relaxed"
          placeholder="Write your raw seed idea here..."
        />
      </div>

      {/* Linked Insights */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[#9e9890] flex items-center gap-2">
            <Lightbulb className="h-3.5 w-3.5" />
            Linked Insights
          </h3>
          <span className="text-xs text-[#5e5a54]">{insights.length}</span>
        </div>
        <div className="space-y-2">
          {insights.map((insight) => (
            <Card key={insight.id} className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-[#e8e4df] leading-snug">
                    {insight.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      {insight.source}
                    </Badge>
                    <span className="text-[11px] text-[#5e5a54]">
                      {insight.date}
                    </span>
                  </div>
                </div>
                <button className="text-[#5e5a54] hover:text-[#d47b7b] transition-colors flex-shrink-0 mt-0.5">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Linked Research Sessions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-[#9e9890] flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5" />
            Linked Research
          </h3>
          <span className="text-xs text-[#5e5a54]">{research.length}</span>
        </div>
        <div className="space-y-2">
          {research.map((session) => (
            <Card key={session.id} className="p-3">
              <p className="text-sm text-[#e8e4df]">{session.title}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[11px] text-[#5e5a54]">
                  {session.questionCount} questions
                </span>
                <span className="text-[11px] text-[#5e5a54]">
                  {session.date}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm">
          <Plus className="h-3.5 w-3.5" />
          Add Insights
        </Button>
        <Button variant="secondary" size="sm">
          <FlaskConical className="h-3.5 w-3.5" />
          Launch Research
        </Button>
        <Button variant="secondary" size="sm">
          <MessageSquare className="h-3.5 w-3.5" />
          Import from Slack
        </Button>
        <Button variant="secondary" size="sm">
          <Mail className="h-3.5 w-3.5" />
          Import from Email
        </Button>
      </div>

      {/* Generate Draft */}
      <div className="pt-2">
        <Button size="lg" className="w-full text-base font-semibold">
          <Sparkles className="h-5 w-5" />
          Generate Draft
        </Button>
      </div>
    </div>
  );
}
