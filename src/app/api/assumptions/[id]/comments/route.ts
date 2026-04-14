import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const comment = await prisma.comment.create({
    data: {
      assumptionId: id,
      author: body.author,
      content: body.content,
    },
  });
  return NextResponse.json(comment);
}
