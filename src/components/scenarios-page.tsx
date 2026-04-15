"use client";

import { useState } from "react";
import {
  GitBranch,
  Calculator,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  TrendingUp,
  ChevronDown,
  Shield,
  ShieldAlert,
  ExternalLink,
  DollarSign,
  BarChart3,
  Paintbrush,
  Target,
  FlaskConical,
  Bot,
  Globe,
  FileText,
  Rocket,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

/* ─── Types ─── */

type Evidence = {
  id: string;
  content: string;
  type: string;
  sourceUrl: string | null;
};

type Assumption = {
  id: string;
  title: string;
  description: string;
  category: string;
  convictionScore: number;
  evidence: Evidence[];
  serviceLinks: { id: string; serviceLine: { id: string; name: string; status: string } }[];
};

type AssumptionState = "true" | "false" | "uncertain";

/* ─── Static Assumptions Data ─── */

const staticAssumptions: Assumption[] = [
  {
    id: "1", title: "Making things is about to get incredibly cheap",
    description: "AI is making it way cheaper to create ads, videos, websites, and software. Work that used to take a whole team several weeks can now be done in a few hours. This means the cost of actually making stuff is dropping fast — which changes everything about how agencies like Pearmill charge for their work and where the real value is.",
    category: "technology", convictionScore: 85,
    evidence: [
      { id: "e1", content: "Pearmill's founder Nima hasn't personally written a single line of code since December 2025. He's built entire products just by directing AI tools.", type: "for", sourceUrl: null },
      { id: "e2", content: "A product called HopKit took about 6 weeks to build. At the current pace of AI improvement, the same product might take just 2 days within a year.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "2", title: "Getting attention becomes the hardest part",
    description: "When anyone can build anything easily, the real challenge is getting people to notice it. There are only so many potential customers out there and only so much money to go around. The companies that win won't be the ones who make the best stuff — they'll be the ones who get it in front of the right people.",
    category: "market", convictionScore: 80,
    evidence: [],
    serviceLinks: [],
  },
  {
    id: "3", title: "Companies need to reorganize, not just add AI tools",
    description: "Just giving your existing team AI tools and calling it a day won't cut it. The company itself needs to change — different kinds of jobs, fewer management layers, different skills when hiring. The question now is whether you still need separate specialists for each task, or whether one person with AI can do several jobs at once.",
    category: "org_structure", convictionScore: 75,
    evidence: [
      { id: "e3", content: "A company called Octane built an AI tool that could replace 16 people's jobs. When the affected employees found out, they pushed back hard. People resist changes that threaten their roles — this makes reorganizing harder than it sounds.", type: "against", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "4", title: "Everyone is becoming a software builder",
    description: "Building software used to require years of specialized training. Now, people are building apps and tools the same way they'd make a spreadsheet — it's becoming that normal. People at Pearmill who were hired as marketers are now building software products.",
    category: "technology", convictionScore: 90,
    evidence: [
      { id: "e4", content: "Three Pearmill team members (Haley, Dino, and Justin) are now building software products even though none of them were originally hired as software engineers.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "5", title: "AI assistants will start buying things on our behalf",
    description: "Imagine your personal AI assistant has access to your credit card. You tell it 'find me shoes for this wedding' and it goes and purchases them for you. Now imagine millions of AI assistants all doing this — buying, selling, and negotiating with each other. This creates an entirely new economy where AI programs are the customers, not just people.",
    category: "market", convictionScore: 55,
    evidence: [],
    serviceLinks: [],
  },
  {
    id: "6", title: "Clients will pay for results, not hours worked",
    description: "Right now, most agencies charge by the hour or by the number of things they make. But what if instead, an agency said 'we guarantee you'll get 100 new customers this month, and you only pay us based on that'? That's outcome-based pricing — charging for results instead of time.",
    category: "pricing", convictionScore: 65,
    evidence: [
      { id: "e5", content: "One Pearmill client (Petal) already works close to this model. They focus on one specific industry and know exactly what it costs to get a new customer in each region, so pricing based on results is possible.", type: "for", sourceUrl: null },
      { id: "e6", content: "Some industries like healthcare have strict rules about advertising. It's harder to guarantee specific results there, so this pricing model may not work for every type of client.", type: "against", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "7", title: "We'll be able to score creative work like a test grade",
    description: "Right now, judging whether an ad or design is 'good' is mostly based on gut feelings and opinions. But AI is making it possible to actually score creative work — like getting a grade on a paper. Standardized scoring tools will tell you 'this ad is an 85 out of 100' based on real data.",
    category: "technology", convictionScore: 70,
    evidence: [],
    serviceLinks: [],
  },
  {
    id: "8", title: "A company's AI knowledge becomes its most valuable asset",
    description: "Think about what makes a company valuable. Today, it's mostly the people who work there. But what if all the lessons a company has learned got stored inside its AI systems? Then even when people leave, that knowledge stays and keeps getting smarter. The company itself becomes intelligent.",
    category: "org_structure", convictionScore: 60,
    evidence: [
      { id: "e7", content: "A company called Flux uses an AI coding tool called Devin. It was terrible at first, but after months of learning the company's specific code, it now outperforms other AI tools. The longer AI works with your data, the smarter it gets.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "9", title: "Cheaper production means a way bigger market, not less work",
    description: "History shows us something surprising: when something gets cheaper, people don't use less of it — they use way, way more of it. When computers got cheaper, the computer industry didn't shrink — it exploded. The same thing is happening with creative work. As AI makes it cheaper, the number of companies that can afford professional marketing will skyrocket.",
    category: "market", convictionScore: 85,
    evidence: [
      { id: "e8", content: "Even though AI can now write code, software engineering jobs actually grew 23% between 2024 and 2025. Cheaper didn't mean fewer jobs — it meant more demand.", type: "for", sourceUrl: null },
      { id: "e9", content: "Think about how many companies Pearmill has turned away because they couldn't afford the fees. If costs drop, all of those companies suddenly become potential clients.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "10", title: "AI running costs go up in 2026-2028, then drop",
    description: "Running AI requires special computer chips called GPUs. Right now, there's a shortage because only one company in the world (ASML, based in the Netherlands) makes the machines that manufacture these chips. So the cost of using AI is actually going up in the short term. But by around 2028, manufacturing will catch up and prices will fall again.",
    category: "technology", convictionScore: 70,
    evidence: [
      { id: "e10", content: "There's only one company in the world (ASML in the Netherlands) that makes the specialized machines needed to manufacture AI chips. They can only produce so many, which creates a bottleneck.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "11", title: "How you distribute becomes how you differentiate",
    description: "When AI makes it cheap to build any product, the product itself stops being special. Think about shoes — anyone can make a shoe. Nike wins because of how they market, not how they manufacture. The same thing is about to happen in software, content, and services. The companies that win won't have the best product — they'll have the best way of getting it in front of people. This is great news for Pearmill because distribution is literally what we do.",
    category: "market", convictionScore: 90,
    evidence: [
      { id: "e11", content: "Nike doesn't win on shoe technology — they win on athlete partnerships, community stores, and cultural relevance. Their distribution IS their product. (From Nima's strategy discussion)", type: "for", sourceUrl: null },
      { id: "e12", content: "There's a prediction that 80% of all marketing will become experiential in the next decade because digital gets flooded with AI content and people stop trusting it.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "12", title: "Agencies can now grow like software companies",
    description: "Traditionally, service companies like agencies couldn't grow fast because every new client meant hiring more people. Software companies could add customers for almost no extra cost, so they grew way faster. AI is changing this — agencies can now take on more clients without proportionally hiring more people. The concept is called a 'NeoFirm': a services company that scales more like a tech company. Some VCs are even starting to invest in agencies for the first time because of this.",
    category: "pricing", convictionScore: 75,
    evidence: [
      { id: "e13", content: "Venture capital firms, which historically never invested in agencies, are now funding agency-style businesses because they believe AI will let them scale like software companies. (From Ryan Daniels' NeoFirms essay)", type: "for", sourceUrl: null },
      { id: "e14", content: "The Petal client at Pearmill already operates close to an outcome-based model — they know the cost per lead in specific geographies and can guarantee results. This is the NeoFirm model in action.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "13", title: "Taste becomes the most valuable skill",
    description: "AI is trained on the average of all human knowledge. If you accept its first answer, you get average results. Everyone using AI without strong opinions ends up with the same mediocre output. The people who have spent years developing taste — knowing what's genuinely good versus just acceptable — become incredibly valuable because they're the ones who push AI past the average and into something exceptional.",
    category: "org_structure", convictionScore: 85,
    evidence: [
      { id: "e15", content: "People using AI heavily without strong creative direction are producing work that all looks and sounds the same — AI groupthink. The average of human intelligence produces average results. (From Nima's strategy discussion)", type: "for", sourceUrl: null },
      { id: "e16", content: "An engineer returning to the field after a decade uses AI to outperform veterans — not because she's more technical, but because she's better to work with. She gets the hardest problems because people trust her. Human skills + AI = you get the best work.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "14", title: "The 'ghost workforce' is the new normal — fewer people doing more jobs",
    description: "Companies aren't openly replacing marketers with AI. Instead, when someone quits or gets laid off, they just don't hire a replacement and point at AI tools. The result: 76% of marketers say they're now doing the work of 2-3 people. Headcount is shrinking but workloads are growing. This creates a massive opportunity for agencies who can be the external team that fills those gaps — especially if one person with AI at Pearmill can do what 3 in-house hires used to do.",
    category: "market", convictionScore: 90,
    evidence: [
      { id: "e17", content: "76% of marketers say they're doing the work of more than one job. Only 11% of companies say they've 'replaced workers with AI' — but they're not backfilling roles when people leave. (Content Marketing Institute, 2026)", type: "for", sourceUrl: null },
      { id: "e18", content: "26% of US marketers report 'AI brain fry' — mental fog, slower decisions, fatigue — the highest of any function. The ghost workforce is burning out. (eMarketer 2026)", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "15", title: "AI video is about to transform ad creative",
    description: "AI-generated video went from a novelty to a real production tool in 2026. Tools like Runway Gen-4.5 produce footage with cinematic quality. Brands using AI video ads are seeing 27% higher conversion rates than static images. OpenAI's Sora shut down because it was too expensive ($15M/day in compute), but competitors like Runway, Kling, and Veo filled the gap instantly. The best agencies aren't picking one tool — they're using different tools for different purposes.",
    category: "technology", convictionScore: 80,
    evidence: [
      { id: "e19", content: "Brands running AI-generated video ads report 27% higher conversion rates than static image campaigns. (Wyzowl 2026 State of Video Marketing)", type: "for", sourceUrl: null },
      { id: "e20", content: "OpenAI shut down Sora because each 10-second clip cost $1.30 to produce — they were losing $15M/day. But Runway, Kling, and Veo all stepped in immediately. The tech works; the economics are catching up. (Bloomberg, March 2026)", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "16", title: "Open-source AI lets you own your intelligence instead of renting it",
    description: "Open-source AI models (like Meta's Llama 4 and Mistral) are now as good as the paid ones from OpenAI and Anthropic for many tasks. This means companies can run AI on their own computers instead of sending data to someone else's cloud. Why does this matter? Because your data stays private, your costs are predictable, and you're not dependent on any single AI company. Think of it like the difference between renting an apartment and owning a house — ownership gives you control.",
    category: "technology", convictionScore: 75,
    evidence: [
      { id: "e21", content: "Open-source models like Llama 4 and Mistral now match GPT-4 level performance on many tasks. The gap between free and paid AI has effectively closed. (Multiple benchmarks, 2026)", type: "for", sourceUrl: null },
      { id: "e22", content: "The EU's AI Act requires data localization in healthcare, finance, and government. Companies in regulated industries are moving to self-hosted AI because they legally can't send data to external servers.", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "17", title: "The real AI risk isn't losing your job — it's becoming average",
    description: "Here's what the data actually shows: marketing manager jobs are up 14% year-over-year even as AI adoption hit 91%. AI isn't eliminating roles — it's eliminating the excuse to be mediocre. The marketers who adapt are getting paid more. The ones who don't are being quietly replaced by peers who use AI effectively. It's not human vs. AI. It's human-with-AI vs. human-without-AI.",
    category: "org_structure", convictionScore: 85,
    evidence: [
      { id: "e23", content: "Marketing manager jobs posted in 2026 are up 14% year-over-year — at the same time AI adoption in marketing hit 91%. The jobs aren't disappearing; they're evolving. (Multiple sources)", type: "for", sourceUrl: null },
      { id: "e24", content: "A marketing manager in 2024 spent 40% of their time on reports, data pulls, and content drafts. In 2026, AI handles most of that. The role didn't disappear — it became more strategic. (AI Log 2026)", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
  {
    id: "18", title: "Half of all AI agent projects will fail — but the ones that work will be massive",
    description: "Gartner predicts that 40%+ of agentic AI projects will be canceled by end of 2027 due to costs, unclear value, and weak governance. This sounds scary, but it's actually the pattern for every new technology — most early attempts fail, and then the winners capture enormous value. The agencies and companies that figure out AI agents that actually work will have a huge competitive moat because everyone else gave up.",
    category: "technology", convictionScore: 70,
    evidence: [
      { id: "e25", content: "Gartner expects 40%+ agentic AI projects to be canceled by end of 2027 due to costs, unclear value, and weak governance. But the AI agents market is still expected to grow from $12-15B in 2025 to $80-100B by 2030.", type: "for", sourceUrl: null },
      { id: "e26", content: "By 2027, half of companies using generative AI are expected to launch agentic AI applications capable of complex work with limited oversight. The winners will be the ones who survive the early failures. (PwC 2026)", type: "for", sourceUrl: null },
    ],
    serviceLinks: [],
  },
];

/* ─── Revenue Opportunities linked to assumptions ─── */

type RevenueOpp = {
  icon: typeof BarChart3;
  title: string;
  oneLiner: string;
  pricing: string;
  phase: string;
  detail: string;
};

// Each assumption key maps to the assumption title substring that identifies it
// and the revenue opportunities it unlocks
const assumptionOpportunities: Record<string, RevenueOpp[]> = {
  "Making things is about to get incredibly cheap": [
    {
      icon: Paintbrush,
      title: "AI-Powered Creative at Scale",
      oneLiner: "Produce 10x the ad variations at a fraction of the cost",
      pricing: "$3,000 – $15,000/mo",
      phase: "Now",
      detail: "Self-serve tools charge $39-249/mo. A managed service with real creative strategy commands 10-50x that.",
    },
    {
      icon: FileText,
      title: "AI Content Engine",
      oneLiner: "Ongoing content — social, blog, email — AI drafts, humans polish",
      pricing: "$2,000 – $8,000/mo",
      phase: "Now",
      detail: "AI reduces production cost by 60-80%. Higher margins or more competitive pricing.",
    },
  ],
  "Getting attention becomes the hardest part": [
    {
      icon: Globe,
      title: "Website & Landing Page Optimization",
      oneLiner: "Build, test, and improve the pages where ad clicks land",
      pricing: "$3,000 – $10,000/mo",
      phase: "Now",
      detail: "If getting attention is scarce, converting that attention is everything. Owning ads AND landing pages = full pipeline.",
    },
    {
      icon: FlaskConical,
      title: "Creative Testing as a Service",
      oneLiner: "Predict which ads will win before spending the budget",
      pricing: "$2,000 – $8,000/mo",
      phase: "Now",
      detail: "When attention is expensive, you can't waste it on bad ads. Systematic testing = better ROI on every dollar.",
    },
  ],
  "Companies need to reorganize": [
    {
      icon: Bot,
      title: "AI Agent Setup for Marketing",
      oneLiner: "Configure AI agents that monitor campaigns, adjust budgets, flag problems",
      pricing: "$5,000 – $25,000 setup + $1,000 – $5,000/mo",
      phase: "6 Months",
      detail: "If companies are restructuring, they need help setting up their new AI-powered workflows. First-mover advantage is massive.",
    },
  ],
  "Everyone is becoming a software builder": [
    {
      icon: BarChart3,
      title: "Custom Client Dashboards",
      oneLiner: "Personalized analytics dashboards — their goals, their metrics",
      pricing: "$2,000 – $10,000/mo",
      phase: "Now",
      detail: "Off-the-shelf tools charge $59-299/mo. Custom builds command 10-30x because they're tailored. One person with AI can build what took a dev team.",
    },
  ],
  "AI assistants will start buying things": [
    {
      icon: Bot,
      title: "AI Agent Commerce Readiness",
      oneLiner: "Help clients get their products found and purchased by AI shopping agents",
      pricing: "$5,000 – $15,000/mo",
      phase: "1 Year",
      detail: "Gartner predicts $15T in AI agent purchases by 2028. Clients need to optimize for a new kind of customer that isn't human.",
    },
  ],
  "Clients will pay for results": [
    {
      icon: Target,
      title: "Performance Guarantees",
      oneLiner: "Charge for results instead of hours — skin in the game",
      pricing: "$15-150/lead or 10-30% revenue share",
      phase: "6 Months",
      detail: "Pay-per-lead models earn $15-150 per lead. Revenue share = 10-30% of attributed revenue. Higher risk, 2-3x the reward.",
    },
  ],
  "We'll be able to score creative work": [
    {
      icon: FlaskConical,
      title: "AI-Scored Creative Quality",
      oneLiner: "Grade ads before they run — like a test score for creative work",
      pricing: "$2,000 – $8,000/mo",
      phase: "Now",
      detail: "When you can objectively score creative, you can prove your work is better. That's a massive differentiator.",
    },
  ],
  "company's AI knowledge becomes": [
    {
      icon: Rocket,
      title: "Sell Pearmill's AI Tools to Other Agencies",
      oneLiner: "Package institutional knowledge into software other agencies can buy",
      pricing: "$500 – $5,000/mo per agency",
      phase: "1 Year",
      detail: "If your company's AI gets smarter over time, those learnings become a product. Other agencies would pay for the playbooks baked into your AI.",
    },
  ],
  "Cheaper production means a way bigger market": [
    {
      icon: TrendingUp,
      title: "Jevons-Effect Client Expansion",
      oneLiner: "All the companies that couldn't afford Pearmill? Now they can.",
      pricing: "Volume play — more clients at lower price points",
      phase: "Now",
      detail: "Lower production costs = lower minimums = bigger addressable market. Instead of 25 clients at $15k, think 100+ clients at $5-8k.",
    },
  ],
  "AI running costs go up": [
    {
      icon: Zap,
      title: "Local Compute Advantage",
      oneLiner: "Buy GPUs now while they're cheaper, run AI locally to avoid rising cloud costs",
      pricing: "Cost savings: 30-50% vs. cloud by 2028",
      phase: "6 Months",
      detail: "Short-term GPU shortage means cloud AI costs rise. Buying hardware now = cost advantage over competitors who pay per-token.",
    },
  ],
  "How you distribute becomes how you differentiate": [
    {
      icon: Globe,
      title: "Full-Funnel Distribution Strategy",
      oneLiner: "Help companies stand out when everyone's product looks the same",
      pricing: "$5,000 – $20,000/mo",
      phase: "Now",
      detail: "When products become commoditized, marketing becomes the product. Comprehensive distribution strategy (not just ads) becomes the premium service.",
    },
    {
      icon: Target,
      title: "Experiential & Community Marketing",
      oneLiner: "Real-world activations and community building as digital gets flooded",
      pricing: "$10,000 – $50,000/project",
      phase: "6 Months",
      detail: "80% of marketing predicted to become experiential. Helping brands build real-world presence and community as AI floods digital channels.",
    },
  ],
  "Agencies can now grow like software companies": [
    {
      icon: TrendingUp,
      title: "NeoFirm Scaling Model",
      oneLiner: "Take on 3-5x more clients without proportionally growing the team",
      pricing: "Operational model — enables all other opportunities",
      phase: "Now",
      detail: "AI reduces the marginal cost of each new client. One person with AI tools can service what used to take a team. This is the model that makes VCs invest in agencies.",
    },
  ],
  "Taste becomes the most valuable skill": [
    {
      icon: Paintbrush,
      title: "Premium Creative Direction",
      oneLiner: "Position Pearmill as the anti-average — taste you can't get from AI alone",
      pricing: "$10,000 – $30,000/mo",
      phase: "Now",
      detail: "AI gets everyone to mid. Premium clients will pay for the human judgment that pushes creative from average to exceptional. This is the pitch.",
    },
  ],
  "ghost workforce": [
    {
      icon: Bot,
      title: "Fractional Marketing Team",
      oneLiner: "Be the 2-3 extra people that burned-out in-house teams desperately need",
      pricing: "$5,000 – $15,000/mo",
      phase: "Now",
      detail: "76% of marketers are doing the work of multiple people. They need help but their company won't hire. One Pearmill person with AI can fill the gap of 2-3 in-house roles.",
    },
  ],
  "AI video is about to transform": [
    {
      icon: Paintbrush,
      title: "AI Video Ad Production",
      oneLiner: "Produce high-converting video ads at a fraction of traditional costs",
      pricing: "$3,000 – $20,000/mo",
      phase: "Now",
      detail: "AI video ads convert 27% better than static. Best agencies use Runway for hero content, Kling for volume, Pika for social. Multi-tool workflow = competitive edge.",
    },
  ],
  "Open-source AI lets you own": [
    {
      icon: Zap,
      title: "Private AI Setup for Clients",
      oneLiner: "Help clients run AI on their own infrastructure — data never leaves their building",
      pricing: "$10,000 – $50,000 setup + $2,000 – $5,000/mo",
      phase: "1 Year",
      detail: "Regulated industries (healthcare, finance) legally can't send data to external AI. Self-hosted open-source models solve this. Huge market opening.",
    },
  ],
  "real AI risk isn't losing your job": [
    {
      icon: TrendingUp,
      title: "AI Upskilling & Workflow Design",
      oneLiner: "Train client teams to use AI effectively — not just adopt it",
      pricing: "$5,000 – $15,000/engagement",
      phase: "6 Months",
      detail: "80% of engineering workforce needs upskilling by 2027 (WEF). The companies that train their people win. Pearmill can package our AI workflows as training programs.",
    },
  ],
  "Half of all AI agent projects will fail": [
    {
      icon: Bot,
      title: "AI Agent Consulting — Learn from the Failures",
      oneLiner: "Help clients avoid the 40% failure rate by starting with what actually works",
      pricing: "$10,000 – $30,000/project",
      phase: "6 Months",
      detail: "Most companies will waste money on AI agents that don't work. Pearmill's advantage: we've already experimented and know what works for marketing. Sell that knowledge.",
    },
  ],
};

const phaseColors: Record<string, string> = {
  Now: "bg-emerald-100 text-emerald-700",
  "6 Months": "bg-amber-100 text-amber-700",
  "1 Year": "bg-violet-100 text-violet-700",
};

/* ─── Helper: find opportunities for an assumption ─── */
function getOpportunities(assumptionTitle: string): RevenueOpp[] {
  for (const [key, opps] of Object.entries(assumptionOpportunities)) {
    if (assumptionTitle.toLowerCase().includes(key.toLowerCase())) {
      return opps;
    }
  }
  return [];
}

/* ─── Revenue Calculator ─── */

function RevenueCalculator() {
  const [clients, setClients] = useState(25);
  const [revPerClient, setRevPerClient] = useState(15000);
  const [costReduction, setCostReduction] = useState(50);
  const [teamSize, setTeamSize] = useState(30);
  const [outcomePremium, setOutcomePremium] = useState(30);

  const currentRevenue = clients * revPerClient;
  const jevonsFactor = Math.pow(1 / Math.max(1 - costReduction / 100, 0.1), 1.4);
  const aiClients = Math.round(clients * jevonsFactor);
  const aiRevPerClient = Math.round(revPerClient * Math.max(1 - costReduction / 200, 0.5));
  const aiTeamSize = Math.round(teamSize * (1 + Math.log(jevonsFactor) * 0.3));
  const aiRevenue = aiClients * aiRevPerClient;
  const outcomeRevPerClient = Math.round(aiRevPerClient * (1 + outcomePremium / 100));
  const outcomeRevenue = aiClients * outcomeRevPerClient;
  const currentRevenuePerPerson = Math.round(currentRevenue / teamSize);
  const outcomeRevenuePerPerson = Math.round(outcomeRevenue / aiTeamSize);

  return (
    <div className="bg-card border border-card-border rounded-2xl p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="w-6 h-6 text-accent-light" />
        <h2 className="text-xl font-semibold">Revenue Model Calculator</h2>
      </div>
      <p className="text-sm text-muted">
        Adjust the sliders to compare three ways of running the business.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          {[
            { label: "Current clients", value: clients, set: setClients, min: 5, max: 100, step: 1, fmt: String(clients) },
            { label: "Avg monthly fee per client", value: revPerClient, set: setRevPerClient, min: 1000, max: 50000, step: 1000, fmt: `$${revPerClient.toLocaleString()}` },
            { label: "How much cheaper AI makes production", value: costReduction, set: setCostReduction, min: 0, max: 90, step: 1, fmt: `${costReduction}%` },
            { label: "Current team size", value: teamSize, set: setTeamSize, min: 5, max: 100, step: 1, fmt: String(teamSize) },
            { label: "Extra charge for guaranteeing results", value: outcomePremium, set: setOutcomePremium, min: 0, max: 100, step: 1, fmt: `+${outcomePremium}%` },
          ].map((s) => (
            <div key={s.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">{s.label}</span>
                <span className="font-mono">{s.fmt}</span>
              </div>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={(e) => s.set(Number(e.target.value))} className="w-full" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-subtle-bg rounded-lg p-3 text-center">
              <p className="text-xs text-muted mb-1">Current</p>
              <p className="font-bold text-sm">${(currentRevenue / 1000).toFixed(0)}k/mo</p>
              <p className="text-xs text-muted">{clients} clients</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 text-center">
              <p className="text-xs text-cyan-600 mb-1">AI + hourly</p>
              <p className="font-bold text-sm text-cyan-600">${(aiRevenue / 1000).toFixed(0)}k/mo</p>
              <p className="text-xs text-muted">{aiClients} clients</p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
              <p className="text-xs text-accent-light mb-1">AI + results</p>
              <p className="font-bold text-sm text-accent-light">${(outcomeRevenue / 1000).toFixed(0)}k/mo</p>
              <p className="text-xs text-muted">{aiClients} clients</p>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ name: "Monthly Revenue", Current: currentRevenue, "AI + Hourly": aiRevenue, "AI + Results": outcomeRevenue }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={11} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e8eaed", borderRadius: "8px" }} formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="Current" fill="#c4c8cf" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AI + Hourly" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AI + Results" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
            <p className="text-sm">
              Revenue per team member: <span className="font-bold">${currentRevenuePerPerson.toLocaleString()}</span> &rarr; <span className="font-bold text-emerald-600">${outcomeRevenuePerPerson.toLocaleString()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */

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

const categoryLabels: Record<string, string> = {
  market: "Market", technology: "Technology", org_structure: "Org Structure", pricing: "Pricing", other: "Other",
};
const categoryColors: Record<string, string> = {
  market: "bg-emerald-100 text-emerald-700", technology: "bg-cyan-100 text-cyan-700", org_structure: "bg-amber-100 text-amber-700", pricing: "bg-violet-100 text-violet-700", other: "bg-gray-100 text-gray-600",
};

export function ScenariosPage() {
  const assumptions = staticAssumptions;
  const [states, setStates] = useState<Record<string, AssumptionState>>(() => {
    const initial: Record<string, AssumptionState> = {};
    staticAssumptions.forEach((a) => {
      initial[a.id] = a.convictionScore >= 70 ? "true" : a.convictionScore <= 30 ? "false" : "uncertain";
    });
    return initial;
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const loading = false;

  const toggleState = (id: string) => {
    setStates((prev) => {
      const current = prev[id];
      const next: AssumptionState = current === "true" ? "false" : current === "false" ? "uncertain" : "true";
      return { ...prev, [id]: next };
    });
  };

  // Count opportunities by state
  const allOpps = assumptions.flatMap((a) => {
    const opps = getOpportunities(a.title);
    return opps.map((o) => ({ ...o, state: states[a.id] || "uncertain" }));
  });
  const activeOpps = allOpps.filter((o) => o.state !== "false");
  const blockedOpps = allOpps.filter((o) => o.state === "false");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <GitBranch className="w-8 h-8 text-accent-light" />
          Scenario Builder
        </h1>
        <p className="text-muted mt-2">
          Each assumption about the future unlocks specific revenue opportunities.
          Toggle what you believe, and see what it means for the business.
        </p>
      </div>

      {/* Summary bar */}
      <div className="flex gap-4 flex-wrap">
        <div className="bg-card rounded-xl shadow-sm border border-card-border px-4 py-3 flex items-center gap-3">
          <span className="text-sm text-muted">Assumptions</span>
          <span className="font-bold text-lg">{assumptions.length}</span>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 px-4 py-3 flex items-center gap-3">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span className="text-sm text-emerald-700">
            <strong>{activeOpps.length}</strong> revenue opportunities unlocked
          </span>
        </div>
        {blockedOpps.length > 0 && (
          <div className="bg-red-50 rounded-xl border border-red-200 px-4 py-3 flex items-center gap-3">
            <ToggleLeft className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-700">
              <strong>{blockedOpps.length}</strong> blocked by assumptions set to False
            </span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-card rounded-2xl shadow-sm border border-card-border p-6">
        <p className="text-sm text-muted">
          <strong className="text-foreground">How to use:</strong> Click the toggle icon to cycle each assumption through{" "}
          <span className="text-emerald-600 font-medium">True</span> →{" "}
          <span className="text-red-600 font-medium">False</span> →{" "}
          <span className="text-amber-600 font-medium">Uncertain</span>.
          Click anywhere else on the row to expand it and see what it means + what revenue opportunities it unlocks.
        </p>
      </div>

      {/* Assumption cards */}
      {loading ? (
        <div className="text-center py-12 text-muted">Loading...</div>
      ) : (
        <div className="space-y-3">
          {assumptions.map((a) => {
            const state = states[a.id] || "uncertain";
            const Icon = stateIcons[state];
            const isExpanded = expandedId === a.id;
            const forEvidence = a.evidence?.filter((e) => e.type === "for") || [];
            const againstEvidence = a.evidence?.filter((e) => e.type === "against") || [];
            const opps = getOpportunities(a.title);
            const oppsBlocked = state === "false";

            return (
              <div key={a.id} className={cn(
                "rounded-2xl border transition-all overflow-hidden",
                stateColors[state],
                isExpanded && "shadow-md"
              )}>
                {/* Header row */}
                <div
                  className="flex items-center gap-3 px-5 py-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : a.id)}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleState(a.id); }}
                    className="hover:scale-110 transition-transform flex-shrink-0"
                    title={`Toggle: ${state}`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold">{a.title}</span>
                    {opps.length > 0 && (
                      <span className="ml-2 text-xs opacity-50">
                        {opps.length} opportunit{opps.length === 1 ? "y" : "ies"}
                      </span>
                    )}
                  </div>
                  <span className="text-xs opacity-70 capitalize mr-1">{state}</span>
                  <ChevronDown className={cn("w-4 h-4 opacity-40 transition-transform", isExpanded && "rotate-180")} />
                </div>

                {/* Expanded panel */}
                {isExpanded && (
                  <div className="bg-white border-t border-current/10 text-foreground">
                    {/* Description + conviction */}
                    <div className="px-6 py-5 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn("text-xs px-2 py-0.5 rounded-full", categoryColors[a.category] || categoryColors.other)}>
                          {categoryLabels[a.category] || a.category}
                        </span>
                        <span className="text-xs text-muted">
                          Team conviction: <strong className={cn(
                            a.convictionScore >= 75 ? "text-emerald-600" : a.convictionScore >= 40 ? "text-amber-600" : "text-red-500"
                          )}>{a.convictionScore}%</strong>
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted">{a.description}</p>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={cn("h-2 rounded-full", a.convictionScore >= 75 ? "bg-emerald-500" : a.convictionScore >= 40 ? "bg-amber-500" : "bg-red-400")} style={{ width: `${a.convictionScore}%` }} />
                      </div>
                    </div>

                    {/* Evidence */}
                    {(forEvidence.length > 0 || againstEvidence.length > 0) && (
                      <div className="px-6 pb-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                              <Shield className="w-3.5 h-3.5" /> Evidence For ({forEvidence.length})
                            </div>
                            {forEvidence.map((e) => (
                              <div key={e.id} className="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 text-xs leading-relaxed">
                                {e.content}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                              <ShieldAlert className="w-3.5 h-3.5" /> Evidence Against ({againstEvidence.length})
                            </div>
                            {againstEvidence.length > 0 ? againstEvidence.map((e) => (
                              <div key={e.id} className="bg-red-50 border border-red-100 rounded-lg p-2.5 text-xs leading-relaxed">
                                {e.content}
                              </div>
                            )) : <p className="text-xs text-muted italic">No counter-evidence yet</p>}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Revenue opportunities unlocked by this assumption */}
                    {opps.length > 0 && (
                      <div className={cn("px-6 pb-6 pt-2 border-t border-card-border", oppsBlocked && "opacity-50")}>
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <h4 className="text-sm font-semibold">
                            {oppsBlocked
                              ? `Revenue opportunities blocked by setting this to False`
                              : `Revenue opportunities this unlocks`}
                          </h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          {opps.map((opp, i) => {
                            const OppIcon = opp.icon;
                            return (
                              <div key={i} className={cn(
                                "bg-subtle-bg rounded-xl p-4 space-y-2 border border-card-border",
                                oppsBlocked && "line-through decoration-red-400"
                              )}>
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <OppIcon className="w-4 h-4 text-accent flex-shrink-0" />
                                    <span className="text-sm font-semibold">{opp.title}</span>
                                  </div>
                                  <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0", phaseColors[opp.phase])}>
                                    {opp.phase}
                                  </span>
                                </div>
                                <p className="text-xs text-muted">{opp.oneLiner}</p>
                                <p className="text-xs text-muted/70">{opp.detail}</p>
                                <p className="text-sm font-bold text-accent">{opp.pricing}</p>
                              </div>
                            );
                          })}
                        </div>
                        {oppsBlocked && (
                          <p className="text-xs text-red-600 mt-2">
                            If you don&apos;t believe this assumption, these opportunities aren&apos;t viable. Toggle it to True or Uncertain to unlock them.
                          </p>
                        )}
                      </div>
                    )}

                    {/* No opportunities for this assumption */}
                    {opps.length === 0 && (
                      <div className="px-6 pb-5 border-t border-card-border pt-3">
                        <p className="text-xs text-muted italic">
                          This assumption affects overall strategy but doesn&apos;t directly unlock a specific revenue opportunity yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Revenue Calculator */}
      <RevenueCalculator />
    </div>
  );
}
