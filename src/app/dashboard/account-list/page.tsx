import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardUserView from "./accountTable";
import { UserRole } from "@/lib/constant";

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

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (!dbUser || dbUser.role === "EO") {
    redirect("/dashboard"); // or 403 page later
  }

  const accounts = (await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      contact: true,
      role: true,
    },
  })).map((u) => ({
    ...u,
    role: u.role as UserRole,
  }));


  return <DashboardUserView accounts={accounts} />;
}
