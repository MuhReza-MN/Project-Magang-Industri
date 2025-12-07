"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function SidebarManager() {
  const pathName = usePathname() || "";
  const isDashboardHome = pathName === "/dashboard" || pathName === "/dashboard/";

  return <Sidebar canShrink={isDashboardHome} expanded={true} />
}