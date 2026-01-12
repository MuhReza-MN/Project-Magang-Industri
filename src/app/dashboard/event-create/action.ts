"use server";

import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

function generateEventCode(id: string) {
  const rand = Math.floor(100 + Math.random() * 900);
  const suffix = id.replace(/[^a-zA-Z0-9]/g, "").slice(-3).toUpperCase();
  return `EV${rand}${suffix}`;
}

export async function createEvent(data: {
  title: string;
  description: string;
  status: string;
  eoId: string;
  startAt: string;
  endAt: string | null;
  posterImage: string;
  details: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  const status = user?.role === "EO" ? "UNAPPROVED" : data.status;

  const event = await prisma.event.create({
    data: {
      title: data.title.trim(),
      description: data.description.trim(),
      status,
      eoId: data.eoId,
      startAt: new Date(data.startAt),
      endAt: data.endAt ? new Date(data.endAt) : null,
      posterImage: data.posterImage,
      details: data.details,
      createdById: session.user.id,
      eventCode: "TEMP",
    },
  });

  const eventCode = generateEventCode(event.id);

  await prisma.event.update({
    where: { id: event.id },
    data: { eventCode },
  });

  return event;
}
