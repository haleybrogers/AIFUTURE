// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("../src/generated/prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.serviceAssumptionLink.deleteMany();
  await prisma.evidence.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.assumption.deleteMany();
  await prisma.autonomyRating.deleteMany();
  await prisma.competency.deleteMany();
  await prisma.serviceLine.deleteMany();
  await prisma.scenario.deleteMany();

  // Seed assumptions from the meeting
  const assumptions = await Promise.all([
    prisma.assumption.create({
      data: {
        title: "Production costs are approaching zero",
        description:
          "AI is making it dramatically cheaper to produce creative assets, software, content, and other deliverables. What used to take a team weeks can now be done in hours. This collapses the cost structure of agencies and shifts value elsewhere.",
        category: "technology",
        convictionScore: 85,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Distribution is the scarce resource",
        description:
          "When building anything is easy, the hardest part becomes getting it in front of people. There are a limited number of humans willing to buy things and limited capital in the system. Marketing and sales become the real differentiator, not production capability.",
        category: "market",
        convictionScore: 80,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Companies will restructure around AI, not just augment with it",
        description:
          "Using AI to do the same thing cheaper misses the point. The org itself needs to change — new roles, fewer layers, different hiring profiles. We used to hire copywriters; that's directionally going away. The question is whether we need distinct paid search managers, motion designers, etc. or if those roles merge.",
        category: "org_structure",
        convictionScore: 75,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "The line between software and services is disappearing",
        description:
          "Everyone will build software the way everyone builds spreadsheets. Haley is already a software engineer. Software is becoming as ubiquitous as Excel. The distinction between 'we build software' and 'we provide services' is collapsing.",
        category: "technology",
        convictionScore: 90,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Agent-to-agent commerce will become a major economy",
        description:
          "Agents with economic access (credit cards, bank accounts) will make purchasing decisions autonomously. Your personal agent buys shoes for your wedding. Agent-to-agent transactions will create a massive new economy with 40%+ growth rates because it's just starting.",
        category: "market",
        convictionScore: 55,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Outcome-based pricing replaces time-based billing",
        description:
          "Instead of charging per asset or per hour (effectively charging for time), agencies move toward guaranteeing outcomes. McKinsey already does this — they guarantee loan volumes and take on capital risk. The premium for outcome-based is much higher than time-based.",
        category: "pricing",
        convictionScore: 65,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Quality becomes measurable via evaluators and benchmarks",
        description:
          "Industry-standard evaluators will score creative work the way software benchmarks score code. AI gives people scorecards on the work they produce. This replaces vibes-based quality assessment with clear metrics, creating a real differentiation point.",
        category: "technology",
        convictionScore: 70,
      },
    }),
    prisma.assumption.create({
      data: {
        title: 'Every company becomes a "mini AGI"',
        description:
          "A company\'s value shifts from its people to its accumulated AI knowledge. All historical learnings, processes, and taste get embedded in AI systems. People come and go, but the institutional intelligence compounds. For agencies (already process companies), this is especially powerful.",
        category: "org_structure",
        convictionScore: 60,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Jevons' Paradox applies: cheaper production = massively larger market",
        description:
          "When something gets cheaper, total usage explodes — not contracts. Oil, computing, and now software engineering all followed this pattern. Cheaper creative production means companies that couldn't afford Pearmill suddenly can. The addressable market grows exponentially.",
        category: "market",
        convictionScore: 85,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Compute costs spike short-term (2026-2028) then fall",
        description:
          "We're GPU-bottlenecked due to ASML's production constraints. Cost per token is rising for the first time in months. By 2028 supply catches up and costs fall again. Short-term mitigation: local compute strategy (buy GPUs now at cheaper prices).",
        category: "technology",
        convictionScore: 70,
      },
    }),
  ]);

  // Add some evidence
  await prisma.evidence.createMany({
    data: [
      {
        assumptionId: assumptions[0].id,
        content:
          "Nima hasn't written a single line of code since December 2025. Built entire products using AI agents.",
        type: "for",
      },
      {
        assumptionId: assumptions[0].id,
        content:
          "HopKit was built in 1-1.5 months. In a year, same thing might take 2 days.",
        type: "for",
      },
      {
        assumptionId: assumptions[3].id,
        content:
          "Haley, Dino, and Justin are all effectively software engineers now despite not being hired as such.",
        type: "for",
      },
      {
        assumptionId: assumptions[8].id,
        content:
          "Software engineering roles grew 23% in 2024-2025 despite AI automation of coding tasks.",
        type: "for",
      },
      {
        assumptionId: assumptions[8].id,
        content:
          "How many companies has Pearmill rejected because they couldn't afford us? At lower costs, they all become clients.",
        type: "for",
      },
      {
        assumptionId: assumptions[5].id,
        content:
          "Chad/Petal already operates close to this model — specific vertical, known cost-per-lead benchmarks across geographies.",
        type: "for",
      },
      {
        assumptionId: assumptions[5].id,
        content:
          "Healthcare is pay-to-play — harder to do pure outcome pricing there. May not work for all verticals.",
        type: "against",
      },
      {
        assumptionId: assumptions[9].id,
        content:
          "ASML in Netherlands is bottleneck for GPU manufacturing. Can only produce so many lithography machines.",
        type: "for",
      },
      {
        assumptionId: assumptions[2].id,
        content:
          "Octane: built a tool that replaces 16 people's jobs. The people on the call who'd be made obsolete pushed back. Adoption resistance is real.",
        type: "against",
      },
      {
        assumptionId: assumptions[7].id,
        content:
          "Flux uses Devin AI — terrible at first, but after months of learning the codebase, it outperforms Claude Code and Codex. Memory compounds.",
        type: "for",
      },
    ],
  });

  // Seed competencies
  const competencies = await Promise.all([
    prisma.competency.create({
      data: {
        name: "Creative Production (video, static, UGC)",
        description:
          "End-to-end creative asset production including video, static ads, and UGC content",
        order: 1,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Media Buying (paid social, paid search)",
        description:
          "Campaign setup, optimization, bidding, and budget management across platforms",
        order: 2,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Analytics & Testing",
        description:
          "Performance analysis, A/B testing, creative testing methodology, reporting",
        order: 3,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Account Management",
        description:
          "Client communication, strategy presentations, relationship management",
        order: 4,
      },
    }),
    prisma.competency.create({
      data: {
        name: "CRO / Web Design",
        description:
          "Landing page optimization, conversion rate optimization, web design and development",
        order: 5,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Copywriting & Content",
        description:
          "Ad copy, landing page copy, email copy, content strategy",
        order: 6,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Strategy",
        description:
          "High-level marketing strategy, channel strategy, growth planning",
        order: 7,
      },
    }),
  ]);

  // Seed initial autonomy ratings
  const ratings = [];
  for (const comp of competencies) {
    let nowRating = 1;
    let oneYrRating = 2;
    let threeYrRating = 3;

    if (comp.name.includes("Copywriting")) {
      nowRating = 3;
      oneYrRating = 4;
      threeYrRating = 5;
    } else if (comp.name.includes("Creative Production")) {
      nowRating = 2;
      oneYrRating = 3;
      threeYrRating = 4;
    } else if (comp.name.includes("Analytics")) {
      nowRating = 2;
      oneYrRating = 3;
      threeYrRating = 4;
    } else if (comp.name.includes("Media Buying")) {
      nowRating = 2;
      oneYrRating = 3;
      threeYrRating = 4;
    } else if (comp.name.includes("Account Management")) {
      nowRating = 1;
      oneYrRating = 2;
      threeYrRating = 3;
    } else if (comp.name.includes("Strategy")) {
      nowRating = 1;
      oneYrRating = 2;
      threeYrRating = 3;
    }

    ratings.push(
      prisma.autonomyRating.create({
        data: { competencyId: comp.id, timeframe: "now", rating: nowRating },
      }),
      prisma.autonomyRating.create({
        data: {
          competencyId: comp.id,
          timeframe: "1yr",
          rating: oneYrRating,
        },
      }),
      prisma.autonomyRating.create({
        data: {
          competencyId: comp.id,
          timeframe: "3yr",
          rating: threeYrRating,
        },
      })
    );
  }
  await Promise.all(ratings);

  console.log("Seeded successfully!");
  console.log(`  ${assumptions.length} assumptions`);
  console.log(`  ${competencies.length} competencies`);
  console.log(`  ${ratings.length} autonomy ratings`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
