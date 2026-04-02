"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, CheckCircle } from "lucide-react";

const AI_DRAFT = {
  dissolution: `The productivity industry has built a cathedral on quicksand. Every system, every hack, every morning routine presupposes a question it never bothers to ask: what are you paying attention to, and why?

This is the dissolution. Not the destruction of productivity as a concept, but the dissolving of the false binary between "focused" and "distracted." You are never truly distracted — you are always attending to something. The question is whether that something was chosen or inherited.

Most knowledge workers operate on inherited attention. Their calendars are archives of other people's priorities. Their notification settings are monuments to someone else's urgency.`,

  perception: `Once the old frame dissolves, a new perception emerges: attention is not a resource to be managed. It is an architecture to be built.

Think of a cathedral. The architects of Chartres didn't "manage" stone. They composed with it. They understood that the arrangement of matter could direct the human gaze upward, could create the experience of transcendence through structure alone.

Your attention works the same way. The question isn't "how do I focus better?" but rather "what environment am I building for my awareness to inhabit?"

This is the perception shift: from attention-as-resource to attention-as-environment.`,

  transmission: `So what do you actually do with this?

You stop optimizing your attention and start architecting it. Three practices:

1. The Morning Audit: Before checking anything, write down what you want your attention to build today. Not tasks — constructions.

2. Environment Design: Your physical and digital spaces are attentional architecture. Design them like a cathedral, not a warehouse.

3. The Weekly Demolition: Once a week, identify one inherited attention pattern and consciously dissolve it.

This isn't productivity advice. This is ontological engineering. You are building the reality you inhabit, one attention structure at a time.`,
};

const INITIAL_EDITOR_CONTENT = `# The Architecture of Attention

${AI_DRAFT.dissolution}

---

${AI_DRAFT.perception}

---

${AI_DRAFT.transmission}
`;

export function DraftTab() {
  const [editorContent, setEditorContent] = useState(INITIAL_EDITOR_CONTENT);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">(
    "saved"
  );
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const wordCount = editorContent
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaveStatus("unsaved");
    saveTimerRef.current = setTimeout(() => {
      setSaveStatus("saving");
      setTimeout(() => setSaveStatus("saved"), 600);
    }, 1500);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [editorContent]);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#5e5a54]">{wordCount} words</span>
          <div className="flex items-center gap-1.5 text-xs">
            {saveStatus === "saved" && (
              <>
                <CheckCircle className="h-3 w-3 text-[#6dbf7b]" />
                <span className="text-[#6dbf7b]">Saved</span>
              </>
            )}
            {saveStatus === "saving" && (
              <>
                <Save className="h-3 w-3 text-[#d4a843] animate-pulse" />
                <span className="text-[#d4a843]">Saving...</span>
              </>
            )}
            {saveStatus === "unsaved" && (
              <>
                <Save className="h-3 w-3 text-[#5e5a54]" />
                <span className="text-[#5e5a54]">Unsaved</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="danger" className="text-[10px]">
            Dissolution
          </Badge>
          <Badge variant="success" className="text-[10px]">
            Perception
          </Badge>
          <Badge variant="info" className="text-[10px]">
            Transmission
          </Badge>
        </div>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-2 gap-3 min-h-[600px]">
        {/* AI Draft (left, read-only) */}
        <div className="rounded-lg border border-[#1e1e22] bg-[#111114] overflow-y-auto">
          <div className="px-4 py-3 border-b border-[#1e1e22]">
            <span className="text-xs font-medium text-[#5e5a54] uppercase tracking-wider">
              AI Draft
            </span>
          </div>
          <div className="p-4 space-y-0">
            {/* Dissolution */}
            <div className="rounded-md bg-[#d47b7b]/5 border-l-2 border-[#d47b7b]/30 p-4 mb-3">
              <span className="text-[10px] font-medium text-[#d47b7b] uppercase tracking-wider mb-2 block">
                I. Dissolution
              </span>
              <p className="text-sm text-[#e8e4df]/80 leading-relaxed whitespace-pre-line">
                {AI_DRAFT.dissolution}
              </p>
            </div>

            {/* Perception */}
            <div className="rounded-md bg-[#6dbf7b]/5 border-l-2 border-[#6dbf7b]/30 p-4 mb-3">
              <span className="text-[10px] font-medium text-[#6dbf7b] uppercase tracking-wider mb-2 block">
                II. Perception
              </span>
              <p className="text-sm text-[#e8e4df]/80 leading-relaxed whitespace-pre-line">
                {AI_DRAFT.perception}
              </p>
            </div>

            {/* Transmission */}
            <div className="rounded-md bg-[#7b9fd4]/5 border-l-2 border-[#7b9fd4]/30 p-4">
              <span className="text-[10px] font-medium text-[#7b9fd4] uppercase tracking-wider mb-2 block">
                III. Transmission
              </span>
              <p className="text-sm text-[#e8e4df]/80 leading-relaxed whitespace-pre-line">
                {AI_DRAFT.transmission}
              </p>
            </div>
          </div>
        </div>

        {/* Editor (right, editable) */}
        <div className="rounded-lg border border-[#1e1e22] bg-[#111114] overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-[#1e1e22]">
            <span className="text-xs font-medium text-[#5e5a54] uppercase tracking-wider">
              Editor
            </span>
          </div>
          <Textarea
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            className="flex-1 rounded-none border-0 bg-transparent font-mono text-sm leading-relaxed resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
            placeholder="Start writing..."
          />
        </div>
      </div>
    </div>
  );
}
