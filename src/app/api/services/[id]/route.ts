import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  // Handle assumption links separately
  if (body.assumptionIds) {
    await prisma.serviceAssumptionLink.deleteMany({
      where: { serviceLineId: id },
    });
    await prisma.serviceAssumptionLink.createMany({
      data: body.assumptionIds.map((aid: string) => ({
        serviceLineId: id,
        assumptionId: aid,
      })),
    });
    delete body.assumptionIds;
  }

  const service = await prisma.serviceLine.update({
    where: { id },
    data: body,
    include: {
      assumptionLinks: { include: { assumption: true } },
    },
  });
  return NextResponse.json(service);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.serviceLine.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
