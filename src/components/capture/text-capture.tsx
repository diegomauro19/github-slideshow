"use client";

import * as React from "react";
import { FileText, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SaveStatus = "idle" | "saving" | "saved";

export function TextCapture() {
  const [text, setText] = React.useState("");
  const [saveStatus, setSaveStatus] = React.useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = React.useState<number | null>(null);
  const [secondsAgo, setSecondsAgo] = React.useState<number | null>(null);

  const textRef = React.useRef(text);
  textRef.current = text;

  const lastSavedTextRef = React.useRef("");

  // Auto-save every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (textRef.current && textRef.current !== lastSavedTextRef.current) {
        setSaveStatus("saving");
        // Mock save call
        setTimeout(() => {
          lastSavedTextRef.current = textRef.current;
          setSaveStatus("saved");
          setLastSaved(Date.now());
        }, 600);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update "saved X seconds ago" display
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (lastSaved) {
        setSecondsAgo(Math.floor((Date.now() - lastSaved) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastSaved]);

  const renderHighlightedPreview = () => {
    if (!text) return null;

    const parts = text.split(/(@\S+|#\S+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("@")) {
        return (
          <span key={i} className="text-[#d4a843] font-medium">
            {part}
          </span>
        );
      }
      if (part.startsWith("#")) {
        return (
          <span key={i} className="text-[#7b9fd4] font-medium">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const hasMentionsOrTags = /@\S+|#\S+/.test(text);

  const saveStatusDisplay = () => {
    if (saveStatus === "saving") {
      return (
        <span className="flex items-center gap-1.5 text-xs text-[#9e9890]">
          <Loader2 className="h-3 w-3 animate-spin" />
          Saving...
        </span>
      );
    }
    if (saveStatus === "saved" && secondsAgo !== null) {
      return (
        <span className="flex items-center gap-1.5 text-xs text-[#6dbf7b]">
          <Check className="h-3 w-3" />
          Saved {secondsAgo}s ago
        </span>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#d4a843]" />
            Text Capture
          </CardTitle>
          {saveStatusDisplay()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (saveStatus === "saved") setSaveStatus("idle");
          }}
          placeholder="Write your insight... Use @client-codename and #tags"
          className={cn(
            "w-full min-h-[200px] rounded-md border border-[#2a2a2e] bg-[#18181c] p-4 text-sm text-[#e8e4df]",
            "font-mono leading-relaxed",
            "placeholder:text-[#5e5a54]",
            "hover:border-[#3a3a3e]",
            "focus:border-[#d4a843]/40 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/50",
            "resize-y"
          )}
          rows={8}
        />

        {/* Highlighted preview */}
        {hasMentionsOrTags && (
          <div className="rounded-md border border-[#1e1e22] bg-[#0c0c0e] p-3">
            <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-[#9e9890]">
              Preview
            </span>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#e8e4df]">
              {renderHighlightedPreview()}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" disabled={!text.trim()}>
            Save as Insight
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={!text.trim()}
            onClick={() => {
              setText("");
              setSaveStatus("idle");
            }}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
