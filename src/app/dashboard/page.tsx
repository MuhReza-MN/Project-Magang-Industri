import { Metadata } from "next";
import DashboardView from "./dashboard";

export const metadata: Metadata = {
  title: "RQRE.ID",
  description: "Situs pendaftaran event khusus member-only",
};

export default function DashboardPage() {
  return <DashboardView />
}
