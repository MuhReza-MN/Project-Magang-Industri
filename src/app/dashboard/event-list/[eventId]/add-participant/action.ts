"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateParticipantCode(eventCode: string, id: string) {
  const suffix = id.replace(/[^a-zA-Z0-9]/g, "").slice(-3).toUpperCase();
  return `P-${eventCode}${suffix}`;
}

export async function createParticipant(data: {
  eventId: string;
  name: string;
  email: string;
  contact: string;
  eventCode: string;
}) {

  const participant = await prisma.participant.create({
    data: {
      eventId: data.eventId,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      contact: data.contact,
      status: "REGISTERED",
      qrCode: "TEMP",
    },
  });

  const qrCode = generateParticipantCode(data.eventCode, participant.id);

  await prisma.participant.update({
    where: { id: participant.id },
    data: { qrCode },
  });

  return participant;
}
