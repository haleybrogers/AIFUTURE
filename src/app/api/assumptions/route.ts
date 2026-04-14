import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const assumptions = await prisma.assumption.findMany({
    include: {
      evidence: { orderBy: { createdAt: "desc" } },
      comments: { orderBy: { createdAt: "desc" } },
    },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(assumptions);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const assumption = await prisma.assumption.create({
    data: {
      title: body.title,
      description: body.description,
      category: body.category || "other",
      convictionScore: body.convictionScore ?? 50,
    },
    include: { evidence: true, comments: true },
  });
  return NextResponse.json(assumption);
}
