"use client";

import React, { useRef, useMemo, useState } from "react";
import { logoFont } from "@/lib/fonts";
import ActionButtons from "@/components/navbar/dashboard/DBActionBtn";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { deleteEvent } from "./action";

type DashboardEvent = {
  id: string;
  title: string;
  status: string;
  startAt: Date;
  endAt: Date | null;
  eo: { name: string | null };
  _count: { participants: number };
};

export default function DashboardView({
  events,
}: {
  events: DashboardEvent[];
}) {
  const router = useRouter();
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [eoFilter, setEoFilter] = useState<string>("ALL");
  const [participantRange, setParticipantRange] = useState("ALL"); // placeholder

  const statusOptions = useMemo(() => {
    const set = new Set(events.map(e => e.status));
    return ["ALL", ...Array.from(set)];
  }, [events]);

  const eoOptions = useMemo(() => {
    const set = new Set(
      events.map(e => e.eo?.name).filter(Boolean) as string[]
    );
    return ["ALL", ...Array.from(set)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || event.status === statusFilter;

      const matchesEO =
        eoFilter === "ALL" || event.eo?.name === eoFilter;

      // placeholder
      const matchesParticipants = true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesEO &&
        matchesParticipants
      );
    });
  }, [events, search, statusFilter, eoFilter]);

  return (
    <div className="h-full flex flex-col contain-inline-size">
      <div className="absolute h-full inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />

      <div className="sticky top-[clamp(3.5rem,6vh,6rem)] z-30 bg-violet-200/95 backdrop-blur-3xl border-b border-neutral-200">
        <div className="flex items-center gap-3 p-4 border-b-3 border-neutral-300/70">
          <label className="flex flex-col text-neutral-700 font-bold">
            Cari Events
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-3 py-2 rounded-md bg-white text-neutral-600 border border-neutral-200 w-96"
              placeholder="Search events..."
            />
          </label>
          <label className="flex flex-col text-neutral-700 font-bold">
            Filter Status
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-white border border-neutral-200 text-neutral-600"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-neutral-700 font-bold">
            Filter Handler
            <select
              value={eoFilter}
              onChange={e => setEoFilter(e.target.value)}
              className="px-3 py-2 rounded-md bg-white border border-neutral-200 text-neutral-600"
            >
              {eoOptions.map(eo => (
                <option key={eo} value={eo}>
                  {eo}
                </option>
              ))}
            </select>
          </label>
          <motion.button
            type="button"
            className="px-3 py-2 mt-6 rounded-md text-white font-bold bg-green-500 border border-neutral-200"
            whileTap={{ scale: 0.95, filter: "brightness(0.75)" }}
            whileHover={{ scale: 1.05, filter: "brightness(0.85)" }}
            transition={{ duration: 0.1, type: "spring", stiffness: 500, damping: 25 }}
            onClick={() => {
              router.push("/dashboard/event-create");
            }}
          >
            Buat Event Baru
          </motion.button>
        </div>

        <h3 className={`${logoFont.className} tracking-widest px-4 py-3 text-xl font-bold text-neutral-700`}>EVENT LIST</h3>
      </div>
      <div className="flex-1 bg-white overflow-hidden">
        <div ref={tableScrollRef} className="h-full overflow-y-auto">
          <table className="w-full table-fixed border-collapse text-sm text-black">
            <colgroup>
              <col className="w-30" /> {/* status */}
              <col className="w-60" /> {/* event name */}
              <col className="w-35" /> {/* eo */}
              <col className="w-30" /> {/* participants */}
              <col className="w-35" /> {/* start */}
              <col className="w-35" /> {/* end */}
              <col className="min-w-35 w-35 max-w-35" /> {/* actions */}
            </colgroup>

            <thead className="sticky top-0 z-20 bg-white text-neutral-500">
              <tr className="border-b border-neutral-200 text-[14px]">
                <th className="px-4 py-4 text-center">STATUS</th>
                <th className="px-4 py-4 text-left">EVENT NAME</th>
                <th className="px-4 py-4 text-left">EO NAME</th>
                <th className="px-4 py-4 text-left">PARTICIPANTS</th>
                <th className="px-4 py-4 text-center">START DATE</th>
                <th className="px-4 py-4 text-center">END DATE</th>
                <th className="px-4 py-4 text-center sticky right-0 bg-neutral-100 border-l">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, i) => (
                <tr
                  key={event.id}
                  className={`border-b border-neutral-200 text-[12px] ${i % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}>
                  <td className="px-4 py-3 text-center whitespace-nowrap font-semibold">
                    {event.status}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div
                      className="max-w-full truncate"
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div
                      className="max-w-full truncate"
                      title={event.eo?.name ?? "-"}
                    >
                      {event.eo?.name ?? "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[15px]">
                    <div
                      className="max-w-full truncate"
                    >
                      ± {event._count.participants}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    {event.startAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    {event.endAt ? event.endAt.toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3 sticky right-0 bg-neutral-100 border-l">
                    <ActionButtons
                      onView={() => {
                        router.push(`/dashboard/event-list/${event.id}`);
                      }}
                      onEdit={() => {
                        router.push(`/dashboard/event-list/${event.id}/edit`);
                      }}
                      onDelete={async () => {
                        if (confirm(`Hapus event "${event.title}" beserta seluruh partisipannya?`)) {
                          await deleteEvent(event.id);
                          router.refresh();
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-neutral-400">
                    No events match the current filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}