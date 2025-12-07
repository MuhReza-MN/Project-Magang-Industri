"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

type NavBarProps = { onNavigate?: () => void };

export default function DBNavbar({ onNavigate }: NavBarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute right-[2%] flex items-center gap-3 sm:gap-4 h-full"
    >
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05, opacity: 1, filter: "brightness(0.95)" }}
        whileTap={{ scale: 0.95, filter: "brightness(0.95)" }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className=" relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-red-400 shadow-md"
        aria-label="Notifications"
      >
        <FiBell className="text-black size-[85%]" />
      </motion.button>
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05, opacity: 1, filter: "brightness(0.95)" }}
        whileTap={{ scale: 0.95, filter: "brightness(0.95)" }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-red-400 shadow-md"
        aria-label="Profile"
      >
        <FaUserCircle className="text-slate-500 size-[95%]" />
      </motion.button>

    </motion.nav>
  )
}
