"use client";

import { useState } from "react";
import {
  MessageSquare,
  Mail,
  CalendarDays,
  PenTool,
  Palette,
  Presentation,
  Workflow,
  Cog,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface MCPConnector {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  uses: string[];
  callsCount: number;
}

const mockConnectors: MCPConnector[] = [
  {
    id: "slack",
    name: "Slack",
    icon: <MessageSquare className="h-5 w-5" />,
    connected: true,
    uses: ["Notifications", "Draft sharing", "Team alerts"],
    callsCount: 342,
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: <Mail className="h-5 w-5" />,
    connected: true,
    uses: ["Research capture", "Newsletter monitoring"],
    callsCount: 128,
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: <CalendarDays className="h-5 w-5" />,
    connected: true,
    uses: ["Publish scheduling", "Deadline reminders"],
    callsCount: 56,
  },
  {
    id: "figma",
    name: "Figma",
    icon: <PenTool className="h-5 w-5" />,
    connected: false,
    uses: ["Visual asset extraction", "Cover images"],
    callsCount: 0,
  },
  {
    id: "canva",
    name: "Canva",
    icon: <Palette className="h-5 w-5" />,
    connected: false,
    uses: ["Social graphics", "Essay visuals"],
    callsCount: 0,
  },
  {
    id: "gamma",
    name: "Gamma",
    icon: <Presentation className="h-5 w-5" />,
    connected: false,
    uses: ["Presentation generation", "Visual summaries"],
    callsCount: 0,
  },
  {
    id: "zapier",
    name: "Zapier",
    icon: <Workflow className="h-5 w-5" />,
    connected: true,
    uses: ["Automation workflows", "Cross-platform sync"],
    callsCount: 215,
  },
  {
    id: "n8n",
    name: "n8n",
    icon: <Cog className="h-5 w-5" />,
    connected: false,
    uses: ["Custom workflows", "Data pipelines"],
    callsCount: 0,
  },
];

export function MCPStatus() {
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTest = (id: string) => {
    setTestingId(id);
    setTimeout(() => setTestingId(null), 1500);
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {mockConnectors.map((connector) => (
        <div
          key={connector.id}
          className={cn(
            "rounded-lg border bg-surface-raised/30 p-4 transition-colors",
            connector.connected
              ? "border-surface-raised"
              : "border-surface-raised/50 opacity-70"
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="text-text-dim">{connector.icon}</div>
              <span className="text-sm font-medium text-text">{connector.name}</span>
            </div>
            <div
              className={cn(
                "mt-1 h-2.5 w-2.5 rounded-full",
                connector.connected ? "bg-green" : "bg-red"
              )}
            />
          </div>

          {/* Uses */}
          <div className="mt-3 space-y-1">
            {connector.uses.map((use) => (
              <p key={use} className="text-[10px] text-text-dim">
                {use}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between border-t border-surface-raised pt-3">
            <span className="text-[10px] text-text-dim">
              {connector.callsCount > 0
                ? `${connector.callsCount.toLocaleString()} calls`
                : "No calls yet"}
            </span>
            <button
              onClick={() => handleTest(connector.id)}
              disabled={testingId === connector.id}
              className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text"
            >
              <Zap className="h-2.5 w-2.5" />
              {testingId === connector.id ? "Testing..." : "Test"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
