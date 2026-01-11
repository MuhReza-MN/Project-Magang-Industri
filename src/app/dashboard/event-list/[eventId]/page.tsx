import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ViewEvent from "./viewEvent";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
};

export default async function ViewEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  // 📦 Load event
  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
    include: {
      eo: { select: { id: true, name: true } },
      _count: { select: { participants: true } },
    },
  });

  if (!event) redirect("/dashboard/event-list");

  // 📦 Load participants
  const participants = await prisma.participant.findMany({
    where: { eventId: event.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ViewEvent
      event={event}
      participants={participants}
    />
  );
}
