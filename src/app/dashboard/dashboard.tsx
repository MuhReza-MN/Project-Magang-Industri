"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { logoFont } from "@/lib/fonts";
import ActionButtons from "@/components/navbar/dashboard/DBActionBtn";

export default function DashboardView() {
  const tableScrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-full flex flex-col contain-inline-size">
      <div className="absolute flex grow h-full inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />
      <div className="sticky top-[clamp(3.5rem,6vh,6rem)] z-30 bg-violet-200/95 backdrop-blur-3xl border-b border-neutral-200">
        <div className="flex items-center gap-3 p-4 border-b-3 border-neutral-300/70">
          <input
            className="px-3 py-2 rounded-md bg-white text-neutral-600 border border-neutral-200 w-96"
            placeholder="Search events..."
          />
          <button type="button" className="px-3 py-2 rounded-md text-neutral-600 bg-white border border-neutral-200">Filters</button>
        </div>
        <h3 className={`${logoFont.className} tracking-widest px-4 py-3 text-xl font-bold text-neutral-700`}>EVENT LIST</h3>
        <div className="bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse">
              <thead className="sticky bg-white z-10 text-left text-sm text-neutral-500">
                <tr>
                  <th className="px-4 py-4 w-1/7 text-center">STATUS</th>
                  <th className="px-4 py-4 w-1/7">EVENT NAME</th>
                  <th className="px-4 py-4 w-1/7">EO NAME</th>
                  <th className="px-4 py-4 w-1/7">PARTICIPANTS</th>
                  <th className="px-4 py-4 w-1/7 text-center">START DATE</th>
                  <th className="px-4 py-4 w-1/7 text-center">END DATE</th>
                  <th className="pl-4 pr-8 py-4 w-1/7 sticky text-center bg-neutral-100 right-0 border-l">ACTIONS</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto" ref={tableScrollRef}>
        <div className="py-2 bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-black overflow-y-scroll">
              <tbody>
                {Array.from({ length: 30 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <tr key={i} className={`border-b border-neutral-200 ${i % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}>
                    <td className="px-4 py-3 w-1/7 whitespace-nowrap text-center">Open</td>
                    <td className="px-4 py-3 w-1/7 whitespace-nowrap">Event #{i + 1}</td>
                    <td className="px-4 py-3 w-1/7 whitespace-nowrap">EO #{i + 1}</td>
                    <td className="px-4.5 py-3 w-1/7 whitespace-nowrap flex-row">± {Math.floor(Math.random() * 200)} </td>
                    <td className="px-4 py-3 w-1/7 whitespace-nowrap text-center">2025-12-{(i % 30) + 1}</td>
                    <td className="px-4 py-3 w-1/7 whitespace-nowrap text-center">2025-12-{(i % 30) + 2}</td>

                    <td className="pl-4 pr-8 py-3 w-1/7 whitespace-nowrap sticky right-0 bg-neutral-100 border-l">
                      <div className="w-full">
                        <ActionButtons
                          onView={() => console.log("view", i)}
                          onEdit={() => console.log("edit", i)}
                          onDelete={() => console.log("delete", i)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}