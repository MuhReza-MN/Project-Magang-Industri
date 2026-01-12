import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AddParticipant from "./addParticipant";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
};

export default async function AddParticipantPage({
  params,
}: {
  params: { eventId: string };
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
    select: {
      id: true,
      title: true,
      eventCode: true,
      posterImage: true,
      eo: { select: { id: true } },
    },
  });

  if (!event) redirect("/dashboard/event-list");

  return (
    <AddParticipant
      eventId={event.id}
      eventTitle={event.title}
      eventCode={event.eventCode}
      posterImage={event.posterImage}
    />

  );

}
