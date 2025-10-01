"use client";

import { useState, useEffect } from "react";
import NavLink from "./dNavbar";

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
        type="button"
        className="md:hidden flex flex-col justify-center items-center space-y-1. bg-gray-500/40 border-white border-1 h-10 w-10 m-2"
        onClick={openSidebar}
      >
        <span className="w-6 h-[3px] bg-white mb-[4px]" />
        <span className="w-6 h-[3px] bg-white mb-[4px]" />
        <span className="w-6 h-[3px] bg-white" />
      </button>
      {isMounted && (
        <>
          <button
            type="button"
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeSidebar}
          />
          <aside
            onTransitionEnd={handleTransitionEnd}
            className={`absolute top-0 right-0 h-72 w-64 bg-slate-800 border-s-6 border-t-6 border-b-6 border-slate-900/50 text-white z-50 transition-transform duration-300 ease-in-out ${
              isOpen
                ? "translate-x-0 pointer-events-auto"
                : "translate-x-full pointer-events-none"
            }`}
          >
            <div className="flex flex-row justify-between items-center p-4 border-b border-slate-700">
              <span className="font-bold">Akses Cepat</span>
              <button
                type="button"
                className="text-xl font-extrabold"
                onClick={closeSidebar}
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col p-4">
              <NavLink onNavigate={closeSidebar} />
            </ul>
          </aside>
        </>
      )}
    </>
  );
}
