import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const competencies = await prisma.competency.findMany({
    include: { ratings: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(competencies);
}
