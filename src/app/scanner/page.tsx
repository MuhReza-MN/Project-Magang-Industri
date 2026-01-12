import { Metadata, Viewport } from "next";
import QRScannerPage from "./scanner";

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function ScannerPage() {
  return <QRScannerPage />;
}
