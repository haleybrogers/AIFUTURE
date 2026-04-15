"use client";

import Link from "next/link";
import {
  Zap,
  Brain,
  TrendingUp,
  DollarSign,
  BarChart3,
  Paintbrush,
  Target,
  FlaskConical,
  Bot,
  Globe,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Rocket,
  Calendar,
  CalendarClock,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Section 1: Where We Are ─── */

function WhereWeAre() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Where We Are</h2>
        <p className="text-muted max-w-2xl">
          AI isn&apos;t coming — it&apos;s already here. Here&apos;s what&apos;s actually happening
          right now, no hype.
        </p>
      </div>

      {/* Big stat cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl shadow-sm border border-card-border p-6 text-center space-y-2">
          <p className="text-4xl font-bold text-accent">91%</p>
          <p className="text-sm text-muted">
            of marketers now use AI in their daily work
          </p>
          <p className="text-xs text-muted/60">Source: Jasper / HubSpot 2026</p>
        </div>
        <div className="bg-card rounded-2xl shadow-sm border border-card-border p-6 text-center space-y-2">
          <p className="text-4xl font-bold text-red-500">50%</p>
          <p className="text-sm text-muted">
            drop in marketing team hiring — even as workloads increase
          </p>
          <p className="text-xs text-muted/60">Source: CMO Survey 2026</p>
        </div>
        <div className="bg-card rounded-2xl shadow-sm border border-card-border p-6 text-center space-y-2">
          <p className="text-4xl font-bold text-emerald-600">73%</p>
          <p className="text-sm text-muted">
            of marketing teams say their workload grew this year
          </p>
          <p className="text-xs text-muted/60">Source: HubSpot State of Marketing 2026</p>
        </div>
      </div>

      {/* What AI can / can't do */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl shadow-sm border border-card-border p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold">What AI can do right now</h3>
          </div>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span><strong className="text-foreground">Write ad copy</strong> — Give it your product and audience, and it writes dozens of ad variations in seconds</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span><strong className="text-foreground">Generate images and video</strong> — Create ad visuals, product mockups, and short-form video from a text description</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span><strong className="text-foreground">Build software</strong> — People with no coding background are building apps, dashboards, and internal tools</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span><strong className="text-foreground">Analyze data</strong> — Upload a spreadsheet and get insights, charts, and recommendations in minutes</span>
            </li>
            <li className="flex gap-2">
              <span className="text-emerald-600 mt-0.5">•</span>
              <span><strong className="text-foreground">Manage campaigns</strong> — Monitor ad performance, adjust budgets, and flag problems automatically</span>
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-card-border p-6 space-y-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold">What AI still can&apos;t do well</h3>
          </div>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Make strategic judgment calls</strong> — It can give you options, but deciding which direction to take still requires human experience and context</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Build real relationships</strong> — Clients want to talk to a person who understands their business, not a chatbot</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Have truly original ideas</strong> — AI remixes what already exists. Breakthrough creative still comes from people</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Understand your specific business deeply</strong> — It doesn&apos;t know your culture, your customers&apos; quirks, or why last quarter was rough</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500 mt-0.5">•</span>
              <span><strong className="text-foreground">Be accountable</strong> — When something goes wrong, someone needs to own it. AI can&apos;t do that</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
        <p className="text-base font-medium text-accent-light">
          The bottom line: AI is a power tool, not a replacement. The people and companies that learn to use it well will do more with less.
          The ones that don&apos;t will fall behind.
        </p>
      </div>
    </section>
  );
}

/* ─── Section 2: Where It's Going ─── */

const predictions = [
  {
    stat: "40%",
    label: "of business apps will have AI agents built in by end of 2026",
    detail: "Right now, less than 5% of business software has AI agents. That's about to change dramatically. Imagine your project management tool, your email, your CRM all having AI assistants that can take action — not just answer questions.",
    source: "Gartner",
    sourceUrl: "https://www.gartner.com/en/articles/strategic-predictions-for-2026",
  },
  {
    stat: "$15T",
    label: "in purchases will be made by AI agents by 2028",
    detail: "AI programs will be making buying decisions on behalf of businesses — comparing vendors, negotiating prices, placing orders. This is an entirely new type of customer that doesn't exist yet. Companies that figure out how to sell to AI agents will have a massive advantage.",
    source: "Gartner",
    sourceUrl: "https://www.digitalcommerce360.com/2025/11/28/gartner-ai-agents-15-trillion-in-b2b-purchases-by-2028/",
  },
  {
    stat: "60%",
    label: "of brands will use AI for personalized 1-to-1 interactions by 2028",
    detail: "Instead of showing the same ad to everyone, brands will use AI to create unique experiences for each person. Every email, every landing page, every ad could be customized for the individual seeing it.",
    source: "Gartner",
    sourceUrl: "https://www.gartner.com/en/newsroom/press-releases/2026-01-15-gartner-predicts-60-percent-of-brands-will-use-agentic-ai-to-deliver-streamlined-one-to-one-interactions-by-2028",
  },
  {
    stat: "$2.9T",
    label: "in economic value unlocked by AI productivity gains by 2030",
    detail: "That's trillion with a T. When people can do 3-5x more work with AI, the total output of the economy grows dramatically. This isn't about replacing workers — it's about each worker producing far more value.",
    source: "McKinsey",
    sourceUrl: "https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier",
  },
  {
    stat: "+23%",
    label: "growth in software jobs despite AI writing code",
    detail: "This is the pattern that keeps repeating. When something gets cheaper, people don't use less of it — they use way more. AI made coding cheaper, so more companies started building software, which meant more jobs, not fewer. The same thing is about to happen in marketing and creative work.",
    source: "BLS / Industry Data",
    link: "/jevons",
    linkLabel: "See the full pattern →",
  },
];

function WhereItsGoing() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Where It&apos;s Going</h2>
        <p className="text-muted max-w-2xl">
          These aren&apos;t guesses — they&apos;re predictions from the biggest research
          firms in the world, backed by data.
        </p>
      </div>

      <div className="space-y-4">
        {predictions.map((p, i) => (
          <div
            key={i}
            className="bg-card rounded-2xl shadow-sm border border-card-border p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0 w-24 text-center">
                <p className="text-3xl font-bold text-accent">{p.stat}</p>
                <p className="text-xs text-muted mt-1">{p.source}</p>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">{p.label}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.detail}</p>
                {p.sourceUrl && (
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent-light hover:underline"
                  >
                    Read the source <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {p.link && (
                  <Link
                    href={p.link}
                    className="inline-flex items-center gap-1 text-xs text-accent-light hover:underline"
                  >
                    {p.linkLabel} <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 3: Revenue Opportunities ─── */

const phaseColors: Record<string, string> = {
  Now: "bg-emerald-100 text-emerald-700",
  "6 Months": "bg-amber-100 text-amber-700",
  "1 Year": "bg-violet-100 text-violet-700",
};

const opportunities = [
  {
    icon: BarChart3,
    title: "Custom Client Dashboards",
    description:
      "Build personalized analytics dashboards for each client — their goals, their metrics, their KPIs — instead of using cookie-cutter tools. One person with AI can now build what used to require a full development team.",
    market:
      "Off-the-shelf tools like AgencyAnalytics charge $59-299/mo per seat. Custom dashboard builds command $2,000-10,000/mo because they're tailored to the client's exact needs.",
    whyPearmill:
      "We already know what metrics matter for paid social. We understand the data. Building the dashboard is the easy part now — the insight is the hard part, and that's what we're good at.",
    pricing: "$2,000 – $10,000/mo",
    phase: "Now",
  },
  {
    icon: Paintbrush,
    title: "AI-Powered Creative at Scale",
    description:
      "Use AI to produce 10x the ad variations — different images, different headlines, different formats — at a fraction of the old cost. A human creative director guides the vision; AI does the heavy lifting of producing the variations.",
    market:
      "Self-serve tools like AdCreative.ai charge $39-249/mo. An agency offering this as a managed service with real creative strategy charges $3,000-15,000/mo.",
    whyPearmill:
      "We already have the creative strategy expertise and know what performs. AI just lets us produce more of it, faster, without hiring a massive production team.",
    pricing: "$3,000 – $15,000/mo",
    phase: "Now",
  },
  {
    icon: FlaskConical,
    title: "Creative Testing as a Service",
    description:
      "Systematically test which ads will perform before spending big money on them. Use AI to score creative quality, predict performance, and identify winners early. Think of it like a test kitchen for ads.",
    market:
      "Most companies do this manually and inconsistently. A structured testing program with AI-powered scoring is a premium service — subscription-style, ongoing.",
    whyPearmill:
      "This is literally what we do. We already have testing methodology. AI just makes it faster and more scientific.",
    pricing: "$2,000 – $8,000/mo",
    phase: "Now",
  },
  {
    icon: Globe,
    title: "Website & Landing Page Optimization",
    description:
      "When someone clicks your ad, they land on a page. If that page doesn't convince them to buy or sign up, the ad money is wasted. AI lets us build, test, and improve these pages 10x faster than before.",
    market:
      "Conversion rate optimization (making pages work better) is a well-established service. Agencies charge $3,000-10,000/mo. AI dramatically reduces the cost of producing and testing page variations.",
    whyPearmill:
      "We already drive traffic to these pages. Owning the full pipeline — ads AND the pages they land on — means better results and more revenue per client.",
    pricing: "$3,000 – $10,000/mo",
    phase: "Now",
  },
  {
    icon: FileText,
    title: "AI-Powered Content Engine",
    description:
      "Ongoing content production — social media posts, blog articles, email sequences, ad copy — with AI doing the first draft and humans providing editorial judgment and brand voice.",
    market:
      "Content agencies charge $2,000-8,000/mo for ongoing production. AI reduces the production cost by 60-80%, meaning higher margins or more competitive pricing.",
    whyPearmill:
      "We already write ad copy and understand what converts. Expanding into broader content is a natural extension.",
    pricing: "$2,000 – $8,000/mo",
    phase: "Now",
  },
  {
    icon: Target,
    title: "Performance Guarantees",
    description:
      "Instead of charging for our time, we guarantee specific results — like a certain number of new customers or a specific return on ad spend. If we hit the target, we earn more. If we don't, we earn less. Skin in the game.",
    market:
      "Pay-per-lead models charge $15-150 per lead depending on industry. Revenue share agreements take 10-30% of the revenue we help generate. Some agencies charge 2-3x more with this model because clients are paying for certainty.",
    whyPearmill:
      "We already have the data to know what results we can deliver. This model works best when you have real performance data — which we do.",
    pricing: "$15-150/lead or 10-30% revenue share",
    phase: "6 Months",
  },
  {
    icon: Bot,
    title: "AI Agent Setup for Marketing",
    description:
      "Build and configure AI agents that automatically monitor campaigns, adjust budgets, flag anomalies, and generate reports. Think of it as hiring a tireless digital assistant for each client's marketing.",
    market:
      "Gartner says 40% of business apps will have AI agents by end of 2026. The companies that set these up for clients now will have a huge first-mover advantage.",
    whyPearmill:
      "We're already building software tools. Setting up marketing-specific AI agents is a natural next step — and clients will pay for the setup, configuration, and ongoing management.",
    pricing: "$5,000 – $25,000 setup + $1,000 – $5,000/mo",
    phase: "6 Months",
  },
];

function RevenueOpportunities() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">
          Where the Money Is
        </h2>
        <p className="text-muted max-w-2xl">
          Based on real market research — what agencies and tools are charging
          right now, and where Pearmill is positioned to win.
        </p>
      </div>

      <div className="space-y-5">
        {opportunities.map((opp, i) => {
          const Icon = opp.icon;
          return (
            <div
              key={i}
              className="bg-card rounded-2xl shadow-sm border border-card-border p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{opp.title}</h3>
                    <p className="text-sm text-muted mt-1 leading-relaxed">
                      {opp.description}
                    </p>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0",
                    phaseColors[opp.phase]
                  )}
                >
                  {opp.phase}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 pt-2 border-t border-card-border">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted uppercase tracking-wider">
                    What the market charges
                  </p>
                  <p className="text-sm leading-relaxed">{opp.market}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted uppercase tracking-wider">
                    Why we can do this
                  </p>
                  <p className="text-sm leading-relaxed">{opp.whyPearmill}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted uppercase tracking-wider">
                    What we could charge
                  </p>
                  <p className="text-lg font-bold text-accent">
                    {opp.pricing}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Section 4: Phased Roadmap ─── */

const phases = [
  {
    icon: Rocket,
    label: "Now",
    title: "Already possible",
    color: "border-emerald-200 bg-emerald-50",
    iconColor: "text-emerald-600",
    items: [
      "Custom client dashboards",
      "AI-powered creative at scale",
      "Creative testing as a service",
      "Website & landing page optimization",
      "AI content engine",
    ],
  },
  {
    icon: CalendarClock,
    label: "6 Months",
    title: "Building toward",
    color: "border-amber-200 bg-amber-50",
    iconColor: "text-amber-600",
    items: [
      "Performance guarantee pricing pilots",
      "AI agent setup for clients",
      "Outcome-based pricing for select verticals",
      "AI-scored creative quality benchmarks",
    ],
  },
  {
    icon: CalendarDays,
    label: "1 Year",
    title: "The bigger vision",
    color: "border-violet-200 bg-violet-50",
    iconColor: "text-violet-600",
    items: [
      "Full outcome-based pricing model",
      "Selling our AI tools to other agencies",
      "AI agent-to-agent commerce readiness",
      "Pearmill as an AI-native platform, not just an agency",
    ],
  },
];

function PhasedRoadmap() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">The Roadmap</h2>
        <p className="text-muted max-w-2xl">
          Not everything happens at once. Here&apos;s a phased approach — what we can
          start doing today vs. what we build toward.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {phases.map((phase) => {
          const Icon = phase.icon;
          return (
            <div
              key={phase.label}
              className={cn(
                "rounded-2xl border p-6 space-y-4",
                phase.color
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-6 h-6", phase.iconColor)} />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider opacity-60">
                    {phase.label}
                  </p>
                  <h3 className="font-semibold">{phase.title}</h3>
                </div>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <ArrowRight
                      className={cn(
                        "w-3.5 h-3.5 mt-0.5 flex-shrink-0",
                        phase.iconColor
                      )}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── The Pearmill Edge ─── */

function PearmillEdge() {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">Why Pearmill Wins in This World</h2>
        <p className="text-muted max-w-2xl">
          Three things from our internal strategy conversations that define
          how we think about AI — and why we&apos;re positioned differently.
        </p>
      </div>

      <div className="space-y-6">
        {/* Bell Curve */}
        <div className="bg-card rounded-2xl shadow-sm border border-card-border p-8">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 space-y-4">
              <h3 className="text-xl font-bold">
                AI gets you to the middle of the bell curve.
                <br />
                <span className="text-accent">We get you to the spikes.</span>
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Here&apos;s the problem with just using AI: it&apos;s trained on the average
                of human intelligence. If you accept its first answer, you get
                average work. Average ads, average copy, average strategy.
                Everyone using AI without direction ends up in the same mediocre middle.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                What makes our team different is <strong className="text-foreground">taste and judgment</strong>.
                We don&apos;t accept the first answer. We push, we argue with the AI,
                we bring decades of experience about what actually works. AI is
                the tool. Taste is the differentiator. And taste comes from years
                of watching thousands of ads, studying what converts, and building
                an instinct for what will break through the noise.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="bg-subtle-bg rounded-2xl p-6 text-center space-y-4">
                <div className="text-6xl font-bold text-muted/20">🔔</div>
                <div className="space-y-1">
                  <p className="text-xs text-muted uppercase tracking-wider">Everyone using AI</p>
                  <p className="text-lg font-bold text-muted">Average results</p>
                </div>
                <div className="border-t border-card-border pt-4 space-y-1">
                  <p className="text-xs text-accent uppercase tracking-wider">Pearmill + AI</p>
                  <p className="text-lg font-bold text-accent">Exceptional results</p>
                </div>
                <p className="text-xs text-muted italic">
                  &ldquo;To not be average, you need to argue with your assistant.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Distribution is the moat */}
        <div className="bg-card rounded-2xl shadow-sm border border-card-border p-8 space-y-4">
          <h3 className="text-xl font-bold">
            When anyone can build anything,
            <span className="text-accent"> distribution is the only moat</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>
                Think about Nike. Literally anyone can make a shoe. The technology
                isn&apos;t special anymore. So how does Nike stay on top? Not by making
                better shoes — by having <strong className="text-foreground">better distribution</strong>.
                Athlete partnerships, community stores, cultural relevance.
                Their marketing IS the product.
              </p>
              <p>
                The same thing is about to happen everywhere. When AI makes it
                trivially cheap to build any software, any content, any product —
                the product itself stops being the differentiator. <strong className="text-foreground">How
                you get it in front of people</strong> becomes the entire game.
              </p>
            </div>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>
                This is great news for Pearmill because <strong className="text-foreground">we
                are in the distribution business</strong>. We help companies get their
                products in front of the right people. As the market floods with
                AI-generated products and content, the companies that win will be
                the ones with the smartest distribution strategy.
              </p>
              <p>
                There&apos;s even a prediction that <strong className="text-foreground">80% of
                marketing will become experiential</strong> in the next decade — real-world
                events, activations, communities — because digital gets so flooded
                with AI content that people stop trusting it. The human touch
                becomes the premium.
              </p>
            </div>
          </div>
        </div>

        {/* Soft skills premium */}
        <div className="bg-card rounded-2xl shadow-sm border border-card-border p-8 space-y-4">
          <h3 className="text-xl font-bold">
            The most technical skill in the AI era?
            <span className="text-accent"> Being a good human.</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-sm text-muted leading-relaxed space-y-3">
              <p>
                One of our team members has a friend — an engineer who came back
                to the field after a decade away. She now uses AI to code, and
                she&apos;s solving the company&apos;s hardest problems in 10-12 hours a week.
                Her secret? She&apos;s easier to work with than the veteran engineers.
                People bring <em>her</em> the important problems because they actually
                enjoy collaborating with her.
              </p>
              <p>
                The engineers with decades of experience are more skilled technically,
                but they get fewer of the problems that matter because they&apos;re less
                approachable. <strong className="text-foreground">Human skills + AI skills = you get the
                best problems to work on.</strong>
              </p>
            </div>
            <div className="bg-subtle-bg rounded-xl p-5 space-y-3 text-sm">
              <p className="font-semibold text-foreground">What becomes more valuable as AI gets better:</p>
              <ul className="space-y-2 text-muted">
                <li className="flex gap-2"><span className="text-accent">→</span> Relationship building and client trust</li>
                <li className="flex gap-2"><span className="text-accent">→</span> Taste, judgment, and creative instinct</li>
                <li className="flex gap-2"><span className="text-accent">→</span> Asking the right questions (not just getting answers)</li>
                <li className="flex gap-2"><span className="text-accent">→</span> Strategic thinking that AI can&apos;t replicate</li>
                <li className="flex gap-2"><span className="text-accent">→</span> Being the person people want to work with</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Homepage ─── */

export function Homepage() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero */}
      <div className="space-y-6 pt-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          AI gets everyone to the middle.
          <br />
          <span className="text-accent">We get you to the edge.</span>
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          Everyone&apos;s using AI now. The question isn&apos;t whether to use it —
          it&apos;s whether you&apos;ll get average results or exceptional ones.
          Here&apos;s how we see the next five years, and where the real opportunities are.
        </p>
      </div>

      <WhereWeAre />
      <PearmillEdge />
      <WhereItsGoing />
      <RevenueOpportunities />
      <PhasedRoadmap />
    </div>
  );
}
