import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const assumption = await prisma.assumption.update({
    where: { id },
    data: body,
    include: { evidence: true, comments: true },
  });
  return NextResponse.json(assumption);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.assumption.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
