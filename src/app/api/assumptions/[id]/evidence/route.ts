import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const evidence = await prisma.evidence.create({
    data: {
      assumptionId: id,
      content: body.content,
      type: body.type || "for",
      sourceUrl: body.sourceUrl || null,
    },
  });
  return NextResponse.json(evidence);
}
