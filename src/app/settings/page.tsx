"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Key,
  Plug,
  MessageSquareCode,
  Swords,
  Send,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ApiKeysForm } from "@/components/settings/api-keys-form";
import { MCPStatus } from "@/components/settings/mcp-status";
import { PromptEditor } from "@/components/settings/prompt-editor";

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  openSections: Record<string, boolean>;
  toggle: (id: string) => void;
}

function CollapsibleSection({ id, title, icon, children, openSections, toggle }: SectionProps) {
  const isOpen = openSections[id] ?? false;

  return (
    <div className="rounded-lg border border-surface-raised bg-surface">
      <button
        onClick={() => toggle(id)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-raised/20"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-raised text-text-dim">
          {icon}
        </div>
        <span className="flex-1 text-sm font-semibold text-text">{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-text-dim" />
        ) : (
          <ChevronRight className="h-4 w-4 text-text-dim" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-surface-raised px-5 py-4">{children}</div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "api-keys": true,
    mcp: false,
    prompts: false,
    wargaming: false,
    publishing: false,
  });

  const toggle = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-text-dim" />
        <h1 className="text-2xl font-bold text-text">Settings</h1>
      </div>
      <p className="text-sm text-text-dim">
        Manage API connections, MCP connectors, system prompts, and defaults.
      </p>

      {/* Sections */}
      <div className="space-y-3 pt-2">
        <CollapsibleSection
          id="api-keys"
          title="API Keys"
          icon={<Key className="h-4 w-4" />}
          openSections={openSections}
          toggle={toggle}
        >
          <ApiKeysForm />
        </CollapsibleSection>

        <CollapsibleSection
          id="mcp"
          title="MCP Connectors"
          icon={<Plug className="h-4 w-4" />}
          openSections={openSections}
          toggle={toggle}
        >
          <MCPStatus />
        </CollapsibleSection>

        <CollapsibleSection
          id="prompts"
          title="System Prompts"
          icon={<MessageSquareCode className="h-4 w-4" />}
          openSections={openSections}
          toggle={toggle}
        >
          <PromptEditor />
        </CollapsibleSection>

        <CollapsibleSection
          id="wargaming"
          title="Wargaming Defaults"
          icon={<Swords className="h-4 w-4" />}
          openSections={openSections}
          toggle={toggle}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                Default Wargaming Rounds
              </label>
              <select className="w-full rounded-md border border-surface-raised bg-bg px-3 py-2 text-xs text-text outline-none focus:border-amber/50">
                <option value="3">3 rounds</option>
                <option value="5">5 rounds</option>
                <option value="7">7 rounds</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                Adversary Personas
              </label>
              <textarea
                className="h-24 w-full resize-y rounded-md border border-surface-raised bg-bg px-3 py-2 text-xs text-text outline-none placeholder:text-text-dim focus:border-amber/50"
                defaultValue="Skeptical CFO, Contrarian Strategist, Devil's Advocate Academic, Cynical Journalist"
                placeholder="Comma-separated personas..."
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                Stress Test Intensity
              </label>
              <div className="flex gap-2">
                {["Light", "Medium", "Aggressive"].map((level) => (
                  <button
                    key={level}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                      level === "Medium"
                        ? "border-amber bg-amber/10 text-amber"
                        : "border-surface-raised text-text-dim hover:border-text-dim hover:text-text-secondary"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          id="publishing"
          title="Publishing Defaults"
          icon={<Send className="h-4 w-4" />}
          openSections={openSections}
          toggle={toggle}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                Default Publish Day
              </label>
              <select className="w-full rounded-md border border-surface-raised bg-bg px-3 py-2 text-xs text-text outline-none focus:border-amber/50">
                <option>Monday</option>
                <option selected>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                Default Publish Time
              </label>
              <input
                type="time"
                defaultValue="07:30"
                className="w-full rounded-md border border-surface-raised bg-bg px-3 py-2 text-xs text-text outline-none focus:border-amber/50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                Target Cadence
              </label>
              <select className="w-full rounded-md border border-surface-raised bg-bg px-3 py-2 text-xs text-text outline-none focus:border-amber/50">
                <option>Weekly</option>
                <option selected>Biweekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-text-secondary">
                Auto-Schedule Social Posts
              </label>
              <div className="flex items-center gap-3">
                <button className="rounded-md border border-amber bg-amber/10 px-3 py-1.5 text-xs font-medium text-amber">
                  Enabled
                </button>
                <span className="text-[10px] text-text-dim">
                  Automatically schedule Twitter/X and LinkedIn posts after publishing
                </span>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}
