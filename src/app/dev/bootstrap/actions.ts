"use server";

import { PrismaClient } from "@prisma/client";
import crypto from "node:crypto";
import { USER_ROLES, EVENT_STATUS } from "@/lib/constant";

const prisma = new PrismaClient();


export async function bootstrapEvents() {
  // ⚠️ SAFETY: prevent double run
  const existing = await prisma.event.count();
  if (existing > 0) {
    return { ok: false, message: "Events already exist" };
  }

  const superadmin = await prisma.user.findUniqueOrThrow({
    where: { email: "superadmin@rqre.id" },
  });
  const admin = await prisma.user.findUniqueOrThrow({
    where: { email: "admin@rqre.id" },
  });
  const eo1 = await prisma.user.findUniqueOrThrow({
    where: { email: "eo1@rqre.id" },
  });
  const eo2 = await prisma.user.findUniqueOrThrow({
    where: { email: "eo2@rqre.id" },
  });

  const eventDetails = {
    intro:
      "Dengan menyetujui ketentuan ini, peserta dianggap telah membaca dan bersedia mengikuti seluruh peraturan yang berlaku.",
    sections: [
      {
        id: "aturan",
        title: "Aturan :",
        items: [
          { id: "a1", text: "Peserta wajib melakukan registrasi sebelum event dimulai." },
          { id: "a2", text: "Gunakan identitas yang valid saat pendaftaran." },
          { id: "a3", text: "Panitia berhak menolak peserta yang melanggar peraturan." },
        ],
      },
      {
        id: "ketentuan",
        title: "Ketentuan :",
        items: [
          { id: "k1", text: "QR Kode hanya berlaku untuk satu orang." },
          { id: "k2", text: "Ikuti arahan panitia." },
          { id: "k3", text: "Panitia tidak bertanggung jawab atas barang pribadi." },
        ],
      },
    ],
  };

  const POSTERS = Array.from({ length: 8 }, (_, i) => `/poster/temp${i + 1}.webp`);

  const homepageEvents = [
    { title: "RQRE EVENTS 01", status: EVENT_STATUS.JOINABLE, eo: eo1 },
    { title: "RQRE EVENTS 02", status: EVENT_STATUS.JOINABLE, eo: eo2 },
    { title: "RQRE EVENTS 03", status: EVENT_STATUS.ONGOING, eo: eo1 },
    { title: "BOX EVENTS 01", status: EVENT_STATUS.JOINABLE, eo: eo2 },
    { title: "RQRE EVENTS 04", status: EVENT_STATUS.ONGOING, eo: admin },
    { title: "RQRE EVENTS 05", status: EVENT_STATUS.JOINABLE, eo: eo1 },
    { title: "WIDE EVENTS 01", status: EVENT_STATUS.ONGOING, eo: eo2 },
    { title: "WIDE EVENTS 02", status: EVENT_STATUS.JOINABLE, eo: admin },
  ];

  for (let i = 0; i < homepageEvents.length; i++) {
    const e = homepageEvents[i];

    await prisma.event.create({
      data: {
        title: e.title,
        description: `${e.title} description`,
        status: e.status,
        eventCode: `HOME-${i + 1}-${crypto.randomUUID().slice(0, 8)}`,
        posterImage: POSTERS[i],
        details: JSON.stringify(eventDetails),
        startAt: new Date("2025-12-01"),
        endAt: new Date("2025-12-02"),

        createdById: e.eo.role === USER_ROLES.EO ? e.eo.id : admin.id,
        eoId: e.eo.id,
      },
    });
  }

  const extraEvents = [
    { title: "NOT YET OPEN EVENT", status: EVENT_STATUS.UPCOMING, eo: admin },
    { title: "PENDING APROVAL EVENT", status: EVENT_STATUS.UNAPPROVED, eo: eo1 },
    { title: "FINISHED EVENT", status: EVENT_STATUS.FINISHED, eo: eo2 },
    { title: "CANCELED EVENT", status: EVENT_STATUS.CANCELLED, eo: eo2 },
  ];

  for (let i = 0; i < extraEvents.length; i++) {
    const e = extraEvents[i];

    await prisma.event.create({
      data: {
        title: e.title,
        description: `${e.title} description`,
        status: e.status,
        eventCode: `DUMMY-${i + 1}-${Date.now()}`,
        posterImage: POSTERS[i % POSTERS.length], // reuse OK

        details: JSON.stringify(eventDetails),
        startAt: new Date("2025-11-01"),
        endAt: new Date("2025-11-02"),

        createdById: superadmin.id,
        eoId: e.eo.id,
      },
    });
  }

  return { ok: true };
}
