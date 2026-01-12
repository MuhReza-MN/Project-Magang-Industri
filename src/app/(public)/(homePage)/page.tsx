import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
};

export default async function Home() {

  const events = await prisma.event.findMany({
    where: {
      status: { in: ["JOINABLE", "ONGOING"] },
    },
    orderBy: { startAt: "asc" },
    select: {
      id: true,
      title: true,
      posterImage: true,
      eventCode: true,
      startAt: true,
      endAt: true,
    },
  });

  return <HomeClient events={events} />
}
