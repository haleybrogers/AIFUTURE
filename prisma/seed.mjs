import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// Use Prisma's internal runtime directly
const { PrismaClient } = require("@prisma/client/scripts/default-index.js");

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

  const assumptions = await Promise.all([
    prisma.assumption.create({ data: { title: "Production costs are approaching zero", description: "AI is making it dramatically cheaper to produce creative assets, software, content, and other deliverables. What used to take a team weeks can now be done in hours.", category: "technology", convictionScore: 85 } }),
    prisma.assumption.create({ data: { title: "Distribution is the scarce resource", description: "When building anything is easy, the hardest part becomes getting it in front of people. Marketing and sales become the real differentiator.", category: "market", convictionScore: 80 } }),
    prisma.assumption.create({ data: { title: "Companies will restructure around AI, not just augment", description: "Using AI to do the same thing cheaper misses the point. The org itself needs to change — new roles, fewer layers, different hiring profiles.", category: "org_structure", convictionScore: 75 } }),
    prisma.assumption.create({ data: { title: "The line between software and services is disappearing", description: "Everyone will build software the way everyone builds spreadsheets. The distinction between building software and providing services is collapsing.", category: "technology", convictionScore: 90 } }),
    prisma.assumption.create({ data: { title: "Agent-to-agent commerce will become a major economy", description: "Agents with economic access will make purchasing decisions autonomously. A massive new economy with 40%+ growth rates.", category: "market", convictionScore: 55 } }),
    prisma.assumption.create({ data: { title: "Outcome-based pricing replaces time-based billing", description: "Instead of charging per asset or per hour, agencies guarantee outcomes. McKinsey already does this. The premium is much higher.", category: "pricing", convictionScore: 65 } }),
    prisma.assumption.create({ data: { title: "Quality becomes measurable via evaluators and benchmarks", description: "Industry-standard evaluators will score creative work like software benchmarks score code. AI scorecards replace vibes-based quality.", category: "technology", convictionScore: 70 } }),
    prisma.assumption.create({ data: { title: "Every company becomes a mini AGI", description: "A company's value shifts from its people to accumulated AI knowledge. Historical learnings, processes, and taste get embedded in AI. Institutional intelligence compounds.", category: "org_structure", convictionScore: 60 } }),
    prisma.assumption.create({ data: { title: "Jevons' Paradox: cheaper production = massively larger market", description: "When something gets cheaper, total usage explodes. Cheaper creative production means the addressable market grows exponentially.", category: "market", convictionScore: 85 } }),
    prisma.assumption.create({ data: { title: "Compute costs spike short-term (2026-2028) then fall", description: "GPU-bottlenecked due to ASML constraints. By 2028, supply catches up and costs fall. Short-term: local compute strategy.", category: "technology", convictionScore: 70 } }),
  ]);

  await prisma.evidence.createMany({
    data: [
      { assumptionId: assumptions[0].id, content: "Nima hasn't written a single line of code since December 2025. Built entire products using AI agents.", type: "for" },
      { assumptionId: assumptions[0].id, content: "HopKit was built in 1-1.5 months. In a year, same thing might take 2 days.", type: "for" },
      { assumptionId: assumptions[3].id, content: "Haley, Dino, and Justin are all effectively software engineers now despite not being hired as such.", type: "for" },
      { assumptionId: assumptions[8].id, content: "Software engineering roles grew 23% in 2024-2025 despite AI automation of coding tasks.", type: "for" },
      { assumptionId: assumptions[8].id, content: "How many companies has Pearmill rejected because they couldn't afford us? At lower costs, they all become clients.", type: "for" },
      { assumptionId: assumptions[5].id, content: "Chad/Petal already operates close to this — specific vertical, known cost-per-lead benchmarks across geographies.", type: "for" },
      { assumptionId: assumptions[5].id, content: "Healthcare is pay-to-play — harder to do pure outcome pricing. May not work for all verticals.", type: "against" },
      { assumptionId: assumptions[9].id, content: "ASML in Netherlands is the bottleneck for GPU manufacturing.", type: "for" },
      { assumptionId: assumptions[2].id, content: "Octane: built a tool replacing 16 people's jobs. People on the call pushed back hard.", type: "against" },
      { assumptionId: assumptions[7].id, content: "Flux uses Devin AI — terrible at first, but after months of learning, outperforms Claude Code and Codex. Memory compounds.", type: "for" },
    ],
  });

  const competencyData = [
    { name: "Creative Production (video, static, UGC)", order: 1, now: 2, yr1: 3, yr3: 4 },
    { name: "Media Buying (paid social, paid search)", order: 2, now: 2, yr1: 3, yr3: 4 },
    { name: "Analytics & Testing", order: 3, now: 2, yr1: 3, yr3: 4 },
    { name: "Account Management", order: 4, now: 1, yr1: 2, yr3: 3 },
    { name: "CRO / Web Design", order: 5, now: 2, yr1: 3, yr3: 4 },
    { name: "Copywriting & Content", order: 6, now: 3, yr1: 4, yr3: 5 },
    { name: "Strategy", order: 7, now: 1, yr1: 2, yr3: 3 },
  ];

  for (const cd of competencyData) {
    const comp = await prisma.competency.create({ data: { name: cd.name, order: cd.order } });
    await prisma.autonomyRating.createMany({
      data: [
        { competencyId: comp.id, timeframe: "now", rating: cd.now },
        { competencyId: comp.id, timeframe: "1yr", rating: cd.yr1 },
        { competencyId: comp.id, timeframe: "3yr", rating: cd.yr3 },
      ],
    });
  }

  console.log("Seeded successfully!");
  console.log(`  ${assumptions.length} assumptions with evidence`);
  console.log(`  ${competencyData.length} competencies with autonomy ratings`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
