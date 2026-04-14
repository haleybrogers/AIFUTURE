"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Building2,
  User,
  Target,
  Users,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AutonomyRating = {
  id: string;
  competencyId: string;
  timeframe: string;
  rating: number;
};

type Competency = {
  id: string;
  name: string;
  description: string | null;
  ratings: AutonomyRating[];
};

const timeframes = [
  { key: "now", label: "Now" },
  { key: "1yr", label: "1 Year" },
  { key: "3yr", label: "3 Years" },
];

const ratingLabels = ["", "Manual", "Mostly Manual", "Hybrid", "Mostly Auto", "Autonomous"];
const ratingColors = [
  "",
  "bg-red-500/30 text-red-300 border-red-500/30",
  "bg-orange-500/30 text-orange-300 border-orange-500/30",
  "bg-amber-500/30 text-amber-300 border-amber-500/30",
  "bg-lime-500/30 text-lime-300 border-lime-500/30",
  "bg-emerald-500/30 text-emerald-300 border-emerald-500/30",
];

const roles = [
  {
    icon: User,
    title: "IC",
    subtitle: "Individual Contributor",
    description:
      "The builder. Actually doing the end work — running campaigns, creating assets, writing copy, building landing pages.",
    examples: "Lilia, Marco, Haight",
    color: "border-cyan-500/30 bg-cyan-500/5",
    iconColor: "text-cyan-400",
  },
  {
    icon: Target,
    title: "DRI",
    subtitle: "Directly Responsible Individual",
    description:
      "Owns an outcome end-to-end. Not managing people — owning results. They have the autonomy and accountability to make it happen.",
    examples: "Justin (Petal)",
    color: "border-violet-500/30 bg-violet-500/5",
    iconColor: "text-violet-400",
  },
  {
    icon: Users,
    title: "Player Coach",
    subtitle: "DRI + IC Hybrid",
    description:
      "Can be both a DRI and IC. Their job is to help other people do their jobs well. The evolved version of today's manager.",
    examples: "Current managers evolve into this",
    color: "border-amber-500/30 bg-amber-500/5",
    iconColor: "text-amber-400",
  },
];

export function OrgPage() {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCompetencies = useCallback(async () => {
    const res = await fetch("/api/competencies");
    const data = await res.json();
    setCompetencies(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCompetencies();
  }, [fetchCompetencies]);

  const updateRating = async (
    competencyId: string,
    timeframe: string,
    rating: number
  ) => {
    await fetch(`/api/competencies/${competencyId}/ratings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timeframe, rating }),
    });
    fetchCompetencies();
  };

  const getRating = (comp: Competency, timeframe: string) => {
    const r = comp.ratings.find((r) => r.timeframe === timeframe);
    return r?.rating ?? 1;
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Building2 className="w-8 h-8 text-accent-light" />
          The New Org
        </h1>
        <p className="text-muted mt-2">
          From 6 layers and role-based titles to 2 layers and outcome
          ownership. Here&apos;s the framework.
        </p>
      </div>

      {/* Before / After */}
      <div className="bg-card border border-card-border rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6">
          The Shift: Layers &rarr; Outcomes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-red-400 uppercase tracking-wider">
              Old Model
            </h3>
            <div className="space-y-2">
              {[
                "CEO / Partners",
                "VPs",
                "Directors",
                "Managers",
                "Senior ICs",
                "Junior ICs",
              ].map((layer, i) => (
                <div
                  key={layer}
                  className="bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-2 text-sm"
                  style={{ marginLeft: `${i * 16}px` }}
                >
                  Layer {i + 1}: {layer}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted">
              6 layers. Roles defined by title. Scale = more people at every level.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-emerald-400 uppercase tracking-wider">
              New Model
            </h3>
            <div className="space-y-2">
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-4 py-3 text-sm">
                Layer 1: DRIs + Player Coaches (own outcomes)
              </div>
              <div
                className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-4 py-3 text-sm"
                style={{ marginLeft: "16px" }}
              >
                Layer 2: ICs + AI Agents (build & execute)
              </div>
            </div>
            <p className="text-xs text-muted">
              2 layers. Roles defined by outcomes. Scale = better AI + more clients.
            </p>
          </div>
        </div>
      </div>

      {/* Three Roles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">The Three Roles</h2>
        <p className="text-sm text-muted mb-6">
          From Jack Dorsey / Block: every company will converge on these three
          roles. People move between them fluidly.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.title}
                className={cn(
                  "border rounded-xl p-6 space-y-3",
                  role.color
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-6 h-6", role.iconColor)} />
                  <div>
                    <h3 className="font-bold text-lg">{role.title}</h3>
                    <p className="text-xs text-muted">{role.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {role.description}
                </p>
                <div className="text-xs text-muted">
                  <span className="font-medium text-foreground">
                    Pearmill examples:
                  </span>{" "}
                  {role.examples}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Autonomy Heatmap */}
      <div className="bg-card border border-card-border rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-2">Autonomy Heatmap</h2>
        <p className="text-sm text-muted mb-6">
          Click cells to rate each competency&apos;s autonomy level. Where are we
          now vs. where we&apos;re heading?
        </p>

        {loading ? (
          <div className="text-center py-8 text-muted">Loading...</div>
        ) : competencies.length === 0 ? (
          <div className="text-center py-8 text-muted">
            No competencies seeded yet. Run the seed script to populate.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-muted pb-4 pr-4 w-48">
                    Competency
                  </th>
                  {timeframes.map((tf) => (
                    <th
                      key={tf.key}
                      className="text-center text-sm font-medium text-muted pb-4 px-2"
                    >
                      {tf.label}
                    </th>
                  ))}
                  <th className="text-left text-sm font-medium text-muted pb-4 pl-4 w-32">
                    Trajectory
                  </th>
                </tr>
              </thead>
              <tbody>
                {competencies.map((comp) => {
                  const nowRating = getRating(comp, "now");
                  const futureRating = getRating(comp, "3yr");
                  const delta = futureRating - nowRating;
                  return (
                    <tr key={comp.id} className="border-t border-card-border">
                      <td className="py-3 pr-4">
                        <span className="font-medium text-sm">
                          {comp.name}
                        </span>
                      </td>
                      {timeframes.map((tf) => {
                        const rating = getRating(comp, tf.key);
                        return (
                          <td key={tf.key} className="py-3 px-2 text-center">
                            <button
                              onClick={() => {
                                const next = rating >= 5 ? 1 : rating + 1;
                                updateRating(comp.id, tf.key, next);
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                                ratingColors[rating]
                              )}
                            >
                              {ratingLabels[rating]}
                            </button>
                          </td>
                        );
                      })}
                      <td className="py-3 pl-4">
                        <div className="flex items-center gap-1">
                          <ArrowRight
                            className={cn(
                              "w-4 h-4",
                              delta > 2
                                ? "text-emerald-400"
                                : delta > 0
                                ? "text-amber-400"
                                : "text-muted"
                            )}
                          />
                          <span
                            className={cn(
                              "text-xs font-medium",
                              delta > 2
                                ? "text-emerald-400"
                                : delta > 0
                                ? "text-amber-400"
                                : "text-muted"
                            )}
                          >
                            {delta > 0 ? `+${delta} levels` : "No change"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-2 mt-6 flex-wrap">
          {ratingLabels.slice(1).map((label, i) => (
            <div
              key={label}
              className={cn(
                "text-xs px-2 py-1 rounded border",
                ratingColors[i + 1]
              )}
            >
              {i + 1}: {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
