"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type ERegisProps = {
  eventName: string;
};

export default function EventRegisForm({ eventName }: ERegisProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mb-2 bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:from-[#c53a30] hover:to-[#d87d48] transition-all duration-300 h-10 w-50 lg:w-35 rounded-4xl text-shadow-md font-semibold text-lg"
      >
        Register
      </button>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/40">
            <div className="bg-white rounded-lg p-6 shadow-lg relative z-50 top-0 mr-50 md:mr-0">
              <h2 className="text-xl font-bold mb-4 text-black">
                Register for {eventName}
              </h2>
              {/* Example form */}
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded p-2 text-gray-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded p-2 text-gray-500"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-300 text-white font-bold hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gradient-to-r from-[#eb4b3f] to-[#f0945b] hover:brightness-90 active:brightness-90 transition-all duration-300 active:duration-25 text-white font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
