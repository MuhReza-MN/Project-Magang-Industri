import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  const users = [
    { email: "superadmin@rqre.id", role: "SUPERADMIN" },
    { email: "admin@rqre.id", role: "ADMIN" },
    { email: "eo1@rqre.id", role: "EO" },
    { email: "eo2@rqre.id", role: "EO" },
  ];

  for (const u of users) {
    await prisma.user.update({
      where: { email: u.email },
      data: { role: u.role },
    });
  }

  return NextResponse.json({ ok: true });
}
