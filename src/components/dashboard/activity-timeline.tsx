"use client";

import Link from "next/link";

interface TimelineEntry {
  id: string;
  timestamp: string;
  description: string;
  link?: { href: string; label: string };
}

const entries: TimelineEntry[] = [
  {
    id: "1",
    timestamp: "Today, 2:34 PM",
    description: "Draft generated for Essay #7",
    link: { href: "/essays/7", label: "Essay #7" },
  },
  {
    id: "2",
    timestamp: "Today, 11:15 AM",
    description: "Research session completed: AI Governance Frameworks",
    link: { href: "/research", label: "View session" },
  },
  {
    id: "3",
    timestamp: "Today, 9:02 AM",
    description: "Wargame synthesis ready: Board Crisis Scenario",
    link: { href: "/wargaming", label: "View results" },
  },
  {
    id: "4",
    timestamp: "Yesterday, 4:48 PM",
    description: "3 new insights captured from conversation",
    link: { href: "/capture", label: "View insights" },
  },
  {
    id: "5",
    timestamp: "Yesterday, 1:20 PM",
    description: "Essay #6 moved to Review",
    link: { href: "/essays/6", label: "Essay #6" },
  },
  {
    id: "6",
    timestamp: "Yesterday, 10:05 AM",
    description: "Subscriber milestone: 2,800 reached",
    link: { href: "/growth", label: "Growth dashboard" },
  },
  {
    id: "7",
    timestamp: "Apr 1, 3:30 PM",
    description: "Essay #5 approved and scheduled",
    link: { href: "/essays/5", label: "Essay #5" },
  },
];

export function ActivityTimeline() {
  return (
    <div className="rounded-lg bg-surface p-4">
      <h2 className="mb-4 text-sm font-medium text-text-secondary">
        Recent Activity
      </h2>
      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-text-dim/20" />

        {entries.map((entry, i) => (
          <div key={entry.id} className="relative flex gap-3 pb-4 last:pb-0">
            {/* Dot */}
            <div className="relative z-10 mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-text-dim/40 bg-surface" />

            <div className="min-w-0">
              <p className="text-[10px] text-text-dim">{entry.timestamp}</p>
              <p className="text-xs text-text-secondary">
                {entry.description}
                {entry.link && (
                  <>
                    {" "}
                    <Link
                      href={entry.link.href as any}
                      className="text-amber hover:text-amber-bright"
                    >
                      {entry.link.label}
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
