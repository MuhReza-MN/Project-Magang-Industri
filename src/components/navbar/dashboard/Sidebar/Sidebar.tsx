"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuGripVertical, LuGrid2X2, LuCalendar, LuUsers, LuSettings } from "react-icons/lu";
import { RxDragHandleVertical } from "react-icons/rx";
import Link from "next/link";

type SidebarProps = {
  canShrink?: boolean;
  expanded?: boolean;
};

const EXPANDED_W = "16rem";
const CLOSED_W = "3rem";

export default function Sidebar({ canShrink = true, expanded = true }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const closedX = `calc(-100% + ${CLOSED_W})`;

  return (
    <div className="relative z-40">
      <motion.aside
        aria-label="Sidebar"
        initial={false}
        animate={{ x: isExpanded ? 0 : closedX }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        style={{ width: EXPANDED_W }}
        className="sticky left-0 top-[clamp(3.5rem,6vh,6rem)] h-[calc(100vh-clamp(3.5rem,6vh,6rem))] 
        bg-white border-r border-neutral-200 shadow-sm translate-x-0"
      >
        <div className="h-full w-full flex flex-col justify-between">
          <nav className="flex-1 overflow-auto px-2 py-4 mt-[5%]">
            <div className="flex items-center gap-3 px-2 mb-5">
              <div className="w-10 h-10 rounded-md bg-neutral-300 shadow-md flex items-center justify-center">
                <LuGrid2X2 className="text-3xl text-white shadow-md" />
              </div>
              <span className={`font-semibold text-xl text-neutral-300 ${!isExpanded && "opacity-0 pointer-events-none"}`}>
                Menu
              </span>
            </div>

            <ul className="space-y-1">
              <li>
                <Link href="/dashboard" className="flex items-center gap-3 px-2 py-2 rounded text-black hover:bg-neutral-100">
                  <LuCalendar className="text-4xl" />
                  <span className={`${!isExpanded && "opacity-0 pointer-events-none h-full"}`}>Events List</span>
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard/account" className="flex items-center gap-3 px-2 py-2 rounded text-black hover:bg-neutral-100">
                  <LuUsers className="text-4xl" />
                  <span className={`${!isExpanded && "opacity-0 pointer-events-none h-full"}`}>Account List</span>
                </Link>
              </li>
            </ul>
            <ul className="space-y-1">
              <li>
                <Link href="/dashboard/settings" className="flex items-center gap-3 px-2 py-2 rounded text-black hover:bg-neutral-100">
                  <LuSettings className="text-4xl" />
                  <span className={`${!isExpanded && "opacity-0 pointer-events-none h-full"}`}>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="pl-4 py-4 flex items-center justify-between w-full">
            <div className={`text-sm ${!isExpanded && "opacity-0 pointer-events-none"}`}>
              <div className="text-neutral-800 font-semibold">Admin</div>
              <div className="text-xs text-neutral-500">RQRE.id</div>
            </div>
            <div className={`justify-end ${canShrink ? "-mr-0.5" : ""}`}>
              <button
                type="button"
                aria-label={isExpanded ? "Closed Sidebar" : "Expanded Sidebar"}
                onClick={() => setIsExpanded((s) => !s)}
                className={`w-9 h-12 flex items-center justify-center rounded-l-md  ${canShrink ? "bg-neutral-500 shadow-sm" : "bg-white pointer-events-none"}`}
              >
                <RxDragHandleVertical className={`text-5xl ${canShrink ? "" : "text-white"}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  )
}