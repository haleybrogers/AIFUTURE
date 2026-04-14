import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const scenarios = await prisma.scenario.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(scenarios);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const scenario = await prisma.scenario.create({
    data: {
      name: body.name,
      description: body.description,
      assumptionStates: JSON.stringify(body.assumptionStates || {}),
    },
  });
  return NextResponse.json(scenario);
}
