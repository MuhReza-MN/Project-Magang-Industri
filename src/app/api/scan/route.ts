import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { qrCode } = await req.json();

  const participant = await prisma.participant.findUnique({
    where: { qrCode },
    select: { id: true, status: true },
  });

  if (!participant) {
    return Response.json({ valid: false }, { status: 404 });
  }

  if (participant.status === "ATTENDED") {
    return Response.json({ valid: true, used: true });
  }

  await prisma.participant.update({
    where: { id: participant.id },
    data: { status: "ATTENDED" },
  });

  return Response.json({ valid: true, used: false });
}
