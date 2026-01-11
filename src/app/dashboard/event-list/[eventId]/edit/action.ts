"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateEvent(data: {
  eventId: string;
  title: string;
  description: string;
  status: string;
  eoId: string;
  startAt: string;
  endAt: string | null;
  details: string;
}) {
  const {
    eventId,
    title,
    description,
    status,
    eoId,
    startAt,
    endAt,
    details,
  } = data;

  await prisma.event.update({
    where: { id: eventId },
    data: {
      title,
      description,
      status,
      eoId,
      startAt: new Date(startAt),
      endAt: endAt ? new Date(endAt) : null,
      details,
    },
  });

  return { ok: true };
}
