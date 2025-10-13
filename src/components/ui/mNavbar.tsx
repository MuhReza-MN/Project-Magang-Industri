"use client";

import { useState, useEffect } from "react";
import NavLink from "./dNavbar";
import { motion } from "framer-motion";

export default function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openSidebar = () => {
    setIsMounted(true);
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  return (
    <>
      <button
        aria-label="Open navigation menu"
        type="button"
        className="md:hidden flex flex-col justify-center items-center space-y-1 bg-gray-500/40 border-white border h-10 w-10 m-2"
        onClick={openSidebar}
      >
        <span className="w-6 h-[3px] bg-white mb-[4px]" />
        <span className="w-6 h-[3px] bg-white mb-[4px]" />
        <span className="w-6 h-[3px] bg-white" />
      </button>
      {isMounted && (
        <>
          {isOpen ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 0.4 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              type="button"
              className="fixed inset-0 bg-black z-40"
              onClick={closeSidebar}
            />
          ) : ("")}
          <motion.aside
            onTransitionEnd={handleTransitionEnd}
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`fixed top-0 right-0 h-72 w-64 bg-slate-800 border-s-6 border-t-6 border-b-6 border-slate-900/50 text-white z-50`}
          >
            <div className="flex flex-row justify-between items-center p-4 border-b border-slate-700">
              <span className="font-bold">Akses Cepat</span>
              <button
                aria-label="Close navigation menu"
                type="button"
                className="text-xl font-extrabold"
                onClick={closeSidebar}
              >
                ✕
              </button>
            </div>
            <ul role="navigation" aria-label="Main Navigation" className="flex flex-col p-4">
              <NavLink onNavigate={closeSidebar} />
            </ul>
          </motion.aside>
        </>
      )}
    </>
  );
}
