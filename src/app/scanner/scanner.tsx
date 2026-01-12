"use client";
import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion } from "framer-motion";

type ScanState = "scanning" | "validating" | "done";

export default function QRScannerPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lockRef = useRef(false);

  const [status, setStatus] = useState<"valid" | "invalid" | null>(null);
  const [scanState, setScanState] = useState<ScanState>("scanning");
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    if (!window.isSecureContext) {
      alert("Kamera hanya bisa digunakan melalui HTTPS.");
      return;
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    console.log("Secure context:", window.isSecureContext);

    scanner.start(
      { facingMode: "environment" },
      { fps: 12, aspectRatio: 1.0 },
      async (text) => {
        if (lockRef.current) return;
        lockRef.current = true;

        setHasScanned(true);
        setScanState("validating");
        navigator.vibrate?.(100);

        try {
          const res = await fetch("/api/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ qrCode: text }),
          });

          if (!res.ok) throw new Error("Invalid QR");

          const data = await res.json();

          if (data.valid) {
            setStatus("valid");
          } else {
            setStatus("invalid");
          }
        } catch {
          setStatus("invalid");
        }

        setScanState("done");

        setTimeout(() => {
          setStatus(null);
          setScanState("scanning");
          lockRef.current = false;
        }, 1500);
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );

    return () => {
      scannerRef.current?.stop().catch(() => { });
    };
  }, [scanState])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-6">
      <div className="relative w-full max-w-sm aspect-square rounded-xl overflow-hidden bg-black">
        <div
          id="qr-reader"
          className="w-full h-full flex items-center justify-center"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={hasScanned ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`w-64 h-64 border-4 rounded-xl ${status === "valid"
              ? "border-green-500"
              : status === "invalid"
                ? "border-red-500"
                : "border-white/70"
              }`}
          />
        </div>
      </div>
      <motion.div className="mt-6 w-full max-w-sm bg-white text-black rounded-xl p-4 text-center shadow">
        {scanState === "scanning" && (
          <p className="font-bold">Arahkan QR ke kamera…</p>
        )}

        {scanState === "validating" && (
          <p className="font-bold animate-pulse text-blue-600">
            Memverifikasi ke database…
          </p>
        )}

        {scanState === "done" && status === "valid" && (
          <p className="font-bold text-green-600 text-lg">✓ VALID — Check-in berhasil</p>
        )}

        {scanState === "done" && status === "invalid" && (
          <p className="font-bold text-red-600 text-lg">✗ QR Tidak Valid</p>
        )}
      </motion.div>
    </div>
  )
}