"use client";

import * as React from "react";
import {
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Loader2,
  Download,
  Check,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SlackMessage {
  id: string;
  channel: string;
  author: string;
  content: string;
  timestamp: string;
}

const MOCK_MESSAGES: SlackMessage[] = [
  {
    id: "s1",
    channel: "#strategy",
    author: "Sarah K.",
    content:
      "Just had a breakthrough call with the Alpine team. They're shifting their entire content strategy toward long-form essays. Big opportunity for us.",
    timestamp: "Today at 2:14 PM",
  },
  {
    id: "s2",
    channel: "#research",
    author: "Marcus T.",
    content:
      "New McKinsey report on B2B content consumption. Key stat: 72% of C-suite execs prefer essays over whitepapers. Sharing link in thread.",
    timestamp: "Today at 11:30 AM",
  },
  {
    id: "s3",
    channel: "#client-meridian",
    author: "Priya D.",
    content:
      "Meridian CEO's LinkedIn post about sustainability just went viral - 50k impressions in 2 hours. The personal narrative angle really worked.",
    timestamp: "Yesterday at 4:45 PM",
  },
  {
    id: "s4",
    channel: "#strategy",
    author: "James R.",
    content:
      "Hot take: the best executive ghostwriting doesn't sound 'polished.' It sounds like the exec thinking out loud. We should lean into that more.",
    timestamp: "Yesterday at 3:20 PM",
  },
  {
    id: "s5",
    channel: "#content-ops",
    author: "Anika L.",
    content:
      "Repurposing pipeline is working well. Last month's Northstar essay generated 12 LinkedIn posts and 3 newsletter excerpts. Need to document the process.",
    timestamp: "Yesterday at 10:15 AM",
  },
];

export function SlackImport() {
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<SlackMessage[]>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [imported, setImported] = React.useState(false);

  const handleFetch = () => {
    setLoading(true);
    setImported(false);
    setSelected(new Set());
    // Mock fetch
    setTimeout(() => {
      setMessages(MOCK_MESSAGES);
      setLoading(false);
    }, 1500);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleImport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setImported(true);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between text-left"
        >
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[#d4a843]" />
            Slack Import
          </CardTitle>
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-[#9e9890]" />
          ) : (
            <ChevronRight className="h-4 w-4 text-[#9e9890]" />
          )}
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4">
          {/* Import button */}
          {messages.length === 0 && !loading && (
            <Button onClick={handleFetch} variant="secondary" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Import from Slack
            </Button>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center justify-center gap-2 py-6">
              <Loader2 className="h-5 w-5 animate-spin text-[#d4a843]" />
              <span className="text-sm text-[#9e9890]">
                {imported ? "Importing selected..." : "Fetching Slack messages..."}
              </span>
            </div>
          )}

          {/* Imported confirmation */}
          {imported && !loading && (
            <div className="flex items-center justify-center gap-2 rounded-lg border border-[#6dbf7b]/20 bg-[#6dbf7b]/5 py-4">
              <Check className="h-5 w-5 text-[#6dbf7b]" />
              <span className="text-sm text-[#6dbf7b]">
                {selected.size} message{selected.size !== 1 ? "s" : ""} imported as insights
              </span>
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && !loading && !imported && (
            <>
              <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1">
                {messages.map((msg) => (
                  <label
                    key={msg.id}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors",
                      selected.has(msg.id)
                        ? "border-[#d4a843]/30 bg-[#d4a843]/5"
                        : "border-[#1e1e22] bg-[#18181c] hover:border-[#2a2a2e]"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(msg.id)}
                      onChange={() => toggleSelect(msg.id)}
                      className="mt-1 h-4 w-4 rounded border-[#2a2a2e] bg-[#111114] accent-[#d4a843]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="flex items-center gap-1 text-xs font-medium text-[#7b9fd4]">
                          <Hash className="h-3 w-3" />
                          {msg.channel.replace("#", "")}
                        </span>
                        <span className="text-xs text-[#9e9890]">{msg.author}</span>
                        <span className="ml-auto text-[10px] text-[#5e5a54]">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#e8e4df] line-clamp-2">
                        {msg.content}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9e9890]">
                  {selected.size} selected
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setMessages([]);
                      setSelected(new Set());
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    disabled={selected.size === 0}
                    onClick={handleImport}
                  >
                    Import Selected
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
}
