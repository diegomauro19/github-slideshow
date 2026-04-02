"use client";

import { useState } from "react";
import { Eye, EyeOff, Check, X, Pencil, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ApiKey {
  id: string;
  label: string;
  envKey: string;
  value: string;
  isConfigured: boolean;
}

const initialKeys: ApiKey[] = [
  { id: "anthropic", label: "Anthropic", envKey: "ANTHROPIC_API_KEY", value: "sk-ant-****...3xQ7", isConfigured: true },
  { id: "openai", label: "OpenAI", envKey: "OPENAI_API_KEY", value: "sk-****...9f2B", isConfigured: true },
  { id: "substack", label: "Substack", envKey: "SUBSTACK_API_KEY", value: "", isConfigured: false },
  { id: "buffer", label: "Buffer", envKey: "BUFFER_ACCESS_TOKEN", value: "buf-****...k1mN", isConfigured: true },
  { id: "slack", label: "Slack Webhook", envKey: "SLACK_WEBHOOK_URL", value: "", isConfigured: false },
];

export function ApiKeysForm() {
  const [keys, setKeys] = useState(initialKeys);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [showId, setShowId] = useState<string | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, "success" | "error">>({});

  const handleEdit = (key: ApiKey) => {
    setEditingId(key.id);
    setEditValue(key.isConfigured ? "" : "");
  };

  const handleSave = (id: string) => {
    if (editValue.trim()) {
      setKeys((prev) =>
        prev.map((k) =>
          k.id === id
            ? { ...k, value: editValue.slice(0, 6) + "****..." + editValue.slice(-4), isConfigured: true }
            : k
        )
      );
    }
    setEditingId(null);
    setEditValue("");
  };

  const handleTest = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      setTestResults((prev) => ({ ...prev, [id]: "success" }));
      setTestingId(null);
    }, 1200);
  };

  return (
    <div className="space-y-3">
      {keys.map((key) => (
        <div
          key={key.id}
          className="flex items-center gap-3 rounded-lg border border-surface-raised bg-surface-raised/30 px-4 py-3"
        >
          {/* Status dot */}
          <div
            className={cn(
              "h-2 w-2 shrink-0 rounded-full",
              key.isConfigured ? "bg-green" : "bg-text-dim"
            )}
          />

          {/* Label */}
          <div className="w-28 shrink-0">
            <p className="text-xs font-medium text-text">{key.label}</p>
            <p className="text-[10px] text-text-dim">{key.envKey}</p>
          </div>

          {/* Value / Input */}
          <div className="flex-1">
            {editingId === key.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="Paste API key..."
                  className="flex-1 rounded border border-surface-raised bg-bg px-3 py-1.5 text-xs text-text outline-none placeholder:text-text-dim focus:border-amber"
                  autoFocus
                />
                <button
                  onClick={() => handleSave(key.id)}
                  className="rounded p-1 text-green hover:bg-green/10"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="rounded p-1 text-red hover:bg-red/10"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text-secondary">
                  {key.isConfigured
                    ? showId === key.id
                      ? key.value
                      : "••••••••••••"
                    : "Not configured"}
                </span>
                {key.isConfigured && (
                  <button
                    onClick={() => setShowId(showId === key.id ? null : key.id)}
                    className="text-text-dim hover:text-text-secondary"
                  >
                    {showId === key.id ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {editingId !== key.id && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleEdit(key)}
                className="flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium text-text-secondary transition-colors hover:bg-surface-raised hover:text-text"
              >
                <Pencil className="h-3 w-3" />
                Edit
              </button>
              {key.isConfigured && (
                <button
                  onClick={() => handleTest(key.id)}
                  disabled={testingId === key.id}
                  className={cn(
                    "flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium transition-colors",
                    testResults[key.id] === "success"
                      ? "text-green"
                      : testResults[key.id] === "error"
                        ? "text-red"
                        : "text-text-dim hover:bg-surface-raised hover:text-text-secondary"
                  )}
                >
                  <Zap className="h-3 w-3" />
                  {testingId === key.id
                    ? "Testing..."
                    : testResults[key.id] === "success"
                      ? "Connected"
                      : "Test"}
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
