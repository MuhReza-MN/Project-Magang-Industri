"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode-generator";

type Props = {
  value: string;
  size?: number;
};

export default function ParticipantQRCode({ value, size = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const qr = QRCode(0, "H");
    qr.addData(value);
    qr.make();

    ref.current.innerHTML = qr.createSvgTag({
      scalable: true,
      margin: 2,
    });
  }, [value]);

  return (
    <div
      ref={ref}
      className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
    />
  );
}
