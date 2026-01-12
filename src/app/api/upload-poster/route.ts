import { NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
  if (file.size > 2 * 1024 * 1024)
    return NextResponse.json({ error: "Max 2MB" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  const now = new Date();
  const dateStr = now
    .toISOString()
    .slice(11, 19)
    .replace(/:/g, ""); // HHMMSS

  const uploadDir = path.join(process.cwd(), "public/poster/uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  let counter = 1;
  let filename = `evp_${dateStr}_${counter}.webp`;

  while (true) {
    try {
      await fs.access(path.join(uploadDir, filename));
      counter++;
      filename = `evp_${dateStr}_${counter}.webp`;
    } catch {
      break;
    }
  }

  const outputPath = path.join(uploadDir, filename);

  await sharp(buffer)
    .resize(1200, 1200, { fit: "inside" })
    .webp({ quality: 85 })
    .toFile(outputPath);

  return NextResponse.json({
    url: `/poster/uploads/${filename}`,
  });
}
