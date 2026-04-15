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

const ratingLabels = ["", "Humans only", "Mostly humans", "50/50 split", "Mostly AI", "AI handles it"];
const ratingColors = [
  "",
  "bg-red-100 text-red-700 border-red-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-lime-100 text-lime-700 border-lime-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
];

const roles = [
  {
    icon: User,
    title: "The Builder",
    subtitle: "Does the actual work",
    description:
      "This person creates things — they run ad campaigns, make videos, write copy, build landing pages. They're hands-on, working directly with the tools and AI to produce results.",
    examples: "Lilia, Marco, Haight",
    color: "border-cyan-200 bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    icon: Target,
    title: "The Owner",
    subtitle: "Responsible for a result",
    description:
      "This person owns an outcome from start to finish. They're not managing people — they're making sure something specific gets done. If a client needs 50 new customers this month, the Owner is on the hook for making it happen.",
    examples: "Justin (Petal)",
    color: "border-violet-200 bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Users,
    title: "The Player Coach",
    subtitle: "Does work + helps others do theirs",
    description:
      "Part Builder, part Owner. This person still does hands-on work, but they also help other team members do their jobs better. Think of it like a sports captain who still plays in the game but also lifts up the rest of the team. This replaces the traditional manager role.",
    examples: "Current managers evolve into this",
    color: "border-amber-200 bg-amber-50",
    iconColor: "text-amber-600",
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
          How companies are reorganizing for the AI era — fewer layers,
          clearer ownership, and roles built around results instead of job titles.
        </p>
      </div>

      {/* Before / After */}
      <div className="bg-card rounded-2xl shadow-sm border border-card-border p-8">
        <h2 className="text-xl font-semibold mb-6">
          How the structure changes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-red-500 uppercase tracking-wider">
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
              The traditional way: 6 layers of hierarchy. You grow by adding more people at each level.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
              New Model
            </h3>
            <div className="space-y-2">
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-4 py-3 text-sm">
                Layer 1: Owners + Player Coaches (responsible for results)
              </div>
              <div
                className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-4 py-3 text-sm"
                style={{ marginLeft: "16px" }}
              >
                Layer 2: Builders + AI tools (do the actual work)
              </div>
            </div>
            <p className="text-xs text-muted">
              The new way: just 2 layers. You grow by getting better AI and taking on more clients — not by hiring more people.
            </p>
          </div>
        </div>
      </div>

      {/* Three Roles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">The Three Roles</h2>
        <p className="text-sm text-muted mb-6">
          Instead of a dozen different job titles, companies will settle on
          three core roles. People can move between them depending on the project.
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
      <div className="bg-card rounded-2xl shadow-sm border border-card-border p-8">
        <h2 className="text-xl font-semibold mb-2">How much can AI do on its own?</h2>
        <p className="text-sm text-muted mb-6">
          For each skill, rate how much AI can handle today vs. in 1 year vs. in 3 years. Click a cell to change it.
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
                    Skill
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
                                ? "text-emerald-600"
                                : delta > 0
                                ? "text-amber-600"
                                : "text-muted"
                            )}
                          />
                          <span
                            className={cn(
                              "text-xs font-medium",
                              delta > 2
                                ? "text-emerald-600"
                                : delta > 0
                                ? "text-amber-600"
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
