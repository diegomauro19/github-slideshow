"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Zap,
  Swords,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Mental Model Data                                                  */
/* ------------------------------------------------------------------ */

interface MentalModel {
  id: string;
  name: string;
  field: string;
  description: string;
}

interface KnowledgeField {
  name: string;
  models: MentalModel[];
}

const knowledgeFields: KnowledgeField[] = [
  {
    name: "Military Strategy",
    models: [
      {
        id: "ooda",
        name: "OODA Loop",
        field: "Military Strategy",
        description:
          "Observe-Orient-Decide-Act cycle for rapid decision-making under uncertainty.",
      },
      {
        id: "red-team",
        name: "Red Team",
        field: "Military Strategy",
        description:
          "Adversarial challenge group that attacks plans to find weaknesses before opponents do.",
      },
    ],
  },
  {
    name: "Economics",
    models: [
      {
        id: "game-theory",
        name: "Game Theory",
        field: "Economics",
        description:
          "Strategic interaction analysis where outcomes depend on the actions of multiple actors.",
      },
      {
        id: "incentive-analysis",
        name: "Incentive Analysis",
        field: "Economics",
        description:
          "Examining what rewards/penalties drive each actor\u2019s behavior and hidden motivations.",
      },
      {
        id: "behavioral-economics",
        name: "Behavioral Economics",
        field: "Economics",
        description:
          "How cognitive biases and heuristics cause deviations from rational decision-making.",
      },
    ],
  },
  {
    name: "Systems Science",
    models: [
      {
        id: "systems-thinking",
        name: "Systems Thinking",
        field: "Systems Science",
        description:
          "Holistic analysis of feedback loops, emergent properties, and interconnected dynamics.",
      },
      {
        id: "second-order",
        name: "Second-Order Effects",
        field: "Systems Science",
        description:
          "Tracing the downstream consequences of consequences \u2014 what happens after what happens.",
      },
    ],
  },
  {
    name: "Decision Science",
    models: [
      {
        id: "scenario-planning",
        name: "Scenario Planning",
        field: "Decision Science",
        description:
          "Constructing multiple plausible futures to stress-test assumptions and strategies.",
      },
      {
        id: "bayesian",
        name: "Bayesian Reasoning",
        field: "Decision Science",
        description:
          "Updating probability estimates as new evidence emerges, avoiding anchoring bias.",
      },
      {
        id: "via-negativa",
        name: "Via Negativa",
        field: "Decision Science",
        description:
          "Improving by removal \u2014 identifying what NOT to do is often more valuable than adding.",
      },
    ],
  },
];

const allModels = knowledgeFields.flatMap((f) => f.models);

/* ------------------------------------------------------------------ */
/*  Actor Data                                                         */
/* ------------------------------------------------------------------ */

interface Actor {
  id: string;
  name: string;
  role: string;
  archetype: string;
  modelId: string;
}

const defaultActors: Actor[] = [
  {
    id: "a1",
    name: "Thesis Defender",
    role: "Advocate",
    archetype: "Steelman",
    modelId: "game-theory",
  },
  {
    id: "a2",
    name: "Red Team",
    role: "Attacker",
    archetype: "Adversary",
    modelId: "red-team",
  },
  {
    id: "a3",
    name: "Client Executive",
    role: "Stakeholder",
    archetype: "Pragmatist",
    modelId: "incentive-analysis",
  },
  {
    id: "a4",
    name: "Competitor",
    role: "Rival",
    archetype: "Opportunist",
    modelId: "game-theory",
  },
  {
    id: "a5",
    name: "Devil\u2019s Advocate",
    role: "Challenger",
    archetype: "Contrarian",
    modelId: "via-negativa",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SessionSetup() {
  const [scenario, setScenario] = useState("");
  const [selectedModels, setSelectedModels] = useState<string[]>([
    "game-theory",
    "red-team",
    "systems-thinking",
  ]);
  const [expandedFields, setExpandedFields] = useState<string[]>(
    knowledgeFields.map((f) => f.name)
  );
  const [actors, setActors] = useState<Actor[]>(defaultActors);
  const [rounds, setRounds] = useState(3);
  const [adversarial, setAdversarial] = useState(false);

  const toggleField = (name: string) =>
    setExpandedFields((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );

  const toggleModel = (id: string) =>
    setSelectedModels((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );

  const addActor = () => {
    const newId = `a${Date.now()}`;
    setActors((prev) => [
      ...prev,
      {
        id: newId,
        name: "New Actor",
        role: "Observer",
        archetype: "Neutral",
        modelId: allModels[0].id,
      },
    ]);
  };

  const removeActor = (id: string) =>
    setActors((prev) => prev.filter((a) => a.id !== id));

  const updateActor = (id: string, patch: Partial<Actor>) =>
    setActors((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
    );

  return (
    <div className="space-y-8">
      {/* Scenario */}
      <section className="rounded-lg border border-[#1e1e22] bg-surface p-6">
        <h3 className="mb-1 text-sm font-semibold text-text">Scenario</h3>
        <p className="mb-3 text-xs text-text-dim">
          What thesis or idea do you want to stress-test?
        </p>
        <textarea
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          rows={4}
          placeholder="e.g. Enterprise clients should adopt zero-trust architecture as a competitive advantage..."
          className="w-full resize-none rounded-lg border border-[#1e1e22] bg-surface-raised px-4 py-3 text-sm text-text placeholder:text-text-dim focus:border-amber/40 focus:outline-none focus:ring-1 focus:ring-amber/20"
        />
      </section>

      {/* Mental Models Selector */}
      <section className="rounded-lg border border-[#1e1e22] bg-surface p-6">
        <h3 className="mb-1 text-sm font-semibold text-text">
          Mental Models
        </h3>
        <p className="mb-4 text-xs text-text-dim">
          Select the lenses through which actors will evaluate the scenario.
        </p>

        <div className="space-y-3">
          {knowledgeFields.map((field) => {
            const open = expandedFields.includes(field.name);
            return (
              <div
                key={field.name}
                className="rounded-lg border border-[#1e1e22] bg-surface-raised"
              >
                <button
                  type="button"
                  onClick={() => toggleField(field.name)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-xs font-semibold tracking-wide text-text-secondary">
                    {field.name}
                  </span>
                  {open ? (
                    <ChevronDown className="h-3.5 w-3.5 text-text-dim" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-text-dim" />
                  )}
                </button>

                {open && (
                  <div className="grid grid-cols-1 gap-2 px-4 pb-4 sm:grid-cols-2">
                    {field.models.map((model) => {
                      const selected = selectedModels.includes(model.id);
                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => toggleModel(model.id)}
                          className={cn(
                            "rounded-lg border p-3 text-left transition-colors",
                            selected
                              ? "border-purple/40 bg-purple/5"
                              : "border-[#1e1e22] bg-bg hover:border-text-dim/30"
                          )}
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <div
                              className={cn(
                                "h-3.5 w-3.5 rounded border",
                                selected
                                  ? "border-purple bg-purple"
                                  : "border-text-dim"
                              )}
                            />
                            <span className="text-xs font-semibold text-text">
                              {model.name}
                            </span>
                            <span className="rounded-full border border-purple/20 bg-purple/10 px-1.5 py-0.5 text-[9px] font-medium text-purple">
                              {model.field}
                            </span>
                          </div>
                          <p className="pl-5 text-[11px] leading-relaxed text-text-dim">
                            {model.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Actor Configuration */}
      <section className="rounded-lg border border-[#1e1e22] bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-sm font-semibold text-text">Actors</h3>
            <p className="text-xs text-text-dim">
              Configure the participants in the wargame simulation.
            </p>
          </div>
          <button
            type="button"
            onClick={addActor}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e1e22] bg-surface-raised px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-text-dim/30 hover:text-text"
          >
            <Plus className="h-3 w-3" />
            Add Actor
          </button>
        </div>

        <div className="space-y-3">
          {actors.map((actor) => (
            <div
              key={actor.id}
              className="rounded-lg border border-[#1e1e22] bg-surface-raised p-4"
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-dim">
                    Name
                  </label>
                  <input
                    type="text"
                    value={actor.name}
                    onChange={(e) =>
                      updateActor(actor.id, { name: e.target.value })
                    }
                    className="w-full rounded border border-[#1e1e22] bg-bg px-2.5 py-1.5 text-xs text-text focus:border-amber/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-dim">
                    Role
                  </label>
                  <input
                    type="text"
                    value={actor.role}
                    onChange={(e) =>
                      updateActor(actor.id, { role: e.target.value })
                    }
                    className="w-full rounded border border-[#1e1e22] bg-bg px-2.5 py-1.5 text-xs text-text focus:border-amber/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-dim">
                    Archetype
                  </label>
                  <input
                    type="text"
                    value={actor.archetype}
                    onChange={(e) =>
                      updateActor(actor.id, { archetype: e.target.value })
                    }
                    className="w-full rounded border border-[#1e1e22] bg-bg px-2.5 py-1.5 text-xs text-text focus:border-amber/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-dim">
                    Mental Model
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={actor.modelId}
                      onChange={(e) =>
                        updateActor(actor.id, { modelId: e.target.value })
                      }
                      className="w-full rounded border border-[#1e1e22] bg-bg px-2.5 py-1.5 text-xs text-text focus:border-amber/40 focus:outline-none"
                    >
                      {allModels.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeActor(actor.id)}
                      className="shrink-0 rounded p-1 text-text-dim transition-colors hover:bg-red/10 hover:text-red"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Settings Row */}
      <section className="flex flex-wrap items-center gap-6 rounded-lg border border-[#1e1e22] bg-surface p-6">
        {/* Round Count */}
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-dim">
            Rounds
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRounds(n)}
                className={cn(
                  "h-8 w-8 rounded text-xs font-medium transition-colors",
                  n === rounds
                    ? "bg-amber/20 text-amber border border-amber/30"
                    : "bg-surface-raised text-text-dim border border-[#1e1e22] hover:text-text-secondary"
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Adversarial Mode */}
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-dim">
            Adversarial Mode
          </label>
          <button
            type="button"
            onClick={() => setAdversarial(!adversarial)}
            className="flex items-center gap-2 text-sm"
          >
            {adversarial ? (
              <ToggleRight className="h-6 w-6 text-red" />
            ) : (
              <ToggleLeft className="h-6 w-6 text-text-dim" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                adversarial ? "text-red" : "text-text-dim"
              )}
            >
              {adversarial ? "Enabled" : "Disabled"}
            </span>
          </button>
        </div>
      </section>

      {/* Launch */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber px-6 py-3.5 text-sm font-bold text-bg transition-colors hover:bg-amber-bright"
      >
        <Swords className="h-4 w-4" />
        Launch Wargame
      </button>
    </div>
  );
}
