import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import EditEvent from "./editEvent";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
};

export default async function EditEventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const currentUser = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: {
      id: true,
      role: true,
    },
  });

  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
    include: {
      eo: { select: { id: true, name: true } },
      _count: { select: { participants: true } },
    },
  });

  if (!event) redirect("/dashboard/event-list");

  let eoUsers: { id: string; name: string | null }[] = [];

  if (currentUser.role === "ADMIN") {
    eoUsers = await prisma.user.findMany({
      where: {
        role: { in: ["ADMIN", "EO"] },
      },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  }

  if (currentUser.role === "EO") {
    eoUsers = await prisma.user.findMany({
      where: { id: currentUser.id },
      select: { id: true, name: true },
    });
  }

  if (currentUser.role === "EO" && event.eo.id !== currentUser.id) {
    redirect("/dashboard/event-list");
  }
  const participants = await prisma.participant.findMany({
    where: { eventId: event.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <EditEvent
      event={event}
      participants={participants}
      eoUsers={eoUsers}
      currentUserRole={currentUser.role}
    />
  );
}
