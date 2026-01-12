import { Metadata } from "next";
import DashboardView from "./dashboard";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
};

export default async function DashboardEventListPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const currentUser = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { id: true, role: true },
  });

  const events = await prisma.event.findMany({
    where:
      currentUser.role === "EO"
        ? { eoId: currentUser.id }
        : {},
    orderBy: { createdAt: "desc" },
    include: {
      eo: { select: { name: true } },
      _count: { select: { participants: true } },
    },
  });

  return <DashboardView events={events} />
}
