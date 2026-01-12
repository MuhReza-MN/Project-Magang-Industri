"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateParticipantCode(eventCode: string, id: string) {
  const suffix = id.replace(/[^a-zA-Z0-9]/g, "").slice(-3).toUpperCase();
  return `P-${eventCode}${suffix}`;
}

export async function getParticipant(participantID: string) {
  return await prisma.participant.findUnique({
    where: { id: participantID },
  });
}

export async function updateParticipant(id: string, data: {
  name: string;
  email: string;
  contact: string;
}) {
  return prisma.participant.update({
    where: { id },
    data: {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      contact: data.contact,
    },
  });
}
