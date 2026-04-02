"use client";

import { useState } from "react";
import { Plus, Send, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type RelationshipStage = "cold" | "warm" | "engaged" | "subscriber" | "advocate";

interface Contact {
  id: string;
  name: string;
  company: string;
  role: string;
  industry: string;
  stage: RelationshipStage;
  lastTouched: string;
}

const stageConfig: Record<RelationshipStage, { color: string; bg: string }> = {
  cold: { color: "text-text-dim", bg: "bg-text-dim/20" },
  warm: { color: "text-blue", bg: "bg-blue/15" },
  engaged: { color: "text-amber", bg: "bg-amber/15" },
  subscriber: { color: "text-green", bg: "bg-green/15" },
  advocate: { color: "text-amber", bg: "bg-amber/25" },
};

const mockContacts: Contact[] = [
  { id: "c1", name: "Sarah Chen", company: "Meridian Health", role: "CEO", industry: "Healthcare", stage: "advocate", lastTouched: "2026-03-28" },
  { id: "c2", name: "James Okafor", company: "Lattice Systems", role: "CTO", industry: "Enterprise SaaS", stage: "subscriber", lastTouched: "2026-03-25" },
  { id: "c3", name: "Maria Vasquez", company: "Andean Capital", role: "COO", industry: "Fintech", stage: "engaged", lastTouched: "2026-03-20" },
  { id: "c4", name: "David Kim", company: "Neon Robotics", role: "CEO", industry: "Deep Tech", stage: "engaged", lastTouched: "2026-03-15" },
  { id: "c5", name: "Priya Sharma", company: "Horizon Media", role: "VP Strategy", industry: "Media", stage: "warm", lastTouched: "2026-03-10" },
  { id: "c6", name: "Alex Reeves", company: "Sterling Logistics", role: "CFO", industry: "Logistics", stage: "warm", lastTouched: "2026-03-05" },
  { id: "c7", name: "Nina Petrova", company: "Atlas Consulting", role: "Managing Partner", industry: "Consulting", stage: "cold", lastTouched: "2026-02-18" },
  { id: "c8", name: "Marcus Thompson", company: "Evergrow Bio", role: "CEO", industry: "Biotech", stage: "cold", lastTouched: "2026-02-01" },
];

export function CSuiteTracker() {
  const [contacts] = useState(mockContacts);

  return (
    <div className="rounded-lg border border-surface-raised bg-surface">
      <div className="flex items-center justify-between border-b border-surface-raised px-4 py-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-text-dim" />
          <h3 className="text-sm font-semibold text-text">C-Suite Target Tracker</h3>
          <span className="rounded-full bg-surface-raised px-2 py-0.5 text-[10px] text-text-dim">
            {contacts.length} contacts
          </span>
        </div>
        <button className="flex items-center gap-1 rounded-md border border-surface-raised px-3 py-1 text-[11px] font-medium text-text-secondary transition-colors hover:border-text-dim hover:text-text">
          <Plus className="h-3 w-3" />
          Add Contact
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-surface-raised">
              <th className="px-4 py-2 text-left font-medium text-text-dim">Name</th>
              <th className="px-4 py-2 text-left font-medium text-text-dim">Company</th>
              <th className="px-4 py-2 text-left font-medium text-text-dim">Role</th>
              <th className="px-4 py-2 text-left font-medium text-text-dim">Industry</th>
              <th className="px-4 py-2 text-left font-medium text-text-dim">Stage</th>
              <th className="px-4 py-2 text-left font-medium text-text-dim">Last Touched</th>
              <th className="w-10 px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => {
              const stage = stageConfig[contact.stage];
              return (
                <tr
                  key={contact.id}
                  className="border-b border-surface-raised/50 transition-colors hover:bg-surface-raised/30"
                >
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-raised text-text-dim">
                        <User className="h-3 w-3" />
                      </div>
                      <span className="font-medium text-text">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary">{contact.company}</td>
                  <td className="px-4 py-2.5 text-text-secondary">{contact.role}</td>
                  <td className="px-4 py-2.5 text-text-dim">{contact.industry}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                        stage.bg,
                        stage.color
                      )}
                    >
                      {contact.stage}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-text-dim">{contact.lastTouched}</td>
                  <td className="px-4 py-2.5">
                    <button
                      className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium text-amber transition-colors hover:bg-amber/10"
                      title="Share Essay"
                    >
                      <Send className="h-3 w-3" />
                      Share
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
