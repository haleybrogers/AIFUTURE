"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, Snowflake, Fuel, Monitor, Palette } from "lucide-react";

// Historical data for Jevons' examples
const iceData = [
  { year: "1830", price: 100, consumption: 5 },
  { year: "1850", price: 70, consumption: 15 },
  { year: "1870", price: 40, consumption: 50 },
  { year: "1890", price: 20, consumption: 150 },
  { year: "1910", price: 8, consumption: 500 },
  { year: "1930", price: 3, consumption: 2000 },
  { year: "1950", price: 1, consumption: 8000 },
];

const oilData = [
  { year: "1860", priceIndex: 100, usage: 5 },
  { year: "1880", priceIndex: 45, usage: 25 },
  { year: "1900", priceIndex: 30, usage: 80 },
  { year: "1920", priceIndex: 25, usage: 250 },
  { year: "1940", priceIndex: 20, usage: 500 },
  { year: "1960", priceIndex: 15, usage: 1200 },
  { year: "1980", priceIndex: 35, usage: 2500 },
  { year: "2000", priceIndex: 18, usage: 3500 },
];

const computeData = [
  { year: "1960", costPerCalc: 100, computers: 0.001 },
  { year: "1970", costPerCalc: 50, computers: 0.01 },
  { year: "1980", costPerCalc: 10, computers: 0.5 },
  { year: "1990", costPerCalc: 1, computers: 50 },
  { year: "2000", costPerCalc: 0.1, computers: 500 },
  { year: "2010", costPerCalc: 0.001, computers: 2000 },
  { year: "2020", costPerCalc: 0.0001, computers: 5000 },
];

function generatePearmillData(costReduction: number) {
  const baseClients = 25;
  const baseRevPerClient = 15000;
  const costFactor = 1 - costReduction / 100;
  // Jevons' effect: as cost drops, addressable market expands exponentially
  const marketExpansion = Math.pow(1 / Math.max(costFactor, 0.05), 1.8);
  const newClients = Math.round(baseClients * marketExpansion);
  const newRevPerClient = Math.round(baseRevPerClient * Math.max(costFactor, 0.3));
  const oldTotal = baseClients * baseRevPerClient;
  const newTotal = newClients * newRevPerClient;

  return {
    currentClients: baseClients,
    currentRevPerClient: baseRevPerClient,
    currentTotal: oldTotal,
    newClients,
    newRevPerClient,
    newTotal,
    growth: Math.round(((newTotal - oldTotal) / oldTotal) * 100),
  };
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-card-border rounded-2xl p-8 space-y-6">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function JevonsPage() {
  const [costReduction, setCostReduction] = useState(60);
  const pearmillData = generatePearmillData(costReduction);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Jevons&apos; Paradox
        </h1>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          When something gets cheaper, we don&apos;t use less of it.
          <br />
          <span className="text-accent-light font-medium">
            We use way, way more.
          </span>
        </p>
      </div>

      {/* The 5th-grade explanation */}
      <Section
        icon={<Snowflake className="w-6 h-6 text-blue-400" />}
        title="The Ice Story"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 text-base leading-relaxed">
            <p>
              <strong className="text-blue-400">Imagine it&apos;s 1830.</strong>{" "}
              Ice is really, really expensive. People cut it from frozen lakes in
              winter and ship it hundreds of miles. Only fancy restaurants and
              rich families can afford it.
            </p>
            <p>
              Then someone invents the{" "}
              <strong className="text-blue-400">refrigerator</strong>. Now ice
              is basically free. You&apos;d think: &ldquo;Well, the ice business is
              dead.&rdquo;
            </p>
            <p>
              <strong className="text-emerald-400">
                But the opposite happened.
              </strong>{" "}
              Suddenly everyone wanted ice. Gas stations, homes, hospitals,
              grocery stores, factories. The ice industry got{" "}
              <strong>1,000x bigger</strong> because it got cheaper.
            </p>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mt-4">
              <p className="text-accent-light font-medium">
                That&apos;s Jevons&apos; Paradox: when something gets cheaper, the
                total amount used explodes — because now everyone can afford it.
              </p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={iceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="consumption"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.15}
                  name="Ice consumed (tons)"
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.1}
                  name="Price per ton"
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-muted mt-2">
              Red = price falling. Green = consumption exploding.
            </p>
          </div>
        </div>
      </Section>

      {/* Historical Examples */}
      <div className="grid md:grid-cols-2 gap-6">
        <Section
          icon={<Fuel className="w-6 h-6 text-amber-400" />}
          title="Oil & Energy"
        >
          <p className="text-muted text-sm">
            In the 1800s, people thought cheaper oil would reduce mining jobs.
            Instead, cheap oil created entire industries: cars, plastics,
            aviation, heating. The oil economy got 100x bigger.
          </p>
          <div className="h-[220px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={oilData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="priceIndex"
                  stroke="#eab308"
                  strokeWidth={2}
                  name="Price Index"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Usage (M barrels)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section
          icon={<Monitor className="w-6 h-6 text-cyan-400" />}
          title="Computing"
        >
          <p className="text-muted text-sm">
            In 1960, there were maybe 5 computers in the world. The cost per
            calculation dropped 99.9999% — and now there are 5{" "}
            <em>billion</em> computing devices. The industry didn&apos;t shrink.
            It became the largest in human history.
          </p>
          <div className="h-[220px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={computeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="year" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="computers"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  name="Devices (millions)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      {/* Software Engineers */}
      <Section
        icon={<TrendingUp className="w-6 h-6 text-violet-400" />}
        title="Software Engineers (This Is Happening Right Now)"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-muted">
              In 2024, AI started writing code. Everyone said: &ldquo;Software
              engineers are done.&rdquo;
            </p>
            <p>
              <strong className="text-emerald-400">
                The opposite happened.
              </strong>{" "}
              More software engineers were hired in 2024-2025 than ever before.
              Why? Because building software got cheaper, so{" "}
              <em>more companies built software</em>. Startups that couldn&apos;t
              afford a dev team suddenly could. The market exploded.
            </p>
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4 space-y-2">
              <p className="font-medium text-violet-300">The key insight:</p>
              <p className="text-sm text-muted">
                The engineers who got better at using AI became{" "}
                <strong className="text-foreground">10x more valuable</strong>,
                not obsolete. They shipped more, faster, at higher quality.
                Companies fought to hire them.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-br from-violet-500/20 to-accent/20 rounded-2xl p-8 text-center space-y-4">
              <p className="text-5xl font-bold text-violet-300">+23%</p>
              <p className="text-sm text-muted">
                Growth in software engineering roles
                <br />
                2024-2025, despite AI automation
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-3xl font-bold text-emerald-400">$4.2T</p>
                <p className="text-sm text-muted">
                  Global software market 2025
                  <br />
                  up from $2.1T in 2022
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* The Pearmill Version — Interactive */}
      <Section
        icon={<Palette className="w-6 h-6 text-accent-light" />}
        title="What This Means for Pearmill"
      >
        <p className="text-muted">
          Drag the slider to see what happens to Pearmill&apos;s addressable market
          as creative production costs drop.
        </p>

        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Cost reduction</span>
              <span className="text-accent-light font-mono font-bold">
                {costReduction}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={95}
              value={costReduction}
              onChange={(e) => setCostReduction(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>No change</span>
              <span>95% cheaper</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-5 space-y-2">
              <p className="text-xs text-muted uppercase tracking-wider">
                Before
              </p>
              <p className="text-2xl font-bold">
                {pearmillData.currentClients} clients
              </p>
              <p className="text-sm text-muted">
                ${pearmillData.currentRevPerClient.toLocaleString()}/mo each
              </p>
              <p className="text-lg font-semibold text-muted">
                ${pearmillData.currentTotal.toLocaleString()}/mo
              </p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-5 space-y-2">
              <p className="text-xs text-accent-light uppercase tracking-wider">
                After Jevons&apos; Effect
              </p>
              <p className="text-2xl font-bold text-accent-light">
                {pearmillData.newClients} clients
              </p>
              <p className="text-sm text-muted">
                ${pearmillData.newRevPerClient.toLocaleString()}/mo each
              </p>
              <p className="text-lg font-semibold text-accent-light">
                ${pearmillData.newTotal.toLocaleString()}/mo
              </p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-emerald-400">
                {pearmillData.growth > 0 ? "+" : ""}
                {pearmillData.growth}%
              </p>
              <p className="text-sm text-muted mt-1">revenue growth</p>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
            <p className="text-lg font-medium text-emerald-300">
              Cheaper doesn&apos;t mean less work. It means the pie gets so much
              bigger that everyone gets a bigger slice.
            </p>
            <p className="text-sm text-muted mt-2">
              All those companies that couldn&apos;t afford Pearmill? Now they can.
              That&apos;s not fewer jobs — that&apos;s more clients.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
