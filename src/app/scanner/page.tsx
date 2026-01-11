import { Metadata } from "next";
import QRScannerPage from "./scanner";

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function ScannerPage() {
  return <QRScannerPage />;
}
