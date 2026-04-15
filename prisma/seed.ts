import "dotenv/config";
import { PrismaClient } from "@prisma/client";

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
        title: "Making things is about to get incredibly cheap",
        description:
          "AI is making it way cheaper to create ads, videos, websites, and software. Work that used to take a whole team several weeks can now be done in a few hours. This means the cost of actually making stuff is dropping fast — which changes everything about how agencies like Pearmill charge for their work and where the real value is.",
        category: "technology",
        convictionScore: 85,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Getting attention becomes the hardest part",
        description:
          "When anyone can build anything easily, the real challenge is getting people to notice it. There are only so many potential customers out there and only so much money to go around. The companies that win won't be the ones who make the best stuff — they'll be the ones who get it in front of the right people. Marketing and sales become more important than production.",
        category: "market",
        convictionScore: 80,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Companies need to reorganize, not just add AI tools",
        description:
          "Just giving your existing team AI tools and calling it a day won't cut it. The company itself needs to change — different kinds of jobs, fewer management layers, different skills when hiring. For example, companies used to hire people whose only job was writing ad copy. That specific role is shrinking. The question now is whether you still need separate specialists for each task, or whether one person with AI can do several jobs at once.",
        category: "org_structure",
        convictionScore: 75,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Everyone is becoming a software builder",
        description:
          "Building software used to require years of specialized training. Now, people are building apps and tools the same way they'd make a spreadsheet — it's becoming that normal. People at Pearmill who were hired as marketers are now building software products. The old categories of 'tech company' vs. 'services company' are blurring together.",
        category: "technology",
        convictionScore: 90,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "AI assistants will start buying things on our behalf",
        description:
          "Imagine your personal AI assistant has access to your credit card. You tell it 'find me shoes for this wedding' and it goes and purchases them for you. Now imagine millions of AI assistants all doing this — buying, selling, and negotiating with each other. This creates an entirely new economy where AI programs are the customers, not just people. It's brand new, so the growth potential is massive.",
        category: "market",
        convictionScore: 55,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Clients will pay for results, not hours worked",
        description:
          "Right now, most agencies charge by the hour or by the number of things they make (ads, designs, etc.). But what if instead, an agency said 'we guarantee you'll get 100 new customers this month, and you only pay us based on that'? That's outcome-based pricing — charging for results instead of time. Some consulting firms already do this. The shift means agencies take on more risk, but they can also charge a lot more.",
        category: "pricing",
        convictionScore: 65,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "We'll be able to score creative work like a test grade",
        description:
          "Right now, judging whether an ad or design is 'good' is mostly based on gut feelings and opinions. But AI is making it possible to actually score creative work — like getting a grade on a paper. Standardized scoring tools will tell you 'this ad is an 85 out of 100' based on real data. This replaces arguing about taste with clear measurements, and it lets the best work stand out.",
        category: "technology",
        convictionScore: 70,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "A company's AI knowledge becomes its most valuable asset",
        description:
          "Think about what makes a company valuable. Today, it's mostly the people who work there. But what if all the lessons a company has learned, all its best processes, and all the judgment calls its best employees have made got stored inside its AI systems? Then even when people leave, that knowledge stays and keeps getting smarter. The company itself becomes intelligent — like a brain that never forgets and keeps learning.",
        category: "org_structure",
        convictionScore: 60,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "Cheaper production means a way bigger market, not less work",
        description:
          "History shows us something surprising: when something gets cheaper, people don't use less of it — they use way, way more of it. When computers got cheaper, the computer industry didn't shrink — it exploded and became the biggest industry in history. The same thing is happening with creative work. As AI makes it cheaper to produce ads and content, the number of companies that can afford professional marketing will skyrocket. That means more potential clients, not fewer.",
        category: "market",
        convictionScore: 85,
      },
    }),
    prisma.assumption.create({
      data: {
        title: "AI running costs go up in 2026-2028, then drop",
        description:
          "Running AI requires special computer chips called GPUs. Right now, there's a shortage because only one company in the world (ASML, based in the Netherlands) makes the machines that manufacture these chips. So the cost of using AI is actually going up in the short term. But by around 2028, manufacturing will catch up with demand and prices will fall again. In the meantime, it may make sense to buy your own chips now while they're still relatively affordable.",
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
          "Pearmill's founder Nima hasn't personally written a single line of code since December 2025. He's built entire products just by directing AI tools.",
        type: "for",
      },
      {
        assumptionId: assumptions[0].id,
        content:
          "A product called HopKit took about 6 weeks to build. At the current pace of AI improvement, the same product might take just 2 days within a year.",
        type: "for",
      },
      {
        assumptionId: assumptions[3].id,
        content:
          "Three Pearmill team members (Haley, Dino, and Justin) are now building software products even though none of them were originally hired as software engineers.",
        type: "for",
      },
      {
        assumptionId: assumptions[8].id,
        content:
          "Even though AI can now write code, software engineering jobs actually grew 23% between 2024 and 2025. Cheaper didn't mean fewer jobs — it meant more demand.",
        type: "for",
      },
      {
        assumptionId: assumptions[8].id,
        content:
          "Think about how many companies Pearmill has turned away because they couldn't afford the fees. If costs drop, all of those companies suddenly become potential clients.",
        type: "for",
      },
      {
        assumptionId: assumptions[5].id,
        content:
          "One Pearmill client (Petal) already works close to this model. They focus on one specific industry and know exactly what it costs to get a new customer in each region, so pricing based on results is possible.",
        type: "for",
      },
      {
        assumptionId: assumptions[5].id,
        content:
          "Some industries like healthcare have strict rules about advertising. It's harder to guarantee specific results there, so this pricing model may not work for every type of client.",
        type: "against",
      },
      {
        assumptionId: assumptions[9].id,
        content:
          "There's only one company in the world (ASML in the Netherlands) that makes the specialized machines needed to manufacture AI chips. They can only produce so many, which creates a bottleneck.",
        type: "for",
      },
      {
        assumptionId: assumptions[2].id,
        content:
          "A company called Octane built an AI tool that could replace 16 people's jobs. When the affected employees found out, they pushed back hard. People resist changes that threaten their roles — this makes reorganizing harder than it sounds.",
        type: "against",
      },
      {
        assumptionId: assumptions[7].id,
        content:
          "A company called Flux uses an AI coding tool called Devin. It was terrible at first, but after months of learning the company's specific code, it now outperforms other AI tools. The longer AI works with your data, the smarter it gets.",
        type: "for",
      },
    ],
  });

  // Seed competencies
  const competencies = await Promise.all([
    prisma.competency.create({
      data: {
        name: "Making ads and videos",
        description:
          "Creating the actual content — videos, images, and creator-style ads that run on social media",
        order: 1,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Running ad campaigns",
        description:
          "Setting up and managing paid advertising on platforms like Meta, Google, and TikTok — deciding how much to spend, who to target, and when to run ads",
        order: 2,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Analyzing results and testing",
        description:
          "Looking at the numbers to figure out what's working, running experiments to compare different approaches, and reporting results",
        order: 3,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Managing client relationships",
        description:
          "Talking with clients, presenting ideas and results, keeping them happy and informed",
        order: 4,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Designing websites and landing pages",
        description:
          "Building and improving the pages people land on after clicking an ad — making sure they actually sign up, buy, or take action",
        order: 5,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Writing ads and content",
        description:
          "Writing the words that appear in ads, on websites, and in emails — the text that convinces people to take action",
        order: 6,
      },
    }),
    prisma.competency.create({
      data: {
        name: "Big-picture planning",
        description:
          "Deciding the overall marketing approach — which platforms to use, how to grow, what the long-term plan looks like",
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

    if (comp.name.includes("Writing ads")) {
      nowRating = 3;
      oneYrRating = 4;
      threeYrRating = 5;
    } else if (comp.name.includes("Making ads")) {
      nowRating = 2;
      oneYrRating = 3;
      threeYrRating = 4;
    } else if (comp.name.includes("Analyzing")) {
      nowRating = 2;
      oneYrRating = 3;
      threeYrRating = 4;
    } else if (comp.name.includes("Running ad")) {
      nowRating = 2;
      oneYrRating = 3;
      threeYrRating = 4;
    } else if (comp.name.includes("Managing client")) {
      nowRating = 1;
      oneYrRating = 2;
      threeYrRating = 3;
    } else if (comp.name.includes("Big-picture")) {
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
