"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, BookOpen, CheckSquare, Square } from "lucide-react";

interface Suggestion {
  id: string;
  original: string;
  suggested: string;
  reason: string;
  status: "pending" | "accepted" | "rejected";
}

const MOCK_SUGGESTIONS: Suggestion[] = [
  {
    id: "sug-1",
    original: "The productivity industry has built a cathedral on quicksand.",
    suggested:
      "The productivity industry has erected a cathedral on quicksand.",
    reason: '"Erected" adds a sense of deliberate construction that heightens the irony.',
    status: "pending",
  },
  {
    id: "sug-2",
    original: "you are always attending to something",
    suggested: "your awareness is always directed somewhere",
    reason: "Avoids repetition of 'attention/attending' in the same paragraph.",
    status: "pending",
  },
  {
    id: "sug-3",
    original: "Their calendars are archives of other people's priorities.",
    suggested:
      "Their calendars are monuments to other people's priorities.",
    reason: '"Archives" conflicts with the "monuments" used two sentences later. Choose one metaphor.',
    status: "pending",
  },
  {
    id: "sug-4",
    original: "Think of a cathedral.",
    suggested: "Consider the cathedral at Chartres.",
    reason: "More specific and immediate, transitions better into the next sentence.",
    status: "accepted",
  },
  {
    id: "sug-5",
    original: "This isn't productivity advice.",
    suggested: "This is not productivity advice.",
    reason: "The full form carries more rhetorical weight in a closing statement.",
    status: "pending",
  },
];

const PROSE_CONTENT = `The productivity industry has built a cathedral on quicksand. Every system, every hack, every morning routine presupposes a question it never bothers to ask: what are you paying attention to, and why?

This is the dissolution. Not the destruction of productivity as a concept, but the dissolving of the false binary between "focused" and "distracted." You are never truly distracted — you are always attending to something. The question is whether that something was chosen or inherited.

Most knowledge workers operate on inherited attention. Their calendars are archives of other people's priorities. Their notification settings are monuments to someone else's urgency.

Once the old frame dissolves, a new perception emerges: attention is not a resource to be managed. It is an architecture to be built.

Think of a cathedral. The architects of Chartres didn't "manage" stone. They composed with it. They understood that the arrangement of matter could direct the human gaze upward, could create the experience of transcendence through structure alone.

Your attention works the same way. The question isn't "how do I focus better?" but rather "what environment am I building for my awareness to inhabit?"

This is the perception shift: from attention-as-resource to attention-as-environment.

So what do you actually do with this? You stop optimizing your attention and start architecting it. Three practices:

1. The Morning Audit: Before checking anything, write down what you want your attention to build today.

2. Environment Design: Your physical and digital spaces are attentional architecture. Design them like a cathedral, not a warehouse.

3. The Weekly Demolition: Once a week, identify one inherited attention pattern and consciously dissolve it.

This isn't productivity advice. This is ontological engineering. You are building the reality you inhabit, one attention structure at a time.`;

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: "c1", label: "Dissolution movement clearly dissolves an existing frame", checked: true },
  { id: "c2", label: "Perception movement offers a genuinely new lens", checked: true },
  { id: "c3", label: "Transmission movement provides actionable practices", checked: true },
  { id: "c4", label: "Transitions between movements feel organic", checked: false },
  { id: "c5", label: "Opening hook is strong enough to stop the scroll", checked: true },
  { id: "c6", label: "Closing line is memorable and shareable", checked: false },
];

export function ReviewTab() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>(MOCK_SUGGESTIONS);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);

  const handleSuggestion = (id: string, status: "accepted" | "rejected") => {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const pendingCount = suggestions.filter((s) => s.status === "pending").length;
  const checkedCount = checklist.filter((c) => c.checked).length;

  return (
    <div className="grid grid-cols-[1fr_340px] gap-6 min-h-[600px]">
      {/* Reading View (left) */}
      <div className="rounded-lg border border-[#1e1e22] bg-[#111114] p-8 overflow-y-auto">
        <div className="max-w-[65ch] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="success" className="text-xs">
              Readability: 72
            </Badge>
            <span className="text-xs text-[#5e5a54]">~4 min read</span>
          </div>
          <article
            className="prose prose-invert max-w-none"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {PROSE_CONTENT.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-[#e8e4df]/90 text-base leading-[1.8] mb-5"
              >
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </div>

      {/* Suggestions Panel (right) */}
      <div className="space-y-4 overflow-y-auto">
        {/* Copy-edit Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#9e9890]">
              AI Copy-Edit Suggestions
            </h3>
            <Badge variant="secondary" className="text-[10px]">
              {pendingCount} pending
            </Badge>
          </div>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className={cn(
                  "p-3 transition-opacity",
                  suggestion.status === "accepted" && "opacity-50",
                  suggestion.status === "rejected" && "opacity-30"
                )}
              >
                <div className="space-y-2">
                  <div className="text-xs">
                    <span className="text-[#5e5a54] line-through">
                      {suggestion.original}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-[#6dbf7b]">
                      {suggestion.suggested}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5e5a54] italic">
                    {suggestion.reason}
                  </p>
                  {suggestion.status === "pending" && (
                    <div className="flex gap-1.5 pt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[#6dbf7b] hover:text-[#6dbf7b] hover:bg-[#6dbf7b]/10"
                        onClick={() =>
                          handleSuggestion(suggestion.id, "accepted")
                        }
                      >
                        <Check className="h-3 w-3" />
                        Accept
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[#d47b7b] hover:text-[#d47b7b] hover:bg-[#d47b7b]/10"
                        onClick={() =>
                          handleSuggestion(suggestion.id, "rejected")
                        }
                      >
                        <X className="h-3 w-3" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {suggestion.status !== "pending" && (
                    <Badge
                      variant={
                        suggestion.status === "accepted" ? "success" : "danger"
                      }
                      className="text-[10px]"
                    >
                      {suggestion.status}
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Three Movements Checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#9e9890] flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" />
              Three Movements
            </h3>
            <span className="text-xs text-[#5e5a54]">
              {checkedCount}/{checklist.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="flex items-start gap-2.5 w-full text-left p-2 rounded-md hover:bg-[#18181c] transition-colors"
              >
                {item.checked ? (
                  <CheckSquare className="h-4 w-4 text-[#6dbf7b] flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="h-4 w-4 text-[#5e5a54] flex-shrink-0 mt-0.5" />
                )}
                <span
                  className={cn(
                    "text-xs leading-relaxed",
                    item.checked ? "text-[#9e9890]" : "text-[#5e5a54]"
                  )}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
