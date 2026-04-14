import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const rating = await prisma.autonomyRating.upsert({
    where: {
      competencyId_timeframe: {
        competencyId: id,
        timeframe: body.timeframe,
      },
    },
    update: { rating: body.rating },
    create: {
      competencyId: id,
      timeframe: body.timeframe,
      rating: body.rating,
    },
  });
  return NextResponse.json(rating);
}
