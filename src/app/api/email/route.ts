import nodemailer from "nodemailer";
import qrcode from "qrcode-generator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateQRBase64(text: string) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();

  const svg = qr.createSvgTag({ scalable: true });
  const base64 = Buffer.from(svg).toString("base64");

  return {
    svg,
    base64,
  };
}

export async function POST(req: Request) {
  const { participantId } = await req.json();

  const participant = await prisma.participant.findUnique({
    where: { id: participantId },
    include: { event: true },
  });
  if (!participant) {
    return Response.json({
      sukses: false,
      pesan: "Partisipan tidak ditemukan.",
    }, { status: 404 });
  }

  const qr = generateQRBase64(participant.qrCode || "");

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Sistem QR" <demo@qr.com>',
    to: "peserta@demo.com",
    subject: "QR Code untuk Partisipasi Event Anda",
    html: `
      <h2>Halo ${participant.name}</h2>
      <p>Berikut QR Code Anda untuk event:</p>
      <b>${participant.event.title}</b>
      <p>Silakan tunjukkan QR ini saat registrasi.</p>
      <img src="cid:qrcode" width="250" />
    `,
    attachments: [
      {
        filename: 'qrcode.svg',
        content: qr.svg,
        contentType: 'image/svg+xml',
        cid: 'qrcode',
      },
    ],
  });

  await prisma.participant.update({
    where: { id: participantId },
    data: { status: "VERIFIED" },
  });

  return Response.json({
    sukses: true,
    pesan: "Email berhasil dikirim & peserta terverifikasi.",
    preview: nodemailer.getTestMessageUrl(info),
  });
}
