"use client";

import { useEffect, useState } from "react";
import { bootstrapEvents } from "./actions";

export default function BootstrapEventsPage() {
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function run() {
      setStatus("running");

      try {
        const res = await bootstrapEvents();
        if (!res.ok) {
          setStatus("error");
          setMessage(res.message ?? "Failed");
          return;
        }
        setStatus("done");
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Unexpected error");
      }
    }

    run();
  }, []);

  return (
    <div className="p-10 text-black">
      {status === "running" && "⏳ Creating events..."}
      {status === "done" && "✅ Events created — delete this page now"}
      {status === "error" && `❌ ${message}`}
    </div>
  );
}
