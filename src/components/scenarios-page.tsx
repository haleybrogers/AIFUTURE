"use client";

import { useState, useEffect, useCallback } from "react";
import {
  GitBranch,
  Calculator,
  Save,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

type Assumption = {
  id: string;
  title: string;
  category: string;
  convictionScore: number;
};

type ServiceLine = {
  id: string;
  name: string;
  type: string;
  status: string;
  assumptionLinks: { assumption: { id: string; title: string } }[];
};

type AssumptionState = "true" | "false" | "uncertain";

function RevenueCalculator() {
  const [clients, setClients] = useState(25);
  const [revPerClient, setRevPerClient] = useState(15000);
  const [costReduction, setCostReduction] = useState(50);
  const [teamSize, setTeamSize] = useState(30);
  const [outcomePremium, setOutcomePremium] = useState(30);

  // Current model
  const currentRevenue = clients * revPerClient;
  const currentRevenuePerPerson = Math.round(currentRevenue / teamSize);

  // Time-based model with AI (more clients, same team)
  const jevonsFactor = Math.pow(1 / Math.max(1 - costReduction / 100, 0.1), 1.4);
  const aiClients = Math.round(clients * jevonsFactor);
  const aiRevPerClient = Math.round(revPerClient * Math.max(1 - costReduction / 200, 0.5));
  const aiTeamSize = Math.round(teamSize * (1 + Math.log(jevonsFactor) * 0.3));
  const aiRevenue = aiClients * aiRevPerClient;
  const aiRevenuePerPerson = Math.round(aiRevenue / aiTeamSize);

  // Outcome-based model
  const outcomeRevPerClient = Math.round(
    aiRevPerClient * (1 + outcomePremium / 100)
  );
  const outcomeRevenue = aiClients * outcomeRevPerClient;
  const outcomeRevenuePerPerson = Math.round(outcomeRevenue / aiTeamSize);

  const chartData = [
    {
      name: "Revenue/mo",
      Current: currentRevenue,
      "AI + Time-Based": aiRevenue,
      "AI + Outcome-Based": outcomeRevenue,
    },
    {
      name: "Clients",
      Current: clients,
      "AI + Time-Based": aiClients,
      "AI + Outcome-Based": aiClients,
    },
    {
      name: "Rev/Person",
      Current: currentRevenuePerPerson,
      "AI + Time-Based": aiRevenuePerPerson,
      "AI + Outcome-Based": outcomeRevenuePerPerson,
    },
  ];

  return (
    <div className="bg-card border border-card-border rounded-2xl p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-accent-light" />
        <h2 className="text-xl font-semibold">Revenue Model Calculator</h2>
      </div>
      <p className="text-sm text-muted">
        Adjust the sliders to compare current vs. AI-augmented vs. outcome-based
        revenue models.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Current clients</span>
              <span className="font-mono">{clients}</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              value={clients}
              onChange={(e) => setClients(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Avg revenue/client/mo</span>
              <span className="font-mono">
                ${revPerClient.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={50000}
              step={1000}
              value={revPerClient}
              onChange={(e) => setRevPerClient(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Production cost reduction</span>
              <span className="font-mono">{costReduction}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={90}
              value={costReduction}
              onChange={(e) => setCostReduction(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Current team size</span>
              <span className="font-mono">{teamSize}</span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Outcome pricing premium</span>
              <span className="font-mono">+{outcomePremium}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={outcomePremium}
              onChange={(e) => setOutcomePremium(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <p className="text-xs text-muted mb-1">Current</p>
              <p className="font-bold text-sm">
                ${(currentRevenue / 1000).toFixed(0)}k/mo
              </p>
              <p className="text-xs text-muted">{clients} clients</p>
              <p className="text-xs text-muted">{teamSize} people</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
              <p className="text-xs text-cyan-300 mb-1">AI + Time</p>
              <p className="font-bold text-sm text-cyan-300">
                ${(aiRevenue / 1000).toFixed(0)}k/mo
              </p>
              <p className="text-xs text-muted">{aiClients} clients</p>
              <p className="text-xs text-muted">{aiTeamSize} people</p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
              <p className="text-xs text-accent-light mb-1">AI + Outcome</p>
              <p className="font-bold text-sm text-accent-light">
                ${(outcomeRevenue / 1000).toFixed(0)}k/mo
              </p>
              <p className="text-xs text-muted">{aiClients} clients</p>
              <p className="text-xs text-muted">{aiTeamSize} people</p>
            </div>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    name: "Monthly Revenue",
                    Current: currentRevenue,
                    "AI+Time": aiRevenue,
                    "AI+Outcome": outcomeRevenue,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={11} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
                <Bar dataKey="Current" fill="#555" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AI+Time" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AI+Outcome" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
            <p className="text-sm">
              Revenue per person:{" "}
              <span className="font-bold">
                ${currentRevenuePerPerson.toLocaleString()}
              </span>{" "}
              &rarr;{" "}
              <span className="font-bold text-emerald-400">
                ${outcomeRevenuePerPerson.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScenariosPage() {
  const [assumptions, setAssumptions] = useState<Assumption[]>([]);
  const [services, setServices] = useState<ServiceLine[]>([]);
  const [states, setStates] = useState<Record<string, AssumptionState>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const [assRes, servRes] = await Promise.all([
      fetch("/api/assumptions"),
      fetch("/api/services"),
    ]);
    const assData = await assRes.json();
    const servData = await servRes.json();
    setAssumptions(assData);
    setServices(servData);
    // Initialize all as uncertain
    const initial: Record<string, AssumptionState> = {};
    assData.forEach((a: Assumption) => {
      initial[a.id] = a.convictionScore >= 70 ? "true" : a.convictionScore <= 30 ? "false" : "uncertain";
    });
    setStates(initial);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleState = (id: string) => {
    setStates((prev) => {
      const current = prev[id];
      const next: AssumptionState =
        current === "true"
          ? "false"
          : current === "false"
          ? "uncertain"
          : "true";
      return { ...prev, [id]: next };
    });
  };

  // Determine viable services based on current assumption states
  const viableServices = services.filter((service) => {
    if (service.assumptionLinks.length === 0) return true;
    return service.assumptionLinks.every(
      (link) => states[link.assumption.id] !== "false"
    );
  });

  const blockedServices = services.filter((service) => {
    if (service.assumptionLinks.length === 0) return false;
    return service.assumptionLinks.some(
      (link) => states[link.assumption.id] === "false"
    );
  });

  const stateColors: Record<AssumptionState, string> = {
    true: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    false: "bg-red-500/20 text-red-300 border-red-500/30",
    uncertain: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };

  const stateIcons: Record<AssumptionState, typeof ToggleRight> = {
    true: ToggleRight,
    false: ToggleLeft,
    uncertain: HelpCircle,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <GitBranch className="w-8 h-8 text-accent-light" />
          Scenarios
        </h1>
        <p className="text-muted mt-2">
          Toggle assumptions on/off to see which strategies and service lines
          are viable. Play with the revenue calculator below.
        </p>
      </div>

      {/* Scenario Builder */}
      <div className="bg-card border border-card-border rounded-2xl p-8 space-y-6">
        <h2 className="text-xl font-semibold">Scenario Builder</h2>
        <p className="text-sm text-muted">
          Click each assumption to cycle through: <span className="text-emerald-300">True</span> &rarr;{" "}
          <span className="text-red-300">False</span> &rarr;{" "}
          <span className="text-amber-300">Uncertain</span>
        </p>

        {loading ? (
          <div className="text-center py-8 text-muted">Loading...</div>
        ) : assumptions.length === 0 ? (
          <div className="text-center py-8 text-muted">
            Add assumptions on the first tab to use the scenario builder.
          </div>
        ) : (
          <div className="space-y-2">
            {assumptions.map((a) => {
              const state = states[a.id] || "uncertain";
              const Icon = stateIcons[state];
              return (
                <button
                  key={a.id}
                  onClick={() => toggleState(a.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left",
                    stateColors[state]
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium flex-1">
                    {a.title}
                  </span>
                  <span className="text-xs opacity-70 capitalize">
                    {state}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results */}
        {services.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-card-border">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Viable Services ({viableServices.length})
              </h3>
              {viableServices.map((s) => (
                <div
                  key={s.id}
                  className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg px-4 py-2.5 text-sm"
                >
                  {s.name}
                  <span
                    className={cn(
                      "ml-2 text-xs px-1.5 py-0.5 rounded",
                      s.type === "new"
                        ? "bg-accent/20 text-accent-light"
                        : "bg-amber-500/20 text-amber-300"
                    )}
                  >
                    {s.type}
                  </span>
                </div>
              ))}
              {viableServices.length === 0 && (
                <p className="text-xs text-muted">
                  No services viable under this scenario.
                </p>
              )}
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-red-400 flex items-center gap-2">
                <ToggleLeft className="w-4 h-4" />
                Blocked Services ({blockedServices.length})
              </h3>
              {blockedServices.map((s) => (
                <div
                  key={s.id}
                  className="bg-red-500/5 border border-red-500/10 rounded-lg px-4 py-2.5 text-sm opacity-60"
                >
                  {s.name}
                  <span className="ml-2 text-xs text-muted">
                    (needs:{" "}
                    {s.assumptionLinks
                      .filter((l) => states[l.assumption.id] === "false")
                      .map((l) => l.assumption.title)
                      .join(", ")}
                    )
                  </span>
                </div>
              ))}
              {blockedServices.length === 0 && (
                <p className="text-xs text-muted">
                  All services are viable.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Revenue Calculator */}
      <RevenueCalculator />
    </div>
  );
}
