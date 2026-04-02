"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Key, Plug, FileText } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ApiKeysForm } from "@/components/settings/api-keys-form";
import { MCPStatus as McpStatus } from "@/components/settings/mcp-status";
import { PromptEditor } from "@/components/settings/prompt-editor";

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-surface-raised bg-surface">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-amber">{icon}</span>
          <h2 className="text-sm font-semibold text-text">{title}</h2>
        </div>
        {open ? (
          <ChevronDown className="h-4 w-4 text-text-dim" />
        ) : (
          <ChevronRight className="h-4 w-4 text-text-dim" />
        )}
      </button>
      {open && (
        <div className="border-t border-surface-raised px-5 py-5">
          {children}
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-bg px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="font-serif text-2xl font-semibold text-text">
          Settings
        </h1>
        <p className="text-sm text-text-secondary">
          Configure API keys, MCP connectors, and system prompts for the Lumen
          Command Center.
        </p>

        <div className="space-y-4">
          <CollapsibleSection
            title="API Keys"
            icon={<Key className="h-4 w-4" />}
            defaultOpen
          >
            <ApiKeysForm />
          </CollapsibleSection>

          <CollapsibleSection
            title="MCP Connectors"
            icon={<Plug className="h-4 w-4" />}
          >
            <McpStatus />
          </CollapsibleSection>

          <CollapsibleSection
            title="System Prompts"
            icon={<FileText className="h-4 w-4" />}
          >
            <PromptEditor />
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
}
