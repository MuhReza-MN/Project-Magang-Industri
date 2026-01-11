"use client";
import { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion } from "framer-motion";

export default function QRScannerPage() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  type ScanState = "scanning" | "validating" | "done";

  const [status, setStatus] = useState<"valid" | "invalid" | null>(null);
  const [scanState, setScanState] = useState<ScanState>("scanning");
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    if (!window.isSecureContext) {
      alert("Kamera hanya bisa digunakan melalui HTTPS.");
      return;
    }
  }, []);


  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;
    console.log("Secure context:", window.isSecureContext);

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, aspectRatio: 1.0 },
      async (text) => {
        if (scanState !== "scanning") return;

        setHasScanned(true);
        navigator.vibrate?.(100);
        await new Promise((res) => setTimeout(res, 1500));

        if (text.startsWith("EV")) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }

        setScanState("done");

        setTimeout(() => {
          setStatus(null);
          setScanState("scanning");
        }, 2000);
      },
      (error) => {
        console.warn(`QR Scan Error: ${error}`);
      }
    );

    return () => {
      scannerRef.current?.stop().catch(() => { });
    };

  }, [])

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

      <motion.div
        className="mt-6 w-full max-w-sm bg-white text-black rounded-xl p-4 text-center"
      >
        {scanState === "scanning" && (
          <p className="font-bold">Sedang memindai QR…</p>
        )}

        {scanState === "validating" && (
          <p className="font-bold animate-pulse">Memvalidasi data…</p>
        )}

        {scanState === "done" && status === "valid" && (
          <p className="font-bold text-green-600">VALID</p>
        )}

        {scanState === "done" && status === "invalid" && (
          <p className="font-bold text-red-600">TIDAK VALID</p>
        )}
      </motion.div>

    </div>
  )
}