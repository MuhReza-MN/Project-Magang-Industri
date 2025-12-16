"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function BootstrapPage() {
  useEffect(() => {
    async function run() {
      const users = [
        { email: "superadmin@rqre.id", name: "Super Admin" },
        { email: "admin@rqre.id", name: "Admin Staff" },
        { email: "eo1@rqre.id", name: "EO Alpha" },
        { email: "eo2@rqre.id", name: "EO Beta" },
      ];

      // 1️⃣ Create accounts
      for (const u of users) {
        await authClient.signUp.email({
          email: u.email,
          password: "password123",
          name: u.name,
        });
      }

      // 2️⃣ Assign roles (server-side Prisma)
      await fetch("/api/bootstrap", { method: "POST" });

      alert("✅ Accounts + roles created. DELETE THIS PAGE & API NOW.");
    }

    run().catch(console.error);
  }, []);

  return <div className="p-10 text-black">Bootstrapping users…</div>;
}
