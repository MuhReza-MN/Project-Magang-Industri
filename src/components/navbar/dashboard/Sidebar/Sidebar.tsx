"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { USER_ROLES } from "@/lib/constant";
import { SidebarUser } from "./Sidebar.types";
import { formatUserRole } from "@/lib/role-label";
import { LuGripVertical, LuGrid2X2, LuCalendar, LuUsers, LuSettings } from "react-icons/lu";
import { RxDragHandleVertical } from "react-icons/rx";
import Link from "next/link";

type SidebarProps = {
  user: SidebarUser;
  canShrink?: boolean;
  expanded?: boolean;
};

const EXPANDED_W = "16rem";
const CLOSED_W = "4rem";


export default function Sidebar({ user, canShrink = true, expanded = true }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const isEo = user.role === USER_ROLES.EO

  return (
    <div className="relative z-40">
      <motion.aside
        aria-label="Sidebar"
        initial={false}
        animate={{ width: isExpanded ? EXPANDED_W : CLOSED_W }}
        transition={{ type: "spring", stiffness: 160, damping: 22, mass: 0.9 }}
        className="sticky left-0 top-[clamp(3.5rem,6vh,6rem)] 
             h-[calc(100vh-clamp(3.5rem,6vh,6rem))]
             bg-white border-r border-neutral-200 shadow-sm overflow-visible"
      >
        <div className="h-full w-full flex flex-col justify-between overflow-hidden">
          <nav className="flex-1 overflow-auto px-2 py-4 mt-[5%]">
            <motion.div
              initial={{ filter: "brightness(1)" }}
              whileHover={{ filter: "brightness(0.85)" }}
              transition={{ duration: 0, ease: "easeInOut" }}
              className={`flex items-center mb-5  ${isExpanded ? "gap-3 px-2" : "justify-center mt-1"}`}
            >
              <Link href="/dashboard" className="w-10 h-10 rounded-md bg-neutral-300 shadow-md flex items-center justify-center shrink-0">
                <LuGrid2X2 className="text-3xl text-white shadow-md" />
              </Link>
              {isExpanded && (
                <span className="font-semibold text-xl text-neutral-300">
                  HOME
                </span>
              )}
            </motion.div>

            <ul className="space-y-1">
              <li>
                <Link href="/dashboard/event-list" className={`flex items-center
                    ${isExpanded ? "gap-3 px-2" : "justify-center"}
                    py-2 rounded text-black hover:bg-neutral-100
                  `}>
                  <LuCalendar className="text-4xl shrink-0" />
                  {isExpanded && <span>Events List</span>}
                </Link>
              </li>
              {!isEo && (
                <li>
                  <Link href="/dashboard/account-list" className={`flex items-center
                    ${isExpanded ? "gap-3 px-2" : "justify-center"}
                    py-2 rounded text-black hover:bg-neutral-100
                  `}>
                    <LuUsers className="text-4xl shrink-0" />
                    {isExpanded && <span>Accounts List</span>}
                  </Link>
                </li>
              )}
              <li>
                <Link href="/dashboard/settings" className={`flex items-center
                    ${isExpanded ? "gap-3 px-2" : "justify-center"}
                    py-2 rounded text-black hover:bg-neutral-100
                  `}>
                  <LuSettings className="text-4xl shrink-0" />
                  {isExpanded && <span>Settings</span>}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="pl-4 py-4 flex items-center justify-between w-full">
            <div className={`text-sm ${!isExpanded && "opacity-0 pointer-events-none"}`}>
              <div className="text-neutral-800 font-semibold">{formatUserRole(user.role)}</div>
              <div className="text-xs text-neutral-500">{user.name || "RQRE.id"}</div>
            </div>
            <div className={`justify-end ${canShrink ? "-mr-0.5" : ""}`}>
              <button
                type="button"
                aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                onClick={() => setIsExpanded((s) => !s)}
                className={`absolute bottom-2 -right-1 w-9 h-12 flex items-center justify-center rounded-l-md bg-neutral-500 shadow-sm`}>
                <RxDragHandleVertical className="text-5xl text-white" />
              </button>

            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  )
}