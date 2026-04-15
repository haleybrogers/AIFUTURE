"use client";

import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Term = {
  term: string;
  definition: string;
  example?: string;
  category: string;
};

const terms: Term[] = [
  // AI & Technology
  { term: "AI (Artificial Intelligence)", definition: "Software that can learn, reason, and make decisions — like a very smart assistant that gets better the more you use it. When we say 'AI' at Pearmill, we usually mean tools like Claude, ChatGPT, or Midjourney that can write, design, analyze data, or build software.", category: "AI & Technology" },
  { term: "LLM (Large Language Model)", definition: "The technology behind tools like ChatGPT and Claude. It's a program trained on massive amounts of text that can understand and generate human language. Think of it as a very well-read assistant that's read basically everything on the internet.", category: "AI & Technology" },
  { term: "AGI (Artificial General Intelligence)", definition: "AI that can do anything a human can do — not just one task, but all tasks. We don't have AGI yet. Current AI is really good at specific things (writing, coding, image generation) but can't truly think or reason the way humans can. AGI is the theoretical end goal.", category: "AI & Technology" },
  { term: "AI Agent", definition: "An AI program that can take actions on its own, not just answer questions. A regular chatbot waits for you to ask something. An agent can monitor your ad campaigns, notice when something goes wrong, and fix it without you asking. Think of it as the difference between a search engine and a personal assistant.", example: "An AI agent that watches your Meta ad spend and automatically pauses underperforming ads.", category: "AI & Technology" },
  { term: "GPU (Graphics Processing Unit)", definition: "A special computer chip originally designed for video games, now used to run AI. AI needs enormous computing power, and GPUs are the best hardware for it. There's currently a worldwide shortage because one company (ASML) makes the machines that build them.", category: "AI & Technology" },
  { term: "Open-Source AI", definition: "AI models that anyone can download, modify, and run on their own computers for free. The opposite of 'closed' AI like ChatGPT where you pay a subscription and your data goes to someone else's servers. Examples: Meta's Llama, Mistral. Advantage: your data stays private and you don't depend on any company.", category: "AI & Technology" },
  { term: "Prompt / Prompting", definition: "The instructions you give to an AI. A prompt can be as simple as 'write me an ad for running shoes' or as detailed as a full creative brief. Better prompts = better results. This is why experience and taste matter — knowing how to ask is the skill.", category: "AI & Technology" },
  { term: "Token", definition: "The unit AI uses to process text — roughly a word or piece of a word. AI companies charge per token, so the 'cost per token' is basically the price of having AI read or write one word. This cost has been dropping fast but is temporarily rising due to GPU shortages.", category: "AI & Technology" },
  { term: "Fine-Tuning", definition: "Training an AI model on your specific data so it gets better at your particular type of work. Like hiring a generalist and then training them on your industry. A fine-tuned model knows your brand voice, your clients' industries, and your best-performing ad patterns.", category: "AI & Technology" },
  { term: "Evaluator / Eval", definition: "A scoring system that measures how good AI output is. Instead of a human judging 'is this ad good?' an evaluator gives it a numerical score based on defined criteria. This is how AI quality becomes measurable and comparable — like a test grade for creative work.", category: "AI & Technology" },

  // Business Models
  { term: "NeoFirm", definition: "A new type of services company (like an agency or consulting firm) that operates more like a tech company. Instead of just billing hours, NeoFirms invest in R&D, build their own technology, charge for outcomes, and can scale without proportionally hiring more people. The idea is that AI makes this possible for the first time.", example: "Pearmill evolving from a traditional agency to a company that builds its own AI tools and charges for results.", category: "Business Models" },
  { term: "Outcome-Based Pricing", definition: "Charging clients for results instead of time. Instead of 'we'll work 40 hours this month for $10,000,' it's 'we'll get you 200 leads for $10,000.' Higher risk for the agency (what if you don't hit the target?) but potentially much higher reward (clients will pay a premium for guaranteed results).", example: "Petal at Pearmill: guaranteeing dentists a specific cost per new patient lead in each geography.", category: "Business Models" },
  { term: "Time-Based Billing", definition: "The traditional way agencies charge — by the hour or by the number of deliverables (assets, videos, etc.). The problem: as AI makes production faster, charging for time means you earn less even though you're delivering the same value. This model is under pressure.", category: "Business Models" },
  { term: "Marginal Cost", definition: "The cost of adding one more customer or producing one more unit. For a traditional agency, the marginal cost of a new client is high — you need to hire people. For a software company, it's nearly zero — another user costs almost nothing. AI is pushing agencies toward lower marginal costs, which means they can grow faster.", category: "Business Models" },
  { term: "Revenue Share", definition: "Instead of a flat fee, the agency takes a percentage of the revenue they help generate. If you help a client make $100,000 in sales, and you have a 15% revenue share, you earn $15,000. Aligns incentives — you only make money when the client makes money.", category: "Business Models" },
  { term: "SaaS (Software as a Service)", definition: "Software you pay a monthly subscription for instead of buying once. Think Netflix for software. Examples: Slack, Notion, AgencyAnalytics. Relevant because agencies are starting to build and sell their own SaaS tools, which creates recurring revenue.", category: "Business Models" },

  // Marketing & Advertising
  { term: "Paid Social", definition: "Running ads on social media platforms (Meta/Facebook/Instagram, TikTok, LinkedIn, etc.) where you pay to show your content to specific audiences. This is Pearmill's core business.", category: "Marketing" },
  { term: "Paid Search", definition: "Running ads on search engines (mainly Google) where you pay to appear when people search for specific keywords. Someone searches 'best running shoes' and your ad shows up at the top.", category: "Marketing" },
  { term: "Creative", definition: "In advertising, 'creative' means the actual ad content — the images, videos, headlines, and copy that people see. 'Creative production' is the process of making these assets. 'Creative strategy' is deciding what kind of creative to make and why.", category: "Marketing" },
  { term: "UGC (User-Generated Content)", definition: "Content that looks like a real person made it — not a polished studio ad. Think TikTok-style videos where someone talks to the camera about a product. Brands pay creators (or agencies) to produce UGC because it feels more authentic and often performs better than traditional ads.", category: "Marketing" },
  { term: "A/B Testing", definition: "Running two versions of something (an ad, a landing page, an email) at the same time to see which one performs better. Version A might have a blue button, Version B has a green button. You show each to half your audience and see which gets more clicks. This is how you make decisions based on data instead of opinions.", category: "Marketing" },
  { term: "CPL (Cost Per Lead)", definition: "How much money you spend in advertising to get one potential customer's contact information. If you spend $1,000 on ads and get 50 people to fill out a form, your CPL is $20. Lower CPL = more efficient advertising.", category: "Marketing" },
  { term: "ROAS (Return on Ad Spend)", definition: "How much revenue you get back for every dollar spent on ads. A ROAS of 5x means for every $1 spent on ads, the client made $5 in sales. This is one of the most important metrics in performance marketing.", category: "Marketing" },
  { term: "Landing Page", definition: "The specific web page someone arrives at after clicking an ad. It's designed to convince them to take one action — buy something, sign up, fill out a form. A bad landing page wastes all the money you spent getting someone to click the ad.", category: "Marketing" },
  { term: "Conversion Rate", definition: "The percentage of people who take the desired action. If 100 people visit a landing page and 5 buy something, that's a 5% conversion rate. Improving conversion rates is often more valuable than getting more traffic.", category: "Marketing" },
  { term: "CRO (Conversion Rate Optimization)", definition: "The process of making landing pages and websites better at converting visitors into customers. Testing headlines, button colors, layouts, copy — anything that affects whether someone takes action.", category: "Marketing" },

  // Strategy Concepts
  { term: "Jevons' Paradox", definition: "A historical pattern: when something gets cheaper, people don't use less of it — they use way more. Named after William Jevons who observed this with coal in the 1800s. When coal got cheaper, total coal consumption exploded because new uses became affordable. The same pattern is happening with AI-generated content, software, and creative work.", example: "When AI made coding cheaper, software engineering jobs grew 23% because more companies started building software.", category: "Strategy" },
  { term: "Distribution", definition: "How you get your product in front of potential customers. It's not just advertising — it includes partnerships, word of mouth, community building, retail presence, everything. In a world where anyone can build anything, distribution (how you reach people) becomes more important than production (what you build).", example: "Nike doesn't win because they make the best shoes — they win because of athlete partnerships and community stores. That's distribution.", category: "Strategy" },
  { term: "Moat", definition: "Something that protects a business from competitors — like a moat around a castle. A moat can be technology, data, brand reputation, relationships, or a unique distribution approach. In the AI era, traditional moats (like being the best at production) are shrinking, while new moats (like proprietary data and distribution) are growing.", category: "Strategy" },
  { term: "Bell Curve / Being 'Mid'", definition: "AI is trained on the average of human knowledge. If you accept its first output, you get average ('mid') results. Everyone using AI without strong opinions ends up in the same mediocre middle of the bell curve. The opportunity is using taste and judgment to push past the average and create exceptional work — getting to the edges of the curve, not the middle.", category: "Strategy" },
  { term: "Ghost Workforce", definition: "What's happening right now in marketing: companies aren't officially replacing people with AI, but when someone quits or gets laid off, they don't hire a replacement. They just expect the remaining people to use AI to absorb the extra work. Result: 76% of marketers say they're doing the job of 2-3 people.", category: "Strategy" },
  { term: "Standard Oil Analogy", definition: "Nima's comparison of today's AI giants (OpenAI, Anthropic, Google) to Standard Oil — Rockefeller's massive monopoly that was eventually broken up by the government. The point: these companies feel all-powerful now, but monopolies don't last forever. Businesses should diversify their AI providers and not bet everything on one company.", category: "Strategy" },
  { term: "Taste", definition: "Not just aesthetic preference — it's the combination of experience, judgment, and a strong point of view about what's good. As Jack Dorsey put it: 'It's not just knowing what looks good together. It's having a point of view and an opinionated drive to get there.' Taste is what separates AI-generated average from human-guided exceptional. It takes years of exposure and practice to develop.", category: "Strategy" },

  // Org & Roles
  { term: "The Builder (IC)", definition: "Short for Individual Contributor. The person who does the actual work — running campaigns, making videos, writing copy, building tools. They work hands-on with AI tools to produce results. In the old world this was the most junior role; in the new world, it's one of the three core roles everyone moves between.", category: "Organization" },
  { term: "The Owner (DRI)", definition: "Short for Directly Responsible Individual. Someone who owns a specific outcome from start to finish. They're not managing people — they're making sure a result happens. If a client needs 50 new customers this month, the Owner is accountable for hitting that number.", example: "Justin at Pearmill owning the Petal client's outcomes end-to-end.", category: "Organization" },
  { term: "The Player Coach", definition: "Someone who does the work AND helps others get better at their work. Like a sports captain who still plays in the game but also coaches teammates. This replaces the traditional 'manager' role. Player Coaches don't just delegate — they build by example and raise the skill level of people around them.", category: "Organization" },
  { term: "Legible Company", definition: "A company where every action, decision, and piece of work creates a digital artifact (a document, message, recording, or data point) that AI can read and learn from. Instead of relying on humans to pass information up and down a hierarchy, the company's AI understands everything that's happening and anyone can query it.", category: "Organization" },
];

const categories = [...new Set(terms.map((t) => t.category))];

export function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = terms.filter((t) => {
    const matchesSearch =
      search === "" ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-accent-light" />
          Glossary
        </h1>
        <p className="text-muted mt-2">
          Every term, acronym, and concept used in this tool — defined in plain
          language so everyone&apos;s on the same page.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-card-border rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-muted shadow-sm"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm transition-colors",
              activeCategory === cat
                ? "bg-accent/20 text-accent-light font-medium"
                : "text-muted hover:text-foreground hover:bg-hover-bg"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Term count */}
      <p className="text-xs text-muted">
        {filtered.length} term{filtered.length !== 1 ? "s" : ""}
        {search && ` matching "${search}"`}
        {activeCategory !== "All" && ` in ${activeCategory}`}
      </p>

      {/* Terms */}
      <div className="space-y-3">
        {filtered.map((t) => (
          <div
            key={t.term}
            className="bg-card rounded-2xl shadow-sm border border-card-border p-5 space-y-2"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-base">{t.term}</h3>
              <span className="text-xs text-muted bg-subtle-bg px-2 py-0.5 rounded-full flex-shrink-0">
                {t.category}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {t.definition}
            </p>
            {t.example && (
              <div className="bg-accent/5 border border-accent/10 rounded-lg p-3">
                <p className="text-xs text-muted">
                  <strong className="text-accent-light">Example:</strong>{" "}
                  {t.example}
                </p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted">
            No terms found. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
}
