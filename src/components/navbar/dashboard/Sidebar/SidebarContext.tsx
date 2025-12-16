"use client";

import { createContext, useContext } from "react";

export type SidebarUser = {
  id: string;
  name: string | null;
  role: "SUPERADMIN" | "ADMIN" | "EO";
};

const SidebarContext = createContext<SidebarUser | null>(null);

export function SidebarProvider({
  user,
  children,
}: {
  user: SidebarUser;
  children: React.ReactNode;
}) {
  return (
    <SidebarContext.Provider value={user}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarUser() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("SidebarContext missing");
  return ctx;
}
