"use client";

import { useState } from "react";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="md:hidden flex flex-col justify-center items-center space-y-1. bg-gray-500/40 border-white border-1 h-10 w-10 m-2"
        onClick={() => setIsOpen(true)}
      >
        <span className="w-6 h-[3px] bg-white mb-[4px]" />
        <span className="w-6 h-[3px] bg-white mb-[4px]" />
        <span className="w-6 h-[3px] bg-white" />
      </button>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`absolute top-0 right-0 h-64 w-64 bg-slate-800 border-s-6 border-t-6 border-b-6 border-slate-900/50 text-white z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-row justify-between items-center p-4 border-b border-slate-700">
          <span className="font-bold">Akses Cepat</span>
          <button
            type="button"
            className="text-xl font-extrabold"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 text-sm">
          <li>
            <button
              type="button"
              className="underline underline-offset-3 w-full text-left text-gray-300 font-extrabold text-sm hover:text-gray-400 active:text-gray-400 transition-colors duration-50"
            >
              Lihat Event
            </button>
          </li>
          <li>
            <button
              type="button"
              className="underline underline-offset-3 w-full text-left text-gray-300 font-extrabold text-sm hover:text-gray-400 active:text-gray-400 transition-colors duration-50"
            >
              About Us
            </button>
          </li>
          <li>
            <button
              type="button"
              className="underline underline-offset-3 w-full text-left text-gray-300 font-extrabold text-sm hover:text-gray-400 active:text-gray-400 transition-colors duration-50"
            >
              FAQ
            </button>
          </li>
          <li>
            <button
              type="button"
              className="underline underline-offset-3 w-full text-left text-gray-300 font-extrabold text-sm hover:text-gray-400 active:text-gray-400 transition-colors duration-50"
            >
              Daftarkan Event
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
}
