import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const services = await prisma.serviceLine.findMany({
    include: {
      assumptionLinks: {
        include: { assumption: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const service = await prisma.serviceLine.create({
    data: {
      name: body.name,
      description: body.description,
      type: body.type || "new",
      currentPricing: body.currentPricing,
      proposedPricing: body.proposedPricing,
      aiDeliveryModel: body.aiDeliveryModel,
      marketOpportunity: body.marketOpportunity,
      status: body.status || "exploring",
      notes: body.notes,
      assumptionLinks: body.assumptionIds
        ? {
            create: body.assumptionIds.map((aid: string) => ({
              assumptionId: aid,
            })),
          }
        : undefined,
    },
    include: {
      assumptionLinks: { include: { assumption: true } },
    },
  });
  return NextResponse.json(service);
}
