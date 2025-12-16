"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiBell } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type NavBarProps = { onNavigate?: () => void };

export default function DBNavbar({ onNavigate }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch session user
  useEffect(() => {
    authClient.getSession().then((res) => {
      if (res.data?.user) {
        setUserEmail(res.data.user.email);
      }
    });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await authClient.signOut();
    router.replace("/login");
  }


  return (
    <motion.nav
      ref={containerRef}
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
        onClick={() => setOpen((v) => !v)}
        className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-red-400 shadow-md"
        aria-label="Profile"
      >
        <FaUserCircle className="text-slate-500 size-[95%]" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-[120%] w-48 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b">
              <p className="text-xs text-gray-500">Signed in as</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {userEmail ?? "—"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 text-left font-semibold"
            >
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  )
}
