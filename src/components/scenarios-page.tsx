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
  ChevronDown,
  Shield,
  ShieldAlert,
  Layers,
  ExternalLink,
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

type Evidence = {
  id: string;
  content: string;
  type: string;
  sourceUrl: string | null;
};

type ServiceLink = {
  id: string;
  serviceLine: { id: string; name: string; status: string };
};

type Assumption = {
  id: string;
  title: string;
  description: string;
  category: string;
  convictionScore: number;
  evidence: Evidence[];
  serviceLinks: ServiceLink[];
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
        Adjust the sliders to compare three ways of running the business: the way things work now,
        using AI to do more with the same team, and charging clients for results instead of hours.
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
              <span className="text-muted">Avg monthly fee per client</span>
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
              <span className="text-muted">How much cheaper AI makes production</span>
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
              <span className="text-muted">Extra charge for guaranteeing results</span>
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
            <div className="bg-subtle-bg rounded-lg p-3 text-center">
              <p className="text-xs text-muted mb-1">Current</p>
              <p className="font-bold text-sm">
                ${(currentRevenue / 1000).toFixed(0)}k/mo
              </p>
              <p className="text-xs text-muted">{clients} clients</p>
              <p className="text-xs text-muted">{teamSize} people</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
              <p className="text-xs text-cyan-600 mb-1">AI + hourly billing</p>
              <p className="font-bold text-sm text-cyan-600">
                ${(aiRevenue / 1000).toFixed(0)}k/mo
              </p>
              <p className="text-xs text-muted">{aiClients} clients</p>
              <p className="text-xs text-muted">{aiTeamSize} people</p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
              <p className="text-xs text-accent-light mb-1">AI + results-based</p>
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
                    "AI + Hourly": aiRevenue,
                    "AI + Results": outcomeRevenue,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    border: "1px solid #e8eaed",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
                <Bar dataKey="Current" fill="#c4c8cf" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AI + Hourly" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AI + Results" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
            <p className="text-sm">
              Revenue per team member:{" "}
              <span className="font-bold">
                ${currentRevenuePerPerson.toLocaleString()}
              </span>{" "}
              &rarr;{" "}
              <span className="font-bold text-emerald-600">
                ${outcomeRevenuePerPerson.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const categoryLabels: Record<string, string> = {
  market: "Market",
  technology: "Technology",
  org_structure: "Org Structure",
  pricing: "Pricing",
  other: "Other",
};

const categoryColors: Record<string, string> = {
  market: "bg-emerald-100 text-emerald-700",
  technology: "bg-cyan-100 text-cyan-700",
  org_structure: "bg-amber-100 text-amber-700",
  pricing: "bg-violet-100 text-violet-700",
  other: "bg-gray-100 text-gray-600",
};

export function ScenariosPage() {
  const [assumptions, setAssumptions] = useState<Assumption[]>([]);
  const [services, setServices] = useState<ServiceLine[]>([]);
  const [states, setStates] = useState<Record<string, AssumptionState>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
    true: "bg-emerald-100 text-emerald-800 border-emerald-200",
    false: "bg-red-100 text-red-800 border-red-200",
    uncertain: "bg-amber-100 text-amber-800 border-amber-200",
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
          Use the toggle to set each assumption <span className="text-emerald-600">True</span>,{" "}
          <span className="text-red-600">False</span>, or{" "}
          <span className="text-amber-600">Uncertain</span>.
          Click anywhere else on the row to learn more about it.
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
              const isExpanded = expandedId === a.id;
              const forEvidence = a.evidence?.filter((e) => e.type === "for") || [];
              const againstEvidence = a.evidence?.filter((e) => e.type === "against") || [];
              const linkedServices = a.serviceLinks || [];

              return (
                <div key={a.id} className={cn(
                  "rounded-xl border transition-all overflow-hidden",
                  stateColors[state],
                  isExpanded && "shadow-md"
                )}>
                  {/* Row header */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : a.id)}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleState(a.id); }}
                      className="hover:scale-110 transition-transform flex-shrink-0"
                      title={`Toggle: ${state}`}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium flex-1">{a.title}</span>
                    <span className="text-xs opacity-70 capitalize mr-1">{state}</span>
                    <ChevronDown className={cn(
                      "w-4 h-4 opacity-50 transition-transform",
                      isExpanded && "rotate-180"
                    )} />
                  </div>

                  {/* Expanded detail panel */}
                  {isExpanded && (
                    <div className="bg-white border-t border-current/10 px-5 py-5 space-y-5 text-foreground">
                      {/* Description + conviction */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full", categoryColors[a.category] || categoryColors.other)}>
                            {categoryLabels[a.category] || a.category}
                          </span>
                          <span className="text-xs text-muted">
                            Team conviction: <strong className={cn(
                              a.convictionScore >= 75 ? "text-emerald-600" :
                              a.convictionScore >= 40 ? "text-amber-600" : "text-red-500"
                            )}>{a.convictionScore}%</strong>
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted">{a.description}</p>
                        {/* Conviction bar */}
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all",
                              a.convictionScore >= 75 ? "bg-emerald-500" :
                              a.convictionScore >= 40 ? "bg-amber-500" : "bg-red-400"
                            )}
                            style={{ width: `${a.convictionScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Evidence */}
                      {(forEvidence.length > 0 || againstEvidence.length > 0) && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                              <Shield className="w-3.5 h-3.5" />
                              Evidence For ({forEvidence.length})
                            </div>
                            {forEvidence.map((e) => (
                              <div key={e.id} className="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 text-xs leading-relaxed">
                                {e.content}
                                {e.sourceUrl && (
                                  <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-accent-light mt-1 text-[11px]">
                                    Source <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              Evidence Against ({againstEvidence.length})
                            </div>
                            {againstEvidence.length > 0 ? againstEvidence.map((e) => (
                              <div key={e.id} className="bg-red-50 border border-red-100 rounded-lg p-2.5 text-xs leading-relaxed">
                                {e.content}
                              </div>
                            )) : (
                              <p className="text-xs text-muted italic">No counter-evidence yet</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* What depends on this */}
                      {linkedServices.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                            <Layers className="w-3.5 h-3.5" />
                            What depends on this assumption
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {linkedServices.map((link) => (
                              <span key={link.id}
                                className={cn(
                                  "text-xs px-2.5 py-1 rounded-lg border",
                                  states[a.id] === "false"
                                    ? "bg-red-50 border-red-200 text-red-700 line-through"
                                    : "bg-subtle-bg border-card-border text-foreground"
                                )}>
                                {link.serviceLine.name}
                                {states[a.id] === "false" && " — blocked"}
                              </span>
                            ))}
                          </div>
                          {states[a.id] === "false" && (
                            <p className="text-xs text-red-600">
                              Setting this to False blocks {linkedServices.length} service{linkedServices.length > 1 ? "s" : ""} from being viable.
                            </p>
                          )}
                        </div>
                      )}

                      {/* What this means summary */}
                      <div className="bg-subtle-bg rounded-lg p-3 text-xs text-muted leading-relaxed">
                        <strong className="text-foreground">What this means for scenarios:</strong>{" "}
                        {states[a.id] === "true" && "You believe this will happen. Strategies that depend on this assumption are viable."}
                        {states[a.id] === "false" && "You believe this won't happen. Any service lines that require this assumption are blocked."}
                        {states[a.id] === "uncertain" && "You're not sure yet. Service lines that depend on this carry risk — they might work, or they might not."}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Results */}
        {services.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-card-border">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-emerald-600 flex items-center gap-2">
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
                        : "bg-amber-100 text-amber-700"
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
              <h3 className="text-sm font-medium text-red-600 flex items-center gap-2">
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
