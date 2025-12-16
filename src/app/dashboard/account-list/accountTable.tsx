"use client";

import React, { useRef } from "react";
import { logoFont } from "@/lib/fonts";
import ActionButtons from "@/components/navbar/dashboard/DBActionBtn";
import { UserRole } from "@/lib/constant";

type DashboardUser = {
  id: string;
  email: string;
  name: string | null;
  contact: string | null;
  role: UserRole;
};

function formatRole(role: DashboardUser["role"]) {
  if (role === "EO") return "Event Manager";
  if (role === "SUPERADMIN") return "Super Admin";
  return "Admin";
}

export default function DashboardUserView({
  accounts,
}: {
  accounts: DashboardUser[];
}) {
  const tableScrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-full flex flex-col contain-inline-size">
      <div className="absolute h-full inset-0 bg-linear-to-tr from-violet-200 via-violet-300 to-blue-200 -z-10" />

      <div className="sticky top-[clamp(3.5rem,6vh,6rem)] z-30 bg-violet-200/95 backdrop-blur-3xl border-b border-neutral-200">
        <div className="flex items-center gap-3 p-4 border-b-3 border-neutral-300/70 mt-2">
          <input
            className="px-3 py-2 rounded-md bg-white text-neutral-600 border border-neutral-200 w-96"
            placeholder="Search Accounts..."
          />
          <button type="button" className="px-3 py-2 rounded-md text-neutral-600 bg-white border border-neutral-200">Filters</button>
        </div>

        <h3 className={`${logoFont.className} tracking-widest px-4 py-3 text-xl font-bold text-neutral-700`}>ACCOUNT LIST</h3>
      </div>
      <div className="flex-1 bg-white overflow-hidden">
        <div className=" overflow-x-auto">
          <div ref={tableScrollRef} className="max-h-full overflow-y-auto">
            <div className="w-full">
              <table className="w-full table-fixed border-collapse text-sm text-black">
                <colgroup>
                  <col className="w-50" /> {/* email */}
                  <col className="w-50" /> {/* name */}
                  <col className="w-40" /> {/* contact */}
                  <col className="w-30" /> {/* role */}
                  <col className="min-w-30 w-30 max-w-30" /> {/* actions */}
                </colgroup>

                <thead className="sticky top-0 z-20 bg-white text-neutral-500">
                  <tr className="border-b border-neutral-200 text-[14px]">
                    <th className="px-4 py-4 text-left">EMAIL</th>
                    <th className="px-4 py-4 text-left">NAME</th>
                    <th className="px-4 py-4 text-left">CONTACT</th>
                    <th className="px-4 py-4 text-left">ROLE</th>
                    <th className="px-4 py-4 text-center sticky right-0 bg-neutral-100 border-l">
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {accounts.map((account, i) => (
                    <tr
                      key={account.id}
                      className={`border-b border-neutral-200 text-[12px] ${i % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="truncate" title={account.email}>
                          {account.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div
                          className="truncate"
                          title={account.name ?? "-"}
                        >
                          {account.name ?? "-"}
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div
                          className="truncate"
                          title={account.contact ?? "-"}
                        >
                          {account.contact ?? "-"}
                        </div>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap font-semibold">
                        {formatRole(account.role)}
                      </td>

                      <td className="px-4 py-3 sticky right-0 bg-neutral-100 border-l">
                        <ActionButtons
                          onView={() => console.log("view", account.id)}
                          onEdit={() => console.log("edit", account.id)}
                          onDelete={() => console.log("delete", account.id)}
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