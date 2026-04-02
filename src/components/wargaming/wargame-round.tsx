"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import {
  ChevronDown,
  ChevronRight,
  Shield,
  Target,
  Briefcase,
  Crosshair,
  Flame,
  User,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ActorMove {
  actorName: string;
  actorIcon: "shield" | "target" | "briefcase" | "crosshair" | "flame" | "user";
  mentalModel: string;
  move: string;
  reasoning: string;
  confidence: number; // 0-100
  counterMoves: string[];
}

export interface RoundData {
  roundNumber: number;
  moves: ActorMove[];
  isActive?: boolean;
}

const actorIcons: Record<string, React.ElementType> = {
  shield: Shield,
  target: Target,
  briefcase: Briefcase,
  crosshair: Crosshair,
  flame: Flame,
  user: User,
};

/* ------------------------------------------------------------------ */
/*  Streaming Text                                                     */
/* ------------------------------------------------------------------ */

function StreamingText({ text, speed = 12 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let idx = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block h-3.5 w-0.5 animate-pulse bg-amber ml-0.5" />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Confidence Meter                                                   */
/* ------------------------------------------------------------------ */

function ConfidenceMeter({ value }: { value: number }) {
  const color =
    value >= 70
      ? "bg-green"
      : value >= 40
        ? "bg-amber"
        : "bg-red";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[10px] font-medium text-text-dim">{value}%</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Move Card                                                          */
/* ------------------------------------------------------------------ */

function MoveCard({
  move,
  isActive,
}: {
  move: ActorMove;
  isActive: boolean;
}) {
  const [showReasoning, setShowReasoning] = useState(false);
  const Icon = actorIcons[move.actorIcon] ?? User;

  return (
    <div className="rounded-lg border border-[#1e1e22] bg-surface-raised p-4 transition-colors hover:border-text-dim/20">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bg">
            <Icon className="h-3.5 w-3.5 text-amber" />
          </div>
          <span className="text-xs font-semibold text-text">
            {move.actorName}
          </span>
        </div>
        <span className="inline-flex items-center rounded-full border border-purple/20 bg-purple/10 px-2 py-0.5 text-[10px] font-medium text-purple">
          {move.mentalModel}
        </span>
      </div>

      {/* Move */}
      <div className="mb-3 text-sm leading-relaxed text-text-secondary">
        {isActive ? <StreamingText text={move.move} /> : move.move}
      </div>

      {/* Confidence */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[10px] font-medium uppercase tracking-wider text-text-dim">
          Confidence
        </span>
        <ConfidenceMeter value={move.confidence} />
      </div>

      {/* Reasoning Toggle */}
      <button
        type="button"
        onClick={() => setShowReasoning(!showReasoning)}
        className="mb-2 flex items-center gap-1 text-[11px] font-medium text-text-dim transition-colors hover:text-text-secondary"
      >
        {showReasoning ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
        Reasoning
      </button>
      {showReasoning && (
        <p className="mb-3 rounded border border-[#1e1e22] bg-bg p-3 text-xs leading-relaxed text-text-dim">
          {move.reasoning}
        </p>
      )}

      {/* Counter-moves */}
      {move.counterMoves.length > 0 && (
        <div>
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-dim">
            Counter-moves
          </span>
          <ul className="space-y-1">
            {move.counterMoves.map((cm, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-[11px] leading-relaxed text-text-secondary"
              >
                <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-red" />
                {cm}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Round Component                                                    */
/* ------------------------------------------------------------------ */

export function WargameRound({ round }: { round: RoundData }) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold",
            round.isActive
              ? "bg-amber/20 text-amber"
              : "bg-surface-raised text-text-dim"
          )}
        >
          {round.roundNumber}
        </div>
        <h3
          className={cn(
            "text-sm font-semibold",
            round.isActive ? "text-amber" : "text-text"
          )}
        >
          Round {round.roundNumber}
        </h3>
        {round.isActive && (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber/20 bg-amber/10 px-2 py-0.5 text-[10px] font-medium text-amber animate-pulse">
            Active
          </span>
        )}
      </div>

      {/* Moves Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {round.moves.map((move, i) => (
          <MoveCard
            key={`${round.roundNumber}-${i}`}
            move={move}
            isActive={!!round.isActive}
          />
        ))}
      </div>
    </div>
  );
}
