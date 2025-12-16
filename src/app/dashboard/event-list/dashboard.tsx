"use client";

import React, { useRef } from "react";
import { logoFont } from "@/lib/fonts";
import ActionButtons from "@/components/navbar/dashboard/DBActionBtn";

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
  const tableScrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-full flex flex-col contain-inline-size">
      <div className="absolute h-full inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />

      <div className="sticky top-[clamp(3.5rem,6vh,6rem)] z-30 bg-violet-200/95 backdrop-blur-3xl border-b border-neutral-200">
        <div className="flex items-center gap-3 p-4 border-b-3 border-neutral-300/70 mt-2">
          <input
            className="px-3 py-2 rounded-md bg-white text-neutral-600 border border-neutral-200 w-96"
            placeholder="Search events..."
          />
          <button type="button" className="px-3 py-2 rounded-md text-neutral-600 bg-white border border-neutral-200">Filters</button>
        </div>

        <h3 className={`${logoFont.className} tracking-widest px-4 py-3 text-xl font-bold text-neutral-700`}>EVENT LIST</h3>
      </div>
      <div className="flex-1 bg-white overflow-hidden">
        <div className=" overflow-x-auto">
          <div ref={tableScrollRef} className="max-h-full overflow-y-auto">
            <div className="w-full">
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
                  {events.map((event, i) => (
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
                          onView={() => console.log("view", event.id)}
                          onEdit={() => console.log("edit", event.id)}
                          onDelete={() => console.log("delete", event.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}