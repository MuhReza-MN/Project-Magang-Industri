import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CreateEvent from "./createEvent";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
};

export default async function CreateEventPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const currentUser = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: {
      id: true,
      role: true,
      name: true,
    },
  });

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
    eoUsers = [{ id: currentUser.id, name: currentUser.name }];
  }

  const emptyEvent = {
    id: "",
    title: "",
    description: "",
    status: "UNAPPROVED",
    posterImage: null,
    details: JSON.stringify({
      intro: "",
      sections: [
        {
          id: "aturan",
          title: "Aturan",
          items: [{ id: crypto.randomUUID(), text: "" }],
        },
        {
          id: "ketentuan",
          title: "Ketentuan",
          items: [{ id: crypto.randomUUID(), text: "" }],
        },
      ],
    }),
    startAt: new Date(),
    endAt: null,
    eo: { id: currentUser.id, name: currentUser.name },
    _count: { participants: 0 },
  };


  return (
    <CreateEvent
      event={emptyEvent}
      eoUsers={eoUsers}
      currentUserRole={currentUser.role}
    />
  );
}
